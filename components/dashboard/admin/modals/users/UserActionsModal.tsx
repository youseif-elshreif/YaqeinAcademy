import { useAdminModal } from "@/contexts/AdminModalContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import styles from "./UserActionsModal.module.css";
import { FaTimes, FaUser, FaEdit, FaTrash } from "react-icons/fa";

const UserActionsModal: React.FC = () => {
  const {
    userActionsModalOpen,
    closeUserActionsModal,
    selectedUserForActions,
    openEditUserModal,
    openDeleteUserModal,
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

  return (
    <div className={baseStyles.modalOverlay} onClick={handleClose}>
      <div className={baseStyles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={baseStyles.modalHeader}>
          <div className={baseStyles.modalTitle}>
            <FaUser className={baseStyles.titleIcon} />
            إجراءات على{" "}
            {selectedUserForActions.userType === "student"
              ? "الطالب"
              : "المعلم"}
            : {selectedUserForActions.name}
          </div>
          <button onClick={handleClose} className={baseStyles.closeBtn}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.userInfo}>
            <p className={styles.userInfoText}>
              اختر الإجراء المطلوب على هذا{" "}
              {selectedUserForActions.userType === "student"
                ? "الطالب"
                : "المعلم"}
              :
            </p>
          </div>

          <div className={styles.actionsContainer}>
            <button onClick={handleEdit} className={styles.actionBtn}>
              <FaEdit className={styles.btnIcon} />
              <span className={styles.btnTitle}>تعديل البيانات</span>

            </button>

            <button onClick={handleDelete} className={styles.actionBtn}>
              <FaTrash className={styles.btnIcon} />
              <span className={styles.btnTitle}>حذف المستخدم</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActionsModal;
