import { FaUsers, FaExternalLinkAlt, FaCopy } from "react-icons/fa";
import styles from "../MonthlyClassTable.module.css";
import { formatDate, getStatusColor, getStatusText } from "../utils";
import { useModal } from "@/contexts/ModalContext";

interface ClassTableRowProps {
  classItem: any; // raw lesson from API
}

const ClassTableRow = ({ classItem }: ClassTableRowProps) => {
  const { openCompleteModal, openStudentListModal } = useModal();

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (err) {
      console.error("فشل في نسخ الرابط:", err);
    }
  };

  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const group = classItem?.groupId || {};
  const members = Array.isArray(group?.members) ? group.members : [];
  const scheduledAt: string = classItem?.scheduledAt;
  const meetingLink: string | undefined =
    classItem?.meetingLink || group?.meetingLink;

  // Determine action state
  const now = new Date();
  const scheduledDate = new Date(scheduledAt);
  const isCompleted = classItem?.status === "completed";
  const isCancelled = classItem?.status === "cancelled";
  const isUpcoming = !isCompleted && !isCancelled && scheduledDate > now;

  const handleViewReports = () => {
    openStudentListModal(classItem);
  };

  return (
    <tr key={classItem._id} className={styles.tableRow}>
      {/* الطالب/الحلقة */}
      <td className={styles.studentCell}>
        <div className={styles.studentInfo}>
          <div className={styles.groupContainer}>
            <div className={styles.groupBadge}>
              <FaUsers />
              <span>
                {group?.type == "private" ? "حلقة خاصة" : "حلقة عامة"}
              </span>
            </div>
            <div className={styles.groupNameContainer}>
              <span className={`${styles.groupName} ${styles.primaryColor}`}>
                {group?.name || "حلقة"}
                <span className={styles.groupIndicator}>
                  ({members.length} طلاب)
                </span>
              </span>
            </div>
            <div className={styles.groupMembersTooltip}>
              {members.map((m: any, index: number) => (
                <span key={m?._id || index} className={styles.groupMemberName}>
                  {m?.name}
                  {index < members.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>
      </td>

      {/* التاريخ والوقت */}
      <td className={styles.dateTimeCell}>
        <div className={styles.dateTimeContent}>
          <span className={styles.dateText}>{formatDate(scheduledAt)}</span>
          <span className={styles.timeText}>
            {new Date(scheduledAt).toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
      </td>

      {/* الحالة */}
      <td>
        <span
          className={`${styles.statusBadge} ${getStatusColor(
            classItem.status
          )}`}
        >
          {getStatusText(classItem.status)}
        </span>
      </td>

      {/* رابط الحلقة */}
      <td className={styles.linkCell}>
        <div className={styles.linkContainer}>
          {meetingLink ? (
            <>
              <button
                className={`${styles.linkButton} ${styles.openLinkBtn}`}
                onClick={() => handleOpenLink(meetingLink)}
                title="فتح رابط الحلقة"
              >
                <FaExternalLinkAlt />
                <span>دخول الحلقة</span>
              </button>
              <button
                className={`${styles.linkButton} ${styles.copyLinkBtn}`}
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
      </td>

      {/* الإجراءات */}
      <td className={styles.actionsCell}>
        <div className={styles.actionButtons}>
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
      </td>
    </tr>
  );
};

export default ClassTableRow;
