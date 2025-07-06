import ClassTableRow from "./ClassTableRow";
import styles from "../MonthlyClassTable.module.css";
import { ClassData } from "../types";

interface ClassTableProps {
  classes: ClassData[];
}

const ClassTable = ({ classes }: ClassTableProps) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.classTable}>
        <thead>
          <tr>
            <th>الطالب / المجموعة</th>
            <th>التاريخ والوقت</th>
            <th>الحالة</th>
            <th>رابط الحصة</th>
            <th>التقييم</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <ClassTableRow key={classItem.id} classItem={classItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassTable;
