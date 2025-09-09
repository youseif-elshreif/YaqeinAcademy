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

  useEffect(() => {
    let cancelled = false;
    const fetchLessons = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!token || !getGroupById) throw new Error("no token");
        const data = await getGroupById(token, groupId);

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
        if (!cancelled) setError("??? ?? ??? ?????? ?????");
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

  const handleAddMonthLessons = async () => {
    if (!token || !groupData || !addLessonToGroup) return;

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

      if (weekdays.length === 0) {
        setError("?? ??? ?????? ??? ???? ???? ????????");
        return;
      }

      const schedule = createLessonSchedule(
        weekdays,
        times,
        groupData.meetingLink || ""
      );

      if (schedule.length === 0) {
        setMonthLessonsInfo("?? ???? ????? ??? ????? ???? ?????.");
        setTimeout(() => {
          setMonthLessonsInfo("");
        }, 3000);
        return;
      }

      for (const lesson of schedule) {
        await addLessonToGroup(token, groupId, lesson);
      }
      setMonthLessonsInfo(`??? ????? ${schedule.length} ??? ?????.`);

    } catch (error) {
      setError("??? ?? ????? ??? ?????");
    } finally {
      setIsAddingMonthLessons(false);
    }
  };

  return (
    <ModalContainer isOpen={true} isClosing={isClosing} onClose={handleClose}>
      <ModalHeader
        title={`??? ????: ${groupName}`}
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
            ????? ??? ?????
          </button>

          <button
            onClick={handleAddMonthLessons}
            disabled={isAddingMonthLessons || loading || !groupData}
            className={`${styles.actionBtn} ${styles.monthBtn}`}
            title="????? ???? ????? ???????? ?? ????? ????? ??? ???? ????????"
          >
            <FaCalendarWeek />
            {isAddingMonthLessons ? "???? ???????..." : "????? ??? ?????"}
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
              <h3>???? ????? ?????...</h3>
            </div>
          ) : error ? (
            <div className={styles.emptyState}>
              <h3 style={{ color: "#e53e3e" }}>{error}</h3>
            </div>
          ) : lessons.length === 0 ? (
            <div className={styles.emptyState}>
              <FaCalendarDay className={styles.emptyIcon} />
              <h3>?? ???? ???</h3>
              <p>?? ??? ????? ?? ??? ???? ?????? ???</p>
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
            label: "?????",
            onClick: handleClose,
            variant: "secondary" as const,
          },
        ]}
      />
    </ModalContainer>
  );
};

export default LessonsModal;
