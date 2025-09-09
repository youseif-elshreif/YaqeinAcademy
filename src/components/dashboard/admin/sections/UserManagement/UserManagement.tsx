import React, { useEffect, useState } from "react";
import { FiPlus, FiDownload } from "react-icons/fi";
import StatCard from "@/src/components/common/UI/StatCard";

import styles from "@/src/styles/AdminDashboard.module.css";
import userStyles from "@/src/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import { useTeachersContext } from "@/src/contexts/TeachersContext";
import { useStudentsContext } from "@/src/contexts/StudentsContext";
import { useAdminStatsContext } from "@/src/contexts/AdminStatsContext";
import { useAuth } from "@/src/contexts/AuthContext";
import StudentTable from "./StudentTable/StudentTable";
import TeacherTable from "./TeacherTable/TeacherTable";
import DashboardTabs from "@/src/components/dashboard/student/DashboardTabs";
import { FiUsers, FiUserCheck, FiShield } from "react-icons/fi";
import AdminsTable from "./AdminsTable";
import SearchFilter from "@/src/components/common/UI/SearchFilter";
import Button from "@/src/components/common/Button";

const UserManagement: React.FC = () => {
  const { openAddUserModal } = useAdminModal();
  const { admins, getAdmins } = useAdminStatsContext();
  const { teachers, getTeachers } = useTeachersContext();
  const { students, getStudents } = useStudentsContext();
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("students");

  const handleExportUsers = () => {
    alert("تصدير البيانات غير متاح في هذا الوضع التجريبي.");
  };

  const handleselectedtab = (tabId: string) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    if (!token) return;

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
