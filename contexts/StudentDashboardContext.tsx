"use Client";
import api, { API_BASE_URL } from "@/utils/api";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { StudentDashboardContextType, UserStats, Lesson } from "@/utils/types";

const StudentDashboardContext = createContext<
  StudentDashboardContextType | undefined
>(undefined);

export const StudentDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [userLessons, setUserLessons] = useState<Lesson[]>([]);

  const getUserLessons = useCallback(async () => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await api.get(`${API_BASE_URL}/api/user/my-lessons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserLessons(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user lessons:", error);
      throw error;
    }
  }, []);

  const getUserStats = useCallback(async () => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await api.get(`${API_BASE_URL}/api/user/user-stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched user stats:", response.data.data);
      setUserStats(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user stats:", error);
      throw error;
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      getUserStats,
      userStats,
      getUserLessons,
      userLessons,
    }),
    [getUserStats, userStats, getUserLessons, userLessons]
  );

  return (
    <StudentDashboardContext.Provider value={contextValue}>
      {children}
    </StudentDashboardContext.Provider>
  );
};

export const useStudentDashboard = () => {
  const context = useContext(StudentDashboardContext);
  if (!context) {
    throw new Error(
      "useStudentDashboard must be used within a StudentDashboardProvider"
    );
  }
  return context;
};
