import React, { useState } from "react";
import { FiUsers, FiUserCheck, FiCalendar, FiDollarSign } from "react-icons/fi";
import { FaBook, FaBookOpen } from "react-icons/fa";
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

interface ChartData {
  incomeData: Array<{ month: string; income: number }>;
  userGrowthData: Array<{ month: string; students: number; teachers: number }>;
  paymentStatusData: Array<{ name: string; value: number; color: string }>;
}

const DashboardOverview: React.FC = () => {
  const [stats] = useState<DashboardStats>({
    totalTeachers: 15,
    totalStudents: 234,
    totalLessonsThisMonth: 89,
    totalIncomeThisMonth: 15000,
    teacherGrowth: 8.2,
    studentGrowth: 12.5,
    lessonGrowth: 5.3,
    incomeGrowth: 15.7,
    totalGroups: 20,
    totalCourses: 4,
  });

  const [chartData] = useState<ChartData>({
    incomeData: [
      { month: "يناير", income: 12000 },
      { month: "فبراير", income: 13500 },
      { month: "مارس", income: 11800 },
      { month: "أبريل", income: 14200 },
      { month: "مايو", income: 16500 },
      { month: "يونيو", income: 15000 },
    ],
    userGrowthData: [
      { month: "يناير", students: 180, teachers: 12 },
      { month: "فبراير", students: 195, teachers: 13 },
      { month: "مارس", students: 210, teachers: 14 },
      { month: "أبريل", students: 225, teachers: 14 },
      { month: "مايو", students: 240, teachers: 15 },
      { month: "يونيو", students: 234, teachers: 15 },
    ],
    paymentStatusData: [
      { name: "مدفوع", value: 180, color: "#38a169" },
      { name: "غير مدفوع", value: 54, color: "#e53e3e" },
    ],
  });

  return (
    <div className={styles.overviewContainer}>
      <h1 className={styles.pageTitle}>نظرة عامة على النظام</h1>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.summaryCard}>
          <div className={`${styles.cardIcon} ${styles.sec}`}>
            <FiUsers />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardValue}>
              {stats.totalTeachers.toLocaleString()}
            </h3>
            <p className={styles.statLabel}>إجمالي المدرسين</p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={`${styles.cardIcon} ${styles.sec}`}>
            <FiUserCheck />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardValue}>
              {stats.totalStudents.toLocaleString()}
            </h3>
            <p className={styles.statLabel}>إجمالي الطلاب</p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={`${styles.cardIcon} ${styles.or}`}>
            <FaBook />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardValue}>
              {stats.totalGroups.toLocaleString()}
            </h3>
            <p className={styles.statLabel}>إجمالي المجموعات</p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={`${styles.cardIcon} ${styles.or}`}>
            <FiCalendar />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardValue}>
              {stats.totalLessonsThisMonth.toLocaleString()}
            </h3>
            <p className={styles.statLabel}>دروس هذا الشهر</p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={`${styles.cardIcon} ${styles.sec}`}>
            <FaBookOpen />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardValue}>
              {stats.totalCourses.toLocaleString()}
            </h3>
            <p className={styles.statLabel}>عدد الدورات</p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={`${styles.cardIcon} text-success`}>
            <FiDollarSign />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardValue}>
              {stats.totalIncomeThisMonth.toLocaleString()}
            </h3>
            <p className={styles.statLabel}>صافي الربح</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
