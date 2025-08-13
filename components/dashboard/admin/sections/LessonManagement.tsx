import React, { useState } from "react";
import { FiCalendar, FiPlus, FiUsers, FiCheckCircle } from "react-icons/fi";
import StatCard from "@/components/common/UI/StatCard";
import styles from "@/styles/AdminDashboard.module.css";
import { coursesData } from "@/data/courses";
import CoursesGrid from "@/components/common/UI/CoursesGrid/CoursesGrid";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { Lesson } from "@/utils/types";

const LessonManagement: React.FC = () => {
  const { openAddCourseModal } = useAdminModal();

  const [lessons] = useState<Lesson[]>([
    {
      id: "1",
      title: "درس التجويد - أحكام النون الساكنة",
      groupName: "مجموعة حفظ القرآن المتقدمة",
      teacherName: "فاطمة حسن",
      date: "2024-07-08",
      startTime: "20:00",
      endTime: "21:00",
      status: "completed",
      attendanceCount: 8,
      totalStudents: 10,
    },
    {
      id: "2",
      title: "حفظ سورة البقرة - الآيات 1-20",
      groupName: "مجموعة التجويد للمبتدئين",
      teacherName: "محمد أحمد",
      date: "2024-07-09",
      startTime: "19:00",
      endTime: "20:00",
      status: "scheduled",
      attendanceCount: 0,
      totalStudents: 12,
    },
    {
      id: "3",
      title: "مراجعة الحفظ السابق",
      groupName: "مجموعة حفظ القرآن المتقدمة",
      teacherName: "فاطمة حسن",
      date: "2024-07-10",
      startTime: "20:00",
      endTime: "21:00",
      status: "cancelled",
      attendanceCount: 0,
      totalStudents: 10,
    },
  ]);

  const getStats = () => {
    const total = lessons.length;
    const completed = lessons.filter((l) => l.status === "completed").length;
    const scheduled = lessons.filter((l) => l.status === "scheduled").length;
    const cancelled = lessons.filter((l) => l.status === "cancelled").length;

    return { total, completed, scheduled, cancelled };
  };

  const stats = getStats();

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>إدارة الدورات</h1>
        <button
          onClick={() => openAddCourseModal()}
          className={`${styles.btn} ${styles.btnPrimary} ${styles.btnWithIcon}`}
        >
          <FiPlus />
          إنشاء دورة جديدة
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <StatCard icon={FiCalendar} value={stats.total} label="عدد الدورات" />
      </div>
      {coursesData.length > 0 ? (
        <CoursesGrid courses={coursesData} isAdminView={true} />
      ) : (
        <div>
          <h3 style={{ textAlign: "center", color: "var(--text-light)" }}>
            لا توجد دورات
          </h3>
        </div>
      )}
    </div>
  );
};

export default LessonManagement;
