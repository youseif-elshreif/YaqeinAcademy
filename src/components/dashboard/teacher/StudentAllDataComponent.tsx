import React, { useState } from "react";
import styles from "./StudentAllDataComponent.module.css";
import {
  getStatusText,
  formatDate,
  getStatusColor,
} from "./MonthlyClassTable/utils";
import {
  FaBook,
  FaRedoAlt,
  FaClipboardList,
  FaStickyNote,
  FaTimes,
  FaEye,
  FaStar,
} from "react-icons/fa";
import Button from "@/src/components/common/Button";
import {
  StudentAllDataComponentViewProps,
} from "@/src/types";

const StudentAllDataComponent: React.FC<StudentAllDataComponentViewProps> = ({
  studentData,
  onClose,
  onViewClassDetails,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  if (!studentData) return null;

  const completedClasses = studentData.classes.filter(
    (cls) => cls.status === "completed"
  );
  const classesWithRates = studentData.classes.filter((cls) => cls.rate);
  const averageRate =
    classesWithRates.length > 0
      ? (
          classesWithRates.reduce((sum, cls) => sum + (cls.rate || 0), 0) /
          classesWithRates.length
        ).toFixed(1)
      : "لا يوجد";

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 280);
  };

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.fadeOut : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modalSlideOut : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.studentInfo}>
            <h2 className={styles.studentName}>{studentData.studentName}</h2>
          </div>
          <Button
            onClick={handleClose}
            variant="secondary"
            size="small"
            icon={<FaTimes />}
          >
            إغلاق
          </Button>
        </div>

        <div className={styles.content}>
          <div className={styles.statsSection}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>إجمالي الحلقات</span>
              <span className={styles.statValue}>
                {studentData.classes.length}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>الحلقات المكتملة</span>
              <span className={styles.statValue}>
                {completedClasses.length}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>المعدل</span>
              <span className={styles.statValue}>{averageRate}</span>
            </div>
          </div>

          <div className={styles.classesSection}>
            <h3 className={styles.sectionTitle}>تاريخ الحلقات</h3>
            {studentData.classes.length === 0 ? (
              <div className={styles.emptyState}>
                <p>لا توجد حصص مسجلة لهذا الطالب</p>
              </div>
            ) : (
              <div className={styles.classesList}>
                {studentData.classes.map((classItem) => (
                  <div key={classItem.classId} className={styles.classCard}>
                    <div className={styles.classHeader}>
                      <div className={styles.classDate}>
                        <span className={styles.dateText}>
                          {formatDate(classItem.date)}
                        </span>
                        <span className={styles.timeText}>
                          {classItem.time}
                        </span>
                      </div>
                      <span
                        className={`${styles.statusBadge} ${getStatusColor(
                          classItem.status
                        )}`}
                      >
                        {getStatusText(classItem.status)}
                      </span>
                    </div>

                    {classItem.status === "completed" && (
                      <>
                        {classItem.rate && (
                          <div className={styles.classRate}>
                            <span className={styles.rateLabel}>
                              <FaStar /> التقييم:
                            </span>
                            <span className={styles.rateValue}>
                              {classItem.rate}/10
                            </span>
                          </div>
                        )}

                        {classItem.completed && (
                          <div className={styles.classContent}>
                            <div className={styles.contentSection}>
                              <h4 className={styles.contentTitle}>
                                <FaBook /> الحفظ الجديد:
                              </h4>
                              <ul className={styles.contentList}>
                                {classItem.completed.newMemorization.map(
                                  (item, index) => (
                                    <li key={index}>{item}</li>
                                  )
                                )}
                              </ul>
                            </div>

                            <div className={styles.contentSection}>
                              <h4 className={styles.contentTitle}>
                                <FaRedoAlt /> المراجعة:
                              </h4>
                              <ul className={styles.contentList}>
                                {classItem.completed.review.map(
                                  (item, index) => (
                                    <li key={index}>{item}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        )}

                        {classItem.nextPrep && (
                          <div className={styles.nextPrep}>
                            <h4 className={styles.nextPrepTitle}>
                              <FaClipboardList /> التحضير للحصة القادمة:
                            </h4>
                            <div className={styles.nextPrepContent}>
                              <div className={styles.prepSection}>
                                <span className={styles.nextPrepLabel}>
                                  حفظ جديد:
                                </span>
                                <ul className={styles.contentList}>
                                  {classItem.nextPrep.newMemorization.map(
                                    (item, index) => (
                                      <li key={index}>{item}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                              <div className={styles.prepSection}>
                                <span className={styles.nextPrepLabel}>
                                  مراجعة:
                                </span>
                                <ul className={styles.contentList}>
                                  {classItem.nextPrep.review.map(
                                    (item, index) => (
                                      <li key={index}>{item}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {classItem.notes && (
                      <div className={styles.classNotes}>
                        <span className={styles.notesLabel}>
                          <FaStickyNote /> ملاحظات:
                        </span>
                        <p className={styles.notesText}>{classItem.notes}</p>
                      </div>
                    )}

                    {onViewClassDetails && (
                      <div className={styles.classActions}>
                        <button
                          className={styles.viewBtn}
                          onClick={() => onViewClassDetails(classItem)}
                        >
                          <FaEye /> عرض التفاصيل
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAllDataComponent;
