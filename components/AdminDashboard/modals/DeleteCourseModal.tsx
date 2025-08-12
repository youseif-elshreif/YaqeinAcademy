import { useState } from "react";
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

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleDelete = async () => {
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

  return (
    <div
      className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ""}`}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modalSlideOut : ""}`}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <FaExclamationTriangle className={styles.titleIcon} />
            تأكيد حذف الدورة
          </h2>
          <button
            onClick={handleClose}
            className={styles.closeBtn}
            disabled={isDeleting}
          >
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.warningIcon}>
            <FaExclamationTriangle />
          </div>

          <div className={styles.warningText}>
            <h3>هل أنت متأكد من حذف &quot;{courseName}&quot;؟</h3>
            <p>
              سيتم حذف الدورة نهائياً ولن يمكن استرجاعها. سيتم أيضاً حذف جميع
              البيانات المرتبطة بها.
            </p>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button
            type="button"
            onClick={handleClose}
            className={styles.cancelButton}
            disabled={isDeleting}
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={styles.deleteButton}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className={styles.spinner}></div>
            ) : (
              <>
                <FaTrash className={styles.buttonIcon} />
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
