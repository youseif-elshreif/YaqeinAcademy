import React from "react";
import styles from "./TextareaField.module.css";
import { TextareaFieldProps } from "@/src/types";

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  required = false,
  error,
  disabled = false,
  rows = 4,
  helpText,
  className = "",
  ...props
}) => {
  return (
    <div className={`${styles.formGroup} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`${styles.textarea} ${error ? styles.textareaError : ""}`}
        disabled={disabled}
        {...props}
      />
      {helpText && <p className={styles.helpText}>{helpText}</p>}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default TextareaField;
