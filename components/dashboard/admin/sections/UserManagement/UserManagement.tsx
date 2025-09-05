import React, { useEffect, useState } from "react";
import { FiPlus, FiDownload } from "react-icons/fi";
import StatCard from "@/components/common/UI/StatCard";
// import api from "@/utils/api";
import styles from "@/styles/AdminDashboard.module.css";
import userStyles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { useTeachersContext } from "@/contexts/TeachersContext";
import { useStudentsContext } from "@/contexts/StudentsContext";
import { useAdminStatsContext } from "@/contexts/AdminStatsContext";
import { useAuth } from "@/contexts/AuthContext";
import StudentTable from "./StudentTable/StudentTable";
import TeacherTable from "./TeacherTable/TeacherTable";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import { FiUsers, FiUserCheck, FiShield } from "react-icons/fi";
import AdminsTable from "./AdminsTable";
import SearchFilter from "@/components/common/UI/SearchFilter";
import Button from "@/components/common/Button";
// Types are now imported from the centralized types.ts file

const UserManagement: React.FC = () => {
  const { openAddUserModal } = useAdminModal();
  const { admins, getAdmins } = useAdminStatsContext();
  const { teachers, getTeachers } = useTeachersContext();
  const { students, getStudents } = useStudentsContext();
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("students");

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
      getTeachers?.(token),
      getStudents?.(token),
      getAdmins?.(token),
    ]).catch(() => {});
  }, [token, getTeachers, getStudents, getAdmins]);

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
            variant="secondary"
            icon={<FiDownload />}
            onClick={handleExportUsers}
          >
            تصدير البيانات
          </Button>
          <Button
            variant="primary"
            icon={<FiPlus />}
            onClick={openAddUserModal}
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
