import { useState, useEffect } from "react";
import styles from "../../styles.module.css";
import ClassTableRow from "./ClassTableRow";
import MobileClassCards from "./Mobile/MobileClassCards";
import { Group, GroupListProps as GroupsProp } from "../types";

const MonthlyClassTable = ({ groups = [] }: GroupsProp) => {
  const [students, setstudents] = useState<Group[]>(groups);

  // Sync with external changes to initialClasses
  useEffect(() => {
    setstudents(students);
  }, [students]);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>المجموعات</h2>
      </div>
      {/* Desktop Table View */}
      <div className={styles.tableWrapper}>
        <table className={styles.classTable}>
          <thead>
            <tr>
              <th className={styles.firstCell}>الاسم</th>
              <th>اسم المعلم</th>
              <th>موعد الحصة</th>
              <th>عدد الحصص</th>
              <th>عدد الحصص المؤجلة</th>
              <th>عدد الحصص المتبقية</th>
              <th>عدد الحصص الملغية</th>
              <th>رابط المحاضرة</th>
              <th>الطلاب</th>
              <th>الإجرائات</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <ClassTableRow key={g.id} groupsItem={g} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <MobileClassCards groups={groups} />
    </div>
  );
};

export default MonthlyClassTable;
