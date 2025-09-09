import React, { createContext, useContext, useState, useCallback } from "react";
import { Testimonial, TestimonialFormData } from "@/src/types";
import { mockTestimonials } from "@/src/utils/mockData/testimonials";

interface TestimonialsContextType {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  createTestimonial: (data: TestimonialFormData) => Promise<void>;
  approveTestimonial: (id: string) => Promise<void>;
  rejectTestimonial: (id: string) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  getApprovedTestimonials: () => Testimonial[];
  getPendingTestimonials: () => Testimonial[];
}

const TestimonialsContext = createContext<TestimonialsContextType | undefined>(
  undefined
);

export const useTestimonials = () => {
  const context = useContext(TestimonialsContext);
  if (context === undefined) {
    throw new Error(
      "useTestimonials must be used within a TestimonialsProvider"
    );
  }
  return context;
};

interface TestimonialsProviderProps {
  children: React.ReactNode;
}

export const TestimonialsProvider: React.FC<TestimonialsProviderProps> = ({
  children,
}) => {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(mockTestimonials);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTestimonial = useCallback(async (data: TestimonialFormData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        name: data.name,
        content: data.content,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setTestimonials((prev) => [newTestimonial, ...prev]);
    } catch (err) {
      setError("حدث خطأ أثناء إضافة الرأي");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const approveTestimonial = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setTestimonials((prev) =>
        prev.map((testimonial) =>
          testimonial.id === id
            ? {
                ...testimonial,
                status: "approved" as const,
                updatedAt: new Date(),
              }
            : testimonial
        )
      );
    } catch (err) {
      setError("حدث خطأ أثناء الموافقة على الرأي");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const rejectTestimonial = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setTestimonials((prev) =>
        prev.map((testimonial) =>
          testimonial.id === id
            ? {
                ...testimonial,
                status: "rejected" as const,
                updatedAt: new Date(),
              }
            : testimonial
        )
      );
    } catch (err) {
      setError("حدث خطأ أثناء رفض الرأي");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTestimonial = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setTestimonials((prev) =>
        prev.filter((testimonial) => testimonial.id !== id)
      );
    } catch (err) {
      setError("حدث خطأ أثناء حذف الرأي");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getApprovedTestimonials = useCallback(() => {
    return testimonials.filter(
      (testimonial) => testimonial.status === "approved"
    );
  }, [testimonials]);

  const getPendingTestimonials = useCallback(() => {
    return testimonials.filter(
      (testimonial) => testimonial.status === "pending"
    );
  }, [testimonials]);

  const value: TestimonialsContextType = {
    testimonials,
    loading,
    error,
    createTestimonial,
    approveTestimonial,
    rejectTestimonial,
    deleteTestimonial,
    getApprovedTestimonials,
    getPendingTestimonials,
  };

  return (
    <TestimonialsContext.Provider value={value}>
      {children}
    </TestimonialsContext.Provider>
  );
};
