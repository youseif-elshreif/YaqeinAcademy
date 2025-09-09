import StatCard from "@/components/common/UI/StatCard";
import styles from "./TeacherSummaryCards.module.css";
import {
  FaBook,
  FaCheck,
  FaHourglassHalf,
  FaTimes,
  FaCoins,
} from "react-icons/fa";
import { TeacherSummaryCardsProps } from "@/types";

const TeacherSummaryCards = ({ classes }: TeacherSummaryCardsProps) => {
  const summaryCards = [
    {
      id: 1,
      title: "إجمالي الحلقات",
      value: classes.length,
      icon: FaBook,
      color: "primary",
    },
    {
      id: 2,
      title: "الحلقات المكتملة",
      value: classes.filter((cls) => cls.status === "completed").length,
      icon: FaCheck,
      color: "success",
    },
    {
      id: 3,
      title: "الحلقات المجدولة",
      value: classes.filter((cls) => cls.status === "scheduled").length,
      icon: FaHourglassHalf,
      color: "warning",
    },
    {
      id: 5,
      title: "الحلقات الملغية",
      value: classes.filter((cls) => cls.status === "cancelled").length,
      icon: FaTimes,
      color: "danger",
    },
    {
      id: 4,
      title: "سعر الحلقة",
      value: `500 جنية`,
      icon: FaCoins,
      color: "info",
    },
  ];

  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.sectionTitle}>ملخص الأداء</h2>
      <div className={styles.cardsGrid}>
        {summaryCards.map((card) => (
          <StatCard
            key={card.id}
            icon={card.icon}
            value={card.value}
            label={card.title}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherSummaryCards;


