"use client";
import React from "react";
import styles from "../LessonsModal.module.css";
import {
  FaClock,
  FaCalendarDay,
  FaExternalLinkAlt,
  FaCopy,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export interface UILessonCard {
  id: string;
  day: string;
  time: string; // HH:mm 24h
  date: string; // ISO string
  meetingLink?: string;
  status?: string;
}

interface LessonCardProps {
  lesson: UILessonCard;
  showActions?: boolean; // default true
  onEdit?: (l: UILessonCard) => void;
  onDelete?: (l: UILessonCard) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "م" : "ص";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      // You can add a toast notification here
      console.log("تم نسخ الرابط بنجاح");
    } catch (err) {
      console.error("فشل في نسخ الرابط:", err);
    }
  };

  // Function to open link in new tab
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
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
    <div className={styles.lessonCard}>
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
            {lesson.meetingLink ? (
              <div className={styles.linkContainer}>
                <button
                  className={`${styles.linkButton} ${styles.openLinkBtn}`}
                  title="فتح رابط الحلقة"
                  onClick={() => handleOpenLink(lesson.meetingLink)}
                >
                  <FaExternalLinkAlt />
                  <span>دخول الحلقة</span>
                </button>
                <button
                  className={`${styles.linkButton} ${styles.copyLinkBtn}`}
                  title="نسخ رابط الحلقة"
                  onClick={() => handleCopyLink(lesson.meetingLink)}
                >
                  <FaCopy />
                </button>
              </div>
            ) : null}
          </div>
        </div>
        {showActions && onEdit && onDelete && (
          <div className={styles.lessonActions}>
            <button
              onClick={() => onEdit(lesson)}
              className={`${styles.actionBtn} ${styles.editBtn}`}
              title="تعديل الحلقة"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(lesson)}
              className={`${styles.actionBtn} ${styles.deleteBtn}`}
              title="حذف الحلقة"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonCard;
