import React from "react";
import { ErrorMessage } from "@/components/auth";
import baseStyles from "../../../styles/BaseModal.module.css";
import { ErrorDisplayProps } from "@/types";

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  variant = "error",
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "warning":
        return baseStyles.warningMessage;
      case "info":
        return baseStyles.infoMessage;
      default:
        return baseStyles.serverError;
    }
  };

  if (!message) return null;

  return (
    <div className={getVariantClass()} style={{ padding: "0 16px" }}>
      <ErrorMessage message={message} />
    </div>
  );
};

export default ErrorDisplay;
