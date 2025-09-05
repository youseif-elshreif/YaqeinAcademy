import React from "react";
import styles from "./Button.module.css";

export type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "success" 
  | "warning" 
  | "danger" 
  | "info" 
  | "link"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-warning"
  | "outline-danger";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  as?: "button" | "a";
  href?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
  title?: string;
  id?: string;
  'data-testid'?: string;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({
    variant = "primary",
    size = "medium",
    fullWidth = false,
    loading = false,
    icon,
    iconPosition = "left",
    className = "",
    disabled = false,
    as = "button",
    href,
    onClick,
    type = "button",
    title,
    id,
    children,
    ...props
  }, ref) => {
    const baseClasses = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      disabled && styles.disabled,
      className
    ].filter(Boolean).join(" ");

    const content = (
      <>
        {loading && <span className={styles.spinner}></span>}
        {!loading && icon && iconPosition === "left" && (
          <span className={styles.iconLeft}>{icon}</span>
        )}
        <span className={styles.content}>{children}</span>
        {!loading && icon && iconPosition === "right" && (
          <span className={styles.iconRight}>{icon}</span>
        )}
      </>
    );

    if (as === "a" && href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          title={title}
          id={id}
          data-testid={props['data-testid']}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseClasses}
        disabled={disabled || loading}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        type={type}
        title={title}
        id={id}
        data-testid={props['data-testid']}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
