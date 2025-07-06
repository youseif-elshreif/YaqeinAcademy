import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "@/utils/api";
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
}

interface ChartData {
  incomeData: Array<{ month: string; income: number }>;
  userGrowthData: Array<{ month: string; students: number; teachers: number }>;
  paymentStatusData: Array<{ name: string; value: number; color: string }>;
}

interface RecentActivity {
  id: string;
  type:
    | "user_registered"
    | "payment_received"
    | "lesson_completed"
    | "group_created";
  title: string;
  time: string;
}

const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTeachers: 0,
    totalStudents: 0,
    totalLessonsThisMonth: 0,
    totalIncomeThisMonth: 0,
    teacherGrowth: 0,
    studentGrowth: 0,
    lessonGrowth: 0,
    incomeGrowth: 0,
  });

  const [chartData, setChartData] = useState<ChartData>({
    incomeData: [],
    userGrowthData: [],
    paymentStatusData: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, chartsResponse, activityResponse] =
        await Promise.all([
          api.get("/admin/dashboard/stats"),
          api.get("/admin/dashboard/charts"),
          api.get("/admin/dashboard/recent-activity"),
        ]);

      setStats(statsResponse.data);
      setChartData(chartsResponse.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("فشل في تحميل بيانات لوحة التحكم");
      // Set mock data for development
      setStats({
        totalTeachers: 15,
        totalStudents: 234,
        totalLessonsThisMonth: 89,
        totalIncomeThisMonth: 15000,
        teacherGrowth: 8.2,
        studentGrowth: 12.5,
        lessonGrowth: 5.3,
        incomeGrowth: 15.7,
      });

      setChartData({
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
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registered":
        return FiUserCheck;
      case "payment_received":
        return FiDollarSign;
      case "lesson_completed":
        return FiCalendar;
      case "group_created":
        return FiUsers;
      default:
        return FiUsers;
    }
  };

  if (loading) {
    return (
      <div className={styles.overviewContainer}>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overviewContainer}>
      <h1 className={styles.pageTitle}>نظرة عامة على النظام</h1>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.teachers}`}>
              <FiUsers />
            </div>
            <div
              className={`${styles.statChange} ${
                stats.teacherGrowth >= 0 ? styles.positive : styles.negative
              }`}
            >
              {stats.teacherGrowth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
              {Math.abs(stats.teacherGrowth)}%
            </div>
          </div>
          <h3 className={styles.statValue}>{stats.totalTeachers}</h3>
          <p className={styles.statLabel}>إجمالي المدرسين</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.students}`}>
              <FiUserCheck />
            </div>
            <div
              className={`${styles.statChange} ${
                stats.studentGrowth >= 0 ? styles.positive : styles.negative
              }`}
            >
              {stats.studentGrowth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
              {Math.abs(stats.studentGrowth)}%
            </div>
          </div>
          <h3 className={styles.statValue}>{stats.totalStudents}</h3>
          <p className={styles.statLabel}>إجمالي الطلاب</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.lessons}`}>
              <FiCalendar />
            </div>
            <div
              className={`${styles.statChange} ${
                stats.lessonGrowth >= 0 ? styles.positive : styles.negative
              }`}
            >
              {stats.lessonGrowth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
              {Math.abs(stats.lessonGrowth)}%
            </div>
          </div>
          <h3 className={styles.statValue}>{stats.totalLessonsThisMonth}</h3>
          <p className={styles.statLabel}>دروس هذا الشهر</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.income}`}>
              <FiDollarSign />
            </div>
            <div
              className={`${styles.statChange} ${
                stats.incomeGrowth >= 0 ? styles.positive : styles.negative
              }`}
            >
              {stats.incomeGrowth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
              {Math.abs(stats.incomeGrowth)}%
            </div>
          </div>
          <h3 className={styles.statValue}>
            {stats.totalIncomeThisMonth.toLocaleString()} ريال
          </h3>
          <p className={styles.statLabel}>إيرادات هذا الشهر</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>الإيرادات الشهرية</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} ريال`, "الإيرادات"]} />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#667eea"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>نمو المستخدمين</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#f093fb" name="الطلاب" />
              <Bar dataKey="teachers" fill="#667eea" name="المدرسين" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
