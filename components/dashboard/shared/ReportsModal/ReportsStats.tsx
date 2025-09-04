"use client";
import React from "react";
import StatCard from "@/components/common/UI/StatCard";
import { FiFileText, FiCheckCircle, FiBookOpen, FiStar } from "react-icons/fi";
import styles from "./ReportsModal.module.css";

interface ReportsStatsProps {
  totalReports: number;
  attendedCount: number;
  homeworkCount: number;
  avgRating: number;
}

const ReportsStats: React.FC<ReportsStatsProps> = ({
  totalReports,
  attendedCount,
  homeworkCount,
  avgRating,
}) => {
  return (
    <div className={styles.statsSection}>
      <div className={styles.statsGrid}>
        <StatCard
          icon={FiFileText}
          value={totalReports}
          label="إجمالي التقارير"
        />
        <StatCard icon={FiCheckCircle} value={attendedCount} label="الحضور" />
        <StatCard
          icon={FiBookOpen}
          value={homeworkCount}
          label="الواجبات المكتملة"
        />
        <StatCard
          icon={FiStar}
          value={avgRating.toFixed(1)}
          label="متوسط التقييم"
        />
      </div>
    </div>
  );
};

export default ReportsStats;
