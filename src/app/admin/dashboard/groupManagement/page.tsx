"use client";
import GroupManagement from "@/src/components/dashboard/admin/sections/GroupManagement/GroupManagement";
import { withAdminProtection } from "@/src/components/auth/withRoleProtection";
import styles from "@/src/styles/AdminDashboard.module.css";

function GroupManagementPage() {
  return (
    <div className={styles.dashboardContent}>
      <GroupManagement />
    </div>
  );
}

export default withAdminProtection(GroupManagementPage);
