"use client";
import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import * as authSvc from "@/src/utils/services/auth.service";
import {
  isAuthenticated,
  getAccessToken,
  saveAccessToken,
  removeAccessToken,
} from "@/src/utils/authUtils";
import { useRouter } from "next/navigation";
import {
  AuthContextType,
  User,
  RegisterData,
  LoginCredentials,
  AuthAction,
  AuthState,
} from "@/src/types";
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isLoading: true,
    error: null,
  });
  const isUserAuthenticated = useMemo(() => {
    return isAuthenticated() && state.user !== null;
  }, [state.user]);
  const getUserData = useCallback(
    async (shouldRedirect: boolean = false) => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }
        const token = getAccessToken();
        if (!token) {
          throw new Error("No access token found");
        }
        const response = await authSvc.getUserProfile();
        const userData = response.data;
        localStorage.setItem("user", JSON.stringify(userData));

        // تحديد هيكل البيانات حسب الدور
        const isTeacher = userData.userRole === "teacher" || userData.teacher;
        const userInfo = isTeacher ? userData.user : userData;

        const user: User = {
          _id: userInfo._id,
          email: userInfo.email,
          name: userInfo.name,
          phone: userInfo.phone,
          role: userInfo.role || userData.userRole,
          age: userInfo.age,
          quranMemorized: userInfo.quranMemorized,
          numOfPartsofQuran: userInfo.numOfPartsofQuran,
          isVerified: userInfo.isVerified,
          createdAt: userInfo.createdAt,
          avatar: "/avatar.png",
          money: userInfo.money || 0,
          numberOflessonsCridets: isTeacher
            ? userData.teacher?.numberOflessonsCridets || 0
            : 0,
        };
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, token },
        });
        if (shouldRedirect) {
          const userRole = userInfo.role || userData.userRole;
          if (userRole === "student") {
            router.push("/student/dashboard");
          } else if (userRole === "teacher") {
            router.push("/teacher/dashboard");
          } else if (userRole === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/");
          }
        }
      } catch (error: any) {
        if (typeof window !== "undefined") {
          removeAccessToken();
        }
        dispatch({
          type: "LOGIN_FAILURE",
          payload:
            error.response?.data?.message || "فشل في جلب بيانات المستخدم",
        });
        throw error;
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [router]
  );
  useEffect(() => {
    let isMounted = true;
    const checkSession = async () => {
      if (typeof window === "undefined") {
        if (isMounted) {
          dispatch({ type: "SET_LOADING", payload: false });
        }
        return;
      }
      const token = getAccessToken();
      if (token && !state.user) {
        try {
          if (isMounted) {
            dispatch({ type: "SET_LOADING", payload: true });
            const response = await authSvc.getUserProfile();
            const userData = response.data;
            localStorage.setItem("userData", JSON.stringify(userData));

            // تحديد هيكل البيانات حسب الدور
            const isTeacher =
              userData.userRole === "teacher" || userData.teacher;
            const userInfo = isTeacher ? userData.user : userData;

            const user: User = {
              _id: userInfo._id,
              email: userInfo.email,
              name: userInfo.name,
              phone: userInfo.phone,
              role: userInfo.role || userData.userRole,
              age: userInfo.age,
              quranMemorized: userInfo.quranMemorized,
              numOfPartsofQuran: userInfo.numOfPartsofQuran,
              isVerified: userInfo.isVerified,
              createdAt: userInfo.createdAt,
              avatar: userInfo.avatar || "/avatar.png",
              money: userInfo.money || 0,
              numberOflessonsCridets: isTeacher
                ? userData.teacher?.numberOflessonsCridets || 0
                : 0,
            };
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: { user, token },
            });
          }
        } catch {
          if (isMounted) {
            removeAccessToken();
            dispatch({ type: "SET_LOADING", payload: false });
          }
        }
      } else {
        if (isMounted) {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      }
    };
    checkSession();
    return () => {
      isMounted = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      dispatch({ type: "LOGIN_START" });
      try {
        const data = await authSvc.login(
          credentials.email,
          credentials.password
        );
        if (data.accessToken) {
          saveAccessToken(data.accessToken);
          await getUserData(true);
        }
      } catch {
        const errorMessage = "ادخل البريد الالكتروني وكلمة المرور بشكل صحيح";
        dispatch({
          type: "LOGIN_FAILURE",
          payload: errorMessage,
        });
        throw errorMessage;
      }
    },
    [getUserData]
  );
  const register = useCallback(
    async (regData: RegisterData) => {
      dispatch({ type: "LOGIN_START" });
      try {
        const data = await authSvc.register(regData);
        if (data.accessToken) {
          saveAccessToken(data.accessToken);
          await getUserData(true);
        }
        router.push("/student/dashboard");
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.";
        dispatch({
          type: "LOGIN_FAILURE",
          payload: errorMessage,
        });
        throw error;
      }
    },
    [router, getUserData]
  );
  const verifyEmail = useCallback(
    async (token: string) => {
      try {
        const data = await authSvc.verifyEmail(token);
        if (typeof window !== "undefined") {
          saveAccessToken(data.accessToken);
        }
        await getUserData(true);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          "حدث خطأ أثناء التحقق من البريد الإلكتروني. يرجى المحاولة مرة أخرى.";
        dispatch({
          type: "LOGIN_FAILURE",
          payload: errorMessage,
        });
        throw error;
      }
    },
    [getUserData]
  );
  const logout = useCallback(async () => {
    try {
      await authSvc.logout();
    } catch {
    } finally {
      if (typeof window !== "undefined") {
        removeAccessToken();
      }
      dispatch({ type: "LOGOUT" });
      router.push("/");
    }
  }, [router]);
  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);
  const updateUserData = useCallback(
    async (userData: Partial<User>) => {
      dispatch({ type: "UPDATE_USER_START" });
      try {
        const data = await authSvc.updateUserProfile(userData);
        if (typeof window !== "undefined") {
          saveAccessToken(data.accessToken);
        }
        await getUserData(true); // Refresh user data after update
      } catch (error: any) {
        dispatch({
          type: "UPDATE_USER_FAILURE",
          payload: "حدث خطأ أثناء تحديث البيانات. يرجى المحاولة مرة أخرى.",
        });
        throw error;
      }
    },
    [getUserData]
  );
  const contextValue = useMemo(
    () => ({
      ...state,
      getUserData,
      login,
      register,
      verifyEmail,
      logout,
      clearError,
      updateUserData,
      isAuthenticated: isUserAuthenticated,
    }),
    [
      state,
      getUserData,
      login,
      register,
      verifyEmail,
      logout,
      clearError,
      updateUserData,
      isUserAuthenticated,
    ]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
