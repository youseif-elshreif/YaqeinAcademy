"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import * as reportSvc from "@/src/utils/services/report.service";
import {
  StudentReport,
  ReportContextType,
  ReportProviderProps,
  StudentReportPayload,
} from "@/src/types";

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReportContext must be used within ReportProvider");
  }
  return context;
};

export const ReportProvider = ({ children }: ReportProviderProps) => {
  const [studentReports, setStudentReports] = useState<StudentReport[]>([]);
  const [myReports, setMyReports] = useState<StudentReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStudentReports = useCallback(
    async (studentId: string): Promise<StudentReport[]> => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await reportSvc.getStudentReports(studentId);
        const reports = Array.isArray(data) ? data : [];
        setStudentReports(reports);
        return reports;
      } catch (error) {
        setError("خطأ في جلب قائمة التقارير");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getMyReports = useCallback(async (): Promise<StudentReport[]> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await reportSvc.getMyReports();

      const reports = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];
      setMyReports(reports);
      return reports;
    } catch (error) {
      setError("خطأ في جلب التقارير?");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createLessonReport = useCallback(
    async (lessonId: string, payload: StudentReportPayload) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await reportSvc.postLessonReport(lessonId, payload);
        return result;
      } catch (error) {
        setError("خطأ في تحديث حالة التقرير");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearReports = useCallback(() => {
    setStudentReports([]);
    setMyReports([]);
    setError(null);
  }, []);

  const refreshStudentReports = useCallback(
    async (studentId: string) => {
      await getStudentReports(studentId);
    },
    [getStudentReports]
  );

  const refreshMyReports = useCallback(async () => {
    await getMyReports();
  }, [getMyReports]);

  const contextValue: ReportContextType = {
    studentReports,
    myReports,
    isLoading,
    error,
    getStudentReports,
    getMyReports,
    createLessonReport,
    clearReports,
    refreshStudentReports,
    refreshMyReports,
  };

  return (
    <ReportContext.Provider value={contextValue}>
      {children}
    </ReportContext.Provider>
  );
};
