import React from "react";
import styles from "./CheckboxField.module.css";
import { CheckboxFieldProps } from "@/src/types";

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  name,
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`${styles.checkboxGroup} ${className}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
        disabled={disabled}
      />
      <label htmlFor={id} className={styles.checkboxLabel}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
