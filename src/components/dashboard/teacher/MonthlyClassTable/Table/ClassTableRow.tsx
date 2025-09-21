import { FaUsers } from "react-icons/fa";
import styles from "../MonthlyClassTable.module.css";
import { formatDate, getStatusColor, getStatusText } from "../utils";
import { useModal } from "@/src/contexts/ModalContext";
import MeetingLinkActions from "@/src/components/common/MeetingLinkActions";
import Button from "@/src/components/common/Button";
import { ClassTableRowProps, GroupInComponent } from "@/src/types";

const ClassTableRow = ({ classItem }: ClassTableRowProps) => {
  const { openCompleteModal, openStudentListModal } = useModal();

  const group = (classItem?.groupId as GroupInComponent) || {};
  const memberCount = group.memberCount || 0;
  const scheduledAt: string = classItem?.scheduledAt;
  const meetingLink: string | undefined =
    classItem?.meetingLink || group?.meetingLink;

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
                  ({memberCount} طلاب)
                </span>
              </span>
            </div>
          </div>
        </div>
      </td>

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

      <td>
        <span
          className={`${styles.statusBadge} ${getStatusColor(
            classItem.status
          )}`}
        >
          {getStatusText(classItem.status)}
        </span>
      </td>

      <td className={styles.linkCell}>
        <MeetingLinkActions meetingLink={meetingLink} styles={styles} />
      </td>

      <td className={styles.actionsCell}>
        <div className={styles.actionButtons}>
          {memberCount > 0 ? (
            <>
              {isCompleted ? (
                <Button
                  variant="secondary"
                  size="small"
                  onClick={handleViewReports}
                >
                  عرض التقارير
                </Button>
              ) : isUpcoming ? (
                <span className={styles.lightColor}>
                  ميعاد الحلقة لم يأتي بعد
                </span>
              ) : (
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => openCompleteModal(classItem)}
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
      </td>
    </tr>
  );
};

export default ClassTableRow;
