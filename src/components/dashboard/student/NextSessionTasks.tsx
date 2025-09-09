import styles from "./NextSessionTasks.module.css";
import {
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaRedoAlt,
  FaLightbulb,
} from "react-icons/fa";
import { useStudentDashboard } from "@/src/contexts/StudentDashboardContext";
import { useEffect } from "react";
import MeetingLinkActions from "@/src/components/common/MeetingLinkActions";
const NextSessionTasks = () => {
  const { userStats, userLessons, getUserLessons } = useStudentDashboard();
  useEffect(() => {
    getUserLessons();
  }, []);
  const getNextLesson = () => {
    if (!userLessons || userLessons.length === 0) return null;
    const now = new Date();
    const futureLessons = userLessons
      .filter((lesson) => new Date(lesson.scheduledAt) > now)
      .sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
      );
    if (futureLessons.length === 0) return null;
    const nextLesson = futureLessons[0];
    const lessonDate = new Date(nextLesson.scheduledAt);
    return {
      date: lessonDate.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: lessonDate.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      dayName: lessonDate.toLocaleDateString("ar-EG", {
        weekday: "long",
      }),
    };
  };
  const availableCredits = userStats?.PrivitelessonCredits || 0;
  if (availableCredits === 0) {
    return (
      <div className={styles.tasksContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>المطلوب للحصة القادمة</h2>
        </div>
        <div className={styles.tasksContent}>
          <div className={styles.taskSection}>
            <div
              className={styles.sectionHeader}
              style={{ justifyContent: "center" }}
            >
              <h3
                className={styles.sectionTitle}
                style={{ color: "var(--warning-color)" }}
              >
                ⚠️ لا توجد حلقات مستحقة حالياً
              </h3>
            </div>
            <div
              className={styles.emptyState}
              style={{ textAlign: "center", padding: "2rem" }}
            >
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
                عذراً، لا يمكن عرض معلومات الحصة القادمة لأنه لا توجد حلقات
                مستحقة في رصيدك
              </p>
              <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>
                للحصول على حلقات جديدة، يرجى التواصل مع الإدارة لإضافة كريديتس
                إلى حسابك
              </p>
              <div className={styles.contactInfo}>
                <h4
                  style={{
                    marginBottom: "0.75rem",
                    color: "var(--primary-color)",
                  }}
                >
                  طرق التواصل مع الإدارة:
                </h4>
                <p style={{ marginBottom: "0.5rem" }}>
                  📧 البريد الإلكتروني: admin@yaqeinacademy.com
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  📞 الهاتف: +966123456789
                </p>
                <p>💬 واتساب: +966123456789</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
  const nextDate = getNextLesson();
  return (
    <div className={styles.tasksContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>المطلوب للحصة القادمة</h2>
        <div className={styles.sessionInfo}>
          <div className={styles.sessionDateTime}>
            <span className={styles.sessionDate}>
              <FaCalendarAlt />{" "}
              {nextDate?.dayName
                ? `${nextDate.dayName} - ${nextDate.date}`
                : "لا توجد حصص قادمة"}
            </span>
            <span className={styles.sessionTime}>
              <FaClock /> {nextDate?.time || "--:--"}
            </span>
          </div>
          {userStats?.GroupMeetingLink && (
            <div className={styles.sessionLinkSection}>
              <MeetingLinkActions
                meetingLink={userStats?.GroupMeetingLink}
                styles={styles}
                containerClassName={styles.sessionLinkButtons}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.tasksContent}>
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
