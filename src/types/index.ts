// Base types - الأساسيات
export * from "./base.types";

// Authentication and User Management - المصادقة وإدارة المستخدمين
export * from "./auth.types";

// User types - أنواع المستخدمين
export * from "./teacher.types";
export * from "./student.types";

// Course and Education Management - إدارة الدورات والتعليم
export * from "./course.types";
export * from "./lesson.types";
export * from "./group.types";

// Dashboard and Reports - لوحات التحكم والتقارير
export * from "./report.types";

// Contact and Communication - التواصل والاتصالات
export * from "./contact.types";

// Modal and UI Components - النوافذ المنبثقة ومكونات الواجهة
export * from "./modal.types";
export * from "./testimonial.types";

// Shared and Common types - التايبس المشتركة
export * from "./shared.types";

// Form and Input types - تايبس النماذج والمدخلات
export type {
  InputFieldProps,
  TextareaFieldProps,
  CheckboxFieldProps,
  CountrySelectProps,
  ErrorDisplayProps,
  ErrorMessageProps,
  Option,
} from "./form.types";

// Modal System types - نظام النوافذ المنبثقة
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
  WarningPanelProps,
} from "./modal-system.types";

// Component types - تايبس المكونات
export * from "./component.types";

// Admin specific types - تايبس الإدارة
export * from "./admin.types";

// UI and Display types - تايبس الواجهة والعرض
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

// Layout and Navigation types - تايبس التخطيط والتنقل
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

// Dashboard specific types - تايبس لوحات التحكم المحددة
export type {
  GroupCompleteClassModalProps,
  CompletionData,
  ClassModalsProps,
  ClassTableProps,
  LessonLike,
  MobileClassCardsProps,
} from "./dashboard.types";

// Student Dashboard types - تايبس لوحة تحكم الطلاب
export type {
  User as StudentUser,
  StudentSummaryCardsProps,
  DashboardTabsProps,
  ProfileUser,
  StudentDataProps,
  StudentMyReportsModalProps,
} from "./student-dashboard.types";

// Teacher Dashboard types - تايبس لوحة تحكم المعلمين
export type {
  TeacherSummaryCardsProps,
  MonthlyClassTableProps,
  ClassTableProps as TeacherClassTableProps,
  GroupClassCompletionData,
  StudentCompletionDetails,
  StudentViewData,
  StudentAllDataComponentViewProps,
  BaseProps,
  GroupStudentCompletion,
  CompleteClassModalProps,
  ClassTableRowProps,
  MobileClassCardsProps as TeacherMobileClassCardsProps,
  ClassCardProps,
} from "./teacher-dashboard.types";

// Context types - تايبس السياق
export type {
  AppProvidersProps,
  ModalProviderProps,
  TeacherDashboardContextType,
  StudentDashboardContextType,
  UnifiedReportsModalProps,
} from "./context.types";

// Additional Context types - أنواع السياق الإضافية
export * from "./teachers-context.types";
export * from "./students-context.types";
