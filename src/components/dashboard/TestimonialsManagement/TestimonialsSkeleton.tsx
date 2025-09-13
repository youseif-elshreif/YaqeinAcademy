import React from "react";
import styles from "./TestimonialsSkeleton.module.css";

const TestimonialsSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonContainer}>
      {/* Stats Grid Skeleton */}
      <div className={styles.statsGrid}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon}></div>
            <div className={styles.statContent}>
              <div className={styles.statValue}></div>
              <div className={styles.statLabel}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className={styles.filtersContainer}>
        <div className={styles.searchInput}></div>
        <div className={styles.filterRow}>
          <div className={styles.checkbox}></div>
          <div className={styles.dateInput}></div>
        </div>
      </div>

      {/* Testimonials List Skeleton */}
      <div className={styles.listContainer}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.testimonialCard}>
            <div className={styles.testimonialHeader}>
              <div className={styles.nameAndRating}>
                <div className={styles.name}></div>
                <div className={styles.rating}></div>
              </div>
              <div className={styles.date}></div>
            </div>
            <div className={styles.testimonialContent}>
              <div className={styles.textLine}></div>
              <div className={styles.textLine}></div>
              <div className={styles.textLineShort}></div>
            </div>
            <div className={styles.actionButtons}>
              <div className={styles.actionButton}></div>
              <div className={styles.actionButton}></div>
              <div className={styles.actionButton}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className={styles.pagination}>
        {[...Array(3)].map((_, index) => (
          <div key={index} className={styles.pageButton}></div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSkeleton;
