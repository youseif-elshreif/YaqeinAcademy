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
    if (confirmText.trim().toLowerCase() !== "حذف") {
      return;
    }

    setIsDeleting(true);

    try {
      if (!token) {
        alert("لم يتم العثور على رمز المصادقة");
        return;
      }
      if (selectedUserForActions.userType === "teacher") {
        // Use deleteTeacher function for teachers
        const teacherId =
          selectedUserForActions.fullData?.teacherInfo?._id ||
          selectedUserForActions.id;
        await deleteTeacher(token, teacherId);
      } else if (selectedUserForActions.userType === "admin") {
        // Use deleteAdminMember function for admins
        const adminId = selectedUserForActions.id;
        await deleteAdminMember(token, adminId);
      } else {
        // Use deleteStudentMember function for students
        const studentId = selectedUserForActions.id;
        await deleteStudentMember(token, studentId);
      }

      handleClose();
    } catch (error: unknown) {
      alert("حدث خطأ أثناء الحذف");
    } finally {
      setIsDeleting(false);
    }
  };

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
      label: isDeleting
        ? "جاري الحذف..."
        : `حذف ${
            selectedUserForActions.userType === "student"
              ? "الطالب"
              : selectedUserForActions.userType === "teacher"
              ? "المعلم"
              : "الإداري"
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
        title={`تأكيد حذف ${
          selectedUserForActions.userType === "student"
            ? "الطالب"
            : selectedUserForActions.userType === "teacher"
            ? "المعلم"
            : "الإداري"
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
          text="لا يمكن التراجع عن هذا الإجراء"
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
              : "إداري"}
          </p>
        </div>

        <ConfirmTextInput
          label={
            <>
              للحذف، اكتب “<strong>حذف</strong>” في المربع أدناه:
            </>
          }
          value={confirmText}
          onChange={setConfirmText}
          placeholder="حذف"
          disabled={isDeleting}
        />

        <ModalActions actions={actions} alignment="right" />
      </div>
    </ModalContainer>
  );
};

export default DeleteUserModal;
