import React, { useState, useEffect } from "react";
import { FiEdit, FiCalendar, FiUsers } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import styles from "@/src/components/dashboard/admin/styles.module.css";
import { useGroupsContext } from "@/src/contexts/GroupsContext";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import MobileGroupCards from "./Mobile/MobileGroupCards";
import SkeletonTable from "@/src/components/dashboard/admin/components/SkeletonTable";
import SkeletonCards from "@/src/components/dashboard/admin/components/SkeletonCards";
import MeetingLinkActions from "@/src/components/common/MeetingLinkActions";
import Button from "@/src/components/common/Button";
import { LessonForModal } from "@/src/types";

interface ApiGroup {
  _id: string;
  name: string;
  description: string;
  type: "private" | "public";
  teacherId: {
    _id: string;
  };
  members: Array<{
    _id: string;
    name: string;
    email: string;
  }>;
  lessons: Array<{
    _id: string;
    scheduledAt: string;
    meetingLink: string;
    status: string;
  }>;
  meetingLink: string;
  isActive: boolean;
  usualDate: {
    firstDay?: string;
    firstDayTime?: string;
    secondDay?: string;
    secondDayTime?: string;
    thirdDay?: string;
    thirdDayTime?: string;
  };
  createdAt: string;
  updatedAt: string;
}

const GroupsTable: React.FC<{ searchTerm?: string; dayFilter?: string }> = ({
  searchTerm = "",
  dayFilter = "",
}) => {
  const { groups, getGroups } = useGroupsContext();
  const { openGroupActionsModal, openLessonsModal, openStudentListModal } =
    useAdminModal();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("رمز الوصول مفقود. يرجى تسجيل الدخول مرة أخرى");
          return;
        }

        await getGroups(token);
      } catch {
        setError("حدث خطأ أثناء تحميل الحلقات");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [getGroups]);

  const formatSchedule = (usualDate: ApiGroup["usualDate"]) => {
    const days = [];
    if (usualDate.firstDay && usualDate.firstDayTime) {
      days.push(`${usualDate.firstDay} ${usualDate.firstDayTime}`);
    }
    if (usualDate.secondDay && usualDate.secondDayTime) {
      days.push(`${usualDate.secondDay} ${usualDate.secondDayTime}`);
    }
    if (usualDate.thirdDay && usualDate.thirdDayTime) {
      days.push(`${usualDate.thirdDay} ${usualDate.thirdDayTime}`);
    }
    return days.join(" - ");
  };

  const getNextLesson = (lessons: ApiGroup["lessons"]) => {
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

  const getLatestReportableLesson = (group: ApiGroup) => {
    const lessons = group.lessons || [];
    const completed = lessons
      .filter((l) => l.status === "completed")
      .sort(
        (a, b) =>
          new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
      );
    if (completed.length > 0) return completed[0];
    const past = lessons
      .filter((l) => new Date(l.scheduledAt) <= new Date())
      .sort(
        (a, b) =>
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

  if (loading) {
    return (
      <>
        <div className={styles.desktopView}>
          <SkeletonTable rows={5} columns={11} title="تحميل الحلقات" />
        </div>

        <div className={styles.mobileView}>
          <div className={styles.tableContainer}>
            <div className={styles.header}>
              <h2 className={styles.title}>تحميل الحلقات</h2>
            </div>
            <SkeletonCards cards={3} type="student" />
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className={styles.tableContainer}>
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const byName = !normalizedSearch
    ? groups
    : groups.filter((g) =>
        (g.name || "").toLowerCase().includes(normalizedSearch)
      );

  const selectedDay = dayFilter.trim();
  const filteredGroups = !selectedDay
    ? byName
    : byName.filter((g) => {
        const usualDays = [
          g.usualDate?.firstDay,
          g.usualDate?.secondDay,
          g.usualDate?.thirdDay,
        ]
          .filter(Boolean)
          .map((d) => String(d));
        const usualMatch = usualDays.includes(selectedDay);

        const lessonsDays = (g.lessons || []).map((l) =>
          new Date(l.scheduledAt).toLocaleDateString("ar-EG", {
            weekday: "long",
          })
        );
        const lessonsMatch = lessonsDays.includes(selectedDay);
        return usualMatch || lessonsMatch;
      });

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>تحميل الحلقات</h2>
      </div>

      {filteredGroups.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--text-light)",
          }}
        >
          <FiUsers size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <h3>لا توجد حلقات</h3>
          <p>يرجى إضافة حلقة جديدة للبدء</p>
        </div>
      ) : (
        <>
          <div className={styles.desktopView}>
            <div className={styles.tableWrapper}>
              <table className={styles.classTable}>
                <thead>
                  <tr>
                    <th className={styles.firstCell}>اسم الحلقة</th>
                    <th>الوصف</th>
                    <th>المدرس</th>
                    <th>عدد الأعضاء</th>
                    <th>مواعيد الدروس</th>
                    <th>الدرس القادم</th>
                    <th>تاريخ الإنشاء</th>
                    <th>رابط الحلقة</th>
                    <th>التقارير</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGroups.map((group) => {
                    const nextLesson = getNextLesson(group.lessons);
                    const reportableLesson = getLatestReportableLesson(group);
                    return (
                      <tr key={group._id} className={styles.tableRow}>
                        <td
                          className={`${styles.studentCell} ${styles.firstCell}`}
                        >
                          <div
                            className={`${styles.studentName} ${styles.darkColor} ${styles.tooltipContainer}`}
                          >
                            {group.name}
                          </div>
                        </td>
                        <td className={styles.groupCell}>
                          <span
                            className={`${styles.studentName} ${styles.primaryColor}`}
                          >
                            {group.description || "لا يوجد وصف"}
                          </span>
                        </td>
                        <td className={styles.groupCell}>
                          <div
                            className={`${styles.studentName} ${styles.darkColor} ${styles.tooltipContainer}`}
                          >
                            {group.teacherId.userId.name
                              ? group.teacherId.userId.name
                              : "لا يوجد مدرس"}
                          </div>
                        </td>
                        <td className={styles.groupCell}>
                          <span
                            className={`${styles.studentName} ${styles.primaryColor}`}
                          >
                            <FiUsers style={{ marginLeft: "0.5rem" }} />
                            {group.members.length}
                          </span>
                        </td>
                        <td className={styles.groupCell}>
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
                            title="مواعيد الدروس"
                          >
                            مواعيد الدروس
                          </Button>
                        </td>
                        <td className={styles.groupCell}>
                          <span
                            className={`${styles.studentName} ${styles.primaryColor}`}
                          >
                            {formatSchedule(group.usualDate)}
                          </span>
                        </td>
                        <td className={styles.groupCell}>
                          <span
                            className={`${styles.studentName} ${styles.primaryColor}`}
                          >
                            <FiCalendar style={{ marginLeft: "0.5rem" }} />
                            {nextLesson
                              ? formatDate(nextLesson.scheduledAt)
                              : "لا توجد مواعيد دروس قادمة"}
                          </span>
                        </td>
                        <td className={styles.linkContainer}>
                          <MeetingLinkActions
                            meetingLink={group.meetingLink}
                            styles={styles}
                            onCopySuccess={() => alert("تم نسخ رابط الاجتماع بنجاح")}
                            onCopyError={() => alert("خطأ في جلب التقارير")}
                          />
                        </td>
                        <td>
                          <div className={styles.linkContainer}>
                            <Button
                              onClick={() => {
                                if (!reportableLesson) return;

                                const lessonForModal: LessonForModal = {
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
                              title="قائمة الطلاب"
                              disabled={
                                !reportableLesson || group.members.length === 0
                              }
                            >
                              عرض الطلاب
                            </Button>
                          </div>
                        </td>
                        <td>
                          <div className={styles.actionsContainer}>
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
                              title="تعديل المجموعة"
                            >
                              تعديل
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.mobileView}>
            <MobileGroupCards groups={filteredGroups} />
          </div>
        </>
      )}
    </div>
  );
};

export default GroupsTable;
