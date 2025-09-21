import React from "react";
import styles from "./StatCard.module.css";
import { StatCardProps } from "@/src/types";
import { formatToArabicNumbers } from "@/src/utils/formatNumbers";

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  className = "",
}) => {

  return (
    <div className={`${styles.statCard} ${className}`}>
      <div className={styles.statIcon}>
        <Icon />
      </div>
      <div className={styles.statContent}>
        <div className={styles.statValue}>{formatToArabicNumbers(value)}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
