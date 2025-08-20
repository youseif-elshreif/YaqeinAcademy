import ClassCard from "./ClassCard";
import styles from "@/components/dashboard/admin/styles.module.css";
import { CombinedTeacherData } from "@/utils/types";

interface MobileTeacherCardsProps {
  teachers: any[];
}

const MobileClassCards = ({ teachers }: MobileTeacherCardsProps) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {teachers.map((teacher: any) => (
        <ClassCard key={teacher._id} teacher={teacher} />
      ))}
    </div>
  );
};

export default MobileClassCards;
