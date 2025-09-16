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

  getTeachers: () => Promise<Teacher[]>;
  createTeacher: (teacherData: any) => Promise<any>;
  updateTeacher: (teacherId: string, teacherData: any) => Promise<any>;
  updateMember: (memberId: string, memberData: any) => Promise<any>;
  updateTeacherMeetingLink: (
    teacherId: string,
    meetingLink: string
  ) => Promise<any>;
  deleteTeacher: (teacherId: string) => Promise<any>;
  refreshTeachers: () => Promise<void>;
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

  const getTeachers = useCallback(async (): Promise<Teacher[]> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminSvc.getTeachers();
      setTeachers(data.teachers);
      return data.teachers;
    } catch (error) {
      setError("خطأ في جلب قائمة المعلمين");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTeacher = useCallback(
    async (teacherData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.createTeacher(teacherData); // Refresh teachers list
        await getTeachers();
        return data;
      } catch (error) {
        setError("خطأ في إنشاء المعلم");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getTeachers]
  );

  const updateTeacher = useCallback(
    async (teacherId: string, teacherData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateTeacher(teacherId, teacherData); // Refresh teachers list
        await getTeachers();
        return data;
      } catch (error) {
        setError("خطأ في تحديث بيانات المعلم");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getTeachers]
  );

  const updateTeacherMeetingLink = useCallback(
    async (teacherId: string, meetingLink: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateTeacherMeetingLink(
          teacherId,
          meetingLink
        ); // Refresh teachers list
        await getTeachers();
        return data;
      } catch (error) {
        setError("خطأ في تحديث رابط اجتماع المعلم");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getTeachers]
  );

  const updateMember = useCallback(
    async (memberId: string, memberData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateMember(memberId, memberData); // Refresh teachers list
        await getTeachers();
        return data;
      } catch (error) {
        setError("خطأ في تحديث بيانات العضو");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getTeachers]
  );

  const deleteTeacher = useCallback(
    async (teacherId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.deleteTeacher(teacherId); // Refresh teachers list
        await getTeachers();
        return data;
      } catch (error) {
        setError("خطأ في حذف المعلم");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getTeachers]
  );

  const refreshTeachers = useCallback(async () => {
    await getTeachers();
  }, [getTeachers]);

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
