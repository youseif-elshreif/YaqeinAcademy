"use client";
import React, { useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import styles from "./ConfirmDeleteGroupModal.module.css";

interface ConfirmDeleteGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  groupName: string;
  onConfirmDelete: (groupId: string) => void;
}

const ConfirmDeleteGroupModal: React.FC<ConfirmDeleteGroupModalProps> = ({
  isOpen,
  onClose,
  groupId,
  groupName,
  onConfirmDelete,
}) => {
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirmDelete = async () => {
    if (confirmText.trim().toLowerCase() !== "حذف") {
      return;
    }

    setIsLoading(true);
    try {
      await onConfirmDelete(groupId);
      setConfirmText("");
      onClose();
    } catch (error) {
      console.error("Error deleting group:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmText("");
    onClose();
  };

  const isDeleteEnabled =
    confirmText.trim().toLowerCase() === "حذف" && !isLoading;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>تأكيد حذف المجموعة</h3>
          <button className={styles.closeButton} onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.warningIcon}>
            <FaTrash />
          </div>

          <div className={styles.confirmationText}>
            <h4>هل أنت متأكد أنك تريد حذف المجموعة؟</h4>
            <p className={styles.groupName}>&ldquo;{groupName}&rdquo;</p>
            <p className={styles.warningText}>
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع البيانات المرتبطة
              بهذه المجموعة.
            </p>
          </div>

          <div className={styles.confirmationInput}>
            <label htmlFor="confirmText">
              للحذف، اكتب &ldquo;حذف&rdquo; في المربع أدناه:
            </label>
            <input
              id="confirmText"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="حذف"
              className={styles.textInput}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            className={styles.cancelButton}
            onClick={handleClose}
            disabled={isLoading}
          >
            إلغاء
          </button>
          <button
            className={`${styles.deleteButton} ${
              !isDeleteEnabled ? styles.disabled : ""
            }`}
            onClick={handleConfirmDelete}
            disabled={!isDeleteEnabled}
          >
            <FaTrash />
            {isLoading ? "جاري الحذف..." : "حذف المجموعة"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteGroupModal;
