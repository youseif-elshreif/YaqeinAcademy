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
  getCourses: () => Promise<any[]>;
  getCourseByIdAPI: (courseId: string) => Promise<any>;
  createCourse: (courseData: any) => Promise<any>;
  updateCourse: (courseId: string, courseData: any) => Promise<any>;
  deleteCourse: (courseId: string) => Promise<any>;
  refreshCourses: () => Promise<void>;
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

  const getCourses = useCallback(async (): Promise<any[]> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminSvc.getCourses();
      setCourses(data);
      return data;
    } catch (error) {
      setError("خطأ في جلب قائمة الدورات");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCourseByIdAPI = useCallback(async (courseId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminSvc.getCourseById(courseId);
      return data;
    } catch (error) {
      setError("خطأ في جلب قائمة الدورات");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCourse = useCallback(
    async (courseData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.createCourse(courseData); // Refresh courses list
        await getCourses();
        return data;
      } catch (error) {
        setError("خطأ في إنشاء الدورة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getCourses]
  );

  const updateCourse = useCallback(
    async (courseId: string, courseData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateCourse(courseId, courseData); // Refresh courses list
        await getCourses();
        return data;
      } catch (error) {
        setError("خطأ في تحديث الدورة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getCourses]
  );

  const deleteCourse = useCallback(
    async (courseId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await adminSvc.deleteCourse(courseId); // Refresh courses list
        await getCourses();
        return result;
      } catch (error) {
        setError("خطأ في جلب التقارير");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getCourses]
  );

  const refreshCourses = useCallback(async () => {
    await getCourses();
  }, [getCourses]);

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
