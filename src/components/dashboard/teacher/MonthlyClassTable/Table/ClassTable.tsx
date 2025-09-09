import ClassTableRow from "./ClassTableRow";
import styles from "../MonthlyClassTable.module.css";
import { ClassTableProps } from "@/src/types";
// Using raw lesson items from API

const ClassTable = ({ classes }: ClassTableProps) => {
  return (
    <div className={styles.desktopView}>
      <div className={styles.tableWrapper}>
        <table className={styles.classTable}>
          <thead>
            <tr>
              <th>الحلقة</th>
              <th>التاريخ والوقت</th>
              <th>الحالة</th>
              <th>رابط الحلقة</th>
              <th>إتمام الحصة</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem: any) => (
              <ClassTableRow key={classItem._id} classItem={classItem} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassTable;
