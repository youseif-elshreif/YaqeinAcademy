"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import * as reportSvc from "@/utils/services/report.service";

export type StudentReport = {
  _id: string;
  lessonId?: { _id: string } | string;
  studentId?: string;
  attended?: boolean;
  completeLesson?: boolean;
  doneHomework?: boolean;
  content?: string;
  notes?: string;
  rating?: number;
  newMemorized?: { new: string[]; old: string[] };
  wantedForNextLesson?: { new: string[]; old: string[] };
  createdAt?: string;
  updatedAt?: string;
};

type ReportContextType = {
  studentReports: StudentReport[];
  myReports: StudentReport[];
  isLoading: boolean;
  error: string | null;
  // Get reports for a specific student (for teachers/admins)
  getStudentReports: (studentId: string) => Promise<StudentReport[]>;
  // Get current user's reports (for students)
  getMyReports: () => Promise<StudentReport[]>;
  // Create a new lesson report
  createLessonReport: (
    lessonId: string,
    payload: reportSvc.StudentReportPayload
  ) => Promise<any>;
  // Clear cached data
  clearReports: () => void;
  // Refresh data
  refreshStudentReports: (studentId: string) => Promise<void>;
  refreshMyReports: () => Promise<void>;
};

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReportContext must be used within ReportProvider");
  }
  return context;
};

type ReportProviderProps = {
  children: ReactNode;
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
        console.log("data", data);
        const reports = Array.isArray(data) ? data : [];
        setStudentReports(reports);
        console.log("Fetched student reports:", reports);
        return reports;
      } catch (error) {
        console.error("Error fetching student reports:", error);
        setError("فشل في جلب تقارير الطالب");
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
      // Handle different response formats
      const reports = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];
      setMyReports(reports);
      console.log("Fetched my reports:", reports);
      return reports;
    } catch (error) {
      console.error("Error fetching my reports:", error);
      setError("فشل في جلب تقاريري");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createLessonReport = useCallback(
    async (lessonId: string, payload: reportSvc.StudentReportPayload) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await reportSvc.postLessonReport(lessonId, payload);
        console.log("Created lesson report:", result);
        return result;
      } catch (error) {
        console.error("Error creating lesson report:", error);
        setError("فشل في إنشاء تقرير الدرس");
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
