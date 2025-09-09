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
  getStudents: (token: string) => Promise<any[]>;
  createStudent: (token: string, studentData: any) => Promise<any>;
  updateStudent: (
    token: string,
    studentId: string,
    studentData: any
  ) => Promise<any>;
  updateMember: (
    token: string,
    memberId: string,
    memberData: any
  ) => Promise<any>;
  deleteMember: (token: string, memberId: string) => Promise<any>;
  addCreditsToStudent: (
    token: string,
    studentId: string,
    privateAmount: number,
    publicAmount?: number
  ) => Promise<any>;
  refreshStudents: (token: string) => Promise<void>;
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

  const getStudents = useCallback(async (token: string): Promise<any[]> => {
    try {
      setIsLoading(true);
      setError(null);
      void token; // mark as used
      const studentsOnly: any[] = await adminSvc.getStudents();
      setStudents(studentsOnly);
      return studentsOnly;
    } catch (error) {
      setError("??? ?? ??? ?????? ??????");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createStudent = useCallback(
    async (token: string, studentData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        void token; // mark as used
        const data = await adminSvc.createStudent(studentData); // Refresh students list
        await getStudents(token);
        return data;
      } catch (error) {
        setError("??? ?? ????? ??????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getStudents]
  );

  const updateStudent = useCallback(
    async (token: string, studentId: string, studentData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateMember(token, studentId, studentData); // Refresh students list
        await getStudents(token);
        return data;
      } catch (error) {
        setError("??? ?? ????? ?????? ??????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getStudents]
  );

  const updateMember = useCallback(
    async (token: string, memberId: string, memberData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateMember(token, memberId, memberData); // Refresh students list
        await getStudents(token);
        return data;
      } catch (error) {
        setError("??? ?? ????? ?????? ?????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getStudents]
  );

  const addCreditsToStudent = useCallback(
    async (
      token: string,
      studentId: string,
      privateAmount: number,
      publicAmount?: number
    ) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.addCreditsToStudent(
          studentId,
          privateAmount,
          publicAmount || 0
        ); // Refresh students list
        await getStudents(token);
        return data;
      } catch (error) {
        setError("??? ?? ????? ???? ??????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getStudents]
  );

  const deleteMember = useCallback(
    async (token: string, memberId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        void token; // mark as used
        const data = await adminSvc.deleteMember(memberId); // Refresh students list
        await getStudents(token);
        return data;
      } catch (error) {
        setError("??? ?? ??? ?????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getStudents]
  );

  const refreshStudents = useCallback(
    async (token: string) => {
      await getStudents(token);
    },
    [getStudents]
  );

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
