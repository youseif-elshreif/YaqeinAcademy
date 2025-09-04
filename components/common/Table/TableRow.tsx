import React from "react";
import styles from "./Table.module.css";

export interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ 
  children, 
  className = "", 
  onClick 
}) => {
  const rowClasses = [styles.tableRow, className].filter(Boolean).join(" ");

  return (
    <tr className={rowClasses} onClick={onClick}>
      {children}
    </tr>
  );
};

export default TableRow;
