"use client";
import TestimonialsManagement from '@/src/components/dashboard/TestimonialsManagement';
import styles from "@/src/styles/AdminDashboard.module.css";

export default function TestimonialsPage() {
  return (
    <div className={styles.dashboardContent}>
      <TestimonialsManagement />
    </div>
  );
}
