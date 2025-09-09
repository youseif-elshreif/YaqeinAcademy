// ==================================================
// Teacher Types
// ==================================================

import { BaseUser } from "./base.types";

export interface Teacher {
  numberOflessonsCridets: number;
  _id: string;
  userId: string | null | UserTeacher;
  specialization: string[];
  meetingLink: string;
  availability?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserTeacher extends BaseUser {
  country: string;
  city: string;
  role: string;
  quranMemorized: string;
  numOfPartsofQuran: number;
  isVerified: boolean;
  freeLessonUsed: boolean;
  PrivitelessonCredits: number;
  PubliclessonCredits: number;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TeachersResponse {
  teachers: Teacher[];
  userTeahcer: UserTeacher[];
}

export interface CombinedTeacherData {
  teacherInfo: Teacher;
  userInfo: UserTeacher;
}

// Unified teacher data interface for dashboards
export interface TeacherData extends BaseUser {
  teacherId: string | number;
  totalStudents: number;
  totalClasses: number;
  completedClasses: number;
  nextClass: string;
  groupsCount: number;
  totalEarnings: number;
}

export interface TeacherPayment {
  teacherId: string;
  teacherName: string;
  totalPaid: number;
  monthlyPayments: MonthlyPayment[];
  lastPaymentDate?: string;
}

export interface MonthlyPayment {
  month: string;
  amount: number;
}
