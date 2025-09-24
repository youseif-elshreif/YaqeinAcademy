import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useWhatsApp } from "@/src/hooks/useWhatsApp";
import styles from "./FloatingWhatsAppButton.module.css";

interface FloatingWhatsAppButtonProps {
  message?: string;
}

const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  message = "مرحبا، أريد الاستفسار حول خدماتكم",
}) => {
  const { openWhatsApp, hasWhatsApp } = useWhatsApp();

  if (!hasWhatsApp) {
    return null; // لا تظهر الزرار إذا لم يكن هناك رقم واتساب
  }

  const handleClick = () => {
    openWhatsApp(message);
  };

  return (
    <button
      onClick={handleClick}
      className={styles.floatingButton}
      aria-label="تواصل معنا عبر الواتساب"
      title="تواصل معنا عبر الواتساب"
      style={{ zIndex: 5 }}
    >
      <FaWhatsapp className={styles.icon} size={35} />
    </button>
  );
};

export default FloatingWhatsAppButton;
