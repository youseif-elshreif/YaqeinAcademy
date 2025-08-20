import { FaExternalLinkAlt, FaCopy, FaCog } from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { CombinedTeacherData } from "@/utils/types";

interface ClassCardProps {
  teacher: any;
}

const ClassCard = ({ teacher }: ClassCardProps) => {
  const { openUserActionsModal } = useAdminModal();

  // Function to copy class link to clipboard
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      console.log("تم نسخ الرابط بنجاح");
    } catch (err) {
      console.error("فشل في نسخ الرابط:", err);
    }
  };

  // Function to open link in new tab
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // Function to handle actions modal
  const handleActionsClick = () => {
    openUserActionsModal({
      id: teacher._id,
      name: teacher.userId.name,
      userType: "teacher",
      fullData: teacher,
    });
  };

  return (
    <div key={teacher._id} className={styles.classCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <h3 className={`${styles.cardStudentName} ${styles.clickableText}`}>
            {teacher.userId.name}
          </h3>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الإيميل:</span>
            <span className={styles.infoValue}>{teacher.userId.email}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رقم الهاتف:</span>
            <span className={styles.infoValue}>{teacher.userId.phone}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رصيد الحلقات:</span>
            <span className={styles.infoValue}>
              {teacher.numberOflessonsCridets}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>تاريخ التسجيل:</span>
            <span className={styles.infoValue}>
              {new Date(teacher.createdAt).toLocaleDateString("ar-EG")}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.infoItem} style={{ marginBottom: "10px" }}>
        <span className={styles.infoLabel}>رابط الحلقة:</span>
        <span className={styles.cardLinkContainer}>
          <button
            className={`${styles.linkButton} ${styles.openLinkBtn}`}
            onClick={() => handleOpenLink(teacher.teacherInfo.meetingLink)}
            title="فتح رابط الحلقة"
          >
            <FaExternalLinkAlt />
            <span>دخول الحلقة</span>
          </button>
          <button
            className={`${styles.linkButton} ${styles.copyLinkBtn}`}
            onClick={() => handleCopyLink(teacher.teacherInfo.meetingLink)}
            title="نسخ رابط الحلقة"
          >
            <FaCopy />
          </button>
        </span>
      </div>

      <div className={styles.infoItem}>
        <span className={styles.infoLabel}>الإجراءات:</span>
        <span className={styles.cardLinkContainer}>
          <button
            onClick={handleActionsClick}
            className={`${styles.linkButton} ${styles.openLinkBtn}`}
            title="إجراءات المعلم"
          >
            <FaCog />
            <span>الإجراءات</span>
          </button>
        </span>
      </div>
    </div>
  );
};

export default ClassCard;
