import styles from "./InputField.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  required = false,
  error,
  disabled = false,
  autoComplete,
  min,
  max,
  helpText,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  className = "",
}) => {
  const inputProps = {
    id,
    name,
    type: showPasswordToggle ? (showPassword ? "text" : "password") : type,
    value,
    onChange,
    placeholder,
    disabled,
    autoComplete,
    min,
    max,
    className: `${styles.input} ${error ? styles.inputError : ""} ${
      showPasswordToggle ? styles.passwordInput : ""
    } ${className}`,
  };

  const isTextarea = type === "textarea";

  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={showPasswordToggle ? styles.passwordWrapper : undefined}>
        <input {...inputProps} />

        {showPasswordToggle && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={onTogglePassword}
            aria-label={
              showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
            }
            disabled={disabled}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      {helpText && <p className={styles.helpText}>{helpText}</p>}

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default InputField;
