import React, { useState, useEffect } from "react";
import { FiEdit, FiCalendar, FiUsers } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { FaExternalLinkAlt, FaCopy } from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
import { useGroupsContext } from "@/contexts/GroupsContext";
import { useAdminModal } from "@/contexts/AdminModalContext";
import MobileGroupCards from "./Mobile/MobileGroupCards";
import SkeletonTable from "@/components/dashboard/admin/components/SkeletonTable";
import SkeletonCards from "@/components/dashboard/admin/components/SkeletonCards";

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
          setError("لا يوجد رمز مصادقة. يرجى تسجيل الدخول مرة أخرى");
          return;
        }

        await getGroups(token);
      } catch (error: any) {
        console.error("Error fetching groups:", error);
        setError("حدث خطأ أثناء جلب البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [getGroups]);

  // Function to copy class link to clipboard
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      alert("تم نسخ الرابط بنجاح");
      console.log("تم نسخ الرابط بنجاح");
    } catch (err) {
      console.error("فشل في نسخ الرابط:", err);
      alert("فشل في نسخ الرابط");
    }
  };

  // Function to open link in new tab
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // Note: edit link handled via group actions modal

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

  // Pick the lesson to show reports for: prefer last completed; fallback to most recent past; else null
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
        {/* Desktop Skeleton */}
        <div className={styles.desktopView}>
          <SkeletonTable rows={5} columns={11} title="الحلقات" />
        </div>

        {/* Mobile Skeleton */}
        <div className={styles.mobileView}>
          <div className={styles.tableContainer}>
            <div className={styles.header}>
              <h2 className={styles.title}>الحلقات</h2>
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

  // Apply filtering: name-only search + optional day filter
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
        <h2 className={styles.title}>الحلقات</h2>
      </div>
      {/* Desktop Table View */}

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
          <p>لم يتم العثور على أي حلقات مطابقة للبحث</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className={styles.desktopView}>
            <div className={styles.tableWrapper}>
              <table className={styles.classTable}>
                <thead>
                  <tr>
                    <th className={styles.firstCell}>اسم الحلقة</th>
                    <th>الرقم التعريفي</th>
                    <th>الوصف</th>
                    <th>المعلم</th>
                    <th>عدد الطلاب</th>
                    <th>موعد الحلقات</th>
                    <th>موعد الحلقات الإعتيادية</th>
                    <th>موعد الحلقة القادمة</th>
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
                            {group._id}
                          </span>
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
                            {/* {group.teacherId._id
                              ? group.teacherId._id */}
                            لا يوجد معلم
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
                          <button
                            className={`${styles.linkButton} ${styles.openLinkBtn}`}
                            onClick={() =>
                              openLessonsModal({
                                groupId: group._id,
                                groupName: group.name,
                              })
                            }
                            title="عرض الحلقات"
                          >
                            <FiCalendar />
                            <span>عرض الحلقات</span>
                          </button>
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
                              : "لا يوجد حصص قادمة هذا الشهر"}
                          </span>
                        </td>
                        <td className={styles.linkContainer}>
                          <div className={styles.linkContainer}>
                            <button
                              className={`${styles.linkButton} ${styles.openLinkBtn}`}
                              onClick={() => handleOpenLink(group.meetingLink)}
                              title="فتح رابط الحلقة"
                            >
                              <FaExternalLinkAlt />
                              <span>دخول الحلقة</span>
                            </button>
                            <button
                              className={`${styles.linkButton} ${styles.copyLinkBtn}`}
                              onClick={() => handleCopyLink(group.meetingLink)}
                              title="نسخ رابط الحلقة"
                            >
                              <FaCopy />
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className={styles.linkContainer}>
                            <button
                              onClick={() => {
                                if (!reportableLesson) return;
                                // Construct a raw-like lesson with groupId shape for StudentListModal
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
                              className={`${styles.linkButton} ${styles.openLinkBtn}`}
                              title="عرض التقارير"
                              disabled={
                                !reportableLesson || group.members.length === 0
                              }
                            >
                              <FaListUl />
                              <span className={styles.iconButtonText}>
                                عرض التقارير
                              </span>
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className={styles.actionsContainer}>
                            <button
                              onClick={() =>
                                openGroupActionsModal({
                                  id: group._id,
                                  name: group.name,
                                })
                              }
                              className={`${styles.linkButton} ${styles.openLinkBtn}`}
                              title="المزيد من الإجراءات"
                            >
                              <FiEdit />
                              <span className={styles.iconButtonText}>
                                إجراءات
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className={styles.mobileView}>
            <MobileGroupCards groups={filteredGroups} />
          </div>
        </>
      )}
    </div>
  );
};

export default GroupsTable;
