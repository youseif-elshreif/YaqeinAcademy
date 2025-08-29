"use client";
import { useEffect, useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import styles from "./LessonsModal.module.css";
import { FaCalendarPlus, FaCalendarCheck, FaCalendarDay } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
} from "@/components/common/Modal";
import LessonCard, { UILessonCard } from "./components/LessonCard";
import { useGroupsContext } from "@/contexts/GroupsContext";
import { useLessonsContext } from "@/contexts/LessonsContext";
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

  const { getGroupById } = useGroupsContext();
  const { lessonsRefreshKey } = useLessonsContext();
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
  }, [groupId, token, getGroupById, lessonsRefreshKey]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeLessonsModal();
      setIsClosing(false);
    }, 300);
  };

  // Formatting handled within LessonCard

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
                <LessonCard
                  key={lesson.id}
                  lesson={lesson as unknown as UILessonCard}
                  onEdit={(l) =>
                    openEditLessonModal({
                      id: l.id,
                      day: l.day,
                      time: l.time,
                      date: l.date,
                      meetingLink: l.meetingLink,
                    })
                  }
                  onDelete={(l) =>
                    openDeleteLessonModal({
                      id: l.id,
                      day: l.day,
                      time: l.time,
                      date: l.date,
                      meetingLink: l.meetingLink,
                    })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ModalActions
        actions={[
          {
            label: "إغلاق",
            onClick: handleClose,
            variant: "secondary" as const,
          },
        ]}
      />
    </ModalContainer>
  );
};

export default LessonsModal;
