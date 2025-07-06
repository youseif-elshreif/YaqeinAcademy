import { useState } from "react";
import styles from "./FiltersBar.module.css";

interface FiltersBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  instructor: string;
  duration: string;
  type: string;
  sortBy: string;
}

const FiltersBar = ({ onFilterChange }: FiltersBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    instructor: "",
    duration: "",
    type: "",
    sortBy: "newest",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className={styles.filtersBar}>
      <div className="container">
        <div className={styles.filtersContent}>
          <div className={styles.filtersGroup}>
            <div className={styles.filterItem}>
              <label className={styles.label}>المدرس:</label>
              <select
                className={styles.select}
                value={filters.instructor}
                onChange={(e) =>
                  handleFilterChange("instructor", e.target.value)
                }
              >
                <option value="">جميع المدرسين</option>
                <option value="احمد محمد">د. أحمد محمد</option>
                <option value="فاطمة علي">د. فاطمة علي</option>
                <option value="محمد حسن">الشيخ محمد حسن</option>
                <option value="عائشة احمد">د. عائشة أحمد</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <label className={styles.label}>المدة:</label>
              <select
                className={styles.select}
                value={filters.duration}
                onChange={(e) => handleFilterChange("duration", e.target.value)}
              >
                <option value="">جميع المدد</option>
                <option value="اسبوع">أسبوع واحد</option>
                <option value="شهر">شهر واحد</option>
                <option value="شهرين">شهرين</option>
                <option value="3اشهر">3 أشهر</option>
                <option value="6اشهر">6 أشهر</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <label className={styles.label}>النوع:</label>
              <select
                className={styles.select}
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              >
                <option value="">جميع الأنواع</option>
                <option value="تفسير">تفسير القرآن</option>
                <option value="حديث">علوم الحديث</option>
                <option value="فقه">الفقه</option>
                <option value="عقيدة">العقيدة</option>
                <option value="سيرة">السيرة النبوية</option>
              </select>
            </div>
          </div>

          <div className={styles.sortGroup}>
            <label className={styles.label}>ترتيب حسب:</label>
            <select
              className={styles.select}
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="newest">الأحدث</option>
              <option value="oldest">الأقدم</option>
              <option value="name">الاسم</option>
              <option value="instructor">المدرس</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
