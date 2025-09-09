"use client";
import GroupManagement from "@/src/components/dashboard/admin/sections/GroupManagement/GroupManagement";
import styles from "@/src/styles/AdminDashboard.module.css";

export default function GroupManagementPage() {
  return (
    <div className={styles.dashboardContent}>
      <GroupManagement />
    </div>
  );
}
