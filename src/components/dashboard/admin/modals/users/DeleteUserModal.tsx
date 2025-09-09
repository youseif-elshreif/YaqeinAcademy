import { useState } from "react";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import { useTeachersContext } from "@/src/contexts/TeachersContext";
import { useStudentsContext } from "@/src/contexts/StudentsContext";
import { useAdminStatsContext } from "@/src/contexts/AdminStatsContext";
import { useAuth } from "@/src/contexts/AuthContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import { FaTrash } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  WarningPanel,
  ConfirmTextInput,
} from "@/src/components/common/Modal";

const DeleteUserModal: React.FC = () => {
  const { deleteUserModalOpen, closeDeleteUserModal, selectedUserForActions } =
    useAdminModal();
  const { deleteTeacher } = useTeachersContext();
  const { deleteMember: deleteStudentMember } = useStudentsContext();
  const { deleteMember: deleteAdminMember } = useAdminStatsContext();
  const { token } = useAuth();

  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  if (!deleteUserModalOpen || !selectedUserForActions) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeDeleteUserModal();
      setIsClosing(false);
      setConfirmText("");
    }, 300);
  };

  const handleDelete = async () => {
    if (confirmText.trim().toLowerCase() !== "???") {
      return;
    }

    setIsDeleting(true);

    try {
      if (!token) {
        alert("?? ??? ?????? ??? ??? ????????");
        return;
      }
      if (selectedUserForActions.userType === "teacher") {

        const teacherId =
          selectedUserForActions.fullData?.teacherInfo?._id ||
          selectedUserForActions.id;
        await deleteTeacher(token, teacherId);
      } else if (selectedUserForActions.userType === "admin") {

        const adminId = selectedUserForActions.id;
        await deleteAdminMember(token, adminId);
      } else {

        const studentId = selectedUserForActions.id;
        await deleteStudentMember(token, studentId);
      }

      handleClose();
    } catch (error: unknown) {
      alert("??? ??? ????? ?????");
    } finally {
      setIsDeleting(false);
    }
  };

  const isDeleteEnabled =
    confirmText.trim().toLowerCase() === "???" && !isDeleting;

  const actions = [
    {
      label: "?????",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isDeleting,
    },
    {
      label: isDeleting
        ? "???? ?????..."
        : `??? ${
            selectedUserForActions.userType === "student"
              ? "??????"
              : selectedUserForActions.userType === "teacher"
              ? "??????"
              : "???????"
          }`,
      onClick: handleDelete,
      variant: "danger" as const,
      disabled: !isDeleteEnabled,
      icon: <FaTrash />,
    },
  ];

  return (
    <ModalContainer
      isOpen={deleteUserModalOpen}
      isClosing={isClosing}
      variant="delete"
      size="medium"
      onClose={handleClose}
    >
      <ModalHeader
        title={`????? ??? ${
          selectedUserForActions.userType === "student"
            ? "??????"
            : selectedUserForActions.userType === "teacher"
            ? "??????"
            : "???????"
        }`}
        icon={<FaTrash />}
        onClose={handleClose}
        disabled={isDeleting}
        variant="delete"
      />

      <div className={baseStyles.modalBody}>
        <WarningPanel
          title={`?? ??? ????? ?? ??? ??? ${
            selectedUserForActions.userType === "student" ? "??????" : "??????"
          }?`}
          text="?? ???? ??????? ?? ??? ???????"
        />

        <div className={baseStyles.groupInfo}>
          <h4 className={baseStyles.groupName}>
            {selectedUserForActions.name}
          </h4>
          <p className={baseStyles.groupId}>
            ??????: {selectedUserForActions.id}
          </p>
          <p className={baseStyles.warningText}>
            ??? ????????:{" "}
            {selectedUserForActions.userType === "student"
              ? "????"
              : selectedUserForActions.userType === "teacher"
              ? "????"
              : "?????"}
          </p>
        </div>

        <ConfirmTextInput
          label={
            <>
              ?????? ???? �<strong>???</strong>� ?? ?????? ?????:
            </>
          }
          value={confirmText}
          onChange={setConfirmText}
          placeholder="???"
          disabled={isDeleting}
        />

        <ModalActions actions={actions} alignment="right" />
      </div>
    </ModalContainer>
  );
};

export default DeleteUserModal;

