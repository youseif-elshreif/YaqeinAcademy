import { BaseUser, BaseComponentProps } from "./base.types";
export interface Student extends BaseUser {
  totalPaid: number;
  allowedLessons: number;
  usedLessons: number;
  remainingLessons: number;
  remainingClasses?: number; // Alternative field name
  completedClasses: number;
  postponedClasses: number;
  canceledClasses: number;
  absentClasses: number;
  attendedClasses?: number;
  overallRate: number;
  rate?: number; // Alternative field name
  assignedGroup?: string;
  groupName?: string; // Alternative field name
  joinDate?: string;
  lastPaymentDate?: string;
  nextPaymentDate?: string;
  paymentStatus?: "paid" | "unpaid" | "partial";
  payedClasses?: number;
  amountPaid?: number;
}
export interface StudentData extends BaseUser {
  totalPaid: number;
  paymentStatus: "paid" | "unpaid" | "partial";
  allowedLessons: number;
  usedLessons: number;
  remainingLessons: number;
  assignedGroup: string;
  completedClasses: number;
  postponedClasses: number;
  canceledClasses: number;
  absentClasses: number;
  overallRate: number;
}
export interface StudentCompletedClassData {
  classId: number;
  date: string;
  time: string;
  status: string;
  rate?: number | null;
  completed?: {
    newMemorization: string[];
    review: string[];
  } | null;
  notes?: string;
  nextPrep?: {
    newMemorization: string[];
    review: string[];
  } | null;
}
export interface StudentAllData {
  studentId: number;
  studentName: string;
  nickname: string;
  classes: StudentCompletedClassData[];
}
export interface StudentAllDataComponentProps extends BaseComponentProps {
  studentData: StudentAllData | null;
  onClose: () => void;
  onViewClassDetails?: (classData: StudentCompletedClassData) => void;
}
export interface StudentGroupData {
  usualDate: {
    firstDay: string;
    firstDayTime: string;
    secondDay?: string;
    secondDayTime?: string;
    thirdDay?: string;
    thirdDayTime?: string;
  };
  meetingLink: string;
}
export interface StudentPayment {
  studentId: string;
  studentName: string;
  totalPaid: number;
  lastPaymentDate: string;
  status: "paid" | "unpaid" | "partial";
}
export interface StudentINClassData {
  studentId: number;
  studentName: string;
  nickname: string;
  rate?: number | null;
  completed?: {
    newMemorization: string[];
    review: string[];
  } | null;
  notes?: string;
  nextPrep?: {
    newMemorization: string[];
    review: string[];
  } | null;
}

// Next Lesson API Response Types
export interface NextLessonData {
  _id: string;
  groupId: string;
  reportId: string[];
  subject: string;
  scheduledAt: string;
  meetingLink: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface LastReport {
  newMemorized: {
    new: string[];
    old: string[];
  };
  wantedForNextLesson: {
    new: string[];
    old: string[];
  };
  _id: string;
  lessonId: string;
  sudentId: string;
  attended: boolean;
  content: string;
  completeLesson: boolean;
  doneHomework: boolean;
  notes: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface NextLessonResponse {
  success: boolean;
  message: string;
  nextLesson: NextLessonData | null;
  lastSession: NextLessonData | null;
  lastReport: LastReport | null;
  wantedForNextLesson: {
    new: string[];
    old: string[];
  };
  newMemorized: {
    new: string[];
    old: string[];
  };
}
