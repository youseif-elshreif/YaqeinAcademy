import React from "react";
import { FaCog } from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";
import Button from "@/components/common/Button";

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
              <Button
                onClick={handleActionsClick}
                variant="primary"
                size="small"
                icon={<FaCog />}
                title="إجراءات المسؤول"
              >
                الإجراءات
              </Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
