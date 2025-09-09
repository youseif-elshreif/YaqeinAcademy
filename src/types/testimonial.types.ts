export interface Testimonial {
  id: string;
  name: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface TestimonialFormData {
  name: string;
  content: string;
}

export interface TestimonialListProps {
  testimonials: Testimonial[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TestimonialFormProps {
  onSubmit: (data: TestimonialFormData) => void;
  isLoading?: boolean;
}

export interface TestimonialSwiperProps {
  testimonials: Testimonial[];
}
