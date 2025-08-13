import React, { useState, useEffect } from "react";
import { FiUsers, FiUserCheck, FiCalendar, FiDollarSign } from "react-icons/fi";
import { FaBook, FaBookOpen } from "react-icons/fa";
import StatCard from "@/components/common/UI/StatCard";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
// import api from "@/utils/api";
import styles from "@/styles/AdminDashboard.module.css";

interface DashboardStats {
  totalTeachers: number;
  totalStudents: number;
  totalLessonsThisMonth: number;
  totalIncomeThisMonth: number;
  teacherGrowth: number;
  studentGrowth: number;
  lessonGrowth: number;
  incomeGrowth: number;
  totalGroups: number;
  totalCourses: number;
}

const DashboardOverview: React.FC = () => {
  const { getGroups } = useAdminDashboardContext();
  const [stats, setStats] = useState<DashboardStats>({
    totalTeachers: 15,
    totalStudents: 234,
    totalLessonsThisMonth: 89,
    totalIncomeThisMonth: 15000,
    teacherGrowth: 8.2,
    studentGrowth: 12.5,
    lessonGrowth: 5.3,
    incomeGrowth: 15.7,
    totalGroups: 0, // سنحدث هذا من الAPI
    totalCourses: 4,
  });

  // جلب بيانات المجموعات الحقيقية
  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const groupsData = await getGroups(token);
        if (groupsData && Array.isArray(groupsData)) {
          setStats((prevStats) => ({
            ...prevStats,
            totalGroups: groupsData.length,
          }));
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات المجموعات:", error);
      }
    };

    fetchGroupsData();
  }, [getGroups]);

  return (
    <div className={styles.overviewContainer}>
      <h1 className={styles.pageTitle}>نظرة عامة على النظام</h1>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <StatCard
          icon={FiUsers}
          value={stats.totalTeachers}
          label="إجمالي المدرسين"
        />

        <StatCard
          icon={FiUserCheck}
          value={stats.totalStudents}
          label="إجمالي الطلاب"
        />

        <StatCard
          icon={FaBook}
          value={stats.totalGroups}
          label="إجمالي المجموعات"
        />

        <StatCard
          icon={FiCalendar}
          value={stats.totalLessonsThisMonth}
          label="دروس هذا الشهر"
        />

        <StatCard
          icon={FaBookOpen}
          value={stats.totalCourses}
          label="عدد الدورات"
        />

        <StatCard
          icon={FiDollarSign}
          value={stats.totalIncomeThisMonth}
          label="صافي الربح"
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
