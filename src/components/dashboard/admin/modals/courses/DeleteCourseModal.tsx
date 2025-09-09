import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  WarningPanel,
  ConfirmTextInput,
} from "@/src/components/common/Modal";
import { useCoursesContext } from "@/src/contexts/CoursesContext";
import { useAuth } from "@/src/contexts/AuthContext";
import { DeleteCourseModalProps } from "@/src/types";

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({
  isOpen,
  onClose,
  courseId,
  courseName = "??? ??????",
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
    if (confirmText.trim().toLowerCase() !== "???") {
      return;
    }

    if (!courseId || !token) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteCourse(token, courseId);
      handleClose();
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;
  const isDeleteEnabled =
    confirmText.trim().toLowerCase() === "???" && !isDeleting;

  return (
    <ModalContainer
      isOpen={isOpen}
      isClosing={isClosing}
      variant="delete"
      size="medium"
      onClose={handleClose}
    >
      <ModalHeader
        title="????? ??? ??????"
        icon={<FaTrash />}
        onClose={handleClose}
        isOpen={isOpen}
        variant="delete"
      />

      <div className={baseStyles.modalBody}>
        <WarningPanel
          title={`?? ??? ????? ?? ??? "${courseName}"?`}
          text={
            <>
              ???? ??? ?????? ??????? ??? ???? ?????????. ???? ????? ??? ????
              ???????? ???????? ???.
            </>
          }
        />

        <ConfirmTextInput
          label={
            <>
              ?????? ???? �<strong>???</strong>� ?? ?????? ?????:
            </>
          }
          value={confirmText}
          onChange={setConfirmText}
          disabled={isDeleting}
          placeholder="???"
        />

        <ModalActions
          alignment="right"
          actions={[
            {
              label: "?????",
              onClick: handleClose,
              variant: "secondary",
              disabled: isDeleting,
            },
            {
              label: "??? ??????",
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

