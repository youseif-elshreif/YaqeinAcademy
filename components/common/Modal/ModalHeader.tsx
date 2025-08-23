import React from "react";
import { FaTimes } from "react-icons/fa";
import baseStyles from "../../../styles/BaseModal.module.css";

interface ModalHeaderProps {
  title: string;
  icon?: React.ReactNode;
  onClose: () => void;
  disabled?: boolean;
  variant?: "add" | "edit" | "delete" | "default";
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  icon,
  onClose,
  disabled = false,
  variant = "default",
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "add":
        return baseStyles.modalHeaderAdd;
      case "edit":
        return baseStyles.modalHeaderEdit;
      case "delete":
        return baseStyles.modalHeaderDelete;
      default:
        return "";
    }
  };

  return (
    <div className={`${baseStyles.modalHeader} ${getVariantClass()}`}>
      <h2 className={baseStyles.modalTitle}>
        {icon && <span className="ml-2">{icon}</span>}
        {title}
      </h2>
      <button
        onClick={onClose}
        className={baseStyles.closeButton}
        disabled={disabled}
        type="button"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default ModalHeader;
