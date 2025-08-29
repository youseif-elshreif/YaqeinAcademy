import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  WarningPanel,
  ConfirmTextInput,
} from "@/components/common/Modal";
import { useCoursesContext } from "@/contexts/CoursesContext";
import { useAuth } from "@/contexts/AuthContext";

interface DeleteCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string | null;
  courseName?: string;
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({
  isOpen,
  onClose,
  courseId,
  courseName = "هذه الدورة",
}) => {
  const { deleteCourse } = useCoursesContext();
  const { token } = useAuth();

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

    if (!courseId || !token) {
      console.error("Missing courseId or token");
      return;
    }

    setIsDeleting(true);
    try {
      await deleteCourse(token, courseId);
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
    <ModalContainer
      isOpen={isOpen}
      isClosing={isClosing}
      variant="delete"
      size="medium"
    >
      <ModalHeader
        title="تأكيد حذف الدورة"
        icon={<FaTrash />}
        onClose={handleClose}
        disabled={isDeleting}
        variant="delete"
      />

      <div className={baseStyles.modalBody}>
        <WarningPanel
          title={`هل أنت متأكد من حذف "${courseName}"؟`}
          text={
            <>
              سيتم حذف الدورة نهائياً ولن يمكن استرجاعها. سيتم أيضاً حذف جميع
              البيانات المرتبطة بها.
            </>
          }
        />

        <ConfirmTextInput
          label={
            <>
              للحذف، اكتب “<strong>حذف</strong>” في المربع أدناه:
            </>
          }
          value={confirmText}
          onChange={setConfirmText}
          disabled={isDeleting}
          placeholder="حذف"
        />

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
