"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BsCheckCircle, BsXCircle, BsClockHistory } from "react-icons/bs";
import { useAuth } from "@/contexts/AuthContext";
import EmailVerificationLoader from "@/components/common/UI/EmailVerificationLoader";
import Button from "@/components/common/Button";
import styles from "@/styles/VerifyEmailPage.module.css";

const VerifyEmailPage: React.FC = () => {
  const { verifyEmail } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token || typeof token !== "string") {
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        await verifyEmail(token);
        localStorage.setItem("accessToken", token);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    verify();
    // eslint-disable-next-line
  }, []);

  const renderContent = () => {
    if (status === "loading") {
      return <EmailVerificationLoader />;
    }

    if (status === "success") {
      return (
        <>
          <BsCheckCircle className={`${styles.icon} ${styles.success}`} />
          <p className={styles.text}>تم التحقق من البريد الإلكتروني بنجاح!</p>
          <Button
            variant="primary"
            onClick={() => router.push("/student/dashboard")}
          >
            الذهاب إلى لوحة التحكم
          </Button>
          <Button variant="secondary" onClick={() => router.push("/")}>
            العودة إلى الصفحة الرئيسية
          </Button>
        </>
      );
    }

    return (
      <>
        <BsXCircle className={`${styles.icon} ${styles.error}`} />
        <p className={styles.text}>
          حدث خطأ أثناء التحقق من البريد الإلكتروني.
        </p>
        <Button variant="primary" onClick={() => router.push("/")}>
          العودة إلى الصفحة الرئيسية
        </Button>
      </>
    );
  };

  return (
    <main className={styles.main}>
      <div className={"container"}>
        <div className={`${styles.card} ${styles.fadeIn} container`}>
          {renderContent()}
        </div>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
