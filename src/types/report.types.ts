import { BaseModalProps, BaseComponentProps } from "./base.types";

export interface StudentReport {
  _id: string;
  lessonId?: { _id: string } | string;
  studentId?: string;
  attended?: boolean;
  completeLesson?: boolean;
  doneHomework?: boolean;
  content?: string;
  notes?: string;
  rating?: number;
  newMemorized?: {
        ratingNew: number;
        new: string[];
        ratingOld: number;
        old: string[];
    };
  wantedForNextLesson?: { new: string[]; old: string[] };
  createdAt?: string;
  updatedAt?: string;
}

export interface LessonReport {
  _id?: string;
  id: string;
  lessonId: string;
  studentId: string;
  studentName?: string;
  date: string;
  createdAt?: string;
  attended: boolean;
  completed?: {
    newMemorization: string[];
    review: string[];
  };
  nextPrep?: {
    newMemorization: string[];
    review: string[];
  };
  newMemorized?: {
        ratingNew: number;
        new: string[];
        ratingOld: number;
        old: string[];
    };
  wantedForNextLesson?: {
    new: string[];
    old: string[];
  };
  notes: string;
  content?: string; // Alternative field for notes
  rating: number;
  status: "completed" | "pending" | "cancelled";
}

export interface ReportCardProps extends BaseComponentProps {
  report: StudentReport; // Updated from LessonReport to match actual usage
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
  reports: StudentReport[]; // Updated from LessonReport[] to match actual usage
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
export interface UnifiedReportsModalProps extends BaseModalProps {
  reports?: LessonReport[];
  title?: string;
  student?: { id: string; name?: string };
}
