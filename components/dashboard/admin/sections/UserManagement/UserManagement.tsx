import React, { useState } from "react";
import { FiPlus, FiDownload, FiSearch } from "react-icons/fi";
import StatCard from "@/components/common/UI/StatCard";
// import api from "@/utils/api";
import styles from "@/styles/AdminDashboard.module.css";
import userStyles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";
import StudentTable from "./StudentTable/StudentTable";
import TeacherTable from "./TeacherTable/TeacherTable";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import { DashboardStats, ChartData, UserManagementProps } from "@/utils/types";
import { FaBook } from "react-icons/fa";
import { FiUsers, FiUserCheck } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
// Types are now imported from the centralized types.ts file

const UserManagement: React.FC<UserManagementProps> = ({
  studentData,
  teacherData,
}: UserManagementProps) => {
  const { openAddUserModal } = useAdminModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("students");
  const [stats] = useState<DashboardStats>({
    totalTeachers: 15,
    totalStudents: 234,
    totalLessonsThisMonth: 89,
    totalIncomeThisMonth: 15000,
    teacherGrowth: 8.2,
    studentGrowth: 12.5,
    lessonGrowth: 5.3,
    incomeGrowth: 15.7,
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

  const filteredStudentData = studentData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeacherData = teacherData.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export users functionality removed (API logic cleared)
  const handleExportUsers = () => {
    alert("تصدير البيانات غير متاح في هذا الوضع التجريبي.");
  };

  const handleselectedtab = (tabId: string) => {
    setActiveTab(tabId);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "students":
        return <StudentTable Students={filteredStudentData} />;
      case "teachers":
        return <TeacherTable Teachers={filteredTeacherData} />;
      default:
        return <StudentTable Students={filteredStudentData} />;
    }
  };

  const tabs = [
    {
      id: "students",
      label: " الطلاب",
    },
    {
      id: "teachers",
      label: "المعلمين",
    },
  ];
  return (
    <div className={styles.overviewContainer}>
      <div className={userStyles.headerRow}>
        <h1 className={styles.pageTitle}>إدارة المستخدمين</h1>
        <div className={userStyles.headerActions}>
          <button onClick={handleExportUsers} className={styles.btnSuccess}>
            <FiDownload className={userStyles.iconMargin} />
            تصدير البيانات
          </button>
          <button onClick={openAddUserModal} className={styles.btnPrimary}>
            <FiPlus className={userStyles.iconMargin} />
            إضافة مستخدم
          </button>
        </div>
      </div>

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

        <StatCard icon={FaBook} value={20} label="إجمالي المجموعات" />
      </div>

      <div className={styles.chartsSection}>
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

      {/* Filters */}
      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <div className={userStyles.filterInputWrapper}>
            <FiSearch className={userStyles.filterIcon} />
            <input
              type="text"
              placeholder="البحث بالاسم، البريد الإلكتروني، أو رقم الهاتف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={userStyles.formInput}
            />
          </div>
        </div>
      </div>
      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleselectedtab}
      />
      <div>{getTabContent()}</div>
    </div>
  );
};

export default UserManagement;
