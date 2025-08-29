import { FaExternalLinkAlt, FaCopy, FaCog } from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";

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

  // Function to copy class link to clipboard
  const handleCopyLink = async (link: string) => {
    try {
      if (!link) {
        console.warn("لا يوجد رابط للنسخ");
        return;
      }
      await navigator.clipboard.writeText(link);
      console.log("تم نسخ الرابط بنجاح");
    } catch (err) {
      console.error("فشل في نسخ الرابط:", err);
    }
  };

  // Function to open link in new tab
  const handleOpenLink = (link: string) => {
    if (!link) {
      console.warn("لا يوجد رابط للفتح");
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

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
        <div className={styles.linkContainer}>
          <button
            className={`${styles.linkButton} ${styles.openLinkBtn}`}
            onClick={() => handleOpenLink(meetingLink)}
            title="فتح رابط الحلقة"
            disabled={!meetingLink}
          >
            <FaExternalLinkAlt />
            <span>دخول الحلقة</span>
          </button>
          <button
            className={`${styles.linkButton} ${styles.copyLinkBtn}`}
            onClick={() => handleCopyLink(meetingLink)}
            title="نسخ رابط الحلقة"
            disabled={!meetingLink}
          >
            <FaCopy />
          </button>
        </div>
      </td>
      <td>{teacher.numberOflessonsCridets}</td>
      <td>{new Date(teacher.createdAt).toLocaleDateString("ar-EG")}</td>
      <td>
        <button
          onClick={handleActionsClick}
          className={`${styles.linkButton} ${styles.openLinkBtn}`}
          title="إجراءات المعلم"
        >
          <FaCog />
          <span className={styles.iconButtonText}>الإجراءات</span>
        </button>
      </td>
    </tr>
  );
};

export default ClassTableRow;
