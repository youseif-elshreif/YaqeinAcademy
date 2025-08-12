import { FaTag, FaExternalLinkAlt, FaCopy, FaEdit } from "react-icons/fa";
import styles from "../../../styles.module.css";
// import { formatDate, getStatusColor, getStatusText } from "../utils";
// import { useModal } from "@/contexts/ModalContext";
import { MdDeleteOutline } from "react-icons/md";
import { TeacherItemProps } from "../../../../../utils/types";

const ClassCard = ({ teacher }: TeacherItemProps) => {
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
    <div key={teacher.id} className={styles.classCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <h3 className={`${styles.cardStudentName} ${styles.clickableText}`}>
            {teacher.name}
          </h3>
        </div>
        <span className={styles.statusBadge}></span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الرقم التعريفي:</span>
            <span className={styles.infoValue}>{teacher.id}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رقم الهاتف:</span>
            <span className={styles.infoValue}>{teacher.phoneNumber}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>سعر الحصة:</span>
            <span className={styles.infoValue}>
              {teacher.pricePerClass} ج.م
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>المستحق خلال الشهر:</span>
            <span className={styles.infoValue}>
              {teacher.totalDueThisMonth} ج.م
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص خلال الشهر:</span>
            <span className={styles.infoValue}>
              {teacher.totalClassesThisMonth}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص التي اتمها:</span>
            <span className={styles.infoValue}>{teacher.completedClasses}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص المتبقية:</span>
            <span className={styles.infoValue}>{teacher.remainingClasses}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص المؤجلة:</span>
            <span className={styles.infoValue}>{teacher.postponedClasses}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص الملغاة:</span>
            <span className={styles.infoValue}>{teacher.canceledClasses}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>مرات الغياب:</span>
            <span className={styles.infoValue}>{teacher.absentClasses}</span>
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

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رابط الحصة:</span>
            <div className={styles.infoValue}>
              <div className={styles.cardLinkContainer}>
                <button
                  className={`${styles.linkButton} ${styles.openLinkBtn} ${styles.cardLinkBtn}`}
                  onClick={() => handleOpenLink(teacher.classLink!)}
                  title="فتح رابط الحصة"
                >
                  <FaExternalLinkAlt />
                  <span>دخول الحصة</span>
                </button>
                <button
                  className={`${styles.linkButton} ${styles.copyLinkBtn} ${styles.cardCopyBtn}`}
                  onClick={() => handleCopyLink(teacher.classLink!)}
                  title="نسخ رابط الحصة"
                >
                  <FaCopy />
                </button>
                <button
                  className={`${styles.linkButton} ${styles.addLinkBtn} ${styles.cardLinkBtn}`}
                  // onClick={() => handleEditLink(teacher)}
                  title="تعديل رابط الحصة"
                >
                  <FaEdit />
                  <span>تعديل</span>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>المجموعات:</span>
            <span className={styles.infoValue}>
              {teacher.assignedGroups.join(", ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
