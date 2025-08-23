import React from "react";
import baseStyles from "../../../styles/BaseModal.module.css";

interface ModalContainerProps {
  isOpen: boolean;
  isClosing?: boolean;
  children: React.ReactNode;
  variant?: "add" | "edit" | "delete" | "default";
  size?: "small" | "medium" | "large";
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  isOpen,
  isClosing = false,
  children,
  variant = "default",
  size = "medium",
}) => {
  if (!isOpen) {
    return null;
  }

  const getVariantClass = () => {
    switch (variant) {
      case "add":
        return baseStyles.modalAdd;
      case "edit":
        return baseStyles.modalEdit;
      case "delete":
        return baseStyles.modalDelete;
      default:
        return "";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return baseStyles.modalSmall;
      case "large":
        return baseStyles.modalLarge;
      default:
        return "";
    }
  };

  return (
    <div
      className={`${baseStyles.modalOverlay} ${
        isClosing ? baseStyles.fadeOut : ""
      }`}
    >
      <div
        className={`${
          baseStyles.modal
        } ${getVariantClass()} ${getSizeClass()} ${
          isClosing ? baseStyles.modalSlideOut : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
