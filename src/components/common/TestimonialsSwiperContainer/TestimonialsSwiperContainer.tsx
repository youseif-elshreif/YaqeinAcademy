"use client";
import React, { useState, useEffect } from "react";
import TestimonialsSwiper from "@/src/components/common/TestimonialsSwiper";
import TestimonialsSwiperSkeleton from "./TestimonialsSwiperSkeleton";
import { useTestimonialsContext } from "@/src/contexts/AppProviders";

const TestimonialsSwiperContainer: React.FC = () => {
  const { getPublicTestimonials, isLoading, error } = useTestimonialsContext();
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
  }, [testimonials]);

  useEffect(() => {
    const loadPublicTestimonials = async () => {
      try {

        const response = await getPublicTestimonials();

        setTestimonials(response.reviews || []);
      } catch {
      }
    };

    loadPublicTestimonials();
  }, [getPublicTestimonials]);

  if (isLoading) {
    return <TestimonialsSwiperSkeleton />;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>حدث خطأ في تحميل آراء الطلاب</p>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>لا توجد آراء معتمدة حالياً</p>
      </div>
    );
  }

  return <TestimonialsSwiper testimonials={testimonials} />;
};

export default TestimonialsSwiperContainer;
