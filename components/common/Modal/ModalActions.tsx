import React from "react";
import { FaSpinner } from "react-icons/fa";
import baseStyles from "../../../styles/BaseModal.module.css";

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  type?: "button" | "submit";
}

interface ModalActionsProps {
  actions: ActionButton[];
  alignment?: "left" | "right" | "center" | "space-between";
}

const ModalActions: React.FC<ModalActionsProps> = ({
  actions,
  alignment = "space-between",
}) => {
  const getButtonClass = (variant: string = "primary") => {
    switch (variant) {
      case "secondary":
        return baseStyles.cancelButton;
      case "danger":
        return baseStyles.dangerButton;
      default:
        return baseStyles.submitButton;
    }
  };

  const getAlignmentClass = () => {
    switch (alignment) {
      case "left":
        return baseStyles.actionsLeft;
      case "right":
        return baseStyles.actionsRight;
      case "center":
        return baseStyles.actionsCenter;
      default:
        return "";
    }
  };

  return (
    <div className={`${baseStyles.formActions} ${getAlignmentClass()}`}>
      {actions.map((action, index) => (
        <button
          key={index}
          type={action.type || "button"}
          onClick={action.onClick}
          className={getButtonClass(action.variant)}
          disabled={action.disabled || action.loading}
        >
          {action.loading ? (
            <>
              <FaSpinner className={baseStyles.spinner} />
              جاري التحميل...
            </>
          ) : (
            <>
              {action.icon && action.icon}
              {action.label}
            </>
          )}
        </button>
      ))}
    </div>
  );
};

export default ModalActions;
