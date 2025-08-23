"use client";
import { useEffect, useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import styles from "./LessonsModal.module.css";
import {
  FaCalendarPlus,
  FaCalendarCheck,
  FaEdit,
  FaTrash,
  FaClock,
  FaCalendarDay,
} from "react-icons/fa";
import { ModalContainer, ModalHeader } from "@/components/common/Modal";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import { useAuth } from "@/contexts/AuthContext";

interface LessonsModalProps {
  groupId: string;
  groupName: string;
}

interface UILesson {
  id: string;
  day: string;
  time: string; // HH:mm 24h
  date: string; // ISO string
  meetingLink?: string;
  status?: string;
}

const LessonsModal: React.FC<LessonsModalProps> = ({ groupId, groupName }) => {
  const {
    closeLessonsModal,
    openAddLessonModal,
    openEditLessonModal,
    openDeleteLessonModal,
  } = useAdminModal();

  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lessons, setLessons] = useState<UILesson[]>([]);

  const { getGroupById } = useAdminDashboardContext();
  const { token } = useAuth();

  // Fetch group lessons when modal opens
  useEffect(() => {
    let cancelled = false;
    const fetchLessons = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!token || !getGroupById) throw new Error("no token");
        const data = await getGroupById(token, groupId);
        const apiLessons = data?.group?.lessons ?? [];
        const mapped: UILesson[] = apiLessons.map((l) => {
          const d = new Date(l.scheduledAt);
          const day = d.toLocaleDateString("ar-EG", { weekday: "long" });
          const hh = String(d.getHours()).padStart(2, "0");
          const mm = String(d.getMinutes()).padStart(2, "0");
          return {
            id: l._id,
            day,
            time: `${hh}:${mm}`,
            date: d.toISOString(),
            meetingLink: l.meetingLink,
            status: l.status,
          };
        });
        if (!cancelled) setLessons(mapped);
      } catch (e) {
        console.error("Error loading lessons:", e);
        if (!cancelled) setError("فشل في جلب بيانات الحصص");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchLessons();
    return () => {
      cancelled = true;
    };
  }, [groupId, token, getGroupById]);

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
    <ModalContainer isOpen={true} isClosing={isClosing}>
      <ModalHeader
        title={`حصص حلقة: ${groupName}`}
        icon={<FaCalendarCheck />}
        onClose={handleClose}
      />

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
          {loading ? (
            <div className={styles.emptyState}>
              <FaCalendarDay className={styles.emptyIcon} />
              <h3>جاري تحميل الحصص...</h3>
            </div>
          ) : error ? (
            <div className={styles.emptyState}>
              <h3 style={{ color: "#e53e3e" }}>{error}</h3>
            </div>
          ) : lessons.length === 0 ? (
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
                        title="تعديل الحلقة"
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
                        title="حذف الحلقة"
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
    </ModalContainer>
  );
};

export default LessonsModal;
