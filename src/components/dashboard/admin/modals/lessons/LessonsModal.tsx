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
import ConfirmAddMonthLessonsModal from "./ConfirmAddMonthLessonsModal";
import { useGroupsContext } from "@/src/contexts/GroupsContext";
import { useLessonsContext } from "@/src/contexts/LessonsContext";
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
  const [monthLessonsInfo, setMonthLessonsInfo] = useState("");
  const [showConfirmAddModal, setShowConfirmAddModal] = useState(false);

  const { getGroupById } = useGroupsContext();
  const { lessonsRefreshKey, addLessonToGroup } = useLessonsContext();

  useEffect(() => {
    let cancelled = false;
    const fetchLessons = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getGroupById(groupId);
        setGroupData(data?.group || data);

        const apiLessons = (data?.group?.lessons || data.lessons) ?? [];
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
      } catch {
        if (!cancelled) setError("خطأ في جلب الحلقات");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchLessons();
    return () => {
      cancelled = true;
    };
  }, [groupId, getGroupById, lessonsRefreshKey]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeLessonsModal();
      setIsClosing(false);
    }, 300);
  };

  const handleAddMonthLessons = async () => {
    setShowConfirmAddModal(true);
  };

  const handleConfirmAddMonthLessons = async () => {
    if (!groupData || !addLessonToGroup) return;

    try {
      setIsAddingMonthLessons(true);
      setMonthLessonsInfo("");

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

      if (
        groupData.usualDate?.fourthDay &&
        groupData.usualDate?.fourthDayTime
      ) {
        weekdays.push(groupData.usualDate.fourthDay);
        times.push(groupData.usualDate.fourthDayTime);
      }

      if (groupData.usualDate?.fifthDay && groupData.usualDate?.fifthDayTime) {
        weekdays.push(groupData.usualDate.fifthDay);
        times.push(groupData.usualDate.fifthDayTime);
      }

      if (groupData.usualDate?.sixthDay && groupData.usualDate?.sixthDayTime) {
        weekdays.push(groupData.usualDate.sixthDay);
        times.push(groupData.usualDate.sixthDayTime);
      }

      if (
        groupData.usualDate?.seventhDay &&
        groupData.usualDate?.seventhDayTime
      ) {
        weekdays.push(groupData.usualDate.seventhDay);
        times.push(groupData.usualDate.seventhDayTime);
      }

      if (weekdays.length === 0) {
        setError("لا يمكن إضافة حلقات جديدة بدون تحديد أيام حلقات معتادة");
        return;
      }

      const schedule = createLessonSchedule(
        weekdays,
        times,
        groupData.meetingLink || ""
      );

      if (schedule.length === 0) {
        setMonthLessonsInfo(
          "لا يمكن إضافة حلقات جديدة بدون تحديد أيام حلقات معتادة."
        );
        setTimeout(() => {
          setMonthLessonsInfo("");
        }, 3000);
        return;
      }

      for (const lesson of schedule) {
        await addLessonToGroup(groupId, lesson);
      }
      setMonthLessonsInfo(`تم إضافة ${schedule.length} درس جديد.`);
    } catch (error) {
      setError("خطأ في إضافة الحلقات");
      throw error;
    } finally {
      setIsAddingMonthLessons(false);
    }
  };

  return (
    <>
      <ModalContainer isOpen={true} isClosing={isClosing} onClose={handleClose}>
        <ModalHeader
          title={`إدارة الحلقات: ${groupName}`}
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
              إضافة درس جديد
            </button>

            <button
              onClick={handleAddMonthLessons}
              disabled={isAddingMonthLessons || loading || !groupData}
              className={`${styles.actionBtn} ${styles.monthBtn}`}
              title="إضافة حلقات جديدة لهذا الشهر"
            >
              <FaCalendarWeek />
              {isAddingMonthLessons ? "إضافة الحلقات..." : "إضافة حلقات الشهر"}
            </button>
          </div>

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
                <h3>جاري تحميل الحلقات...</h3>
              </div>
            ) : error ? (
              <div className={styles.emptyState}>
                <h3 style={{ color: "#e53e3e" }}>{error}</h3>
              </div>
            ) : lessons.length === 0 ? (
              <div className={styles.emptyState}>
                <FaCalendarDay className={styles.emptyIcon} />
                <h3>لا توجد حلقات</h3>
                <p>لم يتم إضافة أي حلقات للحلقة بعد.</p>
              </div>
            ) : (
              <div className={styles.lessonsGrid}>
                {lessons.map(
                  (lesson) =>
                    lesson.status == "scheduled" && (
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
                    )
                )}
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

      <ConfirmAddMonthLessonsModal
        isOpen={showConfirmAddModal}
        onClose={() => setShowConfirmAddModal(false)}
        groupName={groupName}
        onConfirmAdd={handleConfirmAddMonthLessons}
      />
    </>
  );
};

export default LessonsModal;
