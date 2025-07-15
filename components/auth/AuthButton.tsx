import styles from "./AuthButton.module.css";

interface AuthButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string;
}

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
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.button} ${styles[variant]} ${
        fullWidth ? styles.fullWidth : ""
      } ${loading ? styles.loading : ""} ${className}`}
    >
      {loading ? (
        <>
          <span className={styles.spinner}></span>
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;
