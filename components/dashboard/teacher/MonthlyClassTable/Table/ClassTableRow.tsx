import { FaUsers } from "react-icons/fa";
import styles from "../MonthlyClassTable.module.css";
import { formatDate, getStatusColor, getStatusText } from "../utils";
import { useModal } from "@/contexts/ModalContext";
import MeetingLinkActions from "@/components/common/MeetingLinkActions";
import Button from "@/components/common/Button";

interface ClassTableRowProps {
  classItem: any; // raw lesson from API
}

const ClassTableRow = ({ classItem }: ClassTableRowProps) => {
  const { openCompleteModal, openStudentListModal } = useModal();

  const group = classItem?.groupId || {};
  const memberCount = group.memberCount || 0;
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
                  ({memberCount} طلاب)
                </span>
              </span>
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
        <MeetingLinkActions meetingLink={meetingLink} styles={styles} />
      </td>

      {/* الإجراءات */}
      <td className={styles.actionsCell}>
        <div className={styles.actionButtons}>
          {memberCount > 0 ? (
            <>
              {isCompleted ? (
                <Button
                  variant="primary"
                  size="small"
                  onClick={handleViewReports}
                >
                  عرض التقارير
                </Button>
              ) : isUpcoming ? (
                <span className={styles.lightColor}>
                  ميعاد الحصة لم يأتي بعد
                </span>
              ) : (
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => openCompleteModal(classItem)}
                >
                  إتمام الحصة
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
