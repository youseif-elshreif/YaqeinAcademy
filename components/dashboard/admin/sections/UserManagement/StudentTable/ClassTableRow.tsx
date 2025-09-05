import { FaCog, FaListUl } from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";
import Button from "@/components/common/Button";

interface ClassTableRowProps {
  studentitem: any; // Student from API
}

const ClassTableRow = ({ studentitem }: ClassTableRowProps) => {
  const { openUserActionsModal, openStudentReportsModal } = useAdminModal();

  const handleActionsClick = () => {
    openUserActionsModal({
      id: studentitem._id,
      name: studentitem.name,
      userType: "student",
      fullData: studentitem, // تمرير البيانات الكاملة
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ar-EG");
  };

  return (
    <tr key={studentitem._id} className={styles.tableRow}>
      <td className={`${styles.studentCell} ${styles.firstCell}`}>
        <span
          className={`${styles.studentName} ${styles.clickableTextWithChildren} ${styles.darkColor}`}
        >
          {studentitem.name}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.email}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.phone}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.PrivitelessonCredits}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.age || "-"}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.country || "-"}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.quranMemorized || "-"}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.numOfPartsofQuran || 0}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {formatDate(studentitem.createdAt)}
        </span>
      </td>
      <td>
        <div className={styles.linkContainer}>
          <Button
            onClick={() =>
              openStudentReportsModal({
                id: studentitem._id,
                name: studentitem.name,
              })
            }
            variant="primary"
            size="small"
            icon={<FaListUl />}
          >
            عرض التقارير
          </Button>
        </div>
      </td>
      <td>
        <div className={styles.linkContainer}>
          <Button
            onClick={handleActionsClick}
            variant="primary"
            size="small"
            icon={<FaCog />}
          >
            الإجراءات
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ClassTableRow;
