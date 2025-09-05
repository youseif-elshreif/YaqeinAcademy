import React from "react";
import Link from "next/link";
import styles from "@/styles/EmailConfirmationPage.module.css";
import { withGuestProtection } from "@/components/auth";
import { FaEnvelope } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";
import Button from "@/components/common/Button";

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
          {/* <Button
            as="a"
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            فتح البريد الإلكتروني
          </Button> */}
          <Link href="/">
            <Button variant="secondary">
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

// export default withGuestProtection(EmailConfirmationPage);
export default EmailConfirmationPage;
