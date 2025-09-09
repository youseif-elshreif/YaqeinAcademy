"use client";
import { useEffect, useState } from "react";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import styles from "./LessonsModal.module.css";
import {
  FaCalendarPlus,
  FaCalendarCheck,
  FaCalendarDay,
  FaCalendarWeek,
} from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
} from "@/src/components/common/Modal";
import LessonCard from "./components/LessonCard";
import { useGroupsContext } from "@/src/contexts/GroupsContext";
import { useLessonsContext } from "@/src/contexts/LessonsContext";
import { useAuth } from "@/src/contexts/AuthContext";
import { createLessonSchedule } from "@/src/utils/date";
import {
  LessonsModalProps,
  UILesson,
  UILessonCard,
} from "@/src/types/admin.types";

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
  const [groupData, setGroupData] = useState<any>(null);
  const [isAddingMonthLessons, setIsAddingMonthLessons] = useState(false);
  const [monthLessonsInfo, setMonthLessonsInfo] = useState<string>("");

  const { getGroupById } = useGroupsContext();
  const { lessonsRefreshKey, addLessonToGroup } = useLessonsContext();
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

        // Store group data for schedule generation
        setGroupData(data?.group);

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

  // Function to add remaining lessons for the month
  const handleAddMonthLessons = async () => {
    if (!token || !groupData || !addLessonToGroup) return;

    try {
      setIsAddingMonthLessons(true);
      setMonthLessonsInfo("");

      // Extract weekdays and times from group data
      const weekdays: string[] = [];
      const times: string[] = [];

      if (groupData.usualDate?.firstDay && groupData.usualDate?.firstDayTime) {
        weekdays.push(groupData.usualDate.firstDay);
        times.push(groupData.usualDate.firstDayTime);
      }
      if (
        groupData.usualDate?.secondDay &&
        groupData.usualDate?.secondDayTime
      ) {
        weekdays.push(groupData.usualDate.secondDay);
        times.push(groupData.usualDate.secondDayTime);
      }
      if (groupData.usualDate?.thirdDay && groupData.usualDate?.thirdDayTime) {
        weekdays.push(groupData.usualDate.thirdDay);
        times.push(groupData.usualDate.thirdDayTime);
      }

      if (weekdays.length === 0) {
        setError("لم يتم العثور على جدول زمني للمجموعة");
        return;
      }

      // Generate lesson schedule using the date utility
      const schedule = createLessonSchedule(
        weekdays,
        times,
        groupData.meetingLink || ""
      );

      if (schedule.length === 0) {
        setMonthLessonsInfo("لا يمكن إضافة حصص جديدة لهذا الشهر.");
        setTimeout(() => {
          setMonthLessonsInfo("");
        }, 3000);
        return;
      }

      // Add each lesson to the group
      for (const lesson of schedule) {
        await addLessonToGroup(token, groupId, lesson);
      }
      setMonthLessonsInfo(`تمت إضافة ${schedule.length} حصة بنجاح.`);
      // The useEffect will automatically refresh the lessons list due to lessonsRefreshKey
    } catch (error) {
      setError("فشل في إضافة حصص الشهر");
    } finally {
      setIsAddingMonthLessons(false);
    }
  };

  // Formatting handled within LessonCard

  return (
    <ModalContainer isOpen={true} isClosing={isClosing} onClose={handleClose}>
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

          <button
            onClick={handleAddMonthLessons}
            disabled={isAddingMonthLessons || loading || !groupData}
            className={`${styles.actionBtn} ${styles.monthBtn}`}
            title="إضافة جميع الحصص المتبقية في الشهر بناءً على جدول المجموعة"
          >
            <FaCalendarWeek />
            {isAddingMonthLessons ? "جاري الإضافة..." : "إضافة حصص الشهر"}
          </button>
        </div>

        {/* رسالة عند إضافة حصص الشهر */}
        {monthLessonsInfo && (
          <div
            style={{
              textAlign: "center",
              color: "#e53e3e",
              marginBottom: "1rem",
              fontWeight: 500,
            }}
          >
            {monthLessonsInfo}
          </div>
        )}

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
