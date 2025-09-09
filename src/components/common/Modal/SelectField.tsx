import React from "react";
import baseStyles from "../../../styles/BaseModal.module.css";
import { SelectFieldProps, Option } from "@/src/types";

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  error,
}) => {
  return (
    <div className={baseStyles.inputGroup}>
      <label className={baseStyles.label}>
        {label} {required && <span className={baseStyles.required}>*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`${baseStyles.select} ${error ? baseStyles.inputError : ""}`}
        disabled={disabled}
        required={required}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className={baseStyles.fieldError}>{error}</div>}
    </div>
  );
};

export default SelectField;
