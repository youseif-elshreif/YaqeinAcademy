import React from "react";
import Button from "../common/Button/Button";
import { AuthButtonProps } from "@/src/types";

const AuthButton: React.FC<AuthButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  loadingText,
  children,
  variant = "primary",
  fullWidth = true,
  className = "",
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      variant={variant}
      fullWidth={fullWidth}
      className={className}
    >
      {loading && loadingText ? loadingText : children}
    </Button>
  );
};

export default AuthButton;
