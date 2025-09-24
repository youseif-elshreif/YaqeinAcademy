import { useContactContext } from "@/src/contexts/ContactContext";

export const useWhatsApp = () => {
  const { contactInfo } = useContactContext();

  const getWhatsAppUrl = (message?: string) => {
    const whatsappNumber = contactInfo?.whatsappNumber?.[0];

    if (!whatsappNumber) {
      return null;
    }

    const cleanNumber = whatsappNumber
      .replace(/[^\d+]/g, "")
      .replace(/^\+/, "");
    const encodedMessage = message ? encodeURIComponent(message) : "";

    return `https://wa.me/${cleanNumber}${
      encodedMessage ? `?text=${encodedMessage}` : ""
    }`;
  };

  const openWhatsApp = (message?: string) => {
    const url = getWhatsAppUrl(message);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const hasWhatsApp = Boolean(contactInfo?.whatsappNumber?.[0]);

  return {
    getWhatsAppUrl,
    openWhatsApp,
    hasWhatsApp,
    whatsappNumber: contactInfo?.whatsappNumber?.[0],
  };
};
