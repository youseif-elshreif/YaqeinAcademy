import ClassCard from "./ClassCard";
import styles from "../MonthlyClassTable.module.css";
import { ClassData } from "@/utils/types";

interface MobileClassCardsProps {
  classes: ClassData[];
}

const MobileClassCards = ({ classes }: MobileClassCardsProps) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {classes.map((classItem) => (
        <ClassCard key={classItem.id} classItem={classItem} />
      ))}
    </div>
  );
};

export default MobileClassCards;
