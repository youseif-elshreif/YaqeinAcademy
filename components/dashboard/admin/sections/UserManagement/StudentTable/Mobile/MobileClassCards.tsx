import ClassCard from "./ClassCard";
import styles from "@/components/dashboard/admin/styles.module.css";

interface MobileClassCardsProps {
  Students: any[]; // Students from API
}

const MobileClassCards = ({ Students }: MobileClassCardsProps) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {Students.map((studentItem) => (
        <ClassCard key={studentItem._id} studentItem={studentItem} />
      ))}
    </div>
  );
};

export default MobileClassCards;
