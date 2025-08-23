import React from "react";
import {
  FaUserShield,
  FaChalkboardTeacher,
  FaGraduationCap,
} from "react-icons/fa";
import { UserType } from "@/utils/types";
import baseStyles from "../../../styles/BaseModal.module.css";

interface SelectedUserTypeHeaderProps {
  userType: UserType;
  userName?: string;
  mode?: "add" | "edit";
  onChangeType?: () => void;
  disabled?: boolean;
}

const SelectedUserTypeHeader: React.FC<SelectedUserTypeHeaderProps> = ({
  userType,
  userName,
  mode = "add",
  onChangeType,
  disabled = false,
}) => {
  const getUserTypeIcon = (type: UserType) => {
    switch (type) {
      case "admin":
        return <FaUserShield />;
      case "teacher":
        return <FaChalkboardTeacher />;
      case "student":
        return <FaGraduationCap />;
    }
  };

  const getUserTypeLabel = (type: UserType) => {
    switch (type) {
      case "admin":
        return "إدارة";
      case "teacher":
        return "مدرس";
      case "student":
        return "طالب";
    }
  };

  const getActionText = () => {
    const label = getUserTypeLabel(userType);
    if (mode === "edit" && userName) {
      return `تعديل بيانات ${label}: ${userName}`;
    }
    return `${mode === "add" ? "إضافة" : "تعديل"} ${label} جديد`;
  };

  return (
    <div className={baseStyles.selectedUserType}>
      {getUserTypeIcon(userType)}
      <span>{getActionText()}</span>
      {onChangeType && (
        <button
          onClick={onChangeType}
          className={baseStyles.changeTypeButton}
          disabled={disabled}
          type="button"
        >
          تغيير النوع
        </button>
      )}
    </div>
  );
};

export default SelectedUserTypeHeader;
