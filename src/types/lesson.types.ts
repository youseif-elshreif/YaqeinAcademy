export interface Lesson {
  _id: string;
  groupId: string;
  reportId: string[];
  subject: string;
  scheduledAt: string;
  meetingLink: string;
  status: "completed" | "pending" | "cancelled" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface LessonManagementItem {
  id: string;
  title: string;
  groupName: string;
  teacherName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "completed" | "pending" | "cancelled" | string;
  attendanceCount: number;
  totalStudents: number;
}
export interface ClassData {
  id: string | number;
  date: string;
  time?: string;
  startTime?: string;
  endTime?: string;
  status: "completed" | "pending" | "cancelled" | string;
  subject?: string;
  attendance?: number;
  attendanceCount?: number;
  totalStudents?: number;
  groupName?: string;
  teacherName?: string;
  classLink?: string;
  meetingLink?: string;
  students?: any[];
  groupRate?: number | any;
  groupNotes?: string | any;
}
