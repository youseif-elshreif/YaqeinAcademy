"use Client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { StudentDashboardContextType, UserStats, Lesson } from "@/src/types";
import { getUserLessons as getUserLessonsSvc } from "@/src/utils/services/lesson.service";
import { getUserStats as getUserStatsSvc } from "@/src/utils/services/user.service";

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
      throw error;
    }
  }, []);

  const getUserStats = useCallback(async () => {
    try {
      const data = await getUserStatsSvc();
      setUserStats(data);
      return data;
    } catch (error) {
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
