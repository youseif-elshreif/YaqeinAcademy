import ClassCard from "./ClassCard";
import styles from "../../../styles.module.css";
import { TeacherListProps, Teacher } from "../../../../../utils/types";

const MobileClassCards = ({ Teachers }: TeacherListProps) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {Teachers.map((teacher: Teacher) => (
        <ClassCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
};

export default MobileClassCards;
