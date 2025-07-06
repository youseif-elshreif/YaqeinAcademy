import styles from "./CourseCard.module.css";

interface CourseCardProps {
  title: string;
  teacherName: string;
  startDate: string;
  duration: string;
  shortDescription: string;
  showBtn?: boolean;
}

const CourseCard = ({
  title,
  teacherName,
  startDate,
  duration,
  shortDescription,
  showBtn,
}: CourseCardProps) => {
  return (
    <div className={`${styles.card}`}>
      {/* edite and delete btns */}
      {!showBtn && (
        <div className={styles.cardActions}>
          <button className={`btn-secondary ${styles.editButton}`}>
            تعديل
          </button>
          <button className={`btn-secondary ${styles.deleteButton}`}>
            حذف
          </button>
        </div>
      )}
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
    </div>
  );
};

export default CourseCard;
