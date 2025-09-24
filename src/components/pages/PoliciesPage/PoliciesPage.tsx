"use client";

import React, { useState } from "react";
import styles from "./PoliciesPage.module.css";
import { FaInfoCircle } from "react-icons/fa";
import { policiesData, faqData } from "@/src/data/policiesData";
import AccordionItem from "./AccordionItem";

const PoliciesPage: React.FC = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const expandAll = () => {
    const allIds = [
      ...policiesData.map((p) => p.id),
      ...faqData.map((f) => f.id),
    ];
    const newState: { [key: string]: boolean } = {};
    allIds.forEach((id) => {
      newState[id] = true;
    });
    setOpenSections(newState);
  };

  const collapseAll = () => {
    setOpenSections({});
  };

  const filterData = (data: any[], searchTerm: string) => {
    if (!searchTerm) return data;

    return data.filter((item) => {
      const titleMatch =
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.question?.toLowerCase().includes(searchTerm.toLowerCase());
      const contentMatch = Array.isArray(item.content)
        ? item.content.some((c: string) =>
            c.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : item.answer?.toLowerCase().includes(searchTerm.toLowerCase());

      return titleMatch || contentMatch;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>سياسات أكاديمية يقين</h1>
        <p className={styles.subtitle}>
          تعرف على قوانين وسياسات الأكاديمية لضمان أفضل تجربة تعليمية
        </p>
        <div className={styles.infoAlert}>
          <FaInfoCircle className={styles.infoIcon} />
          <div className={styles.infoContent}>
            <h3>مرحباً بك في صفحة السياسات</h3>
            <p>
              نرجو منك قراءة هذه السياسات بعناية لضمان تجربة تعليمية مثالية
              ولتجنب أي سوء فهم.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Search and Controls */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="ابحث في السياسات والأسئلة الشائعة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.controlsContainer}>
          <div>
            <button onClick={expandAll} className={styles.expandButton}>
              فتح الكل
            </button>
            <button
              onClick={collapseAll}
              className={`${styles.expandButton} ${styles.collapseButton}`}
            >
              إغلاق الكل
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>سياسات الأكاديمية</h2>
          <div className={styles.accordion}>
            {filterData(policiesData, searchTerm).map((policy) => (
              <AccordionItem
                key={policy.id}
                title={policy.title}
                content={policy.content}
                isOpen={openSections[policy.id] || false}
                onToggle={() => toggleSection(policy.id)}
              />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>الأسئلة الشائعة</h2>
          <div className={styles.accordion}>
            {filterData(
              faqData.map((faq) => ({
                ...faq,
                title: faq.question,
                content: [faq.answer],
              })),
              searchTerm
            ).map((faq) => (
              <AccordionItem
                key={faq.id}
                title={faq.question}
                content={[faq.answer]}
                isOpen={openSections[faq.id] || false}
                onToggle={() => toggleSection(faq.id)}
              />
            ))}
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={styles.backToTop}
          title="العودة إلى الأعلى"
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default PoliciesPage;
