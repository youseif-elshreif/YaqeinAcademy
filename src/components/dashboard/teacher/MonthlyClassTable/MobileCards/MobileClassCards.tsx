import ClassCard from "./ClassCard";
import styles from "../MonthlyClassTable.module.css";
import { MobileClassCardsProps } from "@/src/types";

const MobileClassCards = ({ classes }: MobileClassCardsProps) => {
  return (
    <div className={styles.mobileView}>
      <div className={styles.mobileCardsContainer}>
        {classes.map((classItem: any) => (
          <ClassCard key={classItem._id} classItem={classItem} />
        ))}
      </div>
    </div>
  );
};

export default MobileClassCards;
