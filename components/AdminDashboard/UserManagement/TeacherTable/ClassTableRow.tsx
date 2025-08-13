import { FaExternalLinkAlt, FaCopy, FaCog, FaEdit } from "react-icons/fa";
import styles from "../../styles.module.css";
import { TeacherItemProps } from "../../../../utils/types";
import { useAdminModal } from "@/contexts/AdminModalContext";

const ClassTableRow = ({ teacher }: TeacherItemProps) => {
  const { openUserActionsModal } = useAdminModal();

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
          {teacher.phoneNumber}
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
        <button
          onClick={handleActionsClick}
          className={`${styles.linkButton} ${styles.openLinkBtn}`}
        >
          <FaCog />
          <span className={styles.iconButtonText}>الإجراءات</span>
        </button>
      </td>
      <td className={styles.linkCell}>
        <div className={styles.linkContainer}>
          <button
            className={`${styles.linkButton} ${styles.openLinkBtn}`}
            title="فتح رابط الحصة"
          >
            <FaExternalLinkAlt />
            <span>دخول الحصة</span>
          </button>
          <button
            className={`${styles.linkButton} ${styles.copyLinkBtn}`}
            title="نسخ رابط الحصة"
          >
            <FaCopy />
          </button>
          <button
            className={`${styles.linkButton} ${styles.addLinkBtn}`}
            title="تعديل رابط الحصة"
          >
            <FaEdit />
            <span>تعديل</span>
          </button>
        </div>
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
