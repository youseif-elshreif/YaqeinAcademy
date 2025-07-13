import styles from "../../../styles.module.css";
import ClassCard from "./ClassCard";
import { GroupListProps as GroupsProp } from "../../types";

const MobileClassCards = ({ groups = [] }: GroupsProp) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {groups.map((groupItem) => (
        <ClassCard key={groupItem.id} groupItem={groupItem} />
      ))}
    </div>
  );
};

export default MobileClassCards;
