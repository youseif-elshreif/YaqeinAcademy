import { useState } from "react";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import styles from "./DeleteCourseModal.module.css";
import { FaTimes, FaTrash, FaExclamationTriangle } from "react-icons/fa";

interface DeleteCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number | null;
  courseName?: string;
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({
  isOpen,
  onClose,
  courseId,
  courseName = "هذه الدورة",
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setConfirmText("");
    }, 300);
  };

  const handleDelete = async () => {
    if (confirmText.trim().toLowerCase() !== "حذف") {
      return;
    }

    setIsDeleting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("=== DELETE COURSE API CALL ===");
      console.log("Course ID:", courseId);
      console.log("Course Name:", courseName);
      console.log("✅ Course deletion request logged to console");

      handleClose();
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  const isDeleteEnabled =
    confirmText.trim().toLowerCase() === "حذف" && !isDeleting;

  return (
    <div
      className={`${baseStyles.modalOverlay} ${
        isClosing ? baseStyles.fadeOut : ""
      }`}
    >
      <div
        className={`${baseStyles.modal} ${
          isClosing ? baseStyles.modalSlideOut : ""
        }`}
      >
        <div className={`${baseStyles.modalHeader} ${baseStyles.delete}`}>
          <h2 className={baseStyles.modalTitle}>
            <FaExclamationTriangle className={baseStyles.titleIcon} />
            تأكيد حذف الدورة
          </h2>
          <button
            onClick={handleClose}
            className={baseStyles.closeBtn}
            disabled={isDeleting}
          >
            <FaTimes />
          </button>
        </div>

        <div className={baseStyles.modalBody}>
          <div className={baseStyles.warningContainer}>
            <FaExclamationTriangle className={baseStyles.warningIcon} />
            <div className={baseStyles.warningContent}>
              <h3 className={baseStyles.warningTitle}>
                هل أنت متأكد من حذف &quot;{courseName}&quot;؟
              </h3>
              <p className={baseStyles.warningText}>
                سيتم حذف الدورة نهائياً ولن يمكن استرجاعها. سيتم أيضاً حذف جميع
                البيانات المرتبطة بها.
              </p>
            </div>
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
              disabled={isDeleting}
            />
          </div>
        </div>

        <div className={baseStyles.modalActions}>
          <button
            type="button"
            onClick={handleClose}
            className={baseStyles.cancelButton}
            disabled={isDeleting}
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={`${baseStyles.deleteButton} ${
              !isDeleteEnabled ? baseStyles.disabled : ""
            }`}
            disabled={!isDeleteEnabled}
          >
            {isDeleting ? (
              <div className={baseStyles.spinner}></div>
            ) : (
              <>
                <FaTrash className={baseStyles.buttonIcon} />
                حذف الدورة
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourseModal;
