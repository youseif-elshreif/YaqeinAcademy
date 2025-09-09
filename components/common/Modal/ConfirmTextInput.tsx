import React from "react";
import baseStyles from "../../../styles/BaseModal.module.css";
import { ConfirmTextInputProps } from "@/types";

const ConfirmTextInput: React.FC<ConfirmTextInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "حذف",
  disabled = false,
}) => {
  return (
    <div className={baseStyles.confirmationInput}>
      <label className={baseStyles.confirmLabel}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={baseStyles.textInput}
        disabled={disabled}
      />
    </div>
  );
};

export default ConfirmTextInput;
