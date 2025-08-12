import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  pageTitle?: string;
  pageDescription?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
  pageTitle,
  pageDescription,
}) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

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
    </>
  );
};

export default AuthLayout;
