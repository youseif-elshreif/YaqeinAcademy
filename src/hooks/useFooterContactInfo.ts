"use client";
import { useState, useEffect } from "react";
import { getPublicContactInfo } from "@/src/utils/services/contact.service";
import { ContactInfo } from "@/src/contexts/ContactContext";

export const useFooterContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getPublicContactInfo();
        setContactInfo(data);
      } catch (error) {
        console.error("Error loading footer contact info:", error);
        setError("خطأ في تحميل معلومات التواصل");
      } finally {
        setIsLoading(false);
      }
    };

    loadContactInfo();
  }, []);

  return {
    contactInfo,
    isLoading,
    error,
  };
};
