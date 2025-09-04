import React from "react";
import styles from "./Button.module.css";
import { ButtonVariant, ButtonSize } from "./Button";

export interface ActionButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  title?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  onClick,
  className = "",
  title,
}) => {
  const buttonClasses = [
    styles.baseButton,
    styles.actionBtn,
    styles[variant],
    styles[size],
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
    >
      {loading ? (
        <>
          <div className={styles.spinner} />
          {children}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
};

export default ActionButton;
