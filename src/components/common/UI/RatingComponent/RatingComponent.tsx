import React from "react";
import { RatingComponentProps } from "@/src/types";
import styles from "./RatingComponent.module.css";

const RatingComponent: React.FC<RatingComponentProps> = ({
  value,
  onChange,
  size = "medium",
  disabled = false,
  label = "التقييم من 5:",
}) => {
  const sizeClass = styles[size] || styles.medium;

  return (
    <div className={`${styles.ratingContainer} ${sizeClass}`}>
      {label && <label className={styles.ratingLabel}>{label}</label>}
      <div className={styles.ratingControl}>
        <input
          type="range"
          min="1"
          max="5"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.ratingSlider}
          disabled={disabled}
        />
        <span className={styles.ratingValue}>{value}</span>
      </div>
      <div className={styles.starsDisplay}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${styles.star} ${
              star <= value ? styles.filled : styles.empty
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default RatingComponent;
