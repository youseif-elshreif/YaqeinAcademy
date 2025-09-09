import React from "react";
import Image from "next/image";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={`${styles.container} ${styles.auth}`}>
      <div className={styles.content}>
        {/* Logo with Pulse Animation */}
        <div className={styles.logoContainer}>
          <Image
            src="/img/logo/logo.webp"
            alt="يقين أكاديمية"
            className={`${styles.logo} `}
            width={200}
            height={245}
            priority
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
