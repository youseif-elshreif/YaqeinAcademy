import { useState, useEffect } from "react";
import styles from "./MonthlyClassTable.module.css";
import ClassTable from "./Table/ClassTable";
import MobileClassCards from "./MobileCards/MobileClassCards";
import SkeletonTable from "@/components/common/UI/Skeleton/SkeletonTable";
import SkeletonCards from "@/components/common/UI/Skeleton/SkeletonCards";
// Using raw lesson items from API

interface MonthlyClassTableProps {
  initialClasses: any[];
  loading?: boolean;
}

const MonthlyClassTable = ({
  initialClasses,
  loading = false,
}: MonthlyClassTableProps) => {
  const [classes, setClasses] = useState<any[]>(initialClasses);

  // Sync with external changes to initialClasses
  useEffect(() => {
    setClasses(initialClasses);
  }, [initialClasses]);

  if (loading) {
    return (
      <div className={styles.tableContainer}>
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
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>حصص الشهر الحالي</h2>
        <p className={styles.subtitle}>إدارة الحلقات والمتابعة مع الطلاب</p>
      </div>

      {/* Desktop Table View */}
      <ClassTable classes={classes} />

      {/* Mobile Cards View */}
      <MobileClassCards classes={classes} />
    </div>
  );
};

export default MonthlyClassTable;
