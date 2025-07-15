import { useState, useEffect } from "react";
import styles from "../../styles.module.css";
import MobileClassCards from "./Mobile/MobileClassCards";
import ClassTableRow from "./ClassTableRow";
import { TeacherListProps, Teacher } from "../types";

const MonthlyClassTable = ({ Teachers }: TeacherListProps) => {
  const [students, setstudents] = useState<Teacher[]>(Teachers);

  // Sync with external changes to initialClasses
  useEffect(() => {
    setstudents(students);
  }, [students]);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>المعلمين</h2>
      </div>
      {/* Desktop Table View */}
      <div className={styles.tableWrapper}>
        <table className={styles.classTable}>
          <thead>
            <tr>
              <th className={styles.firstCell}>الاسم</th>
              <th>الرقم التعريفي</th>
              <th>رقم الهاتف</th>
              <th>سعر الحصة</th>
              <th>المستحق خلال الشهر</th>
              <th>عدد الحصص خلال الشهر</th>
              <th>عدد الحصص التي اتمها</th>
              <th>عدد الحصص المتبقية</th>
              <th>عدد الحصص المؤجلة</th>
              <th>عدد الحصص الملغاة</th>
              <th>مرات الغياب</th>
              <th>الإجرائات</th>
              <th>رابط الحصص</th>
              <th>المجموعات</th>
            </tr>
          </thead>
          <tbody>
            {Teachers.map((t) => (
              <ClassTableRow key={t.id} teacher={t} />
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards View */}
      <MobileClassCards Teachers={Teachers} />
    </div>
  );
};

export default MonthlyClassTable;
