import { FaCog } from "react-icons/fa";
import styles from "@/src/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import MeetingLinkActions from "@/src/components/common/MeetingLinkActions";
import Button from "@/src/components/common/Button";
import { TeacherCardProps } from "@/src/types";

const ClassCard = ({ teacher }: TeacherCardProps) => {
  const { openUserActionsModal } = useAdminModal();

  const userInfo = typeof teacher.userId === "object" ? teacher.userId : null;

  const meetingLink = teacher.meetingLink || "";

  const handleActionsClick = () => {
    openUserActionsModal({
      id: teacher._id,
      name: userInfo?.name || "اسم المعلم غير متوفر",
      userType: "teacher",
      fullData: teacher,
    });
  };

  return (
    <div key={teacher._id} className={styles.classCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <h3 className={`${styles.cardStudentName} ${styles.clickableText}`}>
            {userInfo?.name || "اسم المعلم غير متوفر"}
          </h3>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>البريد الإلكتروني:</span>
            <span className={styles.infoValue}>
              {userInfo?.email || "البريد الإلكتروني غير متوفر"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رقم الهاتف:</span>
            <span className={styles.infoValue}>
              {userInfo?.phone || "رقم الهاتف غير متوفر"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>ثمن الحصة:</span>
            <span className={styles.infoValue}>{userInfo.money}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص:</span>
            <span className={styles.infoValue}>
              {-1 * teacher.numberOflessonsCridets}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>المستحق:</span>
            <span className={styles.infoValue}>
              {userInfo.money * teacher.numberOflessonsCridets}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>تاريخ الإنشاء:</span>
            <span className={styles.infoValue}>
              {new Date(teacher.createdAt).toLocaleDateString("ar-EG")}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.infoItem} style={{ marginBottom: "10px" }}>
        <span className={styles.infoLabel}>رابط الاجتماع:</span>
        <span className={styles.cardLinkContainer}>
          <MeetingLinkActions
            meetingLink={meetingLink}
            styles={styles}
            disabled={!meetingLink}
          />
        </span>
      </div>

      <div className={styles.infoItem}>
        <span className={styles.infoLabel}>إعدادات المعلم:</span>
        <span className={styles.cardLinkContainer}>
          <Button
            onClick={handleActionsClick}
            variant="primary"
            size="small"
            icon={<FaCog />}
            title="إعدادات المعلم"
          >
            إعدادات
          </Button>
        </span>
      </div>
    </div>
  );
};

export default ClassCard;
