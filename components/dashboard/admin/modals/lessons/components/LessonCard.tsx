"use client";
import React from "react";
import styles from "../LessonsModal.module.css";
import { FaClock, FaCalendarDay, FaEdit, FaTrash } from "react-icons/fa";
import MeetingLinkActions from "@/components/common/MeetingLinkActions";
import Button from "@/components/common/Button";
import { UILessonCard, LessonCardProps } from "@/types/admin.types";

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
              <MeetingLinkActions
                meetingLink={lesson.meetingLink}
                styles={styles}
              />
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


