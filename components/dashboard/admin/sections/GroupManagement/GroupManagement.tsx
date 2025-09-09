import React, { useState } from "react";
import { FiPlus, FiDownload } from "react-icons/fi";
import StatCard from "@/components/common/UI/StatCard";
import styles from "@/styles/AdminDashboard.module.css";
import userStyles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";
import GroupsTable from "./GroupsTable";
import SearchFilter from "@/components/common/UI/SearchFilter";
import DayFilter from "@/components/common/UI/DayFilter";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import { FiUsers } from "react-icons/fi";
import { useGroupsContext } from "@/contexts/GroupsContext";
import Button from "@/components/common/Button";

const GroupManagement: React.FC = () => {
  const { groups } = useGroupsContext();

  const { openAddGroupModal } = useAdminModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [activeTab, setActiveTab] = useState("groups");

  const handleAddGroup = () => {
    openAddGroupModal();
  };

  const handleExportData = () => {};

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "groups":
        return <GroupsTable searchTerm={searchTerm} dayFilter={dayFilter} />;
      default:
        return <GroupsTable searchTerm={searchTerm} dayFilter={dayFilter} />;
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
          <Button
            onClick={handleExportData}
            variant="secondary"
            icon={<FiDownload />}
          >
            تصدير البيانات
          </Button>
          <Button onClick={handleAddGroup} variant="primary" icon={<FiPlus />}>
            إضافة حلقة جديدة
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <StatCard icon={FiUsers} value={groups.length} label="إجمالي الحلقات" />
      </div>

      {/* Chart removed as requested */}

      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <SearchFilter
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="البحث باسم الحلقة فقط..."
            wrapperClassName={userStyles.filterInputWrapper}
            inputClassName={userStyles.formInput}
            iconClassName={userStyles.filterIcon}
          />
        </div>
        <div className={styles.filterGroup}>
          <DayFilter
            value={dayFilter}
            onChange={setDayFilter}
            placeholder="كل الأيام"
            wrapperClassName={userStyles.filterInputWrapper}
            selectClassName={userStyles.formInput}
          />
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

