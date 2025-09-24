import React, { useState } from "react";
import styles from "./PoliciesPage.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { convertTextNumbersToArabic } from "@/src/utils/formatNumbers";

interface AccordionItemProps {
  title: string;
  content: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen,
  onToggle,
}) => {
  return (
    <div className={styles.accordionItem}>
      <button
        className={`${styles.accordionHeader} ${
          isOpen ? styles.accordionHeaderOpen : ""
        }`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.accordionTitle}>{title}</span>
        {isOpen ? (
          <FaChevronUp className={styles.accordionIcon} />
        ) : (
          <FaChevronDown className={styles.accordionIcon} />
        )}
      </button>
      <div
        className={`${styles.accordionContent} ${
          isOpen ? styles.accordionContentOpen : ""
        }`}
      >
        <div className={styles.accordionBody}>
          {content.map((item, index) => (
            <p key={index} className={styles.policyItem}>
              {convertTextNumbersToArabic(item)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
