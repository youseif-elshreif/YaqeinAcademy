import { FaCog } from "react-icons/fa";
import styles from "@/src/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import MeetingLinkActions from "@/src/components/common/MeetingLinkActions";
import Button from "@/src/components/common/Button";
import { TeacherTableRowProps } from "@/src/types";

const ClassTableRow = ({ teacher }: TeacherTableRowProps) => {
  const { openUserActionsModal } = useAdminModal();

  // Get user info safely
  const userInfo = typeof teacher.userId === "object" ? teacher.userId : null;

  // Debug: Log teacher structure to understand the data// Get meeting link
  const meetingLink = teacher.meetingLink || "";
  const handleActionsClick = () => {
    openUserActionsModal({
      id: teacher._id,
      name: userInfo?.name || "غير محدد",
      userType: "teacher",
      fullData: teacher,
    });
  };

  return (
    <tr key={teacher._id} className={styles.tableRow}>
      <td className={`${styles.studentCell} ${styles.firstCell}`}>
        <div className={styles.teacherInfo}>
          <span className={styles.teacherName}>
            {userInfo?.name || "غير محدد"}
          </span>
        </div>
      </td>
      <td>{userInfo?.email || "غير محدد"}</td>
      <td>{userInfo?.phone || "غير محدد"}</td>
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
