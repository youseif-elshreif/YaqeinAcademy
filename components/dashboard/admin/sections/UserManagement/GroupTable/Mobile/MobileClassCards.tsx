import styles from "@/components/dashboard/admin/styles.module.css";
import ClassCard from "./ClassCard";
import { GroupListProps } from "@/utils/types";

const MobileClassCards = ({ groups = [] }: GroupListProps) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {groups.map((groupItem) => (
        <ClassCard key={groupItem.id} groupItem={groupItem} />
      ))}
    </div>
  );
};

export default MobileClassCards;
