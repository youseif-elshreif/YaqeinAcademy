import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={`${styles.hero} custom-bg`}>
      <div className="container z-1">
        <div className={styles.heroContent}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>تصفح دوراتنا</h1>
            <p className={styles.subtitle}>
              مجموعة من الدورات المتخصصة في العلوم الشرعية تناسب كل المستويات.
            </p>
          </div>
          <div className={styles.illustration}>
            <div className={styles.decorativeShape}></div>
            <img
              src="/img/logo/logo.webp"
              alt="أكاديمية يقين"
              className={styles.logoImage}
            />
            <div className={styles.decorativeShape2}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
