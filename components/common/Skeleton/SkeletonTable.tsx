import React from "react";
import styles from "../Table/Table.module.css";
import skeletonStyles from "./Skeleton.module.css";
import Skeleton from "./Skeleton";

export interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  title?: string;
  className?: string;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 6,
  title,
  className = "",
}) => {
  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <div className={styles.header}>
        {title ? (
          <h2 className={styles.title}>{title}</h2>
        ) : (
          <Skeleton width={200} height={28} />
        )}
      </div>

      <div className={styles.desktopView}>
        <div className={styles.tableWrapper}>
          <table className={`${styles.table} ${skeletonStyles.skeletonTable}`}>
            <thead>
              <tr>
                {Array.from({ length: columns }).map((_, index) => (
                  <th key={index}>
                    <Skeleton height={16} className={skeletonStyles.skeletonHeader} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex} className={skeletonStyles.skeletonTableRow}>
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <td key={colIndex} className={skeletonStyles.skeletonTableCell}>
                      <Skeleton
                        height={16}
                        width={
                          colIndex === 0
                            ? 180
                            : colIndex === columns - 1
                            ? 60
                            : 120
                        }
                        className={skeletonStyles.skeletonCell}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkeletonTable;
