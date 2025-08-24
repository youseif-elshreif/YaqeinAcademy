import { FaUsers, FaExternalLinkAlt, FaCopy } from "react-icons/fa";
import styles from "../MonthlyClassTable.module.css";
import { formatDate, getStatusColor, getStatusText } from "../utils";

interface ClassTableRowProps {
  classItem: any; // raw lesson from API
}

const ClassTableRow = ({ classItem }: ClassTableRowProps) => {
  // Function to copy class link to clipboard
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      // You can add a toast notification here
      console.log("تم نسخ الرابط بنجاح");
    } catch (err) {
      console.error("فشل في نسخ الرابط:", err);
    }
  };

  // Function to open link in new tab
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const group = classItem?.groupId || {};
  const members = Array.isArray(group?.members) ? group.members : [];
  const scheduledAt: string = classItem?.scheduledAt;
  const meetingLink: string | undefined =
    classItem?.meetingLink || group?.meetingLink;

  return (
    <tr key={classItem._id} className={styles.tableRow}>
      <td className={styles.studentCell}>
        <div className={styles.studentInfo}>
          {/* Always show group-style display with group name, even for single-student classes */}
          <>
            <div className={styles.groupContainer}>
              <div className={styles.groupBadge}>
                <FaUsers />
                <span>
                  {group?.type == "private" ? "حلقة خاصة" : "حلقة عامة"}
                </span>
              </div>
              <div className={styles.groupNameContainer}>
                <span
                  className={`${styles.groupName} ${styles.clickableText} ${styles.primaryColor}`}
                >
                  {group?.name || "حلقة"}
                  <span
                    className={`${styles.groupIndicator} ${styles.secondaryColor}`}
                  >
                    ({members.length} طلاب)
                  </span>
                </span>
              </div>

              {/* Group members list - hidden by default, shown on hover */}
              <div className={styles.groupMembersTooltip}>
                {members.map((m: any, index: number) => (
                  <span
                    key={m?._id || index}
                    className={`${styles.groupMemberName} ${styles.primaryColor}`}
                  >
                    {m?.name}
                    {index < members.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
            {/* Edit group name button removed as requested */}
          </>
        </div>
      </td>

      <td className={styles.dateTimeCell}>
        <div className={styles.dateTimeContent}>
          <span className={`${styles.dateText} ${styles.darkColor}`}>
            {formatDate(scheduledAt)}
          </span>
          <span className={`${styles.timeText} ${styles.primaryColor}`}>
            {new Date(scheduledAt).toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
      </td>

      <td className={styles.statusCell}>
        <span
          className={`${styles.statusBadge} ${getStatusColor(
            classItem.status
          )}`}
        >
          {getStatusText(classItem.status)}
        </span>
      </td>

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
      <td className={styles.actionsCell}>
        <div className={styles.actionButtons}>—</div>
      </td>
    </tr>
  );
};

export default ClassTableRow;
