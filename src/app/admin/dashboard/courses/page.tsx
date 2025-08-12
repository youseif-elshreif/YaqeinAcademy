"use client";
import LessonManagement from "@/components/AdminDashboard/LessonManagement";
import styles from "@/styles/AdminDashboard.module.css";

export default function CoursesPage() {
  return (
    <div className={styles.dashboardContent}>
      <LessonManagement />
    </div>
  );
}
