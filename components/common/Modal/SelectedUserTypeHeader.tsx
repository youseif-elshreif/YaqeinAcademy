import React from "react";
import {
  FaUserShield,
  FaChalkboardTeacher,
  FaGraduationCap,
} from "react-icons/fa";
import { UserType, SelectedUserTypeHeaderProps } from "@/types";
import Button from "../Button";
import baseStyles from "../../../styles/BaseModal.module.css";

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
      <div className={baseStyles.selectedUserType} style={{ padding: "0px" }}>
        {getUserTypeIcon(userType)}
        <span>{getActionText()}</span>
      </div>
      {onChangeType && (
        <Button
          onClick={onChangeType}
          variant="outline-secondary"
          size="small"
          disabled={disabled}
        >
          تغيير النوع
        </Button>
      )}
    </div>
  );
};

export default SelectedUserTypeHeader;
