import { useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import styles from "./DeleteLessonModal.module.css";
import { FaTimes, FaTrash, FaExclamationTriangle } from "react-icons/fa";

const DeleteLessonModal: React.FC = () => {
  const { closeDeleteLessonModal, selectedLessonData } = useAdminModal();

  const [isClosing, setIsClosing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeDeleteLessonModal();
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
      // TODO: إضافة منطق حذف الحصة
      console.log("Deleting lesson:", selectedLessonData?.id);

      // محاكاة API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      handleClose();
    } catch (error) {
      console.error("Error deleting lesson:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!selectedLessonData) return null;

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
          <div className={baseStyles.modalTitle}>
            <FaTrash className={baseStyles.titleIcon} />
            حذف الحصة
          </div>
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
                هل أنت متأكد من حذف هذه الحصة؟
              </h3>
              <p className={baseStyles.warningText}>
                لا يمكن التراجع عن هذا الإجراء
              </p>
            </div>
          </div>

          <div className={styles.lessonDetails}>
            <h4 className={styles.detailsTitle}>تفاصيل الحصة:</h4>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>اليوم:</span>
                <span className={styles.detailValue}>
                  {selectedLessonData.day}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>الوقت:</span>
                <span className={styles.detailValue}>
                  {selectedLessonData.time}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>التاريخ:</span>
                <span className={styles.detailValue}>
                  {formatDate(selectedLessonData.date)}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.confirmationInput}>
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

          <div className={baseStyles.modalFooter}>
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
                <span className={baseStyles.loading}>جارٍ الحذف...</span>
              ) : (
                <>
                  <FaTrash />
                  حذف الحصة
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteLessonModal;
