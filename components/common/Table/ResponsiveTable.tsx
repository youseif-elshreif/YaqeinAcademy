import React from "react";
import styles from "./Table.module.css";

export interface ResponsiveTableProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  mobileComponent?: React.ReactNode;
  className?: string;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  children,
  title,
  subtitle,
  mobileComponent,
  className = "",
}) => {
  return (
    <div className={`${styles.tableContainer} ${className}`}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      {/* Desktop Table View */}
      <div className={styles.desktopView}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            {children}
          </table>
        </div>
      </div>

      {/* Mobile Cards View */}
      {mobileComponent && (
        <div className={styles.mobileView}>
          {mobileComponent}
        </div>
      )}
    </div>
  );
};

export default ResponsiveTable;
