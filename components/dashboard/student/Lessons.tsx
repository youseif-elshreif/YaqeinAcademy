import React, { useEffect } from "react";
import styles from "./Lessons.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import { useStudentDashboard } from "@/contexts/StudentDashboardContext";

export const Lessons = () => {
  const { getUserLessons, userLessons } = useStudentDashboard();

  useEffect(() => {
    getUserLessons();
    // eslint-disable-next-line
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      dayName: date.toLocaleDateString("ar-EG", {
        weekday: "long",
      }),
    };
  };

  return (
    <div className={styles.lessonsContainer}>
      <div className={styles.taskSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <FaCalendarAlt /> جدول الحصص
          </h3>
          <span className={styles.taskCount}>{userLessons.length} حصة</span>
        </div>
        <div className={styles.tasksList}>
          {userLessons.length === 0 ? (
            <div className={styles.emptyState}>
              <span>لا توجد حصص متاحة</span>
            </div>
          ) : (
            userLessons.map((lesson) => {
              const dateInfo = formatDate(lesson.scheduledAt);
              return (
                <div key={lesson._id} className={styles.taskCard}>
                  <div className={styles.taskHeader}>
                    <h4 className={styles.taskContent}>{dateInfo.dayName}</h4>
                  </div>
                  <div className={styles.taskNotes}>
                    <span className={styles.notesLabel}>التاريخ:</span>
                    <p className={styles.notesText}>{dateInfo.date}</p>
                  </div>
                  <div className={styles.taskNotes}>
                    <span className={styles.notesLabel}>الوقت:</span>
                    <p className={styles.notesText}>{dateInfo.time}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
