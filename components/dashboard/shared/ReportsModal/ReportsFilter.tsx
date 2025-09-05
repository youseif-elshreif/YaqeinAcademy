"use client";
import React from "react";
import { FiCalendar, FiX, FiClock } from "react-icons/fi";
import styles from "./ReportsModal.module.css";
import Button from "../../../common/Button";

interface ReportsFilterProps {
  selectedMonth: string;
  selectedYear: string;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
  onClearFilter: () => void;
  onShowCurrentMonth: () => void;
  filteredCount: number;
  totalCount: number;
  isCurrentMonthActive?: boolean;
}

const ReportsFilter: React.FC<ReportsFilterProps> = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  onClearFilter,
  onShowCurrentMonth,
  filteredCount,
  totalCount,
  isCurrentMonthActive = false,
}) => {
  const months = [
    { value: "", label: "كل الأشهر" },
    { value: "1", label: "يناير" },
    { value: "2", label: "فبراير" },
    { value: "3", label: "مارس" },
    { value: "4", label: "أبريل" },
    { value: "5", label: "مايو" },
    { value: "6", label: "يونيو" },
    { value: "7", label: "يوليو" },
    { value: "8", label: "أغسطس" },
    { value: "9", label: "سبتمبر" },
    { value: "10", label: "أكتوبر" },
    { value: "11", label: "نوفمبر" },
    { value: "12", label: "ديسمبر" },
  ];

  // إنشاء قائمة السنوات (من 2020 إلى 2030)
  const years = [];
  for (let year = 2020; year <= 2030; year++) {
    years.push({ value: year.toString(), label: year.toString() });
  }

  const hasActiveFilter = selectedMonth || selectedYear;

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersRow}>
        <div className={styles.filterGroup}>
          <FiCalendar className={styles.filterIcon} />
          <label className={styles.filterLabel}>الشهر:</label>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className={styles.filterSelect}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <FiCalendar className={styles.filterIcon} />
          <label className={styles.filterLabel}>السنة:</label>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">كل السنوات</option>
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>

        <Button
          onClick={onShowCurrentMonth}
          variant={isCurrentMonthActive ? "primary" : "outline-primary"}
          size="small"
          icon={<FiClock />}
          title="عرض تقارير هذا الشهر"
        >
          هذا الشهر
        </Button>

        {hasActiveFilter && (
          <Button
            onClick={onClearFilter}
            variant="outline-secondary"
            size="small"
            icon={<FiX />}
            title="مسح الفلتر"
          >
            مسح الفلتر
          </Button>
        )}

        <div className={styles.resultsInfo}>
          <span>
            {filteredCount} من أصل {totalCount} تقرير
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportsFilter;
