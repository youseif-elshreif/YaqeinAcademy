import StatCard from "@/src/components/common/UI/StatCard";
import styles from "./TeacherSummaryCards.module.css";
import { FaBook, FaCheck, FaHourglassHalf, FaCoins } from "react-icons/fa";
import { TeacherSummaryCardsProps } from "@/src/types";

const TeacherSummaryCards = ({ classes, money }: TeacherSummaryCardsProps) => {
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
      id: 4,
      title: "سعر الحلقة",
      value: `${money} ج.م`,
      icon: FaCoins,
      color: "info",
    },
    {
      id: 5,
      title: "إجمالي الأرباح",
      value: `${
        classes.filter((cls) => cls.status === "completed").length * money
      } ج.م`,
      icon: FaCoins,
      color: "success",
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
