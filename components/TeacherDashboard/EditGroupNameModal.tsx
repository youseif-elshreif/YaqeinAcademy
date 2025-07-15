import React, { useState } from "react";
import styles from "./EditGroupNameModal.module.css";

interface GroupData {
  classId: number;
  currentGroupName: string;
}

interface EditGroupNameModalProps {
  groupData: GroupData;
  onSave: (newGroupName: string) => void;
  onClose: () => void;
}

const EditGroupNameModal: React.FC<EditGroupNameModalProps> = ({
  groupData,
  onSave,
  onClose,
}) => {
  const [groupName, setGroupName] = useState(groupData.currentGroupName);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim()) {
      setIsSubmitting(true);

      try {
        // TODO: Replace with actual API call when backend is ready
        console.log("=== UPDATE GROUP NAME API CALL ===");
        console.log("Class ID:", groupData.classId);
        console.log("Old Group Name:", groupData.currentGroupName);
        console.log("New Group Name:", groupName.trim());
        console.log("API Endpoint: PUT /api/classes/group-name");
        console.log("Request Body:", {
          classId: groupData.classId,
          groupName: groupName.trim(),
        });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("✅ Group name updated successfully");
        onSave(groupName.trim());
      } catch (error) {
        console.error("❌ Error updating group name:", error);
        // TODO: Show error message to user
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`${styles.modalOverlay} ${isClosing ? styles.closing : ""}`}
      onClick={handleBackdropClick}
    >
      <div className={`${styles.modal} ${isClosing ? styles.closing : ""}`}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>تعديل اسم المجموعة</h3>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          <div className={styles.inputGroup}>
            <label htmlFor="groupName" className={styles.label}>
              اسم المجموعة:
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className={styles.input}
              placeholder="أدخل اسم المجموعة الجديد"
              autoFocus
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={!groupName.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  جاري الحفظ
                </>
              ) : (
                "حفظ"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGroupNameModal;
