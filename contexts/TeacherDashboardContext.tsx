"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import api, { API_BASE_URL } from "@/utils/api";
import { TeacherDashboardContextType } from "@/utils/types";

const TeacherDashboardContext = createContext<
  TeacherDashboardContextType | undefined
>(undefined);

export const TeacherDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [teacherLessons, setTeacherLessons] = useState<any[]>([]);

  const getMyLessons = useCallback(async (token: string) => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }

      const response = await api.get(`${API_BASE_URL}/api/teacher/my-lessons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // API is expected to return { data: [...] }
      const data = Array.isArray((response as any).data?.data)
        ? (response as any).data.data
        : Array.isArray(response.data)
        ? (response as any).data
        : [];
      setTeacherLessons(data);
      return data;
    } catch (error) {
      console.error("Error fetching teacher lessons:", error);
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({ teacherLessons, getMyLessons }),
    [teacherLessons, getMyLessons]
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
