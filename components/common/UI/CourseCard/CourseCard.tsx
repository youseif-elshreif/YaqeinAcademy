"use client";

import styles from "./CourseCard.module.css";
import { FaTag } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useAdminModal } from "@/contexts/AdminModalContext";

interface CourseCardProps {
  id?: number;
  title: string;
  teacherName: string;
  startDate: string;
  duration: string;
  shortDescription: string;
  showBtn?: boolean;
  isAdminView?: boolean;
}

const CourseCard = ({
  id,
  title,
  teacherName,
  startDate,
  duration,
  shortDescription,
  showBtn,
  isAdminView = true,
}: CourseCardProps) => {
  const { openEditCourseModal, openDeleteCourseModal } = useAdminModal();

  const handleEdit = () => {
    if (isAdminView && id) {
      console.log("تعديل الكورس:", id);
      openEditCourseModal(id);
    }
  };

  const handleDelete = () => {
    if (isAdminView && id) {
      console.log("حذف الكورس:", id);
      openDeleteCourseModal(id);
    }
  };

  return (
    <div className={`${styles.card}`}>
      {/* edite and delete btns */}
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.teacher}>الأستاذ: {teacherName}</p>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.description}>{shortDescription}</p>

        <div className={styles.courseInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>تاريخ البداية:</span>
            <span className={styles.value}>{startDate}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>المدة:</span>
            <span className={styles.value}>{duration}</span>
          </div>
        </div>
      </div>

      {showBtn && (
        <div className={styles.cardFooter}>
          <button className={`btn-primary ${styles.bookButton}`}>
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
