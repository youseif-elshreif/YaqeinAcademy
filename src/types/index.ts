// ==================================================
// Main Types Export Index
// ==================================================

// Base Types (Foundation)
export * from "./base.types";

// Auth & User Types
export * from "./auth.types";

// Teacher Types
export * from "./teacher.types";

// Student Types
export * from "./student.types";

// Lesson Types
export * from "./lesson.types";

// Group Types
export * from "./group.types";

// Payment Types
export * from "./payment.types";

// Modal & Context Types
export * from "./modal.types";

// Modal System Types
export type {
  ActionButtonProps,
  ConfirmTextInputProps,
  ModalContainerProps,
  ModalActionsProps,
  ActionButton,
  UserTypeSelectorProps,
  UserTypeOption,
  SelectedUserTypeHeaderProps,
  SelectFieldProps,
  Option,
  WarningPanelProps,
} from "./modal-system.types";

// Component Types
export * from "./component.types";

// Admin Types
export * from "./admin.types";

// Course Types
export * from "./course.types";

// Form Types (avoid conflicts by importing specific types)
export type {
  InputFieldProps,
  TextareaFieldProps,
  CheckboxFieldProps,
  CountrySelectProps,
  ErrorDisplayProps,
  ErrorMessageProps,
} from "./form.types";

// UI Types (avoid conflicts by importing specific types)
export type {
  StatCardProps,
  SkeletonTableProps,
  SkeletonCardsProps,
  EnhancedLoaderProps,
  EmailVerificationLoaderProps,
  UICourse,
  CoursesGridProps,
  CourseCardProps,
  AdminCourseCardProps,
  PaginationControlsProps,
  DayFilterProps,
  SearchFilterProps,
  AuthButtonProps,
  MeetingLinkActionsProps,
} from "./ui.types";

// Layout Types (avoid conflicts by importing specific types)
export type {
  NavItem,
  NavbarProps,
  FooterProps,
  LayoutProps,
  HeroSectionProps,
  BreadcrumbItem,
  BreadcrumbProps,
  HeaderProps,
} from "./layout.types";

// Report Types
export * from "./report.types";

// Dashboard Types - consolidated from separate dashboard files
export type {
  GroupCompleteClassModalProps,
  CompletionData,
  StudentReportsModalProps,
  StudentListModalProps,
  EditClassLinkModalProps,
  ClassModalsProps,
} from "./dashboard.types";

// Student Dashboard Types
export type {
  User as StudentUser,
  StudentSummaryCardsProps,
  DashboardTabsProps,
  ProfileUser,
  StudentDataProps,
  StudentMyReportsModalProps,
} from "./student-dashboard.types";

// Teacher Dashboard Types
export type {
  LessonLike,
  TeacherSummaryCardsProps,
  MonthlyClassTableProps,
  ClassTableProps,
  GroupClassCompletionData,
  StudentCompletionDetails,
  Student,
  StudentViewData,
  StudentAllDataComponentViewProps,
  BaseProps,
  GroupStudentCompletion,
  CompleteClassModalProps,
  ClassTableRowProps,
  MobileClassCardsProps,
  ClassCardProps,
} from "./teacher-dashboard.types";

// Context Types (avoid conflicts by importing specific types)
export type {
  AppProvidersProps,
  ModalProviderProps,
  TeacherDashboardContextType,
  StudentDashboardContextType,
  UnifiedReportsModalProps,
} from "./context.types";

// Deprecated Types - Remove these imports in next version
// export type { } from "./ui-extended.types"; // DEPRECATED - merged into ui.types.ts and base.types.ts
