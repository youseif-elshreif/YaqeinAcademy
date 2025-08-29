import { FaExternalLinkAlt, FaCopy } from "react-icons/fa";
import styles from "../MonthlyClassTable.module.css";
import { formatDate, getStatusColor, getStatusText } from "../utils";
import { useModal } from "@/contexts/ModalContext";

interface ClassCardProps {
  classItem: any; // raw lesson from API
}

const ClassCard = ({ classItem }: ClassCardProps) => {
  const { openCompleteModal, openStudentListModal } = useModal();
  const group = classItem?.groupId || {};
  const members = Array.isArray(group?.members) ? group.members : [];
  const meetingLink: string | undefined =
    classItem?.meetingLink || group?.meetingLink;

  // Determine action state
  const now = new Date();
  const scheduledDate = new Date(classItem?.scheduledAt);
  const isCompleted = classItem?.status === "completed";
  const isCancelled = classItem?.status === "cancelled";
  const isUpcoming = !isCompleted && !isCancelled && scheduledDate > now;

  const handleViewReports = () => {
    openStudentListModal(classItem);
  };

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

  // Link editing handled inline via button

  return (
    <div key={classItem._id} className={styles.classCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <div className={styles.groupContainer}>
            <h3 className={styles.cardStudentName}>
              {group?.name}
              <span className={styles.groupIndicator}>
                ({members.length} طلاب)
              </span>
            </h3>
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
          {/* Rating removed */}
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رابط الحلقة:</span>
            <div className={styles.infoValue}>
              <div className={styles.cardLinkContainer}>
                {meetingLink ? (
                  <>
                    <button
                      className={`${styles.linkButton} ${styles.openLinkBtn} ${styles.cardLinkBtn}`}
                      onClick={() => handleOpenLink(meetingLink)}
                      title="فتح رابط الحلقة"
                    >
                      <FaExternalLinkAlt />
                      <span>دخول الحلقة</span>
                    </button>
                    <button
                      className={`${styles.linkButton} ${styles.copyLinkBtn} ${styles.cardCopyBtn}`}
                      onClick={() => handleCopyLink(meetingLink)}
                      title="نسخ رابط الحلقة"
                    >
                      <FaCopy />
                    </button>
                  </>
                ) : (
                  <span className={styles.lightColor}>—</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Group members list - always show members list (even if single) */}
        <div className={styles.groupMembers}>
          <span className={styles.membersLabel}>أعضاء الحلقة:</span>
          <div className={styles.membersList}>
            {members.map((m: any, index: number) => (
              <span key={m?._id || index} className={`${styles.memberName}`}>
                {m?.name}
                {index < members.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.cardActions}>
          {isCompleted ? (
            <button
              className={`${styles.baseButton} ${styles.actionBtn} ${styles.viewBtn}`}
              onClick={handleViewReports}
            >
              عرض التقارير
            </button>
          ) : isUpcoming ? (
            <span className={styles.lightColor}>ميعاد الحصة لم يأتي بعد</span>
          ) : (
            <button
              className={`${styles.baseButton} ${styles.actionBtn} ${styles.completeBtn}`}
              onClick={() => openCompleteModal(classItem)}
            >
              إتمام الحصة
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
