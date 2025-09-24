import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import styles from "../PoliciesPage.module.css";

const PageHeader: React.FC = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <a href="/" className={styles.breadcrumbLink}>
          الرئيسية
        </a>
        <span className={styles.breadcrumbSeparator}>←</span>
        <span className={styles.breadcrumbCurrentPage}>السياسات</span>
      </div>

      {/* Header */}
      <div className={styles.header}>
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

        <h1 className={styles.mainTitle}>سياسات أكاديمية يقين</h1>
        <p className={styles.subtitle}>
          تعرف على قوانين وسياسات الأكاديمية لضمان أفضل تجربة تعليمية
        </p>
      </div>
    </>
  );
};

export default PageHeader;