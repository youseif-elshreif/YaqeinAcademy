import { useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import styles from "./LessonsModal.module.css";
import {
  FaTimes,
  FaCalendarPlus,
  FaCalendarCheck,
  FaEdit,
  FaTrash,
  FaClock,
  FaCalendarDay,
} from "react-icons/fa";

interface LessonsModalProps {
  groupId: string;
  groupName: string;
}

interface Lesson {
  id: string;
  day: string;
  time: string;
  date: string;
}

const LessonsModal: React.FC<LessonsModalProps> = ({ groupId, groupName }) => {
  const {
    closeLessonsModal,
    openAddLessonModal,
    openEditLessonModal,
    openDeleteLessonModal,
  } = useAdminModal();

  const [isClosing, setIsClosing] = useState(false);

  // بيانات افتراضية للحصص
  const [lessons] = useState<Lesson[]>([
    {
      id: "1",
      day: "الأحد",
      time: "10:00",
      date: "2025-01-15",
    },
    {
      id: "2",
      day: "الثلاثاء",
      time: "14:00",
      date: "2025-01-17",
    },
    {
      id: "3",
      day: "الخميس",
      time: "16:00",
      date: "2025-01-19",
    },
  ]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeLessonsModal();
      setIsClosing(false);
    }, 300);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "م" : "ص";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ""}`}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modalSlideOut : ""}`}
      >
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <FaCalendarCheck className={styles.titleIcon} />
            حصص حلقة: {groupName}
          </div>
          <button onClick={handleClose} className={styles.closeBtn}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.actionsBar}>
            <button
              onClick={openAddLessonModal}
              className={`${styles.actionBtn} ${styles.addBtn}`}
            >
              <FaCalendarPlus />
              إضافة حصة جديدة
            </button>
          </div>

          <div className={styles.lessonsContainer}>
            {lessons.length === 0 ? (
              <div className={styles.emptyState}>
                <FaCalendarDay className={styles.emptyIcon} />
                <h3>لا توجد حصص</h3>
                <p>لم يتم جدولة أي حصص لهذه الحلقة بعد</p>
              </div>
            ) : (
              <div className={styles.lessonsGrid}>
                {lessons.map((lesson) => (
                  <div key={lesson.id} className={styles.lessonCard}>
                    <div className={styles.lessonHeader}>
                      <div className={styles.lessonInfo}>
                        <h3 className={styles.lessonDay}>{lesson.day}</h3>
                        <div className={styles.lessonDetails}>
                          <span className={styles.lessonTime}>
                            <FaClock className={styles.detailIcon} />
                            {formatTime(lesson.time)}
                          </span>
                          <span className={styles.lessonDate}>
                            <FaCalendarDay className={styles.detailIcon} />
                            {formatDate(lesson.date)}
                          </span>
                        </div>
                      </div>
                      <div className={styles.lessonActions}>
                        <button
                          onClick={() =>
                            openEditLessonModal({
                              id: lesson.id,
                              day: lesson.day,
                              time: lesson.time,
                              date: lesson.date,
                            })
                          }
                          className={`${styles.actionBtn} ${styles.editBtn}`}
                          title="تعديل الحصة"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() =>
                            openDeleteLessonModal({
                              id: lesson.id,
                              day: lesson.day,
                              time: lesson.time,
                              date: lesson.date,
                            })
                          }
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          title="حذف الحصة"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button onClick={handleClose} className={styles.closeButton}>
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonsModal;
