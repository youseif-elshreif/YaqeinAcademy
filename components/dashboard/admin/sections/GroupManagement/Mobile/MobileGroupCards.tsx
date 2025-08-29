import GroupCard from "./GroupCard";
import styles from "@/components/dashboard/admin/styles.module.css";

interface MobileGroupCardsProps {
  groups: any[]; // Groups from API
}

const MobileGroupCards = ({ groups }: MobileGroupCardsProps) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {groups.map((group) => (
        <GroupCard key={group._id} group={group} />
      ))}
    </div>
  );
};

export default MobileGroupCards;
