import React from "react";
import Link from "next/link";
import styles from "../styles/EmailConfirmationPage.module.css";
import { withGuestProtection } from "@/components/auth";
import { FaEnvelope } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";

const EmailConfirmationPage: React.FC = () => {
  return (
    <main>
      <div className={styles.card}>
        {/* Email Illustration and Arabic Text */}
        <div className={styles.noticeContainer}>
          <MdVerifiedUser className={styles.icon} />
          <h1 className={styles.heading}>
            تحقق من بريدك الإلكتروني <FaEnvelope />
          </h1>
          <p className={styles.paragraph}>
            لقد أرسلنا رسالة تأكيد إلى بريدك الإلكتروني. يرجى التحقق من بريدك
            والضغط على الرابط لتفعيل حسابك.
          </p>
        </div>
        <div className={styles.buttonGroup}>
          {/* <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryButton}
          >
            فتح البريد الإلكتروني
          </a> */}
          <Link href="/" legacyBehavior>
            <a className={styles.secondaryButton}>العودة للرئيسية</a>
          </Link>
        </div>
      </div>
    </main>
  );
};

// export default withGuestProtection(EmailConfirmationPage);
export default EmailConfirmationPage;
