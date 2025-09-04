import React from "react";
import styles from "./Button.module.css";

export interface LinkButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "open" | "copy" | "default";
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  title?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  href,
  onClick,
  variant = "default",
  disabled = false,
  icon,
  className = "",
  title,
}) => {
  const buttonClasses = [
    styles.linkButton,
    variant === "open" && styles.openLinkBtn,
    variant === "copy" && styles.copyLinkBtn,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    if (href && !onClick) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      title={title}
    >
      {icon}
      <span className={styles.iconButtonText}>{children}</span>
    </button>
  );
};

export default LinkButton;
