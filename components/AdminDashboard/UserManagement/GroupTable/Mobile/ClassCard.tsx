import { FaTag, FaExternalLinkAlt, FaCopy, FaEdit } from "react-icons/fa";
import styles from "../../../styles.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { Group } from "../../types";

interface ClassCardProps {
  groupItem: Group;
}
const ClassCard = ({ groupItem }: ClassCardProps) => {
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
    <div key={groupItem.id} className={styles.classCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <h3 className={`${styles.cardStudentName} ${styles.clickableText}`}>
            {groupItem.name}
          </h3>
        </div>
        <span className={styles.statusBadge}></span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}> المدرس:</span>
            <span className={styles.infoValue}>{groupItem.teacherName}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>موعد الحصة :</span>
            <span className={styles.infoValue}>{groupItem.classDate}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص :</span>
            <span className={styles.infoValue}>{groupItem.totalClasses}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص المؤجلة:</span>
            <span className={styles.infoValue}>
              {groupItem.postponedClasses}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص المتبقية:</span>
            <span className={styles.infoValue}>
              {groupItem.remainingClasses}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الحصص الملغية:</span>
            <span className={styles.infoValue}>
              {groupItem.canceledClasses}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الطلاب:</span>
            <span className={styles.infoValue}>
              {groupItem.students.join(", ")}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رابط الحصة:</span>
            <div className={styles.infoValue}>
              <div className={styles.cardLinkContainer}>
                <button
                  className={`${styles.linkButton} ${styles.openLinkBtn} ${styles.cardLinkBtn}`}
                  onClick={() => handleOpenLink(groupItem.classLink!)}
                  title="فتح رابط الحصة"
                >
                  <FaExternalLinkAlt />
                  <span>دخول الحصة</span>
                </button>
                <button
                  className={`${styles.linkButton} ${styles.copyLinkBtn} ${styles.cardCopyBtn}`}
                  onClick={() => handleCopyLink(groupItem.classLink!)}
                  title="نسخ رابط الحصة"
                >
                  <FaCopy />
                </button>
                <button
                  className={`${styles.linkButton} ${styles.addLinkBtn} ${styles.cardLinkBtn}`}
                  // onClick={() => handleEditLink(teacherItem)}
                  title="تعديل رابط الحصة"
                >
                  <FaEdit />
                  <span>تعديل</span>
                </button>
              </div>
            </div>
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
