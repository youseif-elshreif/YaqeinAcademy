import React from "react";
import baseStyles from "../../../styles/BaseModal.module.css";

interface ActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

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
