import {
  FaTag,
  FaUsers,
  FaExternalLinkAlt,
  FaCopy,
  FaEdit,
} from "react-icons/fa";
import styles from "./StudentTable.module.css";
import {
  formatDate,
  getStatusColor,
  getStatusText,
} from "@/components/TeacherDashboard/MonthlyClassTable/utils";

interface Students {
  id: string;
  name: string;
  payedClasses: number;
  nextPaymentDate: string;
  amountPaid: number;
  remainingClasses: number;
  postponedClasses: number;
  canceledClasses: number;
  absentClasses: number;
  attendedClasses: number;
  rate: number;
  phoneNumber: string;
  groupName: string;
}

interface ClassTableRowProps {
  studentitem: Students;
}

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
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.groupName}
        </span>
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
      <td className={styles.groupCell}>test</td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.phoneNumber}
        </span>
      </td>
      <td className={styles.groupCell}>
        <span className={`${styles.studentName} ${styles.primaryColor}`}>
          {studentitem.groupName}
        </span>
      </td>
    </tr>
  );
};

export default ClassTableRow;

{
  /*
      <td className={styles.dateTimeCell}>
        <div className={styles.dateTimeContent}>
          <span className={`${styles.dateText} ${styles.darkColor}`}>
            {formatDate(studentitem.date)}
          </span>
          <span className={`${styles.timeText} ${styles.primaryColor}`}>
            {studentitem.time}
          </span>
        </div>
      </td>

      <td className={styles.statusCell}>
        <span
          className={`${styles.statusBadge} ${getStatusColor(
            studentitem.status
          )}`}
        >
          {getStatusText(studentitem.status)}
        </span>
      </td>

      <td className={styles.linkCell}>
        <div className={styles.linkContainer}>
          <button
            className={`${styles.linkButton} ${styles.openLinkBtn}`}
            onClick={() => handleOpenLink(studentitem.classLink!)}
            title="فتح رابط الحصة"
          >
            <FaExternalLinkAlt />
            <span>دخول الحصة</span>
          </button>
          <button
            className={`${styles.linkButton} ${styles.copyLinkBtn}`}
            onClick={() => handleCopyLink(studentitem.classLink!)}
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

      <td className={styles.rateCell}>
        {studentitem.students.length > 1 ? (
          <span className={`${styles.groupRate} ${styles.primaryColor}`}>
            ⭐ {studentitem.groupRate}/10
          </span>
        ) : studentitem.students[0].rate ? (
          <span className={`${styles.rate} ${styles.primaryColor}`}>
            ⭐ {studentitem.students[0].rate}/10
          </span>
        ) : (
          <span className={`${styles.lightColor}`}>-</span>
        )}
      </td>

      <td className={styles.actionsCell}>
        <div className={styles.actionButtons}>
          {(studentitem.status === "pending" ||
            studentitem.status === "postponed") && (
            <>
              <button
                className={`${styles.baseButton} ${styles.actionBtn} ${styles.completeBtn}`}
              >
                إكمال الحصة
              </button>
              <button
                className={`${styles.baseButton} ${styles.actionBtn} ${styles.postponeBtn}`}
              >
                {studentitem.status === "postponed"
                  ? "تعديل/إلغاء"
                  : "تأجيل/إلغاء"}
              </button>
            </>
          )}
          {studentitem.status === "completed" && (
            <button
              className={`${styles.baseButton} ${styles.actionBtn} ${styles.viewBtn}`}
              onClick={() => {
                /* Navigate to student record */
  /*}}
            >
              عرض التفاصيل
            </button>
          )}
          {studentitem.status === "cancelled" && (
            <span className={styles.cancelledText}>تم الإلغاء</span>
          )}
        </div>
      </td> */
}
