import ClassCard from "./ClassCard";
import styles from "@/components/dashboard/admin/styles.module.css";
import { StudentListProps as MonthlyClassTableProps } from "@/utils/types";

const MobileClassCards = ({ Students }: MonthlyClassTableProps) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {Students.map((studentItem) => (
        <ClassCard key={studentItem.id} studentItem={studentItem} />
      ))}
    </div>
  );
};

export default MobileClassCards;
