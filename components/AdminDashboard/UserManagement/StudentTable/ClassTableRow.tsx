import { FaTag } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import styles from "../../styles.module.css";
import {
  StudentItemProps as ClassTableRowProps,
  Student as Students,
} from "../types";

const ClassTableRow = ({ studentitem }: ClassTableRowProps) => {
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
    <tr key={studentitem.id} className={styles.tableRow}>
      <td className={`${styles.studentCell} ${styles.firstCell}`}>
        <span
          className={`${styles.studentName} ${styles.clickableTextWithChildren} ${styles.darkColor}`}
        >
          {studentitem.name}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.payedClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.phoneNumber}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.id}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.nextPaymentDate}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.amountPaid} ج.م
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.remainingClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.postponedClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.canceledClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.absentClasses}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.attendedClasses}
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
      <td className={styles.groupCell}>
        {studentitem.rate ? (
          <span className={`${styles.rate} ${styles.primaryColor}`}>
            ⭐ {studentitem.rate}/10
          </span>
        ) : (
          <span className={`${styles.lightColor}`}>-</span>
        )}
      </td>
      <td className={styles.groupCell}>عرض تفاصيل الحصص</td>

      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.groupName}
        </span>
      </td>
    </tr>
  );
};

export default ClassTableRow;
