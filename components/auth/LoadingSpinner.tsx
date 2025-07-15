import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={`${styles.container} ${styles.auth}`}>
      <div className={styles.content}>
        {/* Logo with Pulse Animation */}
        <div className={styles.logoContainer}>
          <img
            src="/img/logo/logo.webp"
            alt="يقين أكاديمية"
            className={`${styles.logo} `}
          />
          <div className={styles.pulseRing1}></div>
          <div className={styles.pulseRing2}></div>
          <div className={styles.pulseRing3}></div>
        </div>

        {/* Message */}
        <div className={styles.textContainer}>
          <span className={styles.academyName}>أكاديمية يقين</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
