import { FiEdit, FiCalendar, FiUsers } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import styles from "@/src/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import MeetingLinkActions from "@/src/components/common/MeetingLinkActions";
import Button from "@/src/components/common/Button";

interface GroupCardProps {
  group: any; // Group from API
}

const GroupCard = ({ group }: GroupCardProps) => {
  const { openGroupActionsModal, openLessonsModal, openStudentListModal } =
    useAdminModal();

  const formatSchedule = (usualDate: any) => {
    const days = [];
    if (usualDate?.firstDay && usualDate?.firstDayTime) {
      days.push(`${usualDate.firstDay} ${usualDate.firstDayTime}`);
    }
    if (usualDate?.secondDay && usualDate?.secondDayTime) {
      days.push(`${usualDate.secondDay} ${usualDate.secondDayTime}`);
    }
    if (usualDate?.thirdDay && usualDate?.thirdDayTime) {
      days.push(`${usualDate.thirdDay} ${usualDate.thirdDayTime}`);
    }
    return days.join(" - ");
  };

  const getNextLesson = (lessons: any[]) => {
    const now = new Date();
    const upcomingLessons = lessons
      .filter(
        (lesson) =>
          new Date(lesson.scheduledAt) > now && lesson.status === "scheduled"
      )
      .sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
      );

    return upcomingLessons.length > 0 ? upcomingLessons[0] : null;
  };

  const getLatestReportableLesson = (group: any) => {
    const lessons = group.lessons || [];
    const completed = lessons
      .filter((l: any) => l.status === "completed")
      .sort(
        (a: any, b: any) =>
          new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
      );
    if (completed.length > 0) return completed[0];
    const past = lessons
      .filter((l: any) => new Date(l.scheduledAt) <= new Date())
      .sort(
        (a: any, b: any) =>
          new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
      );
    return past[0] || null;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const nextLesson = getNextLesson(group.lessons || []);
  const reportableLesson = getLatestReportableLesson(group);

  return (
    <div key={group._id} className={styles.classCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <h3 className={`${styles.cardStudentName} ${styles.clickableText}`}>
            {group.name}
          </h3>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الوصف:</span>
            <span className={styles.infoValue}>
              {group.description || "لا يوجد وصف"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>المعلم:</span>
            <span className={styles.infoValue}>
              {group.teacherId?._id || "لا يوجد معلم"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>عدد الطلاب:</span>
            <span className={styles.infoValue}>
              <FiUsers style={{ marginLeft: "0.5rem" }} />
              {group.members?.length || 0}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>موعد الحلقات:</span>
            <span className={styles.cardLinkContainer}>
              <Button
                onClick={() =>
                  openLessonsModal({
                    groupId: group._id,
                    groupName: group.name,
                  })
                }
                variant="primary"
                size="small"
                icon={<FiCalendar />}
                title="عرض الحلقات"
              >
                عرض الحلقات
              </Button>
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>موعد الحلقات الإعتيادية:</span>
            <span className={styles.infoValue}>
              {formatSchedule(group.usualDate) || "غير محدد"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>موعد الحلقة القادمة:</span>
            <span className={styles.infoValue}>
              <FiCalendar style={{ marginLeft: "0.5rem" }} />
              {nextLesson
                ? formatDate(nextLesson.scheduledAt)
                : "لا يوجد حصص قادمة"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رابط الحلقة:</span>
            <span className={styles.cardLinkContainer}>
              <MeetingLinkActions
                meetingLink={group.meetingLink}
                styles={styles}
              />
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>التقارير:</span>
            <span className={styles.cardLinkContainer}>
              <Button
                onClick={() => {
                  if (!reportableLesson) return;

                  const lessonForModal: any = {
                    _id: reportableLesson._id,
                    scheduledAt: reportableLesson.scheduledAt,
                    meetingLink: reportableLesson.meetingLink,
                    status: reportableLesson.status,
                    groupId: {
                      _id: group._id,
                      name: group.name,
                      meetingLink: group.meetingLink,
                      members: group.members,
                    },
                  };
                  openStudentListModal(lessonForModal);
                }}
                variant="primary"
                size="small"
                icon={<FaListUl />}
                title="عرض التقارير"
                disabled={!reportableLesson}
              >
                عرض التقارير
              </Button>
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الإجراءات:</span>
            <span className={styles.cardLinkContainer}>
              <Button
                onClick={() =>
                  openGroupActionsModal({
                    id: group._id,
                    name: group.name,
                  })
                }
                variant="primary"
                size="small"
                icon={<FiEdit />}
                title="المزيد من الإجراءات"
              >
                إجراءات
              </Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
