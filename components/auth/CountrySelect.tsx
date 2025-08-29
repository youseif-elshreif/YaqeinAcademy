import countries from "@/public/data/country.json";
import styles from "./CountrySelect.module.css";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

interface CountrySelectProps {
  onChange: (countryName: string, countryCode: string) => void;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  onChange,
  value = "",
  placeholder = "اختر الدولة...",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // تحويل البيانات إلى مصفوفة للسهولة
  const countriesArray = Object.entries(countries).map(([code, name]) => ({
    code,
    name: name as string,
  }));

  // فلترة الدول حسب البحث
  const filteredCountries = countriesArray.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // التركيز على البحث عند فتح القائمة
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm("");
    }
  };

  const handleSelectCountry = (country: { code: string; name: string }) => {
    setSelectedCountry(country.name);
    setIsOpen(false);
    setSearchTerm("");
    onChange(country.name, country.code);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // العثور على الدولة المحددة لعرض اسمها
  const displayValue =
    selectedCountry ||
    (value
      ? countriesArray.find((c) => c.code === value || c.name === value)?.name
      : "");

  return (
    <div className={styles.formGroup} ref={dropdownRef}>
      <div
        className={`${styles.selectContainer} ${
          disabled ? styles.disabled : ""
        }`}
      >
        {/* الحقل الرئيسي */}
        <div
          className={`${styles.selectTrigger} ${
            isOpen ? styles.selectTriggerOpen : ""
          }`}
          onClick={handleToggleDropdown}
        >
          <span
            className={
              displayValue ? styles.selectValue : styles.selectPlaceholder
            }
          >
            {displayValue || placeholder}
          </span>
          <FiChevronDown
            className={`${styles.selectIcon} ${
              isOpen ? styles.selectIconRotated : ""
            }`}
          />
        </div>

        {/* القائمة المنسدلة */}
        {isOpen && (
          <div className={styles.selectDropdown}>
            {/* حقل البحث */}
            <div className={styles.searchContainer}>
              <FiSearch className={styles.searchIcon} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="ابحث عن الدولة..."
                className={styles.searchInput}
              />
            </div>

            {/* قائمة الدول */}
            <div className={styles.optionsList}>
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <div
                    key={country.code}
                    className={`${styles.option} ${
                      selectedCountry === country.name
                        ? styles.optionSelected
                        : ""
                    }`}
                    onClick={() => handleSelectCountry(country)}
                  >
                    {country.name}
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>لا توجد نتائج</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountrySelect;
