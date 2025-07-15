import Link from "next/link";
import styles from "@/styles/ErrorPage.module.css";
import { FaBook } from "react-icons/fa";

export default function Custom404() {
  return (
    <>
      <main className={styles.errorMain}>
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <div className={styles.errorNumber}>404</div>
            <h1 className={styles.errorTitle}>الصفحة غير موجودة</h1>
            <p className={styles.errorDescription}>
              عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر.
            </p>
            <div className={styles.errorActions}>
              <Link href="/" className={styles.homeButton}>
                العودة للصفحة الرئيسية
              </Link>
              <Link href="/courses" className={styles.coursesButton}>
                تصفح الدورات
              </Link>
            </div>
          </div>
          <div className={styles.errorIllustration}>
            <div className={styles.illustrationIcon}>
              <FaBook />
            </div>
            <p className={styles.illustrationText}>
              لم نتمكن من العثور على هذه الصفحة
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
