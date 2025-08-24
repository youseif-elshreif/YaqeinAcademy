import React from "react";
import { FiSearch } from "react-icons/fi";

export interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  value,
  onChange,
  placeholder = "ابحث...",
  wrapperClassName,
  inputClassName,
  iconClassName,
}) => {
  return (
    <div
      className={wrapperClassName}
      style={
        !wrapperClassName ? { position: "relative", width: "100%" } : undefined
      }
    >
      <FiSearch
        className={iconClassName}
        style={
          !iconClassName
            ? { position: "absolute", right: 10, top: 12, color: "#888" }
            : undefined
        }
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClassName}
        style={
          !inputClassName
            ? {
                width: "100%",
                padding: "0.6rem 2.2rem 0.6rem 0.8rem",
                border: "1px solid #ddd",
                borderRadius: 8,
              }
            : undefined
        }
      />
    </div>
  );
};

export default SearchFilter;
