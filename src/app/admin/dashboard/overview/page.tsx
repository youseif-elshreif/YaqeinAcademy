"use client";
import DashboardOverview from "@/components/AdminDashboard/DashboardOverview";
import styles from "@/styles/AdminDashboard.module.css";

export default function OverviewPage() {
  return (
    <div className={styles.dashboardContent}>
      <DashboardOverview />
    </div>
  );
}
