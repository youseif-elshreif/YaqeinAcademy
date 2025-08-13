import { FaCog } from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
import { StudentItemProps as ClassTableRowProps } from "@/utils/types";
import { useAdminModal } from "@/contexts/AdminModalContext";

const ClassTableRow = ({ studentitem }: ClassTableRowProps) => {
  const { openUserActionsModal } = useAdminModal();

  const handleActionsClick = () => {
    openUserActionsModal({
      id: studentitem.id,
      name: studentitem.name,
      userType: "student",
      fullData: studentitem, // تمرير البيانات الكاملة
    });
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
        <button
          onClick={handleActionsClick}
          className={`${styles.linkButton} ${styles.openLinkBtn}`}
        >
          <FaCog />
          <span className={styles.iconButtonText}>الإجراءات</span>
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
