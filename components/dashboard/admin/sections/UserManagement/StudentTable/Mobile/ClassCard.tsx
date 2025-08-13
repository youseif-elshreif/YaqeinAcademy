import { FaTag, FaExternalLinkAlt, FaCopy, FaEdit } from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
// import { formatDate, getStatusColor, getStatusText } from "../utils";
// import { useModal } from "@/contexts/ModalContext";
import { MdDeleteOutline } from "react-icons/md";
import { Student } from "@/utils/types";

interface MonthlyClassTableProps {
  studentItem: Student;
}
const ClassCard = ({ studentItem }: MonthlyClassTableProps) => {
  // Function to copy class link to clipboard
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      console.log("تم نسخ الرابط بنجاح");
    } catch (err) {
      console.error("فشل في نسخ الرابط:", err);
    }
  };

  // Function to open link in new tab
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // Function to handle editing a class link
  // const handleEditLink = (teacherData: Teacher) => {
  //   openAddClassLinkModal(teacherData);
  // };

  return (
    <div key={studentItem.id} className={styles.classCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <h3 className={`${styles.cardStudentName} ${styles.clickableText}`}>
            {studentItem.name}
          </h3>
        </div>
        <span className={styles.statusBadge}></span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الرقم التعريفي:</span>
            <span className={styles.infoValue}>{studentItem.id}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رقم الهاتف:</span>
            <span className={styles.infoValue}>{studentItem.phoneNumber}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص المدفوعة:</span>
            <span className={styles.infoValue}>{studentItem.payedClasses}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>تاريخ الدفع:</span>
            <span className={styles.infoValue}>
              {studentItem.nextPaymentDate}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>المبلغ المدفوع:</span>
            <span className={styles.infoValue}>
              {studentItem.amountPaid} ج.م
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص المتبقية:</span>
            <span className={styles.infoValue}>
              {studentItem.remainingClasses}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص المؤجلة:</span>
            <span className={styles.infoValue}>
              {studentItem.postponedClasses}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص الملغاة:</span>
            <span className={styles.infoValue}>
              {studentItem.canceledClasses}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>مرات الغياب:</span>
            <span className={styles.infoValue}>
              {studentItem.absentClasses}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص التي حضرت:</span>
            <span className={styles.infoValue}>
              {studentItem.attendedClasses}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>التقييم:</span>
            <span className={styles.infoValue}>{studentItem.rate}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>المجموعة:</span>
            <span className={styles.infoValue}>{studentItem.groupName}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الإجرائات:</span>
            <span className={styles.cardLinkContainer}>
              <button className={`${styles.linkButton} ${styles.openLinkBtn}`}>
                <FaTag />
                <span className={styles.iconButtonText}>تعديل</span>
              </button>
              <button className={styles.closeBtn}>
                <MdDeleteOutline />
                <span className={styles.iconButtonText}>حدف</span>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
