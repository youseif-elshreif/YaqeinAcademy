import { useState, useEffect, useMemo } from "react";
import styles from "./MonthlyClassTable.module.css";
import ClassTable from "./Table/ClassTable";
import MobileClassCards from "./MobileCards/MobileClassCards";
import SkeletonTable from "@/components/common/UI/Skeleton/SkeletonTable";
import SkeletonCards from "@/components/common/UI/Skeleton/SkeletonCards";
import { FiUsers, FiFilter, FiCalendar, FiClock, FiX } from "react-icons/fi";
import Button from "@/components/common/Button";
import { MonthlyClassTableProps } from "@/types";
// Using raw lesson items from API

const MonthlyClassTable = ({
  initialClasses,
  loading = false,
}: MonthlyClassTableProps) => {
  const [classes, setClasses] = useState<any[]>(initialClasses);
  const [dateFilter, setDateFilter] = useState<string>("");
  const [monthFilter, setMonthFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCurrentMonthActive, setIsCurrentMonthActive] =
    useState<boolean>(true);

  // Sync with external changes to initialClasses
  useEffect(() => {
    setClasses(initialClasses);
  }, [initialClasses]);

  // تطبيق فلتر "هذا الشهر" تلقائياً عند تحميل المكون
  useEffect(() => {
    const now = new Date();
    setMonthFilter((now.getMonth() + 1).toString());
    setYearFilter(now.getFullYear().toString());
  }, []); // تشغيل مرة واحدة فقط عند التحميل

  // Filter classes based on date, month, year and status
  const filteredClasses = useMemo(() => {
    let filtered = classes;

    // Filter by specific date
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter((classItem) => {
        if (!classItem.scheduledAt) return false;
        const classDate = new Date(classItem.scheduledAt);
        return (
          classDate.getFullYear() === filterDate.getFullYear() &&
          classDate.getMonth() === filterDate.getMonth() &&
          classDate.getDate() === filterDate.getDate()
        );
      });
    }

    // Filter by month
    if (monthFilter) {
      filtered = filtered.filter((classItem) => {
        if (!classItem.scheduledAt) return false;
        const classDate = new Date(classItem.scheduledAt);
        return (classDate.getMonth() + 1).toString() === monthFilter;
      });
    }

    // Filter by year
    if (yearFilter) {
      filtered = filtered.filter((classItem) => {
        if (!classItem.scheduledAt) return false;
        const classDate = new Date(classItem.scheduledAt);
        return classDate.getFullYear().toString() === yearFilter;
      });
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((classItem) => {
        if (statusFilter === "completed") {
          return classItem.status === "completed";
        } else if (statusFilter === "scheduled") {
          return (
            classItem.status !== "completed" && classItem.status !== "cancelled"
          );
        }
        return true;
      });
    }

    return filtered;
  }, [classes, dateFilter, monthFilter, yearFilter, statusFilter]);

  const handleDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value);
    // إذا غير المستخدم التاريخ يدوياً، ألغي فلتر "هذا الشهر"
    setIsCurrentMonthActive(false);
  };

  const handleMonthFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonthFilter(e.target.value);
    // إذا غير المستخدم الشهر يدوياً، ألغي فلتر "هذا الشهر"
    setIsCurrentMonthActive(false);
  };

  const handleYearFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYearFilter(e.target.value);
    // إذا غير المستخدم السنة يدوياً، ألغي فلتر "هذا الشهر"
    setIsCurrentMonthActive(false);
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusFilter(e.target.value);
    // فلتر الحالة لا يؤثر على فلتر "هذا الشهر"
  };

  const clearFilters = () => {
    setDateFilter("");
    setMonthFilter("");
    setYearFilter("");
    setStatusFilter("all");
    setIsCurrentMonthActive(false);
  };

  const showCurrentMonth = () => {
    const now = new Date();
    setMonthFilter((now.getMonth() + 1).toString());
    setYearFilter(now.getFullYear().toString());
    setDateFilter(""); // مسح فلتر التاريخ المحدد
    setIsCurrentMonthActive(true);
  };

  if (loading) {
    return (
      <div className={styles.tableContainer} style={{ paddingTop: "2rem" }}>
        <div className={styles.header}>
          <h2 className={styles.title}>حصص الشهر الحالي</h2>
          <p className={styles.subtitle}>إدارة الحلقات والمتابعة مع الطلاب</p>
        </div>

        {/* Desktop Skeleton */}
        <div className={styles.desktopView}>
          <SkeletonTable rows={5} columns={5} className={styles.tableWrapper} />
        </div>

        {/* Mobile Skeleton */}
        <div className={styles.mobileView}>
          <SkeletonCards cards={3} type="lesson" />
        </div>
      </div>
    );
  }

  return (
    <>
      {initialClasses.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--text-light)",
          }}
        >
          <FiUsers size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <h3>لا توجد حلقات</h3>
          <p>لم يتم العثور على أي حلقات مطابقة للبحث</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <div className={styles.header}>
            <h2 className={styles.title}>حصص الشهر الحالي</h2>
            <p className={styles.subtitle}>إدارة الحلقات والمتابعة مع الطلاب</p>
          </div>

          {/* Filters Section */}
          <div className={styles.filtersContainer}>
            <div className={styles.filtersRow}>
              <div className={styles.filterGroup}>
                <FiCalendar className={styles.filterIcon} />
                <label htmlFor="dateFilter" className={styles.filterLabel}>
                  تاريخ محدد:
                </label>
                <input
                  id="dateFilter"
                  type="date"
                  value={dateFilter}
                  onChange={handleDateFilterChange}
                  className={styles.filterInput}
                />
              </div>

              <div className={styles.filterGroup}>
                <FiCalendar className={styles.filterIcon} />
                <label htmlFor="monthFilter" className={styles.filterLabel}>
                  الشهر:
                </label>
                <select
                  id="monthFilter"
                  value={monthFilter}
                  onChange={handleMonthFilterChange}
                  className={styles.filterSelect}
                >
                  <option value="">كل الأشهر</option>
                  <option value="1">يناير</option>
                  <option value="2">فبراير</option>
                  <option value="3">مارس</option>
                  <option value="4">أبريل</option>
                  <option value="5">مايو</option>
                  <option value="6">يونيو</option>
                  <option value="7">يوليو</option>
                  <option value="8">أغسطس</option>
                  <option value="9">سبتمبر</option>
                  <option value="10">أكتوبر</option>
                  <option value="11">نوفمبر</option>
                  <option value="12">ديسمبر</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <FiCalendar className={styles.filterIcon} />
                <label htmlFor="yearFilter" className={styles.filterLabel}>
                  السنة:
                </label>
                <select
                  id="yearFilter"
                  value={yearFilter}
                  onChange={handleYearFilterChange}
                  className={styles.filterSelect}
                >
                  <option value="">كل السنوات</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <FiFilter className={styles.filterIcon} />
                <label htmlFor="statusFilter" className={styles.filterLabel}>
                  الحالة:
                </label>
                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className={styles.filterSelect}
                >
                  <option value="all">جميع الحصص</option>
                  <option value="scheduled">مجدولة</option>
                  <option value="completed">مكتملة</option>
                </select>
              </div>

              <Button
                onClick={showCurrentMonth}
                variant={isCurrentMonthActive ? "primary" : "outline-primary"}
                size="small"
                icon={<FiClock />}
                title="عرض تقارير هذا الشهر"
              >
                هذا الشهر
              </Button>

              {(dateFilter ||
                monthFilter ||
                yearFilter ||
                statusFilter !== "all") && (
                <Button
                  onClick={clearFilters}
                  variant="outline-secondary"
                  size="small"
                  icon={<FiX />}
                  title="مسح الفلتر"
                >
                  مسح الفلتر
                </Button>
              )}
            </div>

            {/* Results count */}
            <div className={styles.resultsInfo}>
              <FiClock className={styles.infoIcon} />
              <span>
                عرض {filteredClasses.length} من {classes.length} حصة
              </span>
            </div>
          </div>

          {/* Desktop Table View */}
          <ClassTable classes={filteredClasses} />

          {/* Mobile Cards View */}
          <MobileClassCards classes={filteredClasses} />
        </div>
      )}
    </>
  );
};

export default MonthlyClassTable;
