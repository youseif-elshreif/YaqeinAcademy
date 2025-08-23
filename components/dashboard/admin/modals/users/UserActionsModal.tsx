import { useAdminModal } from "@/contexts/AdminModalContext";
import styles from "./UserActionsModal.module.css";
import { FaEdit, FaTrash, FaCoins, FaListUl } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ActionButton,
} from "@/components/common/Modal";

const UserActionsModal: React.FC = () => {
  const {
    userActionsModalOpen,
    closeUserActionsModal,
    selectedUserForActions,
    openEditUserModal,
    openDeleteUserModal,
    openAddCreditsModal,
  } = useAdminModal();

  if (!userActionsModalOpen || !selectedUserForActions) return null;

  const handleClose = () => {
    closeUserActionsModal();
  };

  const handleEdit = () => {
    closeUserActionsModal();
    // تأخير فتح المودال الجديد حتى ينتهي إغلاق المودال الحالي
    setTimeout(() => {
      // تمرير البيانات الكاملة إذا كانت متوفرة، وإلا استخدم البيانات الأساسية
      const dataToPass =
        selectedUserForActions.fullData || selectedUserForActions;
      openEditUserModal(dataToPass);
    }, 300);
  };

  const handleDelete = () => {
    closeUserActionsModal();
    // تأخير فتح المودال الجديد حتى ينتهي إغلاق المودال الحالي
    setTimeout(() => {
      openDeleteUserModal(selectedUserForActions);
    }, 300);
  };

  const handleAddCredits = () => {
    closeUserActionsModal();
    // تأخير فتح المودال الجديد حتى ينتهي إغلاق المودال الحالي
    setTimeout(() => {
      openAddCreditsModal({
        userId: selectedUserForActions.id,
        name: selectedUserForActions.name,
      });
    }, 300);
  };

  return (
    <ModalContainer
      isOpen={userActionsModalOpen}
      variant="default"
      size="medium"
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
