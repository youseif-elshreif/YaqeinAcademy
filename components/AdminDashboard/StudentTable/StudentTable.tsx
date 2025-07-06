import { useState, useEffect } from "react";
import styles from "@/components/TeacherDashboard/MonthlyClassTable/MonthlyClassTable.module.css";
import ClassTable from "@/components/TeacherDashboard/MonthlyClassTable/Table/ClassTable";
import MobileClassCards from "@/components/TeacherDashboard/MonthlyClassTable/MobileCards/MobileClassCards";
import ClassTableRow from "./ClassTableRow";

interface Students {
  id: string;
  name: string;
  payedClasses: number;
  nextPaymentDate: string;
  amountPaid: number;
  remainingClasses: number;
  postponedClasses: number;
  canceledClasses: number;
  absentClasses: number;
  attendedClasses: number;
  rate: number;
  phoneNumber: string;
  groupName: string;
}
interface MonthlyClassTableProps {
  Students: Students[];
}

const MonthlyClassTable = ({ Students }: MonthlyClassTableProps) => {
  const [students, setstudents] = useState<Students[]>(Students);

  // Sync with external changes to initialClasses
  useEffect(() => {
    setstudents(students);
  }, [students]);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>حصص الشهر الحالي</h2>
        <p className={styles.subtitle}>إدارة الحصص والمتابعة مع الطلاب</p>
      </div>
      {/* Desktop Table View */}
      <div className={styles.tableWrapper}>
        <table className={styles.classTable}>
          <thead>
            <tr>
              <th className={styles.firstCell}>الاسم</th>
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
              <th>رقم الهاتف</th>
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
      {/* <ClassTable classes={classes} /> */}

      {/* Mobile Cards View */}
      {/* <MobileClassCards classes={classes} /> */}
    </div>
  );
};

export default MonthlyClassTable;
