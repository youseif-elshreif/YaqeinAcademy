import React from "react";
import styles from "./SkeletonLoading.module.css";
import { SkeletonTableProps } from "@/src/types";

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 6,
  title,
  className = "",
}) => {
  return (
    <div className={`skeleton-table-container ${className}`}>
      {title && (
        <div className="header">
          <h2 className="title">{title}</h2>
        </div>
      )}

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index}>
                  <div
                    className={`${styles.skeletonText} ${styles.skeletonTextMedium}`}
                    style={{ height: "16px" }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className={styles.skeletonTableRow}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className={styles.skeletonTableCell}>
                    <div
                      className={`${styles.skeletonText} ${
                        colIndex === 0
                          ? styles.skeletonTextLong
                          : colIndex === columns - 1
                          ? styles.skeletonTextShort
                          : styles.skeletonTextMedium
                      }`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonTable;
