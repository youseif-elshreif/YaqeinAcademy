import { FaUsers } from "react-icons/fa";
import styles from "../MonthlyClassTable.module.css";
import { formatDate, getStatusColor, getStatusText } from "../utils";
import { useModal } from "@/src/contexts/ModalContext";
import MeetingLinkActions from "@/src/components/common/MeetingLinkActions";
import Button from "@/src/components/common/Button";
import { ClassCardProps, GroupInComponent } from "@/src/types";

const ClassCard = ({ classItem }: ClassCardProps) => {
  const { openCompleteModal, openStudentListModal } = useModal();
  const group = (classItem?.groupId as GroupInComponent) || {};
  const memberCount = group.memberCount || 0;
  const meetingLink: string | undefined =
    classItem?.meetingLink || group?.meetingLink;

  const now = new Date();
  const scheduledDate = new Date(classItem?.scheduledAt);
  const isCompleted = classItem?.status === "completed";
  const isCancelled = classItem?.status === "cancelled";
  const isUpcoming = !isCompleted && !isCancelled && scheduledDate > now;

  const handleViewReports = () => {
    openStudentListModal(classItem);
  };

  return (
    <div key={classItem._id} className={styles.classCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <div className={styles.groupContainer}>
            <div className={styles.groupBadge}>
              <FaUsers />
              <span>
                {group?.type == "private" ? "حلقة خاصة" : "حلقة عامة"}
              </span>
            </div>
            <div className={styles.groupNameContainer}>
              <h3
                className={`${styles.cardStudentName} ${styles.primaryColor}`}
              >
                {group?.name || "حلقة"}
                <span className={styles.groupIndicator}>
                  ({memberCount} طلاب)
                </span>
              </h3>
            </div>
          </div>
        </div>
        <span
          className={`${styles.statusBadge} ${getStatusColor(
            classItem.status
          )}`}
        >
          {getStatusText(classItem.status)}
        </span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>التاريخ:</span>
            <span className={styles.infoValue}>
              {formatDate(classItem.scheduledAt)}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الوقت:</span>
            <span className={styles.infoValue}>
              {new Date(classItem.scheduledAt).toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رابط الحلقة:</span>
            <div className={styles.infoValue}>
              <MeetingLinkActions
                meetingLink={meetingLink}
                styles={styles}
                containerClassName={styles.cardLinkContainer}
                openButtonClassName={styles.cardLinkBtn}
                copyButtonClassName={styles.cardCopyBtn}
              />
            </div>
          </div>
        </div>

        <div className={styles.cardActions}>
          {memberCount > 0 ? (
            <>
              {isCompleted ? (
                <Button
                  onClick={handleViewReports}
                  variant="secondary"
                  size="small"
                >
                  عرض التقارير
                </Button>
              ) : isUpcoming ? (
                <span className={styles.lightColor}>
                  ميعاد الحلقة لم يأتي بعد
                </span>
              ) : (
                <Button
                  onClick={() => openCompleteModal(classItem)}
                  variant="primary"
                  size="small"
                >
                  إتمام الحلقة
                </Button>
              )}
            </>
          ) : (
            <span className={styles.lightColor}>
              لا يوجد طلاب في هذه الحلقة
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
