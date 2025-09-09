"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import * as adminSvc from "@/src/utils/services/admin.service";

type CoursesContextType = {
  courses: any[];
  isLoading: boolean;
  error: string | null;
  getCourses: (token: string) => Promise<any[]>;
  getCourseByIdAPI: (token: string, courseId: string) => Promise<any>;
  createCourse: (token: string, courseData: any) => Promise<any>;
  updateCourse: (
    token: string,
    courseId: string,
    courseData: any
  ) => Promise<any>;
  deleteCourse: (token: string, courseId: string) => Promise<any>;
  refreshCourses: (token: string) => Promise<void>;
};

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const useCoursesContext = () => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCoursesContext must be used within CoursesProvider");
  }
  return context;
};

type CoursesProviderProps = {
  children: ReactNode;
};

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCourses = useCallback(async (token: string): Promise<any[]> => {
    try {
      setIsLoading(true);
      setError(null);
      void token; // mark as used
      const data = await adminSvc.getCourses();
      setCourses(data);
      return data;
    } catch (error) {
      setError("??? ?? ??? ?????? ???????");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCourseByIdAPI = useCallback(
    async (token: string, courseId: string) => {
      try {

        void token;
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.getCourseById(courseId);
        return data;
      } catch (error) {
        setError("??? ?? ??? ?????? ??????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const createCourse = useCallback(
    async (token: string, courseData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.createCourse(courseData); // Refresh courses list
        await getCourses(token);
        return data;
      } catch (error) {
        setError("??? ?? ????? ??????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getCourses]
  );

  const updateCourse = useCallback(
    async (token: string, courseId: string, courseData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateCourse(courseId, courseData); // Refresh courses list
        await getCourses(token);
        return data;
      } catch (error) {
        setError("??? ?? ????? ??????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getCourses]
  );

  const deleteCourse = useCallback(
    async (token: string, courseId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await adminSvc.deleteCourse(courseId); // Refresh courses list
        await getCourses(token);
        return result;
      } catch (error) {
        setError("??? ?? ??? ??????");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getCourses]
  );

  const refreshCourses = useCallback(
    async (token: string) => {
      await getCourses(token);
    },
    [getCourses]
  );

  const contextValue: CoursesContextType = {
    courses,
    isLoading,
    error,
    getCourses,
    getCourseByIdAPI,
    createCourse,
    updateCourse,
    deleteCourse,
    refreshCourses,
  };

  return (
    <CoursesContext.Provider value={contextValue}>
      {children}
    </CoursesContext.Provider>
  );
};
