import React, { useEffect, useState } from "react";
import styles from "./Lessons.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import { useStudentDashboard } from "@/src/contexts/StudentDashboardContext";
import SkeletonCards from "@/src/components/common/UI/Skeleton/SkeletonCards";
export const Lessons = () => {
  const { getUserLessons, userLessons, userStats } = useStudentDashboard();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        await getUserLessons();
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [getUserLessons]);
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
  const availableCredits = userStats?.PrivitelessonCredits || 0;
  const displayedLessons = userLessons.slice(0, availableCredits);
  if (loading) {
    return (
      <div className={styles.lessonsContainer}>
        <div className={styles.taskSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <FaCalendarAlt /> الحلقات المتاحة
            </h3>
            <span className={styles.taskCount}>0 درس</span>
          </div>
          <SkeletonCards cards={3} type="lesson" />
        </div>
      </div>
    );
  }
  if (availableCredits === 0) {
    return (
      <div className={styles.lessonsContainer}>
        <div className={styles.taskSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <FaCalendarAlt /> لا توجد حلقات
            </h3>
            <span className={styles.taskCount}>0 درس</span>
          </div>
          <div className={styles.emptyState}>
            <span style={{ color: "var(--warning-color)", fontWeight: "bold" }}>
              لا توجد حلقات متاحة
            </span>
            <p style={{ marginTop: "0.5rem", color: "var(--text-light)" }}>
              يرجى التحقق من توفر الحلقات
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.lessonsContainer}>
      <div className={styles.taskSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <FaCalendarAlt /> الحلقات المتاحة
          </h3>
          <span className={styles.taskCount}>
            {displayedLessons.length} حلقة {availableCredits} حلقة متاحة
          </span>
        </div>
        <div className={styles.tasksList}>
          {displayedLessons.length === 0 ? (
            <div className={styles.emptyState}>
              <span>لا توجد حلقات متاحة</span>
              <p style={{ marginTop: "0.5rem", color: "var(--text-light)" }}>
                يرجى التحقق من توفر الحلقات
              </p>
            </div>
          ) : (
            displayedLessons.map((lesson) => {
              const dateInfo = formatDate(lesson.scheduledAt);
              return (
                <div key={lesson._id} className={styles.taskCard}>
                  <div className={styles.taskHeader}>
                    <h4 className={styles.taskContent}>{dateInfo.dayName}</h4>
                  </div>
                  <div className={styles.taskNotes}>
                    <span className={styles.notesLabel}>تاريخ الحلقة:</span>
                    <p className={styles.notesText}>{dateInfo.date}</p>
                  </div>
                  <div className={styles.taskNotes}>
                    <span className={styles.notesLabel}>وقت الحلقة:</span>
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
