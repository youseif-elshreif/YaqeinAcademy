import React from "react";
import styles from "./StatCard.module.css";
import { StatCardProps } from "@/src/types";

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  className = "",
}) => {

  const formatValue = (val: string | number): string => {
    if (typeof val === "number") {
      return val.toLocaleString("ar-EG");
    }
    return val;
  };

  return (
    <div className={`${styles.statCard} ${className}`}>
      <div className={styles.statIcon}>
        <Icon />
      </div>
      <div className={styles.statContent}>
        <div className={styles.statValue}>{formatValue(value)}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
