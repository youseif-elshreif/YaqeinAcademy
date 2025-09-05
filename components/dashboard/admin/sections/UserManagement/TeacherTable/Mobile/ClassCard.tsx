import { FaCog } from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";
import MeetingLinkActions from "@/components/common/MeetingLinkActions";
import Button from "@/components/common/Button";

interface ClassCardProps {
  teacher: any;
}

const ClassCard = ({ teacher }: ClassCardProps) => {
  const { openUserActionsModal } = useAdminModal();

  // Debug: Log teacher structure to understand the data
  console.log("=== Teacher Data Structure (Mobile) ===", teacher);

  // Try to find meetingLink in different possible locations
  const meetingLink =
    teacher.meetingLink ||
    teacher.teacherInfo?.meetingLink ||
    teacher.userId?.meetingLink ||
    "";

  console.log("=== Meeting Link Found (Mobile) ===", meetingLink);

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
          <MeetingLinkActions
            meetingLink={meetingLink}
            styles={styles}
            disabled={!meetingLink}
          />
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
            title="إجراءات المعلم"
          >
            الإجراءات
          </Button>
        </span>
      </div>
    </div>
  );
};

export default ClassCard;
