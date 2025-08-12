"use client";
import React from "react";
import { FaEdit, FaTrash, FaUsers, FaUserMinus } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import styles from "./GroupActionsModal.module.css";

interface GroupActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  groupName: string;
  onEdit: (groupId: string, groupName: string) => void;
  onDelete: (groupId: string, groupName: string) => void;
  onAddMember: (
    groupId: string,
    groupName: string,
    groupType: "private" | "public"
  ) => void;
  onRemoveMember: (groupId: string, groupName: string) => void;
}

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
    // سنحتاج إلى الحصول على نوع المجموعة، لكن للآن سنستخدم "private" كافتراضي
    onAddMember(groupId, groupName, "private");
    onClose();
  };

  const handleRemoveMember = () => {
    onRemoveMember(groupId, groupName);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>إجراءات المجموعة</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.groupInfo}>
            المجموعة: <span>{groupName}</span>
          </div>

          <div className={styles.formActions}>
            <button className={styles.editButton} onClick={handleEdit}>
              <FaEdit className={styles.userTypeIcon} />
              تعديل المجموعة
            </button>

            <button
              className={styles.addMemberButton}
              onClick={handleAddMember}
            >
              <FaUsers className={styles.userTypeIcon} />
              إضافة عضو
            </button>

            <button
              className={styles.addMemberButton}
              onClick={handleRemoveMember}
            >
              <FaUserMinus className={styles.userTypeIcon} />
              حذف عضو
            </button>

            <button className={styles.deleteButton} onClick={handleDelete}>
              <FaTrash className={styles.userTypeIcon} />
              حذف المجموعة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupActionsModal;
