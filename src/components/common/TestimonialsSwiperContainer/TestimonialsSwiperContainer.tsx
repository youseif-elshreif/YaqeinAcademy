"use client";
import React from "react";
import TestimonialsSwiper from "@/src/components/common/TestimonialsSwiper";
import { useTestimonials } from "@/src/contexts/AppProviders";

const TestimonialsSwiperContainer: React.FC = () => {
  const { getApprovedTestimonials } = useTestimonials();
  const approvedTestimonials = getApprovedTestimonials();

  return <TestimonialsSwiper testimonials={approvedTestimonials} />;
};

export default TestimonialsSwiperContainer;
