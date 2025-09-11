"use Client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { StudentDashboardContextType, UserStats, Lesson } from "@/src/types";
import { NextLessonResponse } from "@/src/types/student.types";
import { getUserLessons as getUserLessonsSvc } from "@/src/utils/services/lesson.service";
import { getUserStats as getUserStatsSvc, getNextLesson as getNextLessonSvc } from "@/src/utils/services/user.service";

const StudentDashboardContext = createContext<
  StudentDashboardContextType | undefined
>(undefined);

export const StudentDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [userLessons, setUserLessons] = useState<Lesson[]>([]);
  const [nextLessonData, setNextLessonData] = useState<NextLessonResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const getUserLessons = useCallback(async () => {
    try {
      setIsLoading(true);
      const lessons = await getUserLessonsSvc();
      setUserLessons(lessons);
      return lessons;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getUserStatsSvc();
      setUserStats(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  }, []);

  const getNextLesson = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getNextLessonSvc();
      setNextLessonData(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      getUserStats,
      userStats,
      getUserLessons,
      userLessons,
      getNextLesson,
      nextLessonData,
      isLoading,
      isInitialLoading,
    }),
    [getUserStats, userStats, getUserLessons, userLessons, getNextLesson, nextLessonData, isLoading, isInitialLoading]
  );

  // تحميل البيانات تلقائياً عند تحميل المكون
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.all([getUserStats(), getNextLesson()]);
      } catch (error) {
        // تجاهل الأخطاء في التحميل الأولي
        setIsInitialLoading(false);
      }
    };
    loadInitialData();
  }, [getUserStats, getNextLesson]);

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
