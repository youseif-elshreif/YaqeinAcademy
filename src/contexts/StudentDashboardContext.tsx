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
import {
  getUserStats as getUserStatsSvc,
  getNextLesson as getNextLessonSvc,
} from "@/src/utils/services/user.service";

const StudentDashboardContext = createContext<
  StudentDashboardContextType | undefined
>(undefined);

export const StudentDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [userLessons, setUserLessons] = useState<Lesson[]>([]);
  const [nextLessonData, setNextLessonData] =
    useState<NextLessonResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUserLessons = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null); // Clear previous errors
      const lessons = await getUserLessonsSvc();
      setUserLessons(lessons);
      return lessons;
    } catch (error) {
      setError("خطأ في جلب قائمة الحلقات");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null); // Clear previous errors
      const data = await getUserStatsSvc();
      setUserStats(data);
      return data;
    } catch (error) {
      setError("خطأ في جلب إحصائيات المستخدم");
      throw error;
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  }, []);

  const getNextLesson = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null); // Clear previous errors
      const data = await getNextLessonSvc();
      setNextLessonData(data);
      return data;
    } catch (error) {
      setError("خطأ في جلب بيانات الحلقة القادم");
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
      error, // Add error to context value
    }),
    [
      getUserStats,
      userStats,
      getUserLessons,
      userLessons,
      getNextLesson,
      nextLessonData,
      isLoading,
      isInitialLoading,
      error, // Add error to dependencies
    ]
  );

  // تحميل البيانات تلقائياً عند تحميل المكون
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.all([getUserStats(), getNextLesson()]);
      } catch {
        // Set error state for initial loading failure
        setError("خطأ في تحميل بيانات لوحة التحكم");
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
