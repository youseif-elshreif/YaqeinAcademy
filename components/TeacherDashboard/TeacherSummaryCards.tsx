import styles from "./TeacherSummaryCards.module.css";
import {
  FaBook,
  FaCheck,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimes,
  FaCoins,
} from "react-icons/fa";

interface TeacherData {
  name: string;
  totalClasses: number;
  completedClasses: number;
  pendingClasses: number;
  cancelledClasses: number;
  classPrice: number;
  totalEarnings: number;
}

interface ClassData {
  id: number;
  status: string;
}

interface TeacherSummaryCardsProps {
  teacherData: TeacherData;
  classes: ClassData[];
}

const TeacherSummaryCards = ({
  teacherData,
  classes,
}: TeacherSummaryCardsProps) => {
  const summaryCards = [
    {
      id: 1,
      title: "إجمالي الحصص",
      value: teacherData.totalClasses,
      icon: <FaBook />,
      color: "primary",
    },
    {
      id: 2,
      title: "الحصص المكتملة",
      value: teacherData.completedClasses,
      icon: <FaCheck />,
      color: "success",
    },
    {
      id: 3,
      title: "الحصص المعلقة",
      value: teacherData.pendingClasses,
      icon: <FaHourglassHalf />,
      color: "warning",
    },
    {
      id: 4,
      title: "سعر الحصة",
      value: `${teacherData.classPrice} ريال`,
      icon: <FaCoins />,
      color: "info",
    },
    {
      id: 5,
      title: "الحصص الملغية",
      value: teacherData.cancelledClasses,
      icon: <FaTimes />,
      color: "danger",
    },
    {
      id: 6,
      title: "إجمالي الأرباح",
      value: `${teacherData.totalEarnings} ريال`,
      icon: <FaMoneyBillWave />,
      color: "secondary",
    },
  ];

  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.sectionTitle}>ملخص الأداء</h2>
      <div className={styles.cardsGrid}>
        {summaryCards.map((card) => (
          <div
            key={card.id}
            className={`${styles.summaryCard} ${styles[card.color]}`}
          >
            <div className={styles.cardIcon}>{card.icon}</div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardValue}>{card.value}</h3>
              <p className={styles.cardTitle}>{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherSummaryCards;
