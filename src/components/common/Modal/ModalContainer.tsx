import React from "react";
import ReactDOM from "react-dom";
import baseStyles from "../../../styles/BaseModal.module.css";
import { ModalContainerProps } from "@/src/types";

const ModalContainer: React.FC<ModalContainerProps> = ({
  isOpen,
  isClosing = false,
  children,
  variant = "default",
  size = "medium",
  onClose,
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

  const overlay = (
    <div
      className={`${baseStyles.modalOverlay} ${
        isClosing ? baseStyles.fadeOut : ""
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${
          baseStyles.modal
        } ${getVariantClass()} ${getSizeClass()} ${
          isClosing ? baseStyles.modalSlideOut : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return ReactDOM.createPortal(overlay, document.body);
  }
  return overlay;
};

export default ModalContainer;
