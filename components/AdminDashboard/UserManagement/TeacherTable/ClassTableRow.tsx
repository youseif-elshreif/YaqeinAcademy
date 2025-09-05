import { FaCog } from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";
import MeetingLinkActions from "@/components/common/MeetingLinkActions";
import Button from "@/components/common/Button";

interface ClassTableRowProps {
  teacher: any;
}

const ClassTableRow = ({ teacher }: ClassTableRowProps) => {
  const { openUserActionsModal } = useAdminModal();

  const handleActionsClick = () => {
    openUserActionsModal({
      id: teacher.id,
      name: teacher.name,
      userType: "teacher",
      fullData: teacher, // تمرير البيانات الكاملة
    });
  };

  return (
    <tr key={teacher.id} className={styles.tableRow}>
      <td className={`${styles.studentCell} ${styles.firstCell}`}>
        <span
          className={`${styles.studentName} ${styles.clickableTextWithChildren} ${styles.darkColor}`}
        >
          {teacher.name}
        </span>
      </td>

      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {teacher.id}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {teacher.phone}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {teacher.pricePerClass} ج.م
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {teacher.totalDueThisMonth} ج.م
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {teacher.totalClassesThisMonth}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {teacher.completedClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {teacher.remainingClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {teacher.postponedClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {teacher.canceledClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {teacher.absentClasses}
        </span>
      </td>
      <td className={styles.linkContainer}>
        <Button
          onClick={handleActionsClick}
          variant="primary"
          size="small"
          icon={<FaCog />}
        >
          الإجراءات
        </Button>
      </td>
      <td className={styles.linkCell}>
        <MeetingLinkActions meetingLink={teacher.meetingLink} styles={styles} />
      </td>

      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {teacher.assignedGroups.join(",")}
        </span>
      </td>
    </tr>
  );
};

export default ClassTableRow;
