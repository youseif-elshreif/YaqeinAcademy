"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { getTeacherLessons } from "@/src/utils/services/lesson.service";
import { TeacherDashboardContextType } from "@/src/types";
import { useReportContext } from "./ReportContext";

const TeacherDashboardContext = createContext<
  TeacherDashboardContextType | undefined
>(undefined);

export const TeacherDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [teacherLessons, setTeacherLessons] = useState<any[]>([]);
  const { createLessonReport } = useReportContext();

  const getMyLessons = useCallback(async () => {
    try {
      const data = await getTeacherLessons();
      setTeacherLessons(data);
      return data;
    } catch (error) {
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({
      teacherLessons,
      getMyLessons,
      reportLesson: async (lessonId: string, payload: any) => {
        return createLessonReport(lessonId, payload);
      },
      reportForLessons: async (
        lessonId: string,
        reports: Array<{
          studentId: string;
          wantedForNextLesson: { new: string[]; old: string[] };
          newMemorized: { new: string[]; old: string[] };
          notes: string;
          rating: number;
        }>
      ) => {
        for (const r of reports) {
          await createLessonReport(lessonId, r as any);
        }

      },
      reportMultipleAndComplete: async (
        lessonId: string,
        reports: Array<{
          studentId: string;
          attended: boolean;
          wantedForNextLesson: { new: string[]; old: string[] };
          newMemorized: { new: string[]; old: string[] };
          notes: string;
          rating: number;
        }>
      ) => {
        for (const r of reports) {
          await createLessonReport(lessonId, r as any);
        }

      },
    }),
    [teacherLessons, getMyLessons, createLessonReport]
  );

  return (
    <TeacherDashboardContext.Provider value={value}>
      {children}
    </TeacherDashboardContext.Provider>
  );
};

export const useTeacherDashboard = () => {
  const ctx = useContext(TeacherDashboardContext);
  if (!ctx) {
    throw new Error(
      "useTeacherDashboard must be used within TeacherDashboardProvider"
    );
  }
  return ctx;
};
