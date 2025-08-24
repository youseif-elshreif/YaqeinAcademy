import React, { useEffect, useState } from "react";
import { FiPlus, FiDownload } from "react-icons/fi";
import StatCard from "@/components/common/UI/StatCard";
// import api from "@/utils/api";
import styles from "@/styles/AdminDashboard.module.css";
import userStyles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import { useAuth } from "@/contexts/AuthContext";
import StudentTable from "./StudentTable/StudentTable";
import TeacherTable from "./TeacherTable/TeacherTable";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import { ChartData } from "@/utils/types";
import { FiUsers, FiUserCheck, FiShield } from "react-icons/fi";
import AdminsTable from "./AdminsTable";
import SearchFilter from "@/components/common/UI/SearchFilter";
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

const UserManagement: React.FC = () => {
  const { openAddUserModal } = useAdminModal();
  const { stats, getAdmins, getTeachers, getStudents } =
    useAdminDashboardContext();
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("students");

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

  // Export users functionality removed (API logic cleared)
  const handleExportUsers = () => {
    alert("تصدير البيانات غير متاح في هذا الوضع التجريبي.");
  };

  const handleselectedtab = (tabId: string) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    if (!token) return;
    // Fire-and-forget parallel fetches to hydrate context
    Promise.allSettled([
      getAdmins?.(token),
      getTeachers?.(token),
      getStudents?.(token),
    ]).catch(() => {});
  }, [token, getAdmins, getTeachers, getStudents]);

  const getTabContent = () => {
    switch (activeTab) {
      case "students":
        return <StudentTable searchTerm={searchTerm} />;
      case "teachers":
        return <TeacherTable searchTerm={searchTerm} />;
      case "admins":
        return <AdminsTable searchTerm={searchTerm} />;
      default:
        return <StudentTable searchTerm={searchTerm} />;
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
    {
      id: "admins",
      label: "الإداريين",
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

        <StatCard
          icon={FiShield}
          value={stats.totalAdmins ?? 0}
          label="إجمالي الإداريين"
        />
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
          <SearchFilter
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="البحث بالاسم، البريد الإلكتروني، أو رقم الهاتف..."
            wrapperClassName={userStyles.filterInputWrapper}
            inputClassName={userStyles.formInput}
            iconClassName={userStyles.filterIcon}
          />
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
