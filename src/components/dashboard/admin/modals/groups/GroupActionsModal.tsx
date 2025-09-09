"use client";
import React from "react";
import { FaEdit, FaTrash, FaUsers, FaUserMinus } from "react-icons/fa";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import styles from "./GroupActionsModal.module.css";
import { ModalContainer, ModalHeader } from "@/src/components/common/Modal";
import { GroupActionsModalProps } from "@/src/types/admin.types";

const GroupActionsModal: React.FC<GroupActionsModalProps> = ({
  isOpen,
  onClose,
  groupId,
  groupName,
  onEdit,
  onDelete,
  onAddMember,
  onRemoveMember,
}) => {
  if (!isOpen) return null;

  const handleEdit = () => {
    onEdit(groupId, groupName);
    onClose();
  };

  const handleDelete = () => {
    onDelete(groupId, groupName);
    onClose();
  };

  const handleAddMember = () => {
    // سنحتاج إلى الحصول على نوع الحلقة، لكن للآن سنستخدم "private" كافتراضي
    onAddMember(groupId, groupName, "private");
    onClose();
  };

  const handleRemoveMember = () => {
    onRemoveMember(groupId, groupName);
    onClose();
  };

  return (
    <ModalContainer isOpen={true} onClose={onClose}>
      <ModalHeader title="إجراءات الحلقة" onClose={onClose} />
      <div className={styles.modalBody}>
        <div className={baseStyles.groupInfo}>
          الحلقة: <span>{groupName}</span>
        </div>

        <div className={baseStyles.actionsContainer}>
          <button className={baseStyles.actionBtn} onClick={handleEdit}>
            <FaEdit className={baseStyles.btnIcon} />
            <span className={baseStyles.btnTitle}>تعديل الحلقة</span>
          </button>

          <button className={baseStyles.actionBtn} onClick={handleAddMember}>
            <FaUsers className={baseStyles.btnIcon} />
            <span className={baseStyles.btnTitle}>إضافة عضو</span>
          </button>

          <button className={baseStyles.actionBtn} onClick={handleRemoveMember}>
            <FaUserMinus className={baseStyles.btnIcon} />
            <span className={baseStyles.btnTitle}>حذف عضو</span>
          </button>

          <button className={`${baseStyles.actionBtn}`} onClick={handleDelete}>
            <FaTrash className={baseStyles.btnIcon} />
            <span className={baseStyles.btnTitle}>حذف الحلقة</span>
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default GroupActionsModal;
