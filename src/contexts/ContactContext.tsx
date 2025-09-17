"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import * as adminSvc from "@/src/utils/services/admin.service";
import * as contactSvc from "@/src/utils/services/contact.service";

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
  getPublicContactInfo: () => Promise<ContactInfo | null>;
  updateContactInfo: (data: {
    email: string;
    phone: string[];
    address: string;
    whatsappNumber: string[];
    telegramLink: string;
    facebook: string;
    linkedin: string;
  }) => Promise<ContactInfo>;
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
      const data = await adminSvc.getContactInfo();
      setContactInfo(data);
      return data;
    } catch (error) {
      setError("خطأ في جلب معلومات التواصل");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPublicContactInfo =
    useCallback(async (): Promise<ContactInfo | null> => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await contactSvc.getPublicContactInfo();
        setContactInfo(data);
        return data;
      } catch (error) {
        setError("خطأ في جلب معلومات التواصل");
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
      whatsappNumber: string[];
      telegramLink: string;
      facebook: string;
      linkedin: string;
    }) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await adminSvc.updateContactInfo(data);
        setContactInfo(result);

        return result;
      } catch (error) {
        setError("خطأ في تحديث معلومات التواصل");
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

  useEffect(() => {
    // Load contact info only once on mount
    const loadInitialContactInfo = async () => {
      try {
        // Try public API first (no auth required)
        await getPublicContactInfo();
      } catch {
        try {
          // Fallback to admin API if public fails
          await getContactInfo();
        } catch (error) {
          throw error;
        }
      }
    };

    loadInitialContactInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - run only once on mount

  const contextValue: ContactContextType = {
    contactInfo,
    isLoading,
    error,
    getContactInfo,
    getPublicContactInfo,
    updateContactInfo,
    refreshContactInfo,
  };

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};
