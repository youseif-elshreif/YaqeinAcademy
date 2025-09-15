import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  WarningPanel,
  ConfirmTextInput,
  ErrorDisplay,
} from "@/src/components/common/Modal";
import { useCoursesContext } from "@/src/contexts/CoursesContext";
import { useAuth } from "@/src/contexts/AuthContext";
import { DeleteCourseModalProps } from "@/src/types";

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({
  isOpen,
  onClose,
  courseId,
  courseName = "غير محدد",
}) => {
  const { deleteCourse } = useCoursesContext();
  const { token } = useAuth();

  const [isClosing, setIsClosing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleteError, setDeleteError] = useState<string>("");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setConfirmText("");
      setDeleteError(""); // Clear error when closing
    }, 300);
  };

  const handleDelete = async () => {
    if (confirmText.trim().toLowerCase() !== "حذف") {
      return;
    }

    if (!courseId || !token) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(""); // Clear previous errors
    try {
      await deleteCourse(token, courseId);
      handleClose();
    } catch {
      setDeleteError("حدث خطأ أثناء حذف الدورة. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;
  const isDeleteEnabled =
    confirmText.trim().toLowerCase() === "حذف" && !isDeleting;

  return (
    <ModalContainer
      isOpen={isOpen}
      isClosing={isClosing}
      variant="delete"
      size="medium"
      onClose={handleClose}
    >
      <ModalHeader
        title="حذف الدورة"
        icon={<FaTrash />}
        onClose={handleClose}
        isOpen={isOpen}
        variant="delete"
      />

      <div className={baseStyles.modalBody}>
        <WarningPanel
          title={`هل أنت متأكد من حذف "${courseName}"؟`}
          text={
            <>
              سيتم حذف الدورة وجميع البيانات المرتبطة بها نهائياً. هذا الإجراء
              لا يمكن التراجع عنه.
            </>
          }
        />

        <ConfirmTextInput
          label={
            <>
              اكتب كلمة <strong>حذف</strong> في الصندوق للتأكيد:
            </>
          }
          value={confirmText}
          onChange={setConfirmText}
          disabled={isDeleting}
          placeholder="حذف"
        />

        {/* Error Display */}
        {deleteError && (
          <div style={{ marginTop: "1rem" }}>
            <ErrorDisplay message={deleteError} />
          </div>
        )}

        <ModalActions
          alignment="right"
          actions={[
            {
              label: "إلغاء",
              onClick: handleClose,
              variant: "secondary",
              disabled: isDeleting,
            },
            {
              label: "حذف الدورة",
              onClick: handleDelete,
              variant: "danger",
              disabled: !isDeleteEnabled,
              icon: <FaTrash />,
            },
          ]}
        />
      </div>
    </ModalContainer>
  );
};

export default DeleteCourseModal;
