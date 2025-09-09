import React from "react";
import Button from "../Button";
import baseStyles from "../../../styles/BaseModal.module.css";
import { ModalActionsProps, ActionButton } from "@/src/types";

const ModalActions: React.FC<ModalActionsProps> = ({
  actions,
  alignment = "space-between",
}) => {
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
        <Button
          key={index}
          type={action.type || "button"}
          onClick={action.onClick}
          variant={action.variant || "primary"}
          disabled={action.disabled}
          loading={action.loading}
          icon={action.icon}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default ModalActions;
