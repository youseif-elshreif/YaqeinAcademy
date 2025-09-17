"use client";
import UserManagement from "@/src/components/dashboard/admin/sections/UserManagement/UserManagement";
import { withAdminProtection } from "@/src/components/auth/withRoleProtection";
import styles from "@/src/styles/AdminDashboard.module.css";

function UserManagementPage() {
  return (
    <div className={styles.dashboardContent}>
      <UserManagement />
    </div>
  );
}

export default withAdminProtection(UserManagementPage);
