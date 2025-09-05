import { FaCog } from "react-icons/fa";
import styles from "../../styles.module.css";
import { StudentItemProps as ClassTableRowProps } from "../../../../utils/types";
import { useAdminModal } from "@/contexts/AdminModalContext";
import Button from "@/components/common/Button";

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
          {studentitem.phone}
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
        <Button
          onClick={handleActionsClick}
          variant="primary"
          size="small"
          icon={<FaCog />}
        >
          الإجراءات
        </Button>
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
      <td className={styles.groupCell}>عرض تفاصيل الحلقات</td>

      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.groupName}
        </span>
      </td>
    </tr>
  );
};

export default ClassTableRow;
