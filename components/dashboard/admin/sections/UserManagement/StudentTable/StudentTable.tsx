"use client";
import { useState, useEffect } from "react";
import styles from "@/components/dashboard/admin/styles.module.css";
// import ClassTable from "@/components/TeacherDashboard/MonthlyClassTable/Table/ClassTable";
import ClassTableRow from "./ClassTableRow";
import MobileClassCards from "./Mobile/MobileClassCards";
import {
  StudentListProps as MonthlyClassTableProps,
  Student as Students,
} from "@/utils/types";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
const MonthlyClassTable = ({ Students }: MonthlyClassTableProps) => {
  const [students, setstudents] = useState<Students[]>(Students);
  const { getTeachers } = useAdminDashboardContext();
  // Sync with external changes to initialClasses
  useEffect(() => {
    setstudents(students);
    getTeachers(localStorage.getItem("accessToken") || "");
  }, [students]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>الطلاب</h2>
      </div>
      {/* Desktop Table View */}
      <div className={styles.tableWrapper}>
        <table className={styles.classTable}>
          <thead>
            <tr>
              <th className={styles.firstCell}>الاسم</th>
              <th>رقم الهاتف</th>
              <th>الرقم التعريفي</th>
              <th>عدد الحصص المدفوعة</th>
              <th>ميعاد الدفع</th>
              <th>المدفوع</th>
              <th>عدد الحصص المتبقية</th>
              <th>عدد الحصص المؤجلة</th>
              <th>عدد الحصص الملغاة</th>
              <th>عدد الحصص التي لم تحضر</th>
              <th>عدد الحصص التي حضرت</th>
              <th>الإجراءات</th>
              <th>التقييم</th>
              <th>الحصص</th>
              <th>المجموعة</th>
            </tr>
          </thead>
          <tbody>
            {Students.map((s) => (
              <ClassTableRow key={s.id} studentitem={s} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <MobileClassCards Students={Students} />
    </div>
  );
};

export default MonthlyClassTable;
