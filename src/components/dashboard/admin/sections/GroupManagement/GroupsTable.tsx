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
import { GroupApiData } from "@/src/types";

const GroupsTable: React.FC<{ searchTerm?: string; dayFilter?: string }> = ({
  searchTerm = "",
  dayFilter = "",
}) => {
  const { groups, getGroups, getGroupById } = useGroupsContext();
  const { openGroupActionsModal, openLessonsModal, openStudentListModal } =
    useAdminModal();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        await getGroups();
      } catch {
        setError("حدث خطأ أثناء تحميل الحلقات");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [getGroups]);

  const formatSchedule = (usualDate: GroupApiData["usualDate"]) => {
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
    if (usualDate.fourthDay && usualDate.fourthDayTime) {
      days.push(`${usualDate.fourthDay} ${usualDate.fourthDayTime}`);
    }
    if (usualDate.fifthDay && usualDate.fifthDayTime) {
      days.push(`${usualDate.fifthDay} ${usualDate.fifthDayTime}`);
    }
    if (usualDate.sixthDay && usualDate.sixthDayTime) {
      days.push(`${usualDate.sixthDay} ${usualDate.sixthDayTime}`);
    }
    if (usualDate.seventhDay && usualDate.seventhDayTime) {
      days.push(`${usualDate.seventhDay} ${usualDate.seventhDayTime}`);
    }
    return days.join(" - ");
  };

  const getNextLesson = (lessons: GroupApiData["lessons"]) => {
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

  const getLatestReportableLesson = (group: GroupApiData) => {
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
          g.usualDate?.fourthDay,
          g.usualDate?.fifthDay,
          g.usualDate?.sixthDay,
          g.usualDate?.seventhDay,
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
                    <th>مواعيد الحلقات</th>
                    <th>موعد الحلقات الإعتيادية</th>
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
                            title="مواعيد الحلقات"
                          >
                            مواعيد الحلقات
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
                              : "لا توجد مواعيد حلقات قادمة"}
                          </span>
                        </td>
                        <td className={styles.linkContainer}>
                          <MeetingLinkActions
                            meetingLink={group.meetingLink}
                            styles={styles}
                          />
                        </td>
                        <td>
                          <div className={styles.linkContainer}>
                            <Button
                              onClick={async () => {
                                if (!reportableLesson) return;

                                try {
                                  // Fetch fresh group data
                                  const groupData = await getGroupById(
                                    group._id
                                  );

                                  const lessonForModal: LessonForModal = {
                                    _id: groupData.group._id,
                                    scheduledAt: groupData.group.scheduledAt,
                                    meetingLink: groupData.group.meetingLink,
                                    status: groupData.status,
                                    groupId: {
                                      _id: groupData.group._id,
                                      name: groupData.group.name,
                                      meetingLink: groupData.group.meetingLink,
                                      members: groupData.group.allMembers,
                                    },
                                  };

                                  openStudentListModal(lessonForModal);
                                } catch (error) {
                                  throw error;
                                }
                              }}
                              variant="primary"
                              size="small"
                              icon={<FaListUl />}
                              title="قائمة الطلاب"
                              disabled={group.members.length === 0}
                            >
                              عرض التقارير
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
