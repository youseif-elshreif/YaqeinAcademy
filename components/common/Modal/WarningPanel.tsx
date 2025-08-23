import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import baseStyles from "../../../styles/BaseModal.module.css";

interface WarningPanelProps {
  title: string;
  text?: string | React.ReactNode;
}

const WarningPanel: React.FC<WarningPanelProps> = ({ title, text }) => {
  return (
    <div className={baseStyles.warningContainer}>
      <FaExclamationTriangle className={baseStyles.warningIcon} />
      <div className={baseStyles.warningContent}>
        <h3 className={baseStyles.warningTitle}>{title}</h3>
        {text && <p className={baseStyles.warningText}>{text}</p>}
      </div>
    </div>
  );
};

export default WarningPanel;
