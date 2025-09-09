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
import { isAuthenticated } from "@/src/utils/authUtils";
import { useRouter } from "next/navigation";
import {
  AuthContextType,
  User,
  RegisterData,
  LoginCredentials,
  AuthAction,
  AuthState,
} from "@/src/types";
// import { isFloat64Array } from "node:util/types";

// Reducer function
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

// CreateContext

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// provider component

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

  // Check if user is authenticated based on token and user state
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

        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await authSvc.getUserProfile();
        const userData = response.data;

        const user: User = {
          _id: userData._id,
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          role: userData.role,
          age: userData.age,
          quranMemorized: userData.quranMemorized,
          numOfPartsofQuran: userData.numOfPartsofQuran,
          isVerified: userData.isVerified,
          createdAt: userData.createdAt,
          avatar: userData.avatar || "/avatar.png",
        };

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, token },
        });

        // Only redirect if explicitly requested
        if (shouldRedirect) {
          if (userData.role === "student") {
            router.push("/student/dashboard");
          } else if (userData.role === "teacher") {
            router.push("/teacher/dashboard");
          } else if (userData.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/");
          }
        }
      } catch (error: any) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
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

  // Session check on app start - بدون dependencies لتجنب infinite loop
  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      if (typeof window === "undefined") {
        if (isMounted) {
          dispatch({ type: "SET_LOADING", payload: false });
        }
        return;
      }

      const token = localStorage.getItem("accessToken");
      if (token && !state.user) {
        try {
          if (isMounted) {
            // استدعاء getUserData مباشرة بدلاً من dependency
            dispatch({ type: "SET_LOADING", payload: true });
            const response = await authSvc.getUserProfile();
            const userData = response.data;

            const user: User = {
              _id: userData._id,
              email: userData.email,
              name: userData.name,
              phone: userData.phone,
              role: userData.role,
              age: userData.age,
              quranMemorized: userData.quranMemorized,
              numOfPartsofQuran: userData.numOfPartsofQuran,
              isVerified: userData.isVerified,
              createdAt: userData.createdAt,
              avatar: userData.avatar || "/avatar.png",
            };

            dispatch({
              type: "LOGIN_SUCCESS",
              payload: { user, token },
            });
          }
        } catch {
          if (isMounted) {
            localStorage.removeItem("accessToken");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ بدون dependencies

  // Login function
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      dispatch({ type: "LOGIN_START" });

      try {
        const data = await authSvc.login(
          credentials.email,
          credentials.password
        );
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
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

  // Register function
  const register = useCallback(
    async (regData: RegisterData) => {
      dispatch({ type: "LOGIN_START" });
      try {
        const data = await authSvc.register(regData);
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          await getUserData(true);
        }
        router.push("/");
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

  // verify-email

  const verifyEmail = useCallback(
    async (token: string) => {
      try {
        const data = await authSvc.verifyEmail(token);

        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", data.accessToken);
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

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authSvc.logout();
    } catch {
      // Logout API call failed, continue with cleanup
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
      dispatch({ type: "LOGOUT" });
      router.push("/");
    }
  }, [router]);

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  // update user data function
  const updateUserData = useCallback(
    async (userData: Partial<User>) => {
      dispatch({ type: "UPDATE_USER_START" });

      try {
        const data = await authSvc.updateUserProfile(userData);

        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", data.accessToken);
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

  // Memoize context value to prevent unnecessary re-renders
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
