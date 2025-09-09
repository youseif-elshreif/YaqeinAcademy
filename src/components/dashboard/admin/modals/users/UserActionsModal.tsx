import { useAdminModal } from "@/src/contexts/AdminModalContext";
import styles from "./UserActionsModal.module.css";
import { FaEdit, FaTrash, FaCoins, FaListUl, FaLink } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ActionButton,
} from "@/src/components/common/Modal";

const UserActionsModal: React.FC = () => {
  const {
    userActionsModalOpen,
    closeUserActionsModal,
    selectedUserForActions,
    openEditUserModal,
    openDeleteUserModal,
    openAddCreditsModal,
    openEditTeacherLinkModal,
  } = useAdminModal();

  if (!userActionsModalOpen || !selectedUserForActions) return null;

  const handleClose = () => {
    closeUserActionsModal();
  };

  const handleEdit = () => {
    closeUserActionsModal();

    setTimeout(() => {

      const dataToPass =
        selectedUserForActions.fullData || selectedUserForActions;
      openEditUserModal(dataToPass);
    }, 300);
  };

  const handleDelete = () => {
    closeUserActionsModal();

    setTimeout(() => {
      openDeleteUserModal(selectedUserForActions);
    }, 300);
  };

  const handleAddCredits = () => {
    closeUserActionsModal();

    setTimeout(() => {
      openAddCreditsModal({
        userId: selectedUserForActions.id,
        name: selectedUserForActions.name,
      });
    }, 300);
  };

  const handleEditTeacherLink = () => {
    closeUserActionsModal();

    setTimeout(() => {
      const dataToPass =
        selectedUserForActions.fullData || selectedUserForActions;
      openEditTeacherLinkModal(dataToPass);
    }, 300);
  };

  return (
    <ModalContainer
      isOpen={userActionsModalOpen}
      variant="default"
      size="medium"
      onClose={closeUserActionsModal}
    >
      <ModalHeader
        title={`إجراءات على ${
          selectedUserForActions.userType === "student"
            ? "الطالب"
            : selectedUserForActions.userType === "teacher"
            ? "المعلم"
            : "الإداري"
        }: ${selectedUserForActions.name}`}
        icon={<FaListUl />}
        onClose={handleClose}
      />

      <div className={styles.modalBody}>
        <div className={styles.userInfo}>
          <p className={styles.userInfoText}>
            اختر الإجراء المطلوب على هذا{" "}
            {selectedUserForActions.userType === "student"
              ? "الطالب"
              : selectedUserForActions.userType === "teacher"
              ? "المعلم"
              : "الإداري"}
            :
          </p>
        </div>

        <div className={styles.actionsContainer}>
          <ActionButton
            label="تعديل البيانات"
            icon={<FaEdit className={styles.btnIcon} />}
            onClick={handleEdit}
          />
          {selectedUserForActions.userType === "teacher" && (
            <ActionButton
              label="تعديل رابط الحلقة"
              icon={<FaLink className={styles.btnIcon} />}
              onClick={handleEditTeacherLink}
            />
          )}
          {selectedUserForActions.userType === "student" && (
            <ActionButton
              label="إضافة حلقات مستحقة"
              icon={<FaCoins className={styles.btnIcon} />}
              onClick={handleAddCredits}
            />
          )}
          <ActionButton
            label="حذف المستخدم"
            icon={<FaTrash className={styles.btnIcon} />}
            onClick={handleDelete}
          />
        </div>
      </div>
    </ModalContainer>
  );
};

export default UserActionsModal;
