"use client";
import LessonManagement from "@/src/components/dashboard/admin/sections/LessonManagement";
import styles from "@/src/styles/AdminDashboard.module.css";

export default function CoursesPage() {
  return (
    <div className={styles.dashboardContent}>
      <LessonManagement />
    </div>
  );
}
