import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { TestimonialSwiperProps } from "@/src/types";
import ViewTestimonialModal from "@/src/components/common/Modals/ViewTestimonialModal";
import styles from "./TestimonialsSwiper.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestimonialsSwiper: React.FC<TestimonialSwiperProps> = ({
  testimonials,
}) => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const truncateText = (text: string, maxWords: number = 8) => {
    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const handleViewTestimonial = (testimonial: any) => {
    setSelectedTestimonial(testimonial);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setSelectedTestimonial(null);
  };

  if (testimonials.length === 0) {
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
            pagination={{
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            grabCursor={true}
            touchRatio={1}
            touchAngle={45}
            threshold={5}
            simulateTouch={true}
            watchSlidesProgress={true}
            speed={600}
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
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id} className={styles.swiperSlide}>
                <div className={styles.testimonialCard}>
                  <blockquote className={styles.testimonialContent}>
                    <p>{truncateText(testimonial.txt)}</p>
                    {testimonial.txt.split(" ").length > 15 && (
                      <button
                        onClick={() => handleViewTestimonial(testimonial)}
                        className={styles.viewButton}
                      >
                        <FiEye className={styles.viewIcon} />
                        عرض كاملاً
                      </button>
                    )}
                  </blockquote>
                  <div className={styles.testimonialAuthor}>
                    <h4>{testimonial.name}</h4>
                    {testimonial.rating && (
                      <div className={styles.rating}>
                        {"★".repeat(testimonial.rating)}
                        {"☆".repeat(5 - testimonial.rating)}
                      </div>
                    )}
                    <span className={styles.testimonialDate}>
                      {new Date(testimonial.createdAt).toLocaleDateString(
                        "ar-EG"
                      )}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* View Testimonial Modal */}
      {selectedTestimonial && (
        <ViewTestimonialModal
          isOpen={isViewModalOpen}
          onClose={handleCloseModal}
          testimonial={selectedTestimonial}
        />
      )}
    </section>
  );
};

export default TestimonialsSwiper;
