import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import baseStyles from "../../../styles/BaseModal.module.css";

import { FormFieldProps } from "@/src/types";

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
  placeholder,
  required = false,
  min,
  max,
  rows,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  fullWidth = false,
}) => {
  const inputProps = {
    name,
    value,
    onChange,
    disabled,
    placeholder,
    min,
    max,
    className: `${baseStyles.textInput} ${error ? baseStyles.inputError : ""}`,
  };

  const renderInput = () => {
    if (type === "textarea") {
      return <textarea {...inputProps} rows={rows || 3} />;
    }

    if (type === "password" && showPasswordToggle) {
      return (
        <div className={baseStyles.passwordInputWrapper}>
          <input {...inputProps} type={showPassword ? "text" : "password"} />
          <button
            type="button"
            onClick={onTogglePassword}
            className={baseStyles.passwordToggleBtn}
            disabled={disabled}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      );
    }

    return <input {...inputProps} type={type} />;
  };

  return (
    <div
      className={`${baseStyles.inputGroup} ${
        fullWidth ? baseStyles.inputGroupFullWidth : ""
      }`}
      style={fullWidth ? { gridColumn: "1 / -1" } : {}}
    >
      <label className={baseStyles.label}>
        {label}
        {required && <span className={baseStyles.required}>*</span>}
      </label>
      {renderInput()}
      {error && <div className={baseStyles.fieldError}>{error}</div>}
    </div>
  );
};

export default FormField;
