import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./AuthLayout.module.css";
import { AuthLayoutProps } from "@/src/types";

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}) => {
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <div className={styles.logoContainer}>
              <Image
                src="/img/logo/logo-light.svg"
                alt="أكاديمية يقين"
                className={styles.logo}
                width={120}
                height={120}
                priority
              />
            </div>

            <div className={styles.header}>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>

            {children}

            {(footerText || footerLinkText) && (
              <div className={styles.footer}>
                <p className={styles.footerText}>
                  {footerText}{" "}
                  {footerLinkText && footerLinkHref && (
                    <Link href={footerLinkHref} className={styles.link}>
                      {footerLinkText}
                    </Link>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
