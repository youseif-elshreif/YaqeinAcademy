import { FaTag, FaExternalLinkAlt, FaEdit, FaCopy } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import styles from "../../styles.module.css";
import { TeacherItemProps } from "../types";

const ClassTableRow = ({ teacher }: TeacherItemProps) => {
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
        <button className={`${styles.linkButton} ${styles.openLinkBtn}`}>
          <FaTag />
          <span className={styles.iconButtonText}>تعديل</span>
        </button>
        <button className={styles.closeBtn}>
          <MdDeleteOutline />
          <span className={styles.iconButtonText}>حدف</span>
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
          {teacher.groups.join(", ")}
        </span>
      </td>
    </tr>
  );
};

export default ClassTableRow;
