"use client";
import styles from "./Footer.module.css";
import {
  FaFacebook,
  FaLinkedin,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";

type FooterContact = {
  email?: string;
  phone?: string[];
  address?: string;
  whatsappNumber?: string[];
  telegramLink?: string;
  facebook?: string;
  linkedin?: string;
};

const Footer = () => {
  const { getContactInfo } = useAdminDashboardContext();
  const [contact, setContact] = useState<FooterContact>({});

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    if (!token) return;
    (async () => {
      try {
        const data = await getContactInfo(token);
        setContact(data || {});
      } catch {
        // silent fail, keep defaults
      }
    })();
  }, [getContactInfo]);

  return (
    <footer className={`${styles.footer} custom-bg`}>
      <div className="container z-1">
        <div className={styles.footerContent}>
          {/* Academy Info */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>أكاديمية يقين</h3>
            <p className={styles.description}>
              مؤسسة تعليمية متخصصة في تدريس العلوم الشرعية، نهدف إلى نشر العلم
              الصحيح والموثوق.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>روابط سريعة</h4>
            <ul className={styles.linksList}>
              <li>
                <Link href="/" className={styles.footerLink}>
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.footerLink}>
                  عن الأكاديمية
                </Link>
              </li>
              <li>
                <Link href="/courses" className={styles.footerLink}>
                  دوراتنا
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.footerLink}>
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Course Categories */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>أقسام الدورات</h4>
            <ul className={styles.linksList}>
              <li>
                <Link href="/courses?type=تفسير" className={styles.footerLink}>
                  تفسير القرآن
                </Link>
              </li>
              <li>
                <Link href="/courses?type=حديث" className={styles.footerLink}>
                  علوم الحديث
                </Link>
              </li>
              <li>
                <Link href="/courses?type=فقه" className={styles.footerLink}>
                  الفقه
                </Link>
              </li>
              <li>
                <Link href="/courses?type=عقيدة" className={styles.footerLink}>
                  العقيدة
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>تواصل معنا</h4>
            <div className={styles.contactInfo}>
              {contact.email && (
                <p className={styles.contactItem}>
                  <span className={styles.contactLabel}>
                    البريد الإلكتروني:
                  </span>
                  <a
                    href={`mailto:${contact.email}`}
                    className={styles.contactLink}
                  >
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.phone && contact.phone.length > 0 && (
                <p className={styles.contactItem}>
                  <span className={styles.contactLabel}>الهاتف:</span>
                  {contact.phone.map((p, i) => (
                    <a key={i} href={`tel:${p}`} className={styles.contactLink}>
                      {p}
                      {i < contact.phone!.length - 1 ? " ، " : ""}
                    </a>
                  ))}
                </p>
              )}
              {contact.whatsappNumber && contact.whatsappNumber.length > 0 && (
                <p className={styles.contactItem}>
                  <span className={styles.contactLabel}>واتساب:</span>
                  {contact.whatsappNumber.map((w, i) => {
                    const digits = (w || "").replace(/[^\d+]/g, "");
                    const wa = `https://wa.me/${digits.replace(/^\+/, "")}`;
                    return (
                      <a
                        key={i}
                        href={wa}
                        target="_blank"
                        className={styles.contactLink}
                      >
                        {w}
                        {i < contact.whatsappNumber!.length - 1 ? " ، " : ""}
                      </a>
                    );
                  })}
                </p>
              )}
              {contact.address && (
                <p className={styles.contactItem}>
                  <span className={styles.contactLabel}>العنوان:</span>
                  <span className={styles.contactLink}>{contact.address}</span>
                </p>
              )}
            </div>

            {/* Social Media */}
            <div className={styles.socialMedia}>
              <h5 className={styles.socialTitle}>تابعنا على:</h5>
              <div className={styles.socialLinks}>
                {contact.facebook && (
                  <a
                    href={contact.facebook}
                    className={styles.socialLink}
                    aria-label="فيسبوك"
                    target="_blank"
                  >
                    <FaFacebook />
                  </a>
                )}
                {contact.telegramLink && (
                  <a
                    href={contact.telegramLink}
                    className={styles.socialLink}
                    aria-label="تليجرام"
                    target="_blank"
                  >
                    <FaTelegramPlane />
                  </a>
                )}
                {contact.linkedin && (
                  <a
                    href={contact.linkedin}
                    className={styles.socialLink}
                    aria-label="لينكدإن"
                    target="_blank"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {contact.whatsappNumber &&
                  contact.whatsappNumber.length > 0 && (
                    <a
                      href={`https://wa.me/${contact.whatsappNumber[0].replace(
                        /^\+/,
                        ""
                      )}`}
                      className={styles.socialLink}
                      aria-label="واتساب"
                      target="_blank"
                    >
                      <FaWhatsapp />
                    </a>
                  )}
                {/* Keep YouTube placeholder only if you add field later */}
                {/* {contact.youtube && (...)} */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2024 أكاديمية يقين. جميع الحقوق محفوظة.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy" className={styles.bottomLink}>
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className={styles.bottomLink}>
              شروط الاستخدام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
