import React from "react";
import { FiUsers } from "react-icons/fi";
import { TableColumn, ResponsiveTable, TableRow, TableCell } from "./Table";
import { SkeletonTable, SkeletonCards } from "./Skeleton";
import styles from "./Table/Table.module.css";

export interface DataTableProps {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  onRetry?: () => void;
  renderRow?: (row: any, index: number) => React.ReactNode;
  renderMobileCard?: (row: any, index: number) => React.ReactNode;
  className?: string;
  rowClassName?: (row: any, index: number) => string;
  skeletonRows?: number;
  skeletonColumns?: number;
  mobileCardType?: "student" | "teacher" | "admin" | "default";
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  loading = false,
  error = null,
  emptyMessage = "لا توجد بيانات متاحة",
  emptyIcon = <FiUsers size={48} />,
  title,
  subtitle,
  onRetry,
  renderRow,
  renderMobileCard,
  className = "",
  rowClassName,
  skeletonRows = 5,
  skeletonColumns,
  mobileCardType = "default",
}) => {
  // Show loading skeleton
  if (loading) {
    return (
      <>
        {/* Desktop Skeleton */}
        <div className={styles.desktopView}>
          <SkeletonTable
            rows={skeletonRows}
            columns={skeletonColumns || columns.length}
            title={title}
            className={className}
          />
        </div>
        
        {/* Mobile Skeleton */}
        <div className={styles.mobileView}>
          <div className={`${styles.tableContainer} ${className}`}>
            {(title || subtitle) && (
              <div className={styles.header}>
                {title && <h2 className={styles.title}>{title}</h2>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              </div>
            )}
            <SkeletonCards cards={3} type={mobileCardType} />
          </div>
        </div>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`${styles.tableContainer} ${className}`}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}
        <div className={styles.errorState}>
          <p>{error}</p>
          {onRetry && (
            <button onClick={onRetry}>إعادة المحاولة</button>
          )}
        </div>
      </div>
    );
  }

  // Show empty state
  if (data.length === 0) {
    return (
      <div className={`${styles.tableContainer} ${className}`}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}
        <div className={styles.emptyState}>
          {emptyIcon}
          <h3>{emptyMessage}</h3>
          <p>لم يتم العثور على أي بيانات</p>
        </div>
      </div>
    );
  }

  // Render mobile cards if provided
  const mobileComponent = renderMobileCard ? (
    <div>
      {data.map((row, index) => renderMobileCard(row, index))}
    </div>
  ) : null;

  return (
    <ResponsiveTable
      title={title}
      subtitle={subtitle}
      className={className}
      mobileComponent={mobileComponent}
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              style={{
                width: column.width,
                textAlign: column.align || "center",
              }}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          const customRowClass = rowClassName ? rowClassName(row, index) : "";
          
          return (
            <TableRow
              key={row.id || row._id || index}
              className={customRowClass}
            >
              {renderRow ? (
                renderRow(row, index)
              ) : (
                columns.map((column) => (
                  <TableCell
                    key={column.key}
                    align={column.align}
                  >
                    {column.render ? column.render(row[column.key], row) : (row[column.key] || "-")}
                  </TableCell>
                ))
              )}
            </TableRow>
          );
        })}
      </tbody>
    </ResponsiveTable>
  );
};

export default DataTable;
