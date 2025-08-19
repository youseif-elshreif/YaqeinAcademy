"use client";
import UserManagement from "@/components/dashboard/admin/sections/UserManagement/UserManagement";
import styles from "@/styles/AdminDashboard.module.css";

export default function UserManagementPage() {
  return (
    <div className={styles.dashboardContent}>
      <UserManagement />
    </div>
  );
}
