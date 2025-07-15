import { useState, useEffect } from "react";
import styles from "./MonthlyClassTable.module.css";
import ClassTable from "./Table/ClassTable";
import MobileClassCards from "./MobileCards/MobileClassCards";
import { ClassData } from "./types";

interface MonthlyClassTableProps {
  initialClasses: ClassData[];
}

const MonthlyClassTable = ({ initialClasses }: MonthlyClassTableProps) => {
  const [classes, setClasses] = useState<ClassData[]>(initialClasses);

  // Sync with external changes to initialClasses
  useEffect(() => {
    setClasses(initialClasses);
  }, [initialClasses]);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>حصص الشهر الحالي</h2>
        <p className={styles.subtitle}>إدارة الحصص والمتابعة مع الطلاب</p>
      </div>

      {/* Desktop Table View */}
      <ClassTable classes={classes} />

      {/* Mobile Cards View */}
      <MobileClassCards classes={classes} />
    </div>
  );
};

export default MonthlyClassTable;
