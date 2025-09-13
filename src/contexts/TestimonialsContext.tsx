"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import * as testimonialSvc from "@/src/utils/services/testimonial.service";
import { TestimonialFormData } from "@/src/types/testimonial.types";

type TestimonialsContextType = {
  isLoading: boolean;
  error: string | null;
  createTestimonial: (payload: TestimonialFormData) => Promise<any>;
  getAllTestimonials: (page?: number, limit?: number) => Promise<any>;
  getPublicTestimonials: (page?: number, limit?: number) => Promise<any>;
  approveTestimonial: (id: string) => Promise<any>;
  rejectTestimonial: (id: string) => Promise<any>;
  deleteTestimonial: (id: string) => Promise<any>;
};

const TestimonialsContext = createContext<TestimonialsContextType | undefined>(
  undefined
);

export const useTestimonialsContext = () => {
  const context = useContext(TestimonialsContext);
  if (!context) {
    throw new Error(
      "useTestimonialsContext must be used within TestimonialsProvider"
    );
  }
  return context;
};

type TestimonialsProviderProps = {
  children: ReactNode;
};

export const TestimonialsProvider = ({
  children,
}: TestimonialsProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTestimonial = useCallback(
    async (payload: TestimonialFormData): Promise<any> => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await testimonialSvc.createTestimonial(payload);
        return data;
      } catch (error) {
        setError("خطأ في إرسال التوصية");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getAllTestimonials = useCallback(
    async (page = 1, limit = 10): Promise<any> => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await testimonialSvc.getAllTestimonials(page, limit);
        return data;
      } catch (error) {
        setError("خطأ في جلب التوصيات");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getPublicTestimonials = useCallback(
    async (page = 1, limit = 10): Promise<any> => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await testimonialSvc.getPublicTestimonials(page, limit);
        console.log("Public Testimonials Data:", data);
        return data;
      } catch (error) {
        setError("خطأ في جلب آراء الطلاب");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const approveTestimonial = useCallback(async (id: string): Promise<any> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await testimonialSvc.approveTestimonial(id);
      return data;
    } catch (error) {
      setError("خطأ في قبول التوصية");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const rejectTestimonial = useCallback(async (id: string): Promise<any> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await testimonialSvc.rejectTestimonial(id);
      return data;
    } catch (error) {
      setError("خطأ في رفض التوصية");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTestimonial = useCallback(async (id: string): Promise<any> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await testimonialSvc.deleteTestimonial(id);
      return data;
    } catch (error) {
      setError("خطأ في حذف التوصية");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: TestimonialsContextType = {
    isLoading,
    error,
    createTestimonial,
    getAllTestimonials,
    getPublicTestimonials,
    approveTestimonial,
    rejectTestimonial,
    deleteTestimonial,
  };

  return (
    <TestimonialsContext.Provider value={value}>
      {children}
    </TestimonialsContext.Provider>
  );
};
