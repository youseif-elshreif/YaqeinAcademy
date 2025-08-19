import { useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import { useAuth } from "@/contexts/AuthContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import { FaTimes, FaTrash, FaExclamationTriangle } from "react-icons/fa";

const DeleteUserModal: React.FC = () => {
  const { deleteUserModalOpen, closeDeleteUserModal, selectedUserForActions } =
    useAdminModal();
  const { deleteTeacher } = useAdminDashboardContext();
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
        console.error("No access token found");
        alert("لم يتم العثور على رمز المصادقة");
        return;
      }

      console.log(
        `🗑️ Deleting ${selectedUserForActions.userType}:`,
        selectedUserForActions
      );

      if (selectedUserForActions.userType === "teacher") {
        // Use deleteTeacher function for teachers
        const teacherId =
          selectedUserForActions.fullData?.teacherInfo?._id ||
          selectedUserForActions.id;
        await deleteTeacher(token, teacherId);
        console.log("✅ Teacher deleted successfully");
      } else {
        // For students, you might need to implement deleteStudent function
        console.log("Student deletion not implemented yet");
        alert("حذف الطلاب غير متاح حالياً");
        return;
      }

      handleClose();
    } catch (error: any) {
      console.error("❌ Error deleting user:", error);
      alert("حدث خطأ أثناء الحذف");
    } finally {
      setIsDeleting(false);
    }
  };

  const isDeleteEnabled =
    confirmText.trim().toLowerCase() === "حذف" && !isDeleting;

  return (
    <div
      className={`${baseStyles.modalOverlay} ${
        isClosing ? baseStyles.fadeOut : ""
      }`}
      onClick={handleClose}
    >
      <div
        className={`${baseStyles.modal} ${
          isClosing ? baseStyles.modalSlideOut : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${baseStyles.modalHeader} ${baseStyles.delete}`}>
          <h2 className={baseStyles.modalTitle}>
            <FaTrash className={baseStyles.titleIcon} />
            تأكيد حذف{" "}
            {selectedUserForActions.userType === "student"
              ? "الطالب"
              : "المعلم"}
          </h2>
          <button
            onClick={handleClose}
            className={baseStyles.closeButton}
            disabled={isDeleting}
          >
            <FaTimes />
          </button>
        </div>

        <div className={baseStyles.modalBody}>
          <div className={baseStyles.warningContainer}>
            <FaExclamationTriangle className={baseStyles.warningIcon} />
            <div className={baseStyles.warningContent}>
              <h3 className={baseStyles.warningTitle}>
                هل أنت متأكد من حذف هذا{" "}
                {selectedUserForActions.userType === "student"
                  ? "الطالب"
                  : "المعلم"}
                ؟
              </h3>
              <p className={baseStyles.warningText}>
                لا يمكن التراجع عن هذا الإجراء
              </p>
            </div>
          </div>

          <div className={baseStyles.groupInfo}>
            <h4 className={baseStyles.groupName}>
              {selectedUserForActions.name}
            </h4>
            <p className={baseStyles.groupId}>
              المعرف: {selectedUserForActions.id}
            </p>
            <p className={baseStyles.warningText}>
              نوع المستخدم:{" "}
              {selectedUserForActions.userType === "student" ? "طالب" : "معلم"}
            </p>
          </div>

          <div className={baseStyles.confirmationInput}>
            <label htmlFor="confirmText" className={baseStyles.confirmLabel}>
              للحذف، اكتب &ldquo;<strong>حذف</strong>&rdquo; في المربع أدناه:
            </label>
            <input
              id="confirmText"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="حذف"
              className={baseStyles.textInput}
              disabled={isDeleting}
            />
          </div>

          <div className={baseStyles.formActions}>
            <button
              onClick={handleClose}
              className={baseStyles.cancelButton}
              disabled={isDeleting}
            >
              إلغاء
            </button>
            <button
              onClick={handleDelete}
              className={`${baseStyles.deleteButton} ${
                !isDeleteEnabled ? baseStyles.disabled : ""
              }`}
              disabled={!isDeleteEnabled}
            >
              <FaTrash className={baseStyles.buttonIcon} />
              {isDeleting
                ? "جاري الحذف..."
                : `حذف ${
                    selectedUserForActions.userType === "student"
                      ? "الطالب"
                      : "المعلم"
                  }`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
