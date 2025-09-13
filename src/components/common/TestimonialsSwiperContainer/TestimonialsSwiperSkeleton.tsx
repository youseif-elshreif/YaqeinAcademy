import React from "react";
import styles from "./TestimonialsSwiperSkeleton.module.css";

const TestimonialsSwiperSkeleton: React.FC = () => {
  return (
    <section className={styles.testimonials}>
      <div className="container">
        <div className={styles.header}></div>
        <div className={styles.logo}></div>

        <div className={styles.swiperContainer}>
          <div className={styles.swiper}>
            {[...Array(3)].map((_, index) => (
              <div key={index} className={styles.swiperSlide}>
                <div className={styles.testimonialCard}>
                  <div className={styles.testimonialContent}>
                    <div className={styles.textLine}></div>
                    <div className={styles.textLine}></div>
                    <div className={styles.textLineShort}></div>
                  </div>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.name}></div>
                    <div className={styles.rating}></div>
                    <div className={styles.date}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSwiperSkeleton;
