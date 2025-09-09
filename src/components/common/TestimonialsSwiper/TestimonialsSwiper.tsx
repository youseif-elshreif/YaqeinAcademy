import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { TestimonialSwiperProps } from '@/src/types';
import styles from './TestimonialsSwiper.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSwiper: React.FC<TestimonialSwiperProps> = ({ testimonials }) => {
  // Filter only approved testimonials
  const approvedTestimonials = testimonials.filter(testimonial => testimonial.status === 'approved');

  if (approvedTestimonials.length === 0) {
    return (
      <section className={styles.testimonials}>
        <div className="container">
          <h2 className={styles.header}>آراء طلابنا</h2>
          <Image
            src="/img/logo/logo-light.svg"
            alt="شعار أكاديمية يقين"
            className={styles.logoLight}
            width={100}
            height={100}
          />
          <p className={styles.noTestimonials}>لا توجد آراء متاحة حالياً</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.testimonials}>
      <div className="container">
        <h2 className={styles.header}>آراء طلابنا</h2>
        <Image
          src="/img/logo/logo-light.svg"
          alt="شعار أكاديمية يقين"
          className={styles.logoLight}
          width={100}
          height={100}
        />
        
        <div className={styles.swiperContainer}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className={styles.swiper}
          >
            {approvedTestimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className={styles.swiperSlide}>
                <div className={styles.testimonialCard}>
                  <blockquote className={styles.testimonialContent}>
                    <p>{testimonial.content}</p>
                  </blockquote>
                  <div className={styles.testimonialAuthor}>
                    <h4>{testimonial.name}</h4>
                    <span className={styles.testimonialDate}>
                      {new Date(testimonial.createdAt).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSwiper;
