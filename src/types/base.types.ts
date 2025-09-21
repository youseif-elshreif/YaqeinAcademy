export interface BaseFormData {
  [key: string]: any;
}
export interface BaseFormErrors {
  [key: string]: string | undefined;
}
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
export interface BaseModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface BasePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}
export interface BaseLoaderProps {
  className?: string;
  size?: "small" | "medium" | "large";
  type?: "default" | "inline" | "overlay" | "minimal";
}
export interface BaseCardProps extends BaseComponentProps {
  title?: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}
export interface BaseTableProps extends BaseComponentProps {
  rows?: number;
  columns?: number;
  loading?: boolean;
}
export interface BaseFilterProps extends BaseComponentProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
}
export interface BaseActionButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger" | "warning";
  disabled?: boolean;
  loading?: boolean;
}
export interface BaseUser {
  _id: string;
  id?: string; // Alternative field name for compatibility
  name: string;
  email: string;
  phone?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface BaseCourse {
  id: string;
  title: string;
  description: string;
  duration?: string;
  createdAt?: string;
  updatedAt?: string;
}
