"use client";
import styles from "./Footer.module.css";
import {
  FaFacebook,
  FaLinkedin,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import { useContactContext } from "@/src/contexts/ContactContext";

const Footer = () => {
  const { contactInfo } = useContactContext();

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
              {contactInfo?.email && (
                <p className={styles.contactItem}>
                  <span className={styles.contactLabel}>
                    البريد الإلكتروني:
                  </span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className={styles.contactLink}
                  >
                    {contactInfo.email}
                  </a>
                </p>
              )}
              {contactInfo?.phone && contactInfo.phone.length > 0 && (
                <p className={styles.contactItem}>
                  <span className={styles.contactLabel}>الهاتف:</span>
                  {contactInfo.phone.map((p, i) => (
                    <a key={i} href={`tel:${p}`} className={styles.contactLink}>
                      {p}
                      {i < contactInfo.phone!.length - 1 ? " ، " : ""}
                    </a>
                  ))}
                </p>
              )}
              {contactInfo?.whatsappNumber &&
                contactInfo.whatsappNumber.length > 0 && (
                  <p className={styles.contactItem}>
                    <span className={styles.contactLabel}>واتساب:</span>
                    {contactInfo.whatsappNumber.map((w, i) => {
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
                          {i < contactInfo.whatsappNumber!.length - 1
                            ? " ، "
                            : ""}
                        </a>
                      );
                    })}
                  </p>
                )}
              {contactInfo?.address && (
                <p className={styles.contactItem}>
                  <span className={styles.contactLabel}>العنوان:</span>
                  <span className={styles.contactLink}>
                    {contactInfo.address}
                  </span>
                </p>
              )}
            </div>

            {/* Social Media */}
            <div className={styles.socialMedia}>
              <h5 className={styles.socialTitle}>تابعنا على:</h5>
              <div className={styles.socialLinks}>
                {contactInfo?.facebook && (
                  <a
                    href={contactInfo.facebook}
                    className={styles.socialLink}
                    aria-label="فيسبوك"
                    target="_blank"
                  >
                    <FaFacebook />
                  </a>
                )}
                {contactInfo?.telegramLink && (
                  <a
                    href={contactInfo.telegramLink}
                    className={styles.socialLink}
                    aria-label="تليجرام"
                    target="_blank"
                  >
                    <FaTelegramPlane />
                  </a>
                )}
                {contactInfo?.linkedin && (
                  <a
                    href={contactInfo.linkedin}
                    className={styles.socialLink}
                    aria-label="لينكدإن"
                    target="_blank"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {contactInfo?.whatsappNumber &&
                  contactInfo.whatsappNumber.length > 0 && (
                    <a
                      href={`https://wa.me/${contactInfo.whatsappNumber[0].replace(
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
            © 2025 أكاديمية يقين. جميع الحقوق محفوظة.
          </p>
          <div className={styles.bottomLinks}>
            تم اتنفيذ بواسطة
            <span className={styles.bottomLink}>
              <a
                href="https://www.linkedin.com/in/mohammed-aboellil-628360296/"
                target="_blank"
              >
                محمد ابو الليل
              </a>
            </span>
            <span className={styles.bottomLink}>
              <a
                href="https://www.linkedin.com/in/youseif-elshreif/"
                target="_blank"
              >
                يوسف الشريف
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
