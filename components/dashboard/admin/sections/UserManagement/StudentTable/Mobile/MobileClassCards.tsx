import ClassCard from "./ClassCard";
import styles from "@/components/dashboard/admin/styles.module.css";
import { MobileStudentCardsProps } from "@/types";

const MobileClassCards = ({ Students }: MobileStudentCardsProps) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {Students.map((studentItem) => (
        <ClassCard key={studentItem._id} studentItem={studentItem} />
      ))}
    </div>
  );
};

export default MobileClassCards;
