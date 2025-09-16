"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import * as adminSvc from "@/src/utils/services/admin.service";

type AdminStatsContextType = {
  admins: any[];
  isLoading: boolean;
  error: string | null;
  getAdmins: () => Promise<any[]>;
  createAdmin: (adminData: any) => Promise<any>;
  updateMember: (memberId: string, memberData: any) => Promise<any>;
  deleteMember: (memberId: string) => Promise<any>;
  refreshAdmins: () => Promise<void>;
};

const AdminStatsContext = createContext<AdminStatsContextType | undefined>(
  undefined
);

export const useAdminStatsContext = () => {
  const context = useContext(AdminStatsContext);
  if (!context) {
    throw new Error(
      "useAdminStatsContext must be used within AdminStatsProvider"
    );
  }
  return context;
};

type AdminStatsProviderProps = {
  children: ReactNode;
};

export const AdminStatsProvider = ({ children }: AdminStatsProviderProps) => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAdmins = useCallback(async (): Promise<any[]> => {
    try {
      setIsLoading(true);
      setError(null);
      const list: any[] = await adminSvc.getAdmins();
      setAdmins(list);
      return list;
    } catch (error) {
      setError("خطأ في جلب قائمة المسؤولين");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createAdmin = useCallback(async (adminData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminSvc.createAdmin(adminData); 
      return data;
    } catch (error) {
      setError("خطأ في إنشاء المسؤول");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateMember = useCallback(
    async (memberId: string, memberData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateMember(memberId, memberData); // Refresh admins after update
        await getAdmins("");
        return data;
      } catch (error) {
        setError("خطأ في تحديث بيانات العضو");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getAdmins]
  );

  const deleteMember = useCallback(
    async (memberId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.deleteMember(memberId); // Refresh admins after deletion
        await getAdmins();
        return data;
      } catch (error) {
        setError("خطأ في حذف العضو");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getAdmins]
  );

  const refreshAdmins = useCallback(
    async () => {
      await getAdmins();
    },
    [getAdmins]
  );

  const contextValue: AdminStatsContextType = {
    admins,
    isLoading,
    error,
    getAdmins,
    createAdmin,
    updateMember,
    deleteMember,
    refreshAdmins,
  };

  return (
    <AdminStatsContext.Provider value={contextValue}>
      {children}
    </AdminStatsContext.Provider>
  );
};
