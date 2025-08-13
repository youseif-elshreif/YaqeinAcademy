"use client";
import DashboardOverview from "@/components/dashboard/admin/components/DashboardOverview";
import styles from "@/styles/AdminDashboard.module.css";

export default function OverviewPage() {
  return (
    <div className={styles.dashboardContent}>
      <DashboardOverview />
    </div>
  );
}
