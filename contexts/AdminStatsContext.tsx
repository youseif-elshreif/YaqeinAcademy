"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import * as adminSvc from "@/utils/services/admin.service";

type AdminStatsContextType = {
  admins: any[];
  isLoading: boolean;
  error: string | null;
  getAdmins: (token: string) => Promise<any[]>;
  createAdmin: (adminData: any) => Promise<any>;
  updateMember: (
    token: string,
    memberId: string,
    memberData: any
  ) => Promise<any>;
  deleteMember: (token: string, memberId: string) => Promise<any>;
  refreshAdmins: (token: string) => Promise<void>;
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

  const getAdmins = useCallback(async (token: string): Promise<any[]> => {
    try {
      setIsLoading(true);
      setError(null);
      void token; // mark param as used to satisfy TS unused var check
      const list: any[] = await adminSvc.getAdmins();
      setAdmins(list);
      return list;
    } catch (error) {setError("فشل في جلب بيانات المديرين");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createAdmin = useCallback(async (adminData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminSvc.createAdmin(adminData);// Note: We don't refresh admins here as it needs a token, which should be handled by the calling component
      return data;
    } catch (error) {setError("فشل في إنشاء المدير");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateMember = useCallback(
    async (token: string, memberId: string, memberData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateMember(token, memberId, memberData);// Refresh admins after update
        await getAdmins(token);
        return data;
      } catch (error) {setError("فشل في تحديث بيانات العضو");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getAdmins]
  );

  const deleteMember = useCallback(
    async (token: string, memberId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.deleteMember(memberId);// Refresh admins after deletion
        await getAdmins(token);
        return data;
      } catch (error) {setError("فشل في حذف العضو");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getAdmins]
  );

  const refreshAdmins = useCallback(
    async (token: string) => {
      await getAdmins(token);
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
