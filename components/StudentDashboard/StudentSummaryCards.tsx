import StatCard from "@/components/StatCard";
import styles from "./StudentSummaryCards.module.css";
import {
  FaCalendarCheck,
  FaHourglassHalf,
  FaBook,
  FaPercent,
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
  enrolledCourses?: number;
  completedSessions?: number;
  remainingSessions?: number;
  attendanceRate?: number;
}

interface StudentSummaryCardsProps {
  studentData: User;
}

const StudentSummaryCards = ({ studentData }: StudentSummaryCardsProps) => {
  const summaryCards = [
    {
      id: 1,
      title: "الدورات المسجلة",
      value: studentData.enrolledCourses,
      icon: FaBook,
      color: "primary",
    },
    {
      id: 2,
      title: "الحلقات المكتملة",
      value: studentData.completedSessions,
      icon: FaCalendarCheck,
      color: "success",
    },
    {
      id: 3,
      title: "الحلقات المتبقية",
      value: studentData.remainingSessions,
      icon: FaHourglassHalf,
      color: "warning",
    },
    {
      id: 4,
      title: "معدل الحضور",
      value: `${studentData.attendanceRate}%`,
      icon: FaPercent,
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
            value={card.value || 0}
            label={card.title}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentSummaryCards;
