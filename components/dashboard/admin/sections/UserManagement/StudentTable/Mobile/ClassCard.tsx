import { FaCog, FaListUl } from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";

interface ClassCardProps {
  studentItem: any; // Student from API
}

const ClassCard = ({ studentItem }: ClassCardProps) => {
  const { openUserActionsModal, openStudentReportsModal } = useAdminModal();

  const handleActionsClick = () => {
    openUserActionsModal({
      id: studentItem._id,
      name: studentItem.name,
      userType: "student",
      fullData: studentItem,
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ar-EG");
  };

  return (
    <div key={studentItem._id} className={styles.classCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <h3 className={`${styles.cardStudentName} ${styles.clickableText}`}>
            {studentItem.name}
          </h3>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>البريد الإلكتروني:</span>
            <span className={styles.infoValue}>{studentItem.email}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رقم الهاتف:</span>
            <span className={styles.infoValue}>{studentItem.phone}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الرقم التعريفي:</span>
            <span className={styles.infoValue}>
              {studentItem._id.slice(-6)}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحلقات المستحقة:</span>
            <span className={styles.infoValue}>
              {studentItem.PrivitelessonCredits || 0}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>العمر:</span>
            <span className={styles.infoValue}>{studentItem.age || "-"}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الدولة:</span>
            <span className={styles.infoValue}>
              {studentItem.country || "-"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>حفظ القرآن:</span>
            <span className={styles.infoValue}>
              {studentItem.quranMemorized || "-"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الأجزاء:</span>
            <span className={styles.infoValue}>
              {studentItem.numOfPartsofQuran || 0}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>تاريخ التسجيل:</span>
            <span className={styles.infoValue}>
              {formatDate(studentItem.createdAt)}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>التقارير:</span>
            <span className={styles.cardLinkContainer}>
              <button
                onClick={() =>
                  openStudentReportsModal({
                    id: studentItem._id,
                    name: studentItem.name,
                  })
                }
                className={`${styles.linkButton} ${styles.openLinkBtn}`}
              >
                <FaListUl />
                <span className={styles.iconButtonText}>عرض التقارير</span>
              </button>
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الإجراءات:</span>
            <span className={styles.cardLinkContainer}>
              <button
                onClick={handleActionsClick}
                className={`${styles.linkButton} ${styles.openLinkBtn}`}
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

export default ClassCard;
