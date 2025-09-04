import React from "react";
import styles from "./Table.module.css";

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  title?: string;
  subtitle?: string;
  onRetry?: () => void;
  renderRow?: (row: any, index: number) => React.ReactNode;
  className?: string;
  rowClassName?: (row: any, index: number) => string;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  loading = false,
  error = null,
  emptyMessage = "لا توجد بيانات متاحة",
  title,
  subtitle,
  onRetry,
  renderRow,
  className = "",
  rowClassName,
}) => {
  const renderCell = (column: TableColumn, row: any) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }
    return row[column.key] || "-";
  };

  const getRowClassName = (row: any, index: number) => {
    const baseClass = styles.tableRow;
    const customClass = rowClassName ? rowClassName(row, index) : "";
    return [baseClass, customClass].filter(Boolean).join(" ");
  };

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

  return (
    <div className={`${styles.tableContainer} ${className}`}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      {data.length === 0 && !loading ? (
        <div className={styles.emptyState}>
          <h3>{emptyMessage}</h3>
          <p>لم يتم العثور على أي بيانات</p>
        </div>
      ) : (
        <div className={styles.desktopView}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
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
                {data.map((row, index) => (
                  <tr key={row.id || row._id || index} className={getRowClassName(row, index)}>
                    {renderRow ? (
                      renderRow(row, index)
                    ) : (
                      columns.map((column) => (
                        <td
                          key={column.key}
                          className={styles.cell}
                          style={{ textAlign: column.align || "center" }}
                        >
                          {renderCell(column, row)}
                        </td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
