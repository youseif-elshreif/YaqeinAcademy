import React from "react";
import {
  FaUserShield,
  FaChalkboardTeacher,
  FaGraduationCap,
} from "react-icons/fa";
import { UserTypeSelectorProps, UserTypeOption } from "@/src/types";
import baseStyles from "../../../styles/BaseModal.module.css";
import { ActionButton } from ".";

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  onSelect,
  disabled = false,
  title = "اختر نوع المستخدم",
}) => {
  const userTypes: UserTypeOption[] = [
    {
      type: "admin",
      icon: <FaUserShield className={baseStyles.btnIcon} />,
      label: "إدارة",
    },
    {
      type: "teacher",
      icon: <FaChalkboardTeacher className={baseStyles.btnIcon} />,
      label: "مدرس",
    },
    {
      type: "student",
      icon: <FaGraduationCap className={baseStyles.btnIcon} />,
      label: "طالب",
    },
  ];

  return (
    <div className={baseStyles.userTypeSelection}>
      <h3 className={baseStyles.selectionTitle}>{title}</h3>
      <div className={baseStyles.actionsContainer}>
        {userTypes.map((userType) => (
          <ActionButton
            key={userType.type}
            label={userType.label}
            icon={userType.icon}
            onClick={() => onSelect(userType.type)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default UserTypeSelector;
