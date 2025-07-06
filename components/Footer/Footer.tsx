import styles from "./Footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
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
                <a href="/" className={styles.footerLink}>
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/about" className={styles.footerLink}>
                  عن الأكاديمية
                </a>
              </li>
              <li>
                <a href="/courses" className={styles.footerLink}>
                  دوراتنا
                </a>
              </li>
              <li>
                <a href="/contact" className={styles.footerLink}>
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          {/* Course Categories */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>أقسام الدورات</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="/courses?type=تفسير" className={styles.footerLink}>
                  تفسير القرآن
                </a>
              </li>
              <li>
                <a href="/courses?type=حديث" className={styles.footerLink}>
                  علوم الحديث
                </a>
              </li>
              <li>
                <a href="/courses?type=فقه" className={styles.footerLink}>
                  الفقه
                </a>
              </li>
              <li>
                <a href="/courses?type=عقيدة" className={styles.footerLink}>
                  العقيدة
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>تواصل معنا</h4>
            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>
                <span className={styles.contactLabel}>البريد الإلكتروني:</span>
                <a
                  href="mailto:info@yakin-academy.com"
                  className={styles.contactLink}
                >
                  info@yakin-academy.com
                </a>
              </p>
              <p className={styles.contactItem}>
                <span className={styles.contactLabel}>الهاتف:</span>
                <a href="tel:+1234567890" className={styles.contactLink}>
                  +123 456 7890
                </a>
              </p>
            </div>

            {/* Social Media */}
            <div className={styles.socialMedia}>
              <h5 className={styles.socialTitle}>تابعنا على:</h5>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="فيسبوك">
                  <FaFacebook />
                </a>
                <a href="#" className={styles.socialLink} aria-label="تويتر">
                  <FaTwitter />
                </a>
                <a href="#" className={styles.socialLink} aria-label="إنستغرام">
                  <FaInstagram />
                </a>
                <a href="#" className={styles.socialLink} aria-label="يوتيوب">
                  <FaYoutube />
                </a>
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
            <a href="/privacy" className={styles.bottomLink}>
              سياسة الخصوصية
            </a>
            <a href="/terms" className={styles.bottomLink}>
              شروط الاستخدام
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
