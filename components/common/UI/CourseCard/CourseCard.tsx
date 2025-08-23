"use client";

import styles from "./CourseCard.module.css";
import { FaTag } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface CourseCardProps {
  id?: string; // Changed from number to string
  title: string;
  startDate: string;
  shortDescription: string;
  showBtn?: boolean;
  isAdminView?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  telegramLink?: string;
  duration?: string;
}

const CourseCard = ({
  title,
  startDate,
  shortDescription,
  showBtn,
  isAdminView = false,
  onEdit,
  onDelete,
  telegramLink,
  duration,
}: CourseCardProps) => {
  const handleEdit = () => {
    if (isAdminView && onEdit) {
      onEdit();
    }
  };

  const handleDelete = () => {
    if (isAdminView && onDelete) {
      onDelete();
    }
  };

  const handleBookNow = () => {
    if (telegramLink) {
      window.open(telegramLink, "_blank");
    } else {
      console.log("لا يوجد رابط تليجرام متاح");
    }
  };

  return (
    <div className={`${styles.card}`}>
      {/* edite and delete btns */}
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.description}>{shortDescription}</p>

        <div className={styles.courseInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>تاريخ البداية:</span>
            <span className={styles.value}>{startDate}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>مدة الدورة:</span>
            <span className={styles.value}>{duration}</span>
          </div>
        </div>
      </div>

      {showBtn && (
        <div className={styles.cardFooter}>
          <button
            className={`btn-primary ${styles.bookButton}`}
            onClick={handleBookNow}
          >
            احجز الآن
          </button>
        </div>
      )}
      {!showBtn && isAdminView && (
        <div className={styles.cardActions}>
          <button
            className={`${styles.linkButton} ${styles.openLinkBtn}`}
            onClick={handleEdit}
          >
            <FaTag />
            <span className={styles.iconButtonText}>تعديل</span>
          </button>
          <button className={styles.closeBtn} onClick={handleDelete}>
            <MdDeleteOutline />
            <span className={styles.iconButtonText}>حذف</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
