"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import * as adminSvc from "@/utils/services/admin.service";
import * as lessonSvc from "@/utils/services/lesson.service";

type LessonsContextType = {
  lessonsRefreshKey: number;
  isLoading: boolean;
  error: string | null;
  addLessonToGroup: (
    token: string,
    groupId: string,
    data: { scheduledAt: string; subject: string; meetingLink: string }
  ) => Promise<any>;
  updateLesson: (
    token: string,
    lessonId: string,
    data: { scheduledAt?: string; subject: string; meetingLink?: string }
  ) => Promise<any>;
  deleteLesson: (token: string, lessonId: string) => Promise<any>;
  getLessonById: (lessonId: string) => Promise<any>;
  triggerLessonsRefresh: () => void;
};

const LessonsContext = createContext<LessonsContextType | undefined>(undefined);

export const useLessonsContext = () => {
  const context = useContext(LessonsContext);
  if (!context) {
    throw new Error("useLessonsContext must be used within LessonsProvider");
  }
  return context;
};

type LessonsProviderProps = {
  children: ReactNode;
};

export const LessonsProvider = ({ children }: LessonsProviderProps) => {
  const [lessonsRefreshKey, setLessonsRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addLessonToGroup = useCallback(
    async (
      token: string,
      groupId: string,
      data: { scheduledAt: string; subject: string; meetingLink: string }
    ) => {
      try {
        setIsLoading(true);
        setError(null);
        void token; // mark as used
        const result = await adminSvc.addLessonToGroup(groupId, data);
        console.log("Added lesson to group:", result);
        // Trigger refresh
        setLessonsRefreshKey((k) => k + 1);
        return result;
      } catch (error) {
        console.error("Error adding lesson to group:", error);
        setError("فشل في إضافة الدرس للمجموعة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateLesson = useCallback(
    async (
      token: string,
      lessonId: string,
      data: { scheduledAt: string; subject: string; meetingLink?: string }
    ) => {
      try {
        setIsLoading(true);
        setError(null);
        void token; // mark as used
        const result = await adminSvc.updateLesson(lessonId, data);
        console.log("Updated lesson:", result);
        // Trigger refresh
        setLessonsRefreshKey((k) => k + 1);
        return result;
      } catch (error) {
        console.error("Error updating lesson:", error);
        setError("فشل في تحديث الدرس");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteLesson = useCallback(async (token: string, lessonId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      void token; // mark as used
      const data = await adminSvc.deleteLesson(lessonId);
      console.log("Deleted lesson:", data);
      // Trigger refresh
      setLessonsRefreshKey((k) => k + 1);
      return data;
    } catch (error) {
      console.error("Error deleting lesson:", error);
      setError("فشل في حذف الدرس");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getLessonById = useCallback(async (lessonId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await lessonSvc.getLessonById(lessonId);
      console.log("Fetched lesson by ID:", data);
      return data;
    } catch (error) {
      console.error("Error fetching lesson by ID:", error);
      setError("فشل في جلب بيانات الدرس");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const triggerLessonsRefresh = useCallback(() => {
    setLessonsRefreshKey((k) => k + 1);
  }, []);

  const contextValue: LessonsContextType = {
    lessonsRefreshKey,
    isLoading,
    error,
    addLessonToGroup,
    updateLesson,
    deleteLesson,
    getLessonById,
    triggerLessonsRefresh,
  };

  return (
    <LessonsContext.Provider value={contextValue}>
      {children}
    </LessonsContext.Provider>
  );
};
