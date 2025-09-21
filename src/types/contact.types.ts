export interface ContactInfo {
  email?: string;
  phone?: string[];
  address?: string;
  whatsappNumber?: string[];
  telegramLink?: string;
  facebook?: string;
  linkedin?: string;
}

export interface ContactContextType {
  contactInfo: ContactInfo | null;
  isLoading: boolean;
  error: string | null;
  getContactInfo: () => Promise<ContactInfo>;
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
}

export interface ContactProviderProps {
  children: React.ReactNode;
}
