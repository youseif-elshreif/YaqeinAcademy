"use client";
import LessonManagement from "@/src/components/dashboard/admin/sections/LessonManagement";
import { withAdminProtection } from "@/src/components/auth/withRoleProtection";
import styles from "@/src/styles/AdminDashboard.module.css";

function CoursesPage() {
  return (
    <div className={styles.dashboardContent}>
      <LessonManagement />
    </div>
  );
}

export default withAdminProtection(CoursesPage);
