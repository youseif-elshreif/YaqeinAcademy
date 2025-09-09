// ==================================================
// Shared Base Types
// ==================================================

// Common form structure that can be extended
export interface BaseFormData {
  [key: string]: any;
}

export interface BaseFormErrors {
  [key: string]: string | undefined;
}

// Common props that many components share
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface BaseModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

// Common pagination structure
export interface BasePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

// Common loader props
export interface BaseLoaderProps {
  className?: string;
  size?: "small" | "medium" | "large";
  type?: "default" | "inline" | "overlay" | "minimal";
}

// Common card props structure
export interface BaseCardProps extends BaseComponentProps {
  title?: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

// Common table props
export interface BaseTableProps extends BaseComponentProps {
  rows?: number;
  columns?: number;
  loading?: boolean;
}

// Common filter props
export interface BaseFilterProps extends BaseComponentProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
}

// Common action button structure
export interface BaseActionButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger" | "warning";
  disabled?: boolean;
  loading?: boolean;
}

// User entity base structure (can be extended for different user types)
export interface BaseUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Course entity base structure
export interface BaseCourse {
  id: string;
  title: string;
  description: string;
  duration?: string;
  createdAt?: string;
  updatedAt?: string;
}
