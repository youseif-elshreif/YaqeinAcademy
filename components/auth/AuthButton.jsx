import styles from "./AuthButton.module.css";

const AuthButton = ({
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
