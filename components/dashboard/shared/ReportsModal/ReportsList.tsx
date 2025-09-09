"use client";
import React, { useMemo } from "react";
import { FiCalendar } from "react-icons/fi";
import ReportCard from "./ReportCard";
import styles from "./ReportsModal.module.css";
import { ReportsListProps } from "@/types";

const ReportsList: React.FC<ReportsListProps> = ({
  reports,
  selectedMonth,
  selectedYear,
  showLessonId = false,
}) => {
  const filteredReports = useMemo(() => {
    let filtered = reports;

    // فلتر حسب الشهر
    if (selectedMonth) {
      filtered = filtered.filter((report) => {
        if (!report.createdAt) return false;
        const reportMonth = new Date(report.createdAt).getMonth() + 1;
        return reportMonth.toString() === selectedMonth;
      });
    }

    // فلتر حسب السنة
    if (selectedYear) {
      filtered = filtered.filter((report) => {
        if (!report.createdAt) return false;
        const reportYear = new Date(report.createdAt).getFullYear();
        return reportYear.toString() === selectedYear;
      });
    }

    return filtered;
  }, [reports, selectedMonth, selectedYear]);

  const sortedReports = useMemo(() => {
    return filteredReports
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
  }, [filteredReports]);

  return (
    <div className={styles.reportsSection}>
      <h3 className={styles.sectionHeading}>
        <FiCalendar className={styles.headingIcon} />
        تفاصيل التقارير
      </h3>

      <div className={styles.reportsList}>
        {sortedReports.map((report) => (
          <ReportCard
            key={report._id}
            report={report}
            showLessonId={showLessonId}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportsList;


