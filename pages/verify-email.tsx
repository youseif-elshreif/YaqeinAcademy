import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BsCheckCircle, BsXCircle, BsClockHistory } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/VerifyEmailPage.module.css";

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
      } catch (err) {
        setStatus("error");
      }
    };

    verify();
  }, [router.query]);

  const renderContent = () => {
    if (status === "loading") {
      return (
        <>
          <BsClockHistory className={`${styles.icon} ${styles.spin} `} />
          <p className={styles.text}>جاري التحقق من البريد الإلكتروني...</p>
        </>
      );
    }

    if (status === "success") {
      return (
        <>
          <BsCheckCircle className={`${styles.icon} ${styles.success}`} />
          <p className={styles.text}>تم التحقق من البريد الإلكتروني بنجاح!</p>
          <button
            className={styles.button}
            onClick={() => router.push("/student/dashboard")}
          >
            الذهاب إلى لوحة التحكم
          </button>
          <button
            className={styles.secondaryButton}
            onClick={() => router.push("/")}
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </>
      );
    }

    return (
      <>
        <BsXCircle className={`${styles.icon} ${styles.error}`} />
        <p className={styles.text}>
          حدث خطأ أثناء التحقق من البريد الإلكتروني.
        </p>
        <button className={styles.button} onClick={() => router.push("/")}>
          العودة إلى الصفحة الرئيسية
        </button>
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
