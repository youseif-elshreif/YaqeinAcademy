import { useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import styles from "./DeleteLessonModal.module.css";
import { FaTrash } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  WarningPanel,
  ConfirmTextInput,
} from "@/components/common/Modal";

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
      // TODO: إضافة منطق حذف الحلقة
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

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isDeleting,
    },
    {
      label: "حذف الحلقة",
      onClick: handleDelete,
      variant: "danger" as const,
      disabled: !isDeleteEnabled,
      icon: <FaTrash />,
    },
  ];

  return (
    <ModalContainer isOpen={true} isClosing={isClosing} variant="delete">
      <ModalHeader
        title="حذف الحلقة"
        icon={<FaTrash />}
        onClose={handleClose}
        disabled={isDeleting}
        variant="delete"
      />
      <div className={baseStyles.modalBody}>
        <WarningPanel
          title="هل أنت متأكد من حذف هذه الحلقة؟"
          text="لا يمكن التراجع عن هذا الإجراء"
        />

        <div className={styles.lessonDetails}>
          <h4 className={styles.detailsTitle}>تفاصيل الحلقة:</h4>
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

        <ConfirmTextInput
          label={
            <>
              للحذف، اكتب &quot;<strong>حذف</strong>&quot; في المربع أدناه:
            </>
          }
          value={confirmText}
          onChange={setConfirmText}
          disabled={isDeleting}
        />

        <ModalActions actions={actions} alignment="right" />
      </div>
    </ModalContainer>
  );
};

export default DeleteLessonModal;
