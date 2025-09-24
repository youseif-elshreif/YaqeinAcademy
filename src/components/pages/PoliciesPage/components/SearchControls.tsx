import React from "react";
import styles from "../PoliciesPage.module.css";

interface SearchControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

const SearchControls: React.FC<SearchControlsProps> = ({
  searchTerm,
  onSearchChange,
  onExpandAll,
  onCollapseAll,
}) => {
  return (
    <>
      {/* Search */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="ابحث في السياسات والأسئلة الشائعة..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Controls */}
      <div className={styles.controlsContainer}>
        <div>
          <button onClick={onExpandAll} className={styles.expandButton}>
            فتح الكل
          </button>
          <button
            onClick={onCollapseAll}
            className={`${styles.expandButton} ${styles.collapseButton}`}
          >
            إغلاق الكل
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchControls;