import StatCard from "@/src/components/common/UI/StatCard";
import styles from "./StudentSummaryCards.module.css";
import { FaCalendarCheck, FaCalendarTimes, FaBook } from "react-icons/fa";
import { StudentSummaryCardsProps } from "@/src/types";

const StudentSummaryCards = ({ studentData }: StudentSummaryCardsProps) => {
  const hasCredits = (studentData.PrivitelessonCredits || 0) > 0;

  const summaryCards = [
    {
      id: 1,
      title: "عدد الحلقات المستحقة",
      value: studentData.PrivitelessonCredits || 0,
      icon: FaBook,
      color: hasCredits ? "primary" : "warning",
      warning: !hasCredits,
    },
    {
      id: 2,
      title: "عدد الحلقات التي حضرها",
      value: studentData.attendedLessons || 0,
      icon: FaCalendarCheck,
      color: "primary",
    },
    {
      id: 3,
      title: "الحلقات التي غابها",
      value: studentData.missedLessons || 0,
      icon: FaCalendarTimes,
      color: "success",
    },
  ];

  return (
    <div className={styles.summaryContainer}>
      {!hasCredits && (
        <div className={styles.warningMessage}>
          <p>⚠️ لا توجد حلقات مستحقة حالياً. يرجى التواصل مع الإدارة.</p>
        </div>
      )}
      <div className={styles.cardsGrid}>
        {summaryCards.map((card) => (
          <div key={card.id} className={card.warning ? styles.warningCard : ""}>
            <StatCard
              icon={card.icon}
              value={card.value || 0}
              label={card.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSummaryCards;
