"use Client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { StudentDashboardContextType, UserStats, Lesson } from "@/utils/types";
import { getUserLessons as getUserLessonsSvc } from "@/utils/services/lesson.service";
import { getUserStats as getUserStatsSvc } from "@/utils/services/user.service";

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
      const lessons = await getUserLessonsSvc();
      setUserLessons(lessons);
      return lessons;
    } catch (error) {
      console.error("Error fetching user lessons:", error);
      throw error;
    }
  }, []);

  const getUserStats = useCallback(async () => {
    try {
      const data = await getUserStatsSvc();
      console.log("Fetched user stats:", data);
      setUserStats(data);
      return data;
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
