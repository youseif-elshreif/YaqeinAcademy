"use client";
import FinancialOverview from "@/components/AdminDashboard/FinancialOverview";
import styles from "@/styles/AdminDashboard.module.css";

export default function FinancialPage() {
  return (
    <div className={styles.dashboardContent}>
      <FinancialOverview />
    </div>
  );
}
