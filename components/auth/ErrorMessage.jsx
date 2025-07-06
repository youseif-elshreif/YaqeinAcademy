import styles from "./ErrorMessage.module.css";
import { FaExclamationTriangle, FaCheck, FaInfoCircle } from "react-icons/fa";

const ErrorMessage = ({ message, type = "error", className = "" }) => {
  if (!message) return null;

  return (
    <div className={`${styles.errorMessage} ${styles[type]} ${className}`}>
      <span className={styles.icon}>
        {type === "error" && <FaExclamationTriangle />}
        {type === "success" && <FaCheck />}
        {type === "info" && <FaInfoCircle />}
      </span>
      <span className={styles.text}>{message}</span>
    </div>
  );
};

export default ErrorMessage;
