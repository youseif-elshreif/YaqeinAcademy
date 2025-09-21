import { Lesson } from "./lesson.types";
import { NextLessonResponse } from "./student.types";
import { Student } from "./student.types";

export interface AppProvidersProps {
  children: React.ReactNode;
}
export interface ModalProviderProps {
  children: React.ReactNode;
}
export interface UnifiedReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId?: string;
  lessonId?: string;
  groupId?: string;
  title?: string;
  className?: string;
}

export interface LessonReport {
  studentId: string;
  attended: boolean;
  wantedForNextLesson: { new: string[]; old: string[] };
  newMemorized: { new: string[]; old: string[] };
  notes: string;
  rating: number;
}

export interface GroupUsualSchedule {
  firstDay?: string;
  secondDay?: string;
  thirdDay?: string;
  fourthDay?: string;
  fifthDay?: string;
  sixthDay?: string;
  seventhDay?: string;
  firstDayTime?: string;
  secondDayTime?: string;
  thirdDayTime?: string;
  fourthDayTime?: string;
  fifthDayTime?: string;
  sixthDayTime?: string;
  seventhDayTime?: string;
}

export interface UserStats {
  totalLessons?: number;
  completedLessons?: number;
  remainingLessons?: number;
  overallRate?: number;
  allowedLessons?: number;
  usedLessons?: number;
  attendedLessons?: number;
  missedLessons?: number;
  PrivitelessonCredits?: number;
  GroupUsualDate?: GroupUsualSchedule; // Updated from string to object
  GroupMeetingLink?: string;
  GroupName?: string;
  // Additional properties that might be present in the API response
  [key: string]: any;
}

export interface TeacherDashboardContextType {
  teacherLessons: Lesson[];
  getMyLessons: () => Promise<Lesson[]>;
  reportLesson: (lessonId: string, payload: LessonReport) => Promise<any>;
  reportMultipleAndComplete: (
    lessonId: string,
    reports: LessonReport[]
  ) => Promise<void>;
  reportForLessons: (
    lessonId: string,
    reports: LessonReport[]
  ) => Promise<void>;
  isLoading: boolean;
  isInitialLoading: boolean;
}
export interface StudentDashboardContextType {
  getUserStats: () => Promise<UserStats>;
  userStats: UserStats | null;
  getUserLessons: () => Promise<Lesson[]>;
  userLessons: Lesson[];
  getNextLesson: () => Promise<Lesson>;
  nextLessonData: NextLessonResponse | null; // Updated to match actual type
  isLoading: boolean;
  isInitialLoading: boolean;
  error: string | null;
}
