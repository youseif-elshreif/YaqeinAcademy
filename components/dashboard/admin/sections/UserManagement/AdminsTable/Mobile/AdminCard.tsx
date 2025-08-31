import React from "react";
import { FaCog } from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";

interface AdminCardProps {
  admin: any; // Admin from API
}

const AdminCard: React.FC<AdminCardProps> = ({ admin }) => {
  const { openUserActionsModal } = useAdminModal();

  const handleActionsClick = () => {
    openUserActionsModal({
      id: admin._id || admin.id,
      name: admin.name,
      userType: "admin" as any,
      fullData: admin,
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ar-EG");
  };

  return (
    <div key={admin._id || admin.id} className={styles.classCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <h3 className={`${styles.cardStudentName} ${styles.clickableText}`}>
            {admin.name}
          </h3>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>البريد الإلكتروني:</span>
            <span className={styles.infoValue}>{admin.email}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رقم الهاتف:</span>
            <span className={styles.infoValue}>{admin.phone}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الرقم التعريفي:</span>
            <span className={styles.infoValue}>
              {(admin._id || admin.id)?.slice(-6) || "-"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>تاريخ الإنشاء:</span>
            <span className={styles.infoValue}>
              {formatDate(admin.createdAt)}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الإجراءات:</span>
            <span className={styles.cardLinkContainer}>
              <button
                onClick={handleActionsClick}
                className={`${styles.linkButton} ${styles.openLinkBtn}`}
                title="إجراءات المسؤول"
              >
                <FaCog />
                <span className={styles.iconButtonText}>الإجراءات</span>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
