import React from "react";
import styles from "./Button.module.css";

export interface IconButtonProps {
  children?: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "warning" | "info";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
  title?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  icon,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
  title,
}) => {
  const buttonClasses = [
    styles.baseButton,
    styles.iconButton,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {icon}
      {children && <span className={styles.iconButtonText}>{children}</span>}
    </button>
  );
};

export default IconButton;
