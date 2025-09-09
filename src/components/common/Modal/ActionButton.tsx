import React from "react";
import baseStyles from "../../../styles/BaseModal.module.css";
import { ActionButtonProps } from "@/src/types";

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={baseStyles.actionBtn}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {icon}
      <span className={baseStyles.btnTitle}>{label}</span>
    </button>
  );
};

export default ActionButton;
