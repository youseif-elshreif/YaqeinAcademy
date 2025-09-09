// =============================================
// Report Types
// =============================================

import { BaseModalProps, BaseComponentProps } from "./base.types";

export interface ReportCardProps extends BaseComponentProps {
  report: any;
  showLessonId?: boolean;
}

export interface ReportsFilterProps extends BaseComponentProps {
  selectedMonth: string;
  selectedYear: string;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
  onClearFilter: () => void;
  onShowCurrentMonth: () => void;
  filteredCount: number;
  totalCount: number;
  isCurrentMonthActive?: boolean;
}

export interface ReportsListProps extends BaseComponentProps {
  reports: any[];
  selectedMonth: string;
  selectedYear: string;
  showLessonId?: boolean;
}

export interface ReportsStatsProps extends BaseComponentProps {
  totalReports: number;
  attendedCount: number;
  homeworkCount: number;
  avgRating: number;
}

// Unified modal props - removed duplicate
export interface UnifiedReportsModalProps extends BaseModalProps {
  reports?: any[];
  title?: string;
  student?: { id: string; name?: string };
}
