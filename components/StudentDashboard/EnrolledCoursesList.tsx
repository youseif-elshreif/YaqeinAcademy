import { useState, useEffect } from "react";
import styles from "./EnrolledCoursesList.module.css";
import { FaChalkboardTeacher, FaCalendarAlt, FaBook } from "react-icons/fa";

const EnrolledCoursesList = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // Mock data for enrolled courses
  const enrolledCourses = [
    {
      id: 1,
      courseName: "تحفيظ القرآن الكريم",
      teacherName: "الأستاذ محمد أحمد",
      totalSessions: 32,
      remainingSessions: 18,
      progress: 44, // percentage
      description: "حفظ وتسميع القرآن الكريم مع التجويد",
      nextSession: "2025-01-20",
      courseLevel: "متوسط",
      status: "نشط",
    },
    {
      id: 2,
      courseName: "الفقه الإسلامي",
      teacherName: "الدكتور أحمد محمود",
      totalSessions: 24,
      remainingSessions: 12,
      progress: 50,
      description: "دراسة أحكام العبادات والمعاملات",
      nextSession: "2025-01-22",
      courseLevel: "مبتدئ",
      status: "نشط",
    },
    {
      id: 3,
      courseName: "السيرة النبوية",
      teacherName: "الأستاذ خالد سعد",
      totalSessions: 16,
      remainingSessions: 6,
      progress: 63,
      description: "دراسة حياة النبي محمد صلى الله عليه وسلم",
      nextSession: "2025-01-25",
      courseLevel: "مبتدئ",
      status: "نشط",
    },
    {
      id: 4,
      courseName: "أصول الفقه",
      teacherName: "الدكتور عمر حسن",
      totalSessions: 20,
      remainingSessions: 0,
      progress: 100,
      description: "القواعد الأساسية لاستنباط الأحكام الشرعية",
      nextSession: null,
      courseLevel: "متقدم",
      status: "مكتمل",
    },
  ];

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      month: "long",
      day: "numeric",
    });
  };

  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return "#10B981"; // Green
    if (progress >= 60) return "#3B82F6"; // Blue
    if (progress >= 40) return "#F59E0B"; // Yellow
    return "#EF4444"; // Red
  };

  const getLevelColor = (level: string): string => {
    switch (level) {
      case "مبتدئ":
        return "#10B981"; // Green
      case "متوسط":
        return "#F59E0B"; // Yellow
      case "متقدم":
        return "#EF4444"; // Red
      default:
        return "#6B7280"; // Gray
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "نشط":
        return "#10B981"; // Green
      case "مكتمل":
        return "#3B82F6"; // Blue
      case "متوقف":
        return "#EF4444"; // Red
      default:
        return "#6B7280"; // Gray
    }
  };

  return (
    <div className={styles.coursesContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>الدورات المشترك بها</h2>
        <p className={styles.subtitle}>جميع الدورات التي تدرسها حالياً</p>
      </div>

      <div className={styles.coursesGrid}>
        {enrolledCourses.map((course) => (
          <div key={course.id} className={styles.courseCard}>
            <div className={styles.cardHeader}>
              <div className={styles.courseTitle}>
                <h3 className={styles.courseName}>{course.courseName}</h3>
                <div className={styles.badges}>
                  <span
                    className={styles.levelBadge}
                    style={{
                      backgroundColor: getLevelColor(course.courseLevel),
                    }}
                  >
                    {course.courseLevel}
                  </span>
                  <span
                    className={styles.statusBadge}
                    style={{ backgroundColor: getStatusColor(course.status) }}
                  >
                    {course.status}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.teacherInfo}>
                <span className={styles.teacherIcon}>
                  <FaChalkboardTeacher />
                </span>
                <span className={styles.teacherName}>{course.teacherName}</span>
              </div>

              <p className={styles.courseDescription}>{course.description}</p>

              <div className={styles.progressSection}>
                <div className={styles.progressHeader}>
                  <span className={styles.progressLabel}>التقدم في الدورة</span>
                  <span className={styles.progressPercent}>
                    {course.progress}%
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${course.progress}%`,
                      backgroundColor: getProgressColor(course.progress),
                    }}
                  ></div>
                </div>
              </div>

              <div className={styles.sessionStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>إجمالي الحصص:</span>
                  <span className={styles.statValue}>
                    {course.totalSessions}
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>الحصص المتبقية:</span>
                  <span className={styles.statValue}>
                    {course.remainingSessions}
                  </span>
                </div>
              </div>

              {course.nextSession && (
                <div className={styles.nextSession}>
                  <span className={styles.nextSessionLabel}>
                    الحصة القادمة:
                  </span>
                  <span className={styles.nextSessionDate}>
                    <FaCalendarAlt /> {formatDate(course.nextSession)}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.cardFooter}>
              <button className={styles.detailsButton}>عرض التفاصيل</button>
              {course.status === "نشط" && (
                <button className={styles.sessionButton}>الحصة القادمة</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {enrolledCourses.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <FaBook />
          </div>
          <h3 className={styles.emptyTitle}>لا توجد دورات مسجلة</h3>
          <p className={styles.emptyText}>
            لم تسجل في أي دورة بعد. تصفح الدورات المتاحة وسجل الآن!
          </p>
          <button className={styles.browseCourses}>تصفح الدورات</button>
        </div>
      )}
    </div>
  );
};

export default EnrolledCoursesList;
