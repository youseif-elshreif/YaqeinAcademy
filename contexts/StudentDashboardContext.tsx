"use Client";
import api, { API_BASE_URL } from "@/utils/api";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { StudentDashboardContextType, StudentGroupData } from "@/utils/types";

const StudentDashboardContext = createContext<
  StudentDashboardContextType | undefined
>(undefined);

export const StudentDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [studentGroupData, setStudentGroupData] =
    useState<StudentGroupData | null>(null);

  const getStudentGroup = useCallback(async () => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await api.get(`${API_BASE_URL}/api/user/my-group`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched student group:", response.data.data.usualDate);
      console.log("Fetched student group:", response.data.data.meetingLink);
      setStudentGroupData({
        usualDate: response.data.data.usualDate,
        meetingLink: response.data.data.meetingLink,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching student group:", error);
      throw error;
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      getStudentGroup,
      studentGroupData,
    }),
    [getStudentGroup, studentGroupData]
  );

  return (
    <StudentDashboardContext.Provider value={contextValue}>
      {children}
    </StudentDashboardContext.Provider>
  );
};

export const useStudentDashboard = () => {
  const context = useContext(StudentDashboardContext);
  if (!context) {
    throw new Error(
      "useStudentDashboard must be used within a StudentDashboardProvider"
    );
  }
  return context;
};
