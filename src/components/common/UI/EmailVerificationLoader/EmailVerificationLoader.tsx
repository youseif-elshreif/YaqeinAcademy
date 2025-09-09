import styles from "./EmailVerificationLoader.module.css";
import { EmailVerificationLoaderProps } from "@/src/types";

export default function EmailVerificationLoader({
  className = "",
}: EmailVerificationLoaderProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.emailIcon}>
        <div className={styles.envelope}>
          <div className={styles.lid}></div>
          <div className={styles.body}></div>
          <div className={styles.checkmark}>
            <div className={styles.checkmarkCircle}>
              <div className={styles.background}></div>
              <div className={styles.checkmarkDraw}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.title}>جاري التحقق من البريد الإلكتروني</h3>
        <p className={styles.subtitle}>
          يرجى الانتظار بينما نقوم بالتحقق من صحة بريدك الإلكتروني
        </p>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progress}></div>
      </div>
    </div>
  );
}
