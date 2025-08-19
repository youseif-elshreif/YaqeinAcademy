import StatCard from "@/components/common/UI/StatCard";
import styles from "./StudentSummaryCards.module.css";
import {
  FaCalendarCheck,
  FaHourglassHalf,
  FaBook,
} from "react-icons/fa";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role?: string;
  age?: number;
  quranMemorized?: string;
  numOfPartsofQuran?: number;
  isVerified?: boolean;
  createdAt?: string;
  avatar?: string;
  completedSessions?: number;
  remainingSessions?: number;
  attendedLessons?: number;
  PrivitelessonCredits?: number;
}

interface StudentSummaryCardsProps {
  studentData: User;
}

const StudentSummaryCards = ({ studentData }: StudentSummaryCardsProps) => {
  const summaryCards = [
    {
      id: 1,
      title: "عدد الحصص المستحقة",
      value: studentData.PrivitelessonCredits || 0,
      icon: FaBook,
      color: "primary",
    },
    {
      id: 2,
      title: "عدد الحصص التي حضرها",
      value: studentData.attendedLessons || 0,
      icon: FaBook,
      color: "primary",
    },
    {
      id: 3,
      title: "الحلقات المكتملة",
      value: studentData.completedSessions || 0,
      icon: FaCalendarCheck,
      color: "success",
    },
    {
      id: 4,
      title: "الحلقات المتبقية",
      value: studentData.remainingSessions || 0,
      icon: FaHourglassHalf,
      color: "warning",
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
            value={card.value || 0}
            label={card.title}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentSummaryCards;
