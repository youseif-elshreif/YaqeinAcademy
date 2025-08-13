"use client";
import FinancialOverview from "@/components/dashboard/admin/sections/FinancialOverview";
import styles from "@/styles/AdminDashboard.module.css";

export default function FinancialPage() {
  return (
    <div className={styles.dashboardContent}>
      <FinancialOverview />
    </div>
  );
}
