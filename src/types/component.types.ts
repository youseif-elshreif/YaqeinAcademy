import { Student } from "./student.types";
import { Teacher } from "./teacher.types";
import { Group } from "./group.types";
import { ClassData } from "./lesson.types";
import { BaseComponentProps } from "./base.types";
export interface StudentListProps extends BaseComponentProps {
  Students: Student[];
}
export interface StudentItemProps extends BaseComponentProps {
  studentitem: Student;
}
export interface TeacherListProps extends BaseComponentProps {
  Teachers: Teacher[];
}
export interface TeacherItemProps extends BaseComponentProps {
  teacher: Teacher;
}
export interface GroupListProps extends BaseComponentProps {
  groups: Group[];
}
export interface UserManagementProps extends BaseComponentProps {
  studentData: Student[];
}
export interface ClassTableRowProps extends BaseComponentProps {
  teacher: Teacher;
}
export interface TeacherClassTableRowProps extends BaseComponentProps {
  teacher: Teacher;
}
export interface ClassCardProps extends BaseComponentProps {
  classData: ClassData;
}
export interface GroupCardProps extends BaseComponentProps {
  group: Group;
}
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link"
  | "outline-primary"
  | "outline-secondary";
export type ButtonSize = "small" | "sm" | "medium" | "md" | "large" | "lg";
export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
  as?: "button" | "a" | "div";
  href?: string;
  title?: string;
  id?: string;
}
export interface MeetingLinkActionsProps {
  meetingLink: string;
  styles: any;
}
export interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  variant?: "default" | "add" | "edit" | "delete";
  icon?: React.ReactNode;
  disabled?: boolean;
  isOpen?: boolean;
}
export interface FormFieldProps {
  label: string;
  name: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "number"
    | "textarea"
    | "time"
    | "date";
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  rows?: number;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  fullWidth?: boolean;
}
export interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    duration: number;
    price: number;
    level: string;
    category: string;
    instructor: string;
    image?: string;
  };
}
export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
