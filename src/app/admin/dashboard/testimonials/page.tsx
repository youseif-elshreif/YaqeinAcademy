"use client";
import TestimonialsManagement from "@/src/components/dashboard/TestimonialsManagement";
import { withAdminProtection } from "@/src/components/auth/withRoleProtection";
import styles from "@/src/styles/AdminDashboard.module.css";

function TestimonialsPage() {
  return (
    <div className={styles.dashboardContent}>
      <TestimonialsManagement />
    </div>
  );
}

export default withAdminProtection(TestimonialsPage);
