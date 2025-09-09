"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/src/styles/ErrorPage.module.css";
import { FaLock } from "react-icons/fa";
import Button from "@/src/components/common/Button";

export default function Unauthorized() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <main className={styles.errorMain}>
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <div className={styles.errorNumber}>401</div>
            <h1 className={styles.errorTitle}>غير مصرح لك بالدخول</h1>
            <p className={styles.errorDescription}>
              عذراً، أنت غير مصرح لك بالوصول إلى هذه الصفحة. يرجى تسجيل الدخول
              أولاً أو التأكد من صلاحياتك.
            </p>
            <div className={styles.errorActions}>
              <Link href="/login">
                <Button variant="primary">تسجيل الدخول</Button>
              </Link>
              <Button onClick={handleGoBack} variant="secondary">
                العودة للخلف
              </Button>
            </div>
          </div>
          <div className={styles.errorIllustration}>
            <div className={styles.illustrationIcon}>
              <FaLock />
            </div>
            <p className={styles.illustrationText}>
              تحتاج إلى تسجيل الدخول للوصول إلى هذه الصفحة
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
