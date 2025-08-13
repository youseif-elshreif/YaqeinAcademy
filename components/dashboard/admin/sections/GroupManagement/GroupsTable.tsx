import React, { useState, useEffect } from "react";
import { FiEdit, FiCalendar, FiUsers } from "react-icons/fi";
import {
  FaExternalLinkAlt,
  FaCopy,
  FaEdit as FaEditIcon,
} from "react-icons/fa";
import styles from "@/components/dashboard/admin/styles.module.css";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import { useAdminModal } from "@/contexts/AdminModalContext";

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

const GroupsTable: React.FC = () => {
  const { groups, getGroups } = useAdminDashboardContext();
  const { openGroupActionsModal, openLessonsModal } = useAdminModal();
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

  // Function to handle editing a group link
  const handleEditLink = (groupId: string, currentLink: string) => {
    const newLink = prompt("تعديل رابط الحصة:", currentLink);
    if (newLink && newLink !== currentLink) {
      console.log("تحديث رابط المجموعة:", groupId, "إلى:", newLink);
      // سيتم إضافة منطق التحديث لاحقاً
    }
  };

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
      <div className={styles.tableContainer}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>جاري تحميل البيانات...</p>
        </div>
      </div>
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

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>المجموعات</h2>
      </div>
      {/* Desktop Table View */}
      <div className={styles.tableWrapper}>
        <table className={styles.classTable}>
          <thead>
            <tr>
              <th className={styles.firstCell}>اسم المجموعة</th>
              <th>الرقم التعريفي</th>
              <th>الوصف</th>
              <th>المعلم</th>
              <th>عدد الطلاب</th>
              <th>موعد الحصص</th>
              <th>موعد الحصص الإعتيادية</th>
              <th>موعد الحصة القادمة</th>
              <th>رابط الحصة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => {
              const nextLesson = getNextLesson(group.lessons);
              return (
                <tr key={group._id} className={styles.tableRow}>
                  <td className={`${styles.studentCell} ${styles.firstCell}`}>
                    <div
                      className={`${styles.studentName} ${styles.darkColor} ${styles.tooltipContainer}`}
                    >
                      {group.name}
                      <div className={styles.groupMembersTooltip}>
                        {group.members.length > 0 ? (
                          group.members.map((student, index) => (
                            <span
                              key={student._id}
                              className={`${styles.groupMemberName} ${styles.clickableText} ${styles.primaryColor}`}
                            >
                              <div>
                                <span style={{ display: "block" }}>
                                  {student.name}
                                </span>
                                <span style={{ display: "block" }}>
                                  {student._id}
                                </span>
                              </div>
                              {index < group.members.length - 1 && ", "}
                            </span>
                          ))
                        ) : (
                          <span>لا يوجد اعضاء حاليا</span>
                        )}
                      </div>
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
                      {group.teacherId._id}
                      <div className={styles.groupMembersTooltip}>
                        <span
                          key={group.teacherId._id}
                          className={`${styles.groupMemberName} ${styles.clickableText} ${styles.primaryColor}`}
                        >
                          {group.teacherId._id}
                        </span>
                      </div>
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
                      title="عرض الحصص"
                    >
                      <FiCalendar />
                      <span>عرض الحصص</span>
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
                        : "لا يوجد حصص قادمة"}
                    </span>
                  </td>
                  <td className={styles.linkContainer}>
                    <div className={styles.linkContainer}>
                      <button
                        className={`${styles.linkButton} ${styles.openLinkBtn}`}
                        onClick={() => handleOpenLink(group.meetingLink)}
                        title="فتح رابط الحصة"
                      >
                        <FaExternalLinkAlt />
                        <span>دخول الحصة</span>
                      </button>
                      <button
                        className={`${styles.linkButton} ${styles.copyLinkBtn}`}
                        onClick={() => handleCopyLink(group.meetingLink)}
                        title="نسخ رابط الحصة"
                      >
                        <FaCopy />
                      </button>
                      <button
                        className={`${styles.linkButton} ${styles.addLinkBtn}`}
                        onClick={() =>
                          handleEditLink(group._id, group.meetingLink)
                        }
                        title="تعديل رابط الحصة"
                      >
                        <FaEditIcon />
                        <span>تعديل</span>
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
                        <span className={styles.iconButtonText}>إجراءات</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {groups.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--text-light)",
          }}
        >
          <FiUsers size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <h3>لا توجد مجموعات</h3>
          <p>لم يتم العثور على أي مجموعات مطابقة للبحث</p>
        </div>
      )}
    </div>
  );
};

export default GroupsTable;
