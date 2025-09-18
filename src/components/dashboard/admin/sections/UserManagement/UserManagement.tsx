import React, { useEffect, useState, useMemo } from "react";
import { FiPlus } from "react-icons/fi";
import StatCard from "@/src/components/common/UI/StatCard";

import styles from "@/src/styles/AdminDashboard.module.css";
import userStyles from "@/src/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import { useTeachersContext } from "@/src/contexts/TeachersContext";
import { useStudentsContext } from "@/src/contexts/StudentsContext";
import { useAdminStatsContext } from "@/src/contexts/AdminStatsContext";
import StudentTable from "./StudentTable/StudentTable";
import TeacherTable from "./TeacherTable/TeacherTable";
import DashboardTabs from "@/src/components/dashboard/student/DashboardTabs";
import {
  FiUsers,
  FiUserCheck,
  FiShield,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
} from "react-icons/fi";
import AdminsTable from "./AdminsTable";
import SearchFilter from "@/src/components/common/UI/SearchFilter";
import Button from "@/src/components/common/Button";

const UserManagement: React.FC = () => {
  const { openAddUserModal } = useAdminModal();
  const { admins, getAdmins } = useAdminStatsContext();
  const { teachers, getTeachers } = useTeachersContext();
  const { students, getStudents } = useStudentsContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("students");

  // حساب الإحصائيات المالية باستخدام البيانات الموجودة
  const financialStats = useMemo(() => {
    // حساب إجمالي الإيرادات من الطلاب
    const totalRevenue =
      students?.reduce((total: number, student: any) => {
        const studentMoney = student.money;
        return total + studentMoney;
      }, 0) || 0;

    // حساب إجمالي المصروفات للمعلمين
    const totalExpenses =
      teachers?.reduce((total: number, teacher: any) => {
        const teacherMoney = teacher.money || teacher.userId?.money || 0;
        const totalLessons = teacher.numberOflessonsCridets || 0;
        const totalTeacher = teacherMoney * totalLessons;
        return total + totalTeacher;
      }, 0) || 0;

    // حساب صافي الربح
    const netProfit = totalRevenue - totalExpenses;

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
    };
  }, [students, teachers]);

  const handleselectedtab = (tabId: string) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    Promise.allSettled([getTeachers?.(), getStudents?.(), getAdmins?.()]).catch(
      () => {}
    );
  }, [getTeachers, getStudents, getAdmins]);

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
          <Button
            variant="primary"
            icon={<FiPlus />}
            onClick={() => openAddUserModal("student")}
          >
            إضافة مستخدم
          </Button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          icon={FiUserCheck}
          value={students?.length || 0}
          label="إجمالي الطلاب"
        />

        <StatCard
          icon={FiUsers}
          value={teachers?.length || 0}
          label="إجمالي المدرسين"
        />

        <StatCard
          icon={FiShield}
          value={admins?.length || 0}
          label="إجمالي الإداريين"
        />

        <StatCard
          icon={FiTrendingUp}
          value={`${financialStats.totalRevenue.toLocaleString()} ج.م`}
          label="إجمالي الإيرادات"
        />

        <StatCard
          icon={FiTrendingDown}
          value={`${financialStats.totalExpenses.toLocaleString()} ج.م`}
          label="إجمالي المصروفات"
        />

        <StatCard
          icon={FiDollarSign}
          value={`${financialStats.netProfit.toLocaleString()} ج.م`}
          label="صافي الأرباح"
        />
      </div>

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
