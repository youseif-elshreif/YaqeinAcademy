import React from "react";
import styles from "../PoliciesPage.module.css";

const BackToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={styles.backToTop}
      title="العودة إلى الأعلى"
    >
      ↑
    </button>
  );
};

export default BackToTopButton;