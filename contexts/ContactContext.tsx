"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import * as adminSvc from "@/utils/services/admin.service";

export type ContactInfo = {
  email?: string;
  phone?: string[];
  address?: string;
  whatsappNumber?: string[];
  telegramLink?: string;
  facebook?: string;
  linkedin?: string;
};

type ContactContextType = {
  contactInfo: ContactInfo | null;
  isLoading: boolean;
  error: string | null;
  getContactInfo: () => Promise<ContactInfo | null>;
  updateContactInfo: (data: ContactInfo) => Promise<ContactInfo>;
  refreshContactInfo: () => Promise<void>;
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContactContext must be used within ContactProvider");
  }
  return context;
};

type ContactProviderProps = {
  children: ReactNode;
};

export const ContactProvider = ({ children }: ContactProviderProps) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getContactInfo = useCallback(async (): Promise<ContactInfo | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminSvc.getContactInfo();setContactInfo(data);
      return data;
    } catch (error) {setError("فشل في جلب بيانات الاتصال");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateContactInfo = useCallback(
    async (data: {
      email: string;
      phone: string[];
      address: string;
      whatsapp: string[];
      telegramLink: string;
      facebook: string;
      linkedin: string;
    }) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await adminSvc.updateContactInfo(data);setContactInfo(result);
        return result;
      } catch (error) {setError("فشل في تحديث بيانات الاتصال");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const refreshContactInfo = useCallback(async () => {
    await getContactInfo();
  }, [getContactInfo]);

  // جلب البيانات عند التحميل الأول
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    if (token) {
      getContactInfo().catch(() => {
        // Silent fail on initial load
      });
    }
  }, [getContactInfo]);

  const contextValue: ContactContextType = {
    contactInfo,
    isLoading,
    error,
    getContactInfo,
    updateContactInfo,
    refreshContactInfo,
  };

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};
