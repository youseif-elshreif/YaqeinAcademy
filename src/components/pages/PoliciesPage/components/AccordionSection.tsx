import React from "react";
import AccordionItem from "./AccordionItem";
import styles from "../PoliciesPage.module.css";

interface AccordionSectionProps {
  title: string;
  data: Array<{
    id: string;
    title?: string;
    question?: string;
    content?: string[];
    answer?: string;
  }>;
  openSections: { [key: string]: boolean };
  onToggleSection: (sectionId: string) => void;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  data,
  openSections,
  onToggleSection,
}) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.accordion}>
        {data.map((item) => (
          <AccordionItem
            key={item.id}
            title={item.title || item.question || ""}
            content={item.content || [item.answer || ""]}
            isOpen={openSections[item.id] || false}
            onToggle={() => onToggleSection(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AccordionSection;