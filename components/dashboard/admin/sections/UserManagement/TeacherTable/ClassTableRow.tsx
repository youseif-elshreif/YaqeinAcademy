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

  // Debug: Log teacher structure to understand the data
  console.log("=== Teacher Data Structure ===", teacher);

  // Try to find meetingLink in different possible locations
  const meetingLink =
    teacher.meetingLink ||
    teacher.teacherInfo?.meetingLink ||
    teacher.userId?.meetingLink ||
    "";

  console.log("=== Meeting Link Found ===", meetingLink);

  const handleActionsClick = () => {
    openUserActionsModal({
      id: teacher._id,
      name: teacher.userId.name,
      userType: "teacher",
      fullData: teacher,
    });
  };

  return (
    <tr key={teacher._id} className={styles.tableRow}>
      <td className={`${styles.studentCell} ${styles.firstCell}`}>
        <div className={styles.teacherInfo}>
          <span className={styles.teacherName}>{teacher.userId.name}</span>
        </div>
      </td>
      <td>{teacher.userId.email}</td>
      <td>{teacher.userId.phone}</td>
      <td className={styles.linkCell}>
        <MeetingLinkActions
          meetingLink={meetingLink}
          styles={styles}
          disabled={!meetingLink}
        />
      </td>
      <td>{teacher.numberOflessonsCridets}</td>
      <td>{new Date(teacher.createdAt).toLocaleDateString("ar-EG")}</td>
      <td>
        <Button
          onClick={handleActionsClick}
          variant="primary"
          size="small"
          icon={<FaCog />}
          title="إجراءات المعلم"
        >
          الإجراءات
        </Button>
      </td>
    </tr>
  );
};

export default ClassTableRow;
