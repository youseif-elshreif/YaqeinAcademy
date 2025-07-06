import Head from "next/head";
import Link from "next/link";
import styles from "./AuthLayout.module.css";

const AuthLayout = ({
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
                <img
                  src="/img/logo/logo-light.svg"
                  alt="أكاديمية يقين"
                  className={styles.logo}
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
