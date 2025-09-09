"use client";
import UserManagement from "@/src/components/dashboard/admin/sections/UserManagement/UserManagement";
import styles from "@/src/styles/AdminDashboard.module.css";

export default function UserManagementPage() {
  return (
    <div className={styles.dashboardContent}>
      <UserManagement />
    </div>
  );
}
