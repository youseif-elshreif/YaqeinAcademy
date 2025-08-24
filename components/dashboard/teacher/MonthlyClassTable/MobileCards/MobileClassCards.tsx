import ClassCard from "./ClassCard";
import styles from "../MonthlyClassTable.module.css";

interface MobileClassCardsProps {
  classes: any[];
}

const MobileClassCards = ({ classes }: MobileClassCardsProps) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {classes.map((classItem: any) => (
        <ClassCard key={classItem._id} classItem={classItem} />
      ))}
    </div>
  );
};

export default MobileClassCards;
