import React from "react";
import styles from "@/components/dashboard/admin/styles.module.css";
import skeletonStyles from "@/components/dashboard/admin/styles/SkeletonLoading.module.css";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  title?: string;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 6,
  title = "جاري التحميل...",
}) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      {/* Desktop Table Skeleton */}
      <div className={styles.tableWrapper}>
        <table className={styles.classTable}>
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index}>
                  <div
                    className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                    style={{ height: "16px" }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className={skeletonStyles.skeletonTableRow}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={skeletonStyles.skeletonTableCell}
                  >
                    <div
                      className={`${skeletonStyles.skeletonText} ${
                        colIndex === 0
                          ? skeletonStyles.skeletonTextLong
                          : colIndex === columns - 1
                          ? skeletonStyles.skeletonTextShort
                          : skeletonStyles.skeletonTextMedium
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
