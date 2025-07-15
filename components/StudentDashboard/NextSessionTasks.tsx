import { useState, useEffect } from "react";
import styles from "./NextSessionTasks.module.css";
import {
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaRedoAlt,
  FaLightbulb,
  FaExternalLinkAlt,
  FaCopy,
} from "react-icons/fa";

const NextSessionTasks = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to copy class link to clipboard
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      console.log("تم نسخ الرابط بنجاح");
    } catch (err) {
      console.error("فشل في نسخ الرابط:", err);
    }
  };

  // Function to open link in new tab
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };
  // Mock data for next session tasks
  const nextSessionData = {
    sessionDate: "2025-01-20",
    sessionTime: "09:00 ص",
    courseName: "تحفيظ القرآن الكريم",
    teacherName: "الأستاذ محمد أحمد",
    classLink:
      "https://teams.microsoft.com/l/meetup-join/19%3amjmwt-sb%40thread.tacv2/",
    newMemorization: [
      {
        id: 1,
        content: "سورة الكهف من الآية 1 إلى الآية 20",
        notes: "التركيز على التجويد وأحكام النون الساكنة والتنوين",
      },
      {
        id: 2,
        content: "حفظ الآيات الجديدة مع فهم المعاني",
        notes: "مراجعة التفسير الميسر للآيات المطلوبة",
      },
    ],
    review: [
      {
        id: 1,
        content: "مراجعة سورة البقرة من الآية 250 إلى الآية 286",
        notes: "التأكد من الحفظ المتقن والتجويد الصحيح",
      },
      {
        id: 2,
        content: "مراجعة سورة آل عمران من الآية 100 إلى الآية 120",
        notes: "هذه الآيات تحتاج إعادة حفظ حسب التقييم السابق",
      },
    ],
  };

  const formatDate = (dateString: string): string => {
    if (!isClient) {
      // Return a simple format for server-side rendering
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    // Client-side formatting with proper locale
    const date = new Date(dateString);
    try {
      return date.toLocaleDateString("ar", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        calendar: "gregory",
      });
    } catch (error) {
      // Fallback to simple format if locale formatting fails
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  return (
    <div className={styles.tasksContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>المطلوب للحصة القادمة</h2>
        <div className={styles.sessionInfo}>
          <div className={styles.sessionDetails}>
            <span className={styles.courseName}>
              {nextSessionData.courseName}
            </span>
            <span className={styles.teacherName}>
              مع {nextSessionData.teacherName}
            </span>
          </div>
          <div className={styles.sessionDateTime}>
            <span className={styles.sessionDate}>
              <FaCalendarAlt /> {formatDate(nextSessionData.sessionDate)}
            </span>
            <span className={styles.sessionTime}>
              <FaClock /> {nextSessionData.sessionTime}
            </span>
          </div>
          {nextSessionData.classLink && (
            <div className={styles.sessionLinkSection}>
              <div className={styles.sessionLinkButtons}>
                <button
                  className={`${styles.linkButton} ${styles.openLinkBtn}`}
                  onClick={() => handleOpenLink(nextSessionData.classLink!)}
                  title="فتح رابط الحصة"
                >
                  <FaExternalLinkAlt />
                  <span>دخول الحصة</span>
                </button>
                <button
                  className={`${styles.linkButton} ${styles.copyLinkBtn}`}
                  onClick={() => handleCopyLink(nextSessionData.classLink!)}
                  title="نسخ رابط الحصة"
                >
                  <FaCopy />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.tasksContent}>
        {/* New Memorization Section */}
        {nextSessionData.newMemorization.length > 0 && (
          <div className={styles.taskSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaBook /> الجديد المطلوب حفظه وتسميعه
              </h3>
              <span className={styles.taskCount}>
                {nextSessionData.newMemorization.length} مهام
              </span>
            </div>

            <div className={styles.tasksList}>
              {nextSessionData.newMemorization.map((task) => (
                <div
                  key={task.id}
                  className={`${styles.taskCard} ${styles.newTask}`}
                >
                  <div className={styles.taskHeader}>
                    <h4 className={styles.taskContent}>{task.content}</h4>
                  </div>

                  {task.notes && (
                    <div className={styles.taskNotes}>
                      <span className={styles.notesLabel}>ملاحظة:</span>
                      <p className={styles.notesText}>{task.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Section */}
        {nextSessionData.review.length > 0 && (
          <div className={styles.taskSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaRedoAlt /> المراجعة المطلوبة
              </h3>
              <span className={styles.taskCount}>
                {nextSessionData.review.length} مهام
              </span>
            </div>

            <div className={styles.tasksList}>
              {nextSessionData.review.map((task) => (
                <div
                  key={task.id}
                  className={`${styles.taskCard} ${styles.reviewTask}`}
                >
                  <div className={styles.taskHeader}>
                    <h4 className={styles.taskContent}>{task.content}</h4>
                  </div>

                  {task.notes && (
                    <div className={styles.taskNotes}>
                      <span className={styles.notesLabel}>ملاحظة:</span>
                      <p className={styles.notesText}>{task.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Study Tips */}
      <div className={styles.studyTips}>
        <h3 className={styles.tipsTitle}>
          <FaLightbulb /> نصائح للدراسة
        </h3>
        <ul className={styles.tipsList}>
          <li className={styles.tip}>
            اقرأ الآيات الجديدة عدة مرات قبل البدء بالحفظ
          </li>
          <li className={styles.tip}>
            استمع للتلاوة الصحيحة من القراء المعتمدين
          </li>
          <li className={styles.tip}>اربط الآيات بمعانيها لتسهيل الحفظ</li>
          <li className={styles.tip}>راجع الحفظ القديم يومياً حتى لا تنساه</li>
        </ul>
      </div>
    </div>
  );
};

export default NextSessionTasks;
