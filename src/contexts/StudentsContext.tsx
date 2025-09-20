"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import * as adminSvc from "@/src/utils/services/admin.service";

type StudentsContextType = {
  students: any[];
  isLoading: boolean;
  error: string | null;
  getStudents: () => Promise<any[]>;
  createStudent: (studentData: any) => Promise<any>;
  updateStudent: (studentId: string, studentData: any) => Promise<any>;
  updateMember: (memberId: string, memberData: any) => Promise<any>;
  deleteMember: (memberId: string) => Promise<any>;
  addCreditsToStudent: (
    studentId: string,
    privateAmount: number
  ) => Promise<any>;
  refreshStudents: () => Promise<void>;
};

const StudentsContext = createContext<StudentsContextType | undefined>(
  undefined
);

export const useStudentsContext = () => {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error("useStudentsContext must be used within StudentsProvider");
  }
  return context;
};

type StudentsProviderProps = {
  children: ReactNode;
};

export const StudentsProvider = ({ children }: StudentsProviderProps) => {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStudents = useCallback(async (): Promise<any[]> => {
    try {
      setIsLoading(true);
      setError(null);
      const studentsOnly: any[] = await adminSvc.getStudents();
      setStudents(studentsOnly);
      return studentsOnly;
    } catch (error) {
      setError("خطأ في جلب قائمة الطلاب");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createStudent = useCallback(
    async (studentData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.createStudent(studentData); // Refresh students list
        await getStudents();
        return data;
      } catch (error) {
        setError("خطأ في إنشاء الطالب");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getStudents]
  );

  const updateStudent = useCallback(
    async (studentId: string, studentData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateMember(studentId, studentData); // Refresh students list
        await getStudents();
        return data;
      } catch (error) {
        setError("خطأ في تحديث بيانات الطالب");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getStudents]
  );

  const updateMember = useCallback(
    async (memberId: string, memberData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateMember(memberId, memberData); // Refresh students list
        await getStudents();
        return data;
      } catch (error) {
        setError("خطأ في تحديث بيانات العضو");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getStudents]
  );

  const addCreditsToStudent = useCallback(
    async (userId: string, privateAmount: number) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.addCreditsToStudent(userId, privateAmount); // Refresh students list
        return data;
      } catch (error) {
        setError("خطأ في إضافة حلقات للطالب");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [] // Removed getStudents dependency to fix eslint warning
  );

  const deleteMember = useCallback(
    async (memberId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.deleteMember(memberId); // Refresh students list
        await getStudents();
        return data;
      } catch (error) {
        setError("خطأ في حذف العضو");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getStudents]
  );

  const refreshStudents = useCallback(async () => {
    await getStudents();
  }, [getStudents]);

  const contextValue: StudentsContextType = {
    students,
    isLoading,
    error,
    getStudents,
    createStudent,
    updateStudent,
    updateMember,
    deleteMember,
    addCreditsToStudent,
    refreshStudents,
  };

  return (
    <StudentsContext.Provider value={contextValue}>
      {children}
    </StudentsContext.Provider>
  );
};
