import React, { useState } from "react";
import { FiPlus, FiDownload, FiSearch } from "react-icons/fi";
import StatCard from "@/components/common/UI/StatCard";
import styles from "@/styles/AdminDashboard.module.css";
import userStyles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";
import GroupsTable from "./GroupsTable";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import { FiUsers } from "react-icons/fi";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";

const GroupManagement: React.FC = () => {
  const { groups } = useAdminDashboardContext();

  const { openAddGroupModal } = useAdminModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("groups");

  const handleAddGroup = () => {
    openAddGroupModal();
  };

  const handleExportData = () => {
    console.log("تصدير بيانات الحلقات");
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "groups":
        return <GroupsTable />;
      default:
        return <GroupsTable />;
    }
  };

  const tabs = [
    {
      id: "groups",
      label: "الحلقات",
    },
  ];

  return (
    <div className={styles.overviewContainer}>
      <div className={userStyles.headerRow}>
        <h1 className={styles.pageTitle}>إدارة الحلقات</h1>
        <div className={userStyles.headerActions}>
          <button onClick={handleExportData} className={styles.btnSuccess}>
            <FiDownload className={userStyles.iconMargin} />
            تصدير البيانات
          </button>
          <button onClick={handleAddGroup} className={styles.btnPrimary}>
            <FiPlus className={userStyles.iconMargin} />
            إضافة حلقة جديدة
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <StatCard icon={FiUsers} value={groups.length} label="إجمالي الحلقات" />
      </div>

      {/* Chart removed as requested */}

      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <div className={userStyles.filterInputWrapper}>
            <FiSearch className={userStyles.filterIcon} />
            <input
              type="text"
              placeholder="البحث في الحلقات..."
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
        onTabChange={handleTabChange}
      />
      <div>{getTabContent()}</div>
    </div>
  );
};

export default GroupManagement;
