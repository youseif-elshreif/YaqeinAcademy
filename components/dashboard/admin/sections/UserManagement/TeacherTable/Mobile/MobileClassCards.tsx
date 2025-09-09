import ClassCard from "./ClassCard";
import styles from "@/components/dashboard/admin/styles.module.css";
import { MobileTeacherCardsProps } from "@/types";

const MobileClassCards = ({ teachers }: MobileTeacherCardsProps) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {teachers.map((teacher) => (
        <ClassCard key={teacher._id} teacher={teacher} />
      ))}
    </div>
  );
};

export default MobileClassCards;


