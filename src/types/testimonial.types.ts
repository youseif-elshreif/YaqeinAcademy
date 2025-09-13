// Testimonial interface matching API response
export interface Testimonial {
  _id: string;
  name: string;
  rating: number;
  txt: string;
  hide: boolean;
  adminAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Form data interface for creating testimonials
export interface TestimonialFormData {
  name: string;
  rating: number;
  txt: string;
  hide: boolean;
}

export interface TestimonialListProps {
  testimonials: Testimonial[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TestimonialFormProps {
  onSubmit: (data: TestimonialFormData) => Promise<void>;
  isLoading?: boolean;
}

export interface TestimonialSwiperProps {
  testimonials: Testimonial[];
}

// Rating component interface
export interface RatingComponentProps {
  value: number;
  onChange: (rating: number) => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  label?: string;
}
