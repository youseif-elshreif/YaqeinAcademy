"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import * as adminSvc from "@/src/utils/services/admin.service";
import { Teacher } from "@/src/types";

type TeachersContextType = {
  teachers: Teacher[] | null;
  isLoading: boolean;
  error: string | null;

  getTeachers: (token: string) => Promise<Teacher[]>;
  createTeacher: (token: string, teacherData: any) => Promise<any>;
  updateTeacher: (
    token: string,
    teacherId: string,
    teacherData: any
  ) => Promise<any>;
  updateMember: (
    token: string,
    memberId: string,
    memberData: any
  ) => Promise<any>;
  updateTeacherMeetingLink: (
    token: string,
    teacherId: string,
    meetingLink: string
  ) => Promise<any>;
  deleteTeacher: (token: string, teacherId: string) => Promise<any>;
  refreshTeachers: (token: string) => Promise<void>;
};

const TeachersContext = createContext<TeachersContextType | undefined>(
  undefined
);

export const useTeachersContext = () => {
  const context = useContext(TeachersContext);
  if (!context) {
    throw new Error("useTeachersContext must be used within TeachersProvider");
  }
  return context;
};

type TeachersProviderProps = {
  children: ReactNode;
};

export const TeachersProvider = ({ children }: TeachersProviderProps) => {
  const [teachers, setTeachers] = useState<null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTeachers = useCallback(async (token: string): Promise<Teacher[]> => {
    try {
      setIsLoading(true);
      setError(null);
      void token; // mark as used
      const data = await adminSvc.getTeachers();
      setTeachers(data.teachers);
      return data.teachers;
    } catch (error) {
      setError("??? ?? ??? ?????? ????????");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTeacher = useCallback(
    async (token: string, teacherData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        void token; // mark as used
        const data = await adminSvc.createTeacher(teacherData); // Refresh teachers list
        await getTeachers(token);
        return data;
      } catch (error) {
        setError("??? ?? ????? ??????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getTeachers]
  );

  const updateTeacher = useCallback(
    async (token: string, teacherId: string, teacherData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateTeacher(
          token,
          teacherId,
          teacherData
        ); // Refresh teachers list
        await getTeachers(token);
        return data;
      } catch (error) {
        setError("??? ?? ????? ?????? ??????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getTeachers]
  );

  const updateTeacherMeetingLink = useCallback(
    async (token: string, teacherId: string, meetingLink: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateTeacherMeetingLink(
          token,
          teacherId,
          meetingLink
        ); // Refresh teachers list
        await getTeachers(token);
        return data;
      } catch (error) {
        setError("??? ?? ????? ???? ?????? ??????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getTeachers]
  );

  const updateMember = useCallback(
    async (token: string, memberId: string, memberData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateMember(token, memberId, memberData); // Refresh teachers list
        await getTeachers(token);
        return data;
      } catch (error) {
        setError("??? ?? ????? ?????? ?????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getTeachers]
  );

  const deleteTeacher = useCallback(
    async (token: string, teacherId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.deleteTeacher(teacherId); // Refresh teachers list
        await getTeachers(token);
        return data;
      } catch (error) {
        setError("??? ?? ??? ??????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getTeachers]
  );

  const refreshTeachers = useCallback(
    async (token: string) => {
      await getTeachers(token);
    },
    [getTeachers]
  );

  const contextValue: TeachersContextType = {
    teachers,
    isLoading,
    error,
    getTeachers,
    createTeacher,
    updateTeacher,
    updateMember,
    updateTeacherMeetingLink,
    deleteTeacher,
    refreshTeachers,
  };

  return (
    <TeachersContext.Provider value={contextValue}>
      {children}
    </TeachersContext.Provider>
  );
};
