"use client";
import React, { useState } from "react";
import { FaTrash, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import baseStyles from "../../../../../styles/BaseModal.module.css";

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
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setConfirmText("");
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleConfirmDelete = async () => {
    if (confirmText.trim().toLowerCase() !== "حذف") {
      return;
    }

    setIsLoading(true);
    try {
      await onConfirmDelete(groupId);
      setConfirmText("");
      handleClose();
    } catch (error) {
      console.error("Error deleting group:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDeleteEnabled =
    confirmText.trim().toLowerCase() === "حذف" && !isLoading;

  return (
    <div
      className={`${baseStyles.modalOverlay} ${
        isClosing ? baseStyles.fadeOut : ""
      }`}
      onClick={handleClose}
    >
      <div
        className={`${baseStyles.modal} ${
          isClosing ? baseStyles.modalSlideOut : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${baseStyles.modalHeader} ${baseStyles.delete}`}>
          <h2 className={baseStyles.modalTitle}>
            <FaTrash className={baseStyles.titleIcon} />
            تأكيد حذف المجموعة
          </h2>
          <button
            className={baseStyles.closeButton}
            onClick={handleClose}
            disabled={isLoading}
          >
            <FaTimes />
          </button>
        </div>

        <div className={baseStyles.modalBody}>
          <div className={baseStyles.warningContainer}>
            <FaExclamationTriangle className={baseStyles.warningIcon} />
            <div className={baseStyles.warningContent}>
              <h3 className={baseStyles.warningTitle}>
                هل أنت متأكد من حذف هذه المجموعة؟
              </h3>
              <p className={baseStyles.warningText}>
                لا يمكن التراجع عن هذا الإجراء
              </p>
            </div>
          </div>

          <div className={baseStyles.groupInfo}>
            <h4 className={baseStyles.groupName}>&ldquo;{groupName}&rdquo;</h4>
            <p className={baseStyles.groupId}>المعرف: {groupId}</p>
            <p className={baseStyles.warningText}>
              سيتم حذف جميع البيانات والأعضاء المرتبطة بهذه المجموعة
            </p>
          </div>

          <div className={baseStyles.confirmationInput}>
            <label htmlFor="confirmText" className={baseStyles.confirmLabel}>
              للحذف، اكتب &ldquo;<strong>حذف</strong>&rdquo; في المربع أدناه:
            </label>
            <input
              id="confirmText"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="حذف"
              className={baseStyles.textInput}
              disabled={isLoading}
            />
          </div>

          <div className={baseStyles.formActions}>
            <button
              onClick={handleClose}
              className={baseStyles.cancelButton}
              disabled={isLoading}
            >
              إلغاء
            </button>
            <button
              onClick={handleConfirmDelete}
              className={`${baseStyles.deleteButton} ${
                !isDeleteEnabled ? baseStyles.disabled : ""
              }`}
              disabled={!isDeleteEnabled}
            >
              <FaTrash className={baseStyles.buttonIcon} />
              {isLoading ? "جاري الحذف..." : "حذف المجموعة"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteGroupModal;
