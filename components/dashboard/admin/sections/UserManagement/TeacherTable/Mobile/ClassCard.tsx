import { FaCog } from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";
import MeetingLinkActions from "@/components/common/MeetingLinkActions";
import Button from "@/components/common/Button";
import { TeacherCardProps } from "@/types";

const ClassCard = ({ teacher }: TeacherCardProps) => {
  const { openUserActionsModal } = useAdminModal();

  // Get user info safely
  const userInfo = typeof teacher.userId === "object" ? teacher.userId : null;

  // Debug: Log teacher structure to understand the data===", teacher);

  // Get meeting link
  const meetingLink = teacher.meetingLink || "";

  // Function to handle actions modal
  const handleActionsClick = () => {
    openUserActionsModal({
      id: teacher._id,
      name: userInfo?.name || "غير محدد",
      userType: "teacher",
      fullData: teacher,
    });
  };

  return (
    <div key={teacher._id} className={styles.classCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <h3 className={`${styles.cardStudentName} ${styles.clickableText}`}>
            {userInfo?.name || "غير محدد"}
          </h3>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الإيميل:</span>
            <span className={styles.infoValue}>
              {userInfo?.email || "غير محدد"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رقم الهاتف:</span>
            <span className={styles.infoValue}>
              {userInfo?.phone || "غير محدد"}
            </span>
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
