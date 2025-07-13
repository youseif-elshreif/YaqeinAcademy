import { FaTag } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import styles from "../../styles.module.css";
import { Group } from "../types";

interface ClassTableRowProps {
  groupsItem: Group;
}

const ClassTableRow = ({ groupsItem }: ClassTableRowProps) => {
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
    <tr key={groupsItem.id} className={styles.tableRow}>
      <td className={`${styles.studentCell} ${styles.firstCell}`}>
        <span
          className={`${styles.studentName} ${styles.clickableTextWithChildren} ${styles.darkColor}`}
        >
          {groupsItem.name}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {groupsItem.teacherName}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {groupsItem.classDate}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {groupsItem.totalClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {groupsItem.postponedClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {groupsItem.remainingClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {groupsItem.canceledClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {groupsItem.classLink}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {groupsItem.students.join(", ")}
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
    </tr>
  );
};

export default ClassTableRow;
