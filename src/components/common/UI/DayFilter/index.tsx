import React from "react";
import { DayFilterProps } from "@/src/types";

const AR_DAYS = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

const DayFilter: React.FC<DayFilterProps> = ({
  value,
  onChange,
  placeholder = "كل الأيام",
  wrapperClassName,
  selectClassName,
}) => {
  return (
    <div className={wrapperClassName}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClassName}
      >
        <option value="">{placeholder}</option>
        {AR_DAYS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DayFilter;
