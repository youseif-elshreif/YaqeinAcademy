import { IconType } from "react-icons";
import { BaseComponentProps, BaseLoaderProps, BaseCourse } from "./base.types";
export interface StatCardProps extends BaseComponentProps {
  icon: IconType;
  value: string | number;
  label: string;
}
export interface SkeletonTableProps extends BaseComponentProps {
  rows?: number;
  columns?: number;
  title?: string;
}
export interface SkeletonCardsProps extends BaseComponentProps {
  cards?: number;
  type?: "student" | "teacher" | "lesson";
}
export interface EnhancedLoaderProps extends BaseLoaderProps {
  text?: string;
  color?: "primary" | "secondary" | "white";
}
export interface EmailVerificationLoaderProps extends BaseComponentProps {
  message?: string;
}
export interface UICourse extends Omit<BaseCourse, "description"> {
  description?: string; // Make description optional for UI course
  startDate: string;
  shortDescription: string;
  telegramLink?: string;
}
export interface CoursesGridProps extends BaseComponentProps {
  courses: UICourse[];
  showBtn?: boolean;
  isContainer?: boolean;
  isAdminView?: boolean;
}
export interface CourseCardProps extends BaseComponentProps {
  id?: string;
  title: string;
  startDate: string;
  duration?: string;
  shortDescription: string;
  showBtn?: boolean;
  isAdminView?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  telegramLink?: string;
}
export interface AdminCourseCardProps extends BaseComponentProps {
  id: string;
  title: string;
  startDate: string;
  duration?: string;
  shortDescription: string;
  showBtn?: boolean;
}
export interface PaginationControlsProps extends BaseComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export interface DayFilterProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  wrapperClassName?: string;
  selectClassName?: string;
}
export interface SearchFilterProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
}
export interface AuthButtonProps extends BaseComponentProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}
export interface MeetingLinkActionsProps extends BaseComponentProps {
  meetingLink?: string;
  styles: Record<string, string>; // CSS modules styles object
  containerClassName?: string;
  openButtonClassName?: string;
  copyButtonClassName?: string;
  showLabels?: boolean;
  disabled?: boolean;
  onCopySuccess?: () => void;
  onCopyError?: (error: Error) => void;
  onOpenLink?: (link: string) => void;
}
