import React from "react";
import styles from "./Table.module.css";

export interface TableCellProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "light" | "dark";
  align?: "left" | "center" | "right";
  className?: string;
  colSpan?: number;
  isFirst?: boolean;
}

const TableCell: React.FC<TableCellProps> = ({
  children,
  variant = "default",
  align = "center",
  className = "",
  colSpan,
  isFirst = false,
}) => {
  const cellClasses = [
    styles.cell,
    variant === "primary" && styles.primaryCell,
    variant === "light" && styles.lightCell,
    variant === "dark" && styles.darkCell,
    isFirst && styles.firstCell,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <td 
      className={cellClasses} 
      style={{ textAlign: align }}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

export default TableCell;
