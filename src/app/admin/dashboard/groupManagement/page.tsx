"use client";
import GroupManagement from "@/components/AdminDashboard/GroupManagement/GroupManagement";
import styles from "@/styles/AdminDashboard.module.css";

export default function GroupManagementPage() {
  return (
    <div className={styles.dashboardContent}>
      <GroupManagement />
    </div>
  );
}
