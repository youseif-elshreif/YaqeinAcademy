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
    if (confirmText.trim().toLowerCase() !== "نعم") {
      return;
    }

    setIsDeleting(true);

    try {
      if (!token) {
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
    } finally {
      setIsDeleting(false);
    }
  };

  const isDeleteEnabled =
    confirmText.trim().toLowerCase() === "نعم" && !isDeleting;

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isDeleting,
    },
    {
      label: isDeleting
        ? "جاري الحذف..."
        : `حذف ${
            selectedUserForActions.userType === "student"
              ? "الطالب"
              : selectedUserForActions.userType === "teacher"
              ? "المعلم"
              : "المسؤول"
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
        title={`حذف ${
          selectedUserForActions.userType === "student"
            ? "الطالب"
            : selectedUserForActions.userType === "teacher"
            ? "المعلم"
            : "المسؤول"
        }`}
        icon={<FaTrash />}
        onClose={handleClose}
        disabled={isDeleting}
        variant="delete"
      />

      <div className={baseStyles.modalBody}>
        <WarningPanel
          title={`هل أنت متأكد من حذف هذا ${
            selectedUserForActions.userType === "student" ? "الطالب" : "المعلم"
          }؟`}
          text="لا يمكن التراجع عن هذا الإجراء."
        />

        <div className={baseStyles.groupInfo}>
          <h4 className={baseStyles.groupName}>
            {selectedUserForActions.name}
          </h4>
          <p className={baseStyles.groupId}>
            المعرف: {selectedUserForActions.id}
          </p>
          <p className={baseStyles.warningText}>
            نوع المستخدم:{" "}
            {selectedUserForActions.userType === "student"
              ? "طالب"
              : selectedUserForActions.userType === "teacher"
              ? "معلم"
              : "مسؤول"}
          </p>
        </div>

        <ConfirmTextInput
          label={
            <>
              اكتب كلمة <strong>نعم</strong> في الصندوق للتأكيد:
            </>
          }
          value={confirmText}
          onChange={setConfirmText}
          placeholder="نعم"
          disabled={isDeleting}
        />

        <ModalActions actions={actions} alignment="right" />
      </div>
    </ModalContainer>
  );
};

export default DeleteUserModal;
