"use client";
import React from "react";
import {
  FiCalendar,
  FiClock,
  FiStar,
  FiFileText,
  FiBookOpen,
  FiTarget,
} from "react-icons/fi";
import styles from "./ReportsModal.module.css";

interface ReportCardProps {
  report: any;
  showLessonId?: boolean;
}

const ReportCard: React.FC<ReportCardProps> = ({
  report,
  showLessonId = false,
}) => {
  const lessonId =
    typeof report.lessonId === "string"
      ? report.lessonId
      : report.lessonId?._id || "-";

  const created = report.createdAt
    ? new Date(report.createdAt).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  // إذا كان الطالب غائب، نعرض فقط التاريخ والحالة
  if (!report.attended) {
    return (
      <div className={`${styles.reportCard} ${styles.absentCard}`}>
        <div className={styles.reportHeader}>
          <div className={styles.reportMeta}>
            {showLessonId && (
              <span className={styles.lessonId}>
                <FiCalendar className={styles.metaIcon} />
                حصة رقم: {String(lessonId).slice(-6)}
              </span>
            )}
            <span className={styles.reportDate}>
              <FiClock className={styles.metaIcon} />
              {created}
            </span>
          </div>
        </div>

        <div className={styles.reportStatus}>
          <div className={`${styles.statusBadge} ${styles.statusDanger}`}>
            غائب
          </div>
        </div>

        <div className={styles.absentMessage}>
          <p>لم يحضر الطالب هذه الحصة</p>
        </div>
      </div>
    );
  }

  // إذا كان الطالب حاضر، نعرض كل التفاصيل
  return (
    <div className={styles.reportCard}>
      <div className={styles.reportHeader}>
        <div className={styles.reportMeta}>
          {showLessonId && (
            <span className={styles.lessonId}>
              <FiCalendar className={styles.metaIcon} />
              حصة رقم: {String(lessonId).slice(-6)}
            </span>
          )}
          <span className={styles.reportDate}>
            <FiClock className={styles.metaIcon} />
            {created}
          </span>
        </div>
        {typeof report.rating === "number" && (
          <div className={styles.ratingBadge}>
            <FiStar className={styles.ratingIcon} />
            {report.rating}/5
          </div>
        )}
      </div>

      <div className={styles.reportStatus}>
        <div className={`${styles.statusBadge} ${styles.statusSuccess}`}>
          حضر
        </div>
        {typeof report.completeLesson === "boolean" && (
          <div
            className={`${styles.statusBadge} ${
              report.completeLesson
                ? styles.statusSuccess
                : styles.statusWarning
            }`}
          >
            {report.completeLesson ? "مكتملة" : "غير مكتملة"}
          </div>
        )}
        {typeof report.doneHomework === "boolean" && (
          <div
            className={`${styles.statusBadge} ${
              report.doneHomework ? styles.statusSuccess : styles.statusWarning
            }`}
          >
            {report.doneHomework ? "واجب مكتمل" : "واجب غير مكتمل"}
          </div>
        )}
      </div>

      {(report.notes || report.content) && (
        <div className={styles.reportContent}>
          {report.notes && (
            <div className={styles.contentSection}>
              <h4 className={styles.contentTitle}>
                <FiFileText className={styles.contentIcon} />
                ملاحظات المعلم
              </h4>
              <div className={styles.contentText}>{report.notes}</div>
            </div>
          )}
          {report.content && report.content.trim() !== "" && (
            <div className={styles.contentSection}>
              <h4 className={styles.contentTitle}>
                <FiBookOpen className={styles.contentIcon} />
                المحتوى
              </h4>
              <div className={styles.contentText}>{report.content}</div>
            </div>
          )}
        </div>
      )}

      <div className={styles.memorizationSection}>
        <div className={styles.memorizationGroup}>
          <h4 className={styles.memorizationTitle}>
            <FiTarget className={styles.memorizationIcon} />
            الحفظ الجديد
          </h4>
          <div className={styles.chips}>
            {(report.newMemorized?.new || []).length > 0 ? (
              (report.newMemorized?.new || []).map((x, idx) => (
                <span
                  className={`${styles.chip} ${styles.chipNew}`}
                  key={`nn-${idx}`}
                >
                  {x}
                </span>
              ))
            ) : (
              <span className={styles.emptyChip}>لا يوجد</span>
            )}
          </div>
        </div>

        <div className={styles.memorizationGroup}>
          <h4 className={styles.memorizationTitle}>
            <FiBookOpen className={styles.memorizationIcon} />
            المراجعة (القديم)
          </h4>
          <div className={styles.chips}>
            {(report.newMemorized?.old || []).length > 0 ? (
              (report.newMemorized?.old || []).map((x, idx) => (
                <span
                  className={`${styles.chip} ${styles.chipOld}`}
                  key={`no-${idx}`}
                >
                  {x}
                </span>
              ))
            ) : (
              <span className={styles.emptyChip}>لا يوجد</span>
            )}
          </div>
        </div>

        <div className={styles.memorizationGroup}>
          <h4 className={styles.memorizationTitle}>
            <FiTarget className={styles.memorizationIcon} />
            المطلوب للحصة القادمة
          </h4>
          <div className={styles.chips}>
            {(report.wantedForNextLesson?.new || []).length > 0 ? (
              (report.wantedForNextLesson?.new || []).map((x, idx) => (
                <span
                  className={`${styles.chip} ${styles.chipNext}`}
                  key={`wn-${idx}`}
                >
                  {x}
                </span>
              ))
            ) : (
              <span className={styles.emptyChip}>لا يوجد</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
