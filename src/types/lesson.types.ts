export interface GroupInComponent {
  _id?: string; // Added _id property
  memberCount?: number;
  meetingLink?: string;
  type?: "private" | "public";
  name?: string;
}

export interface StudentInLesson {
  studentId: string;
  studentName: string;
  nickname?: string;
  rate?: number;
  completed?: {
    newMemorization: string[];
    review: string[];
  };
  nextPrep?: {
    newMemorization: string[];
    review: string[];
  };
  notes?: string;
}

export interface Lesson {
  _id: string;
  groupId:
    | string
    | GroupInComponent
    | {
        _id: string;
        name?: string;
      };
  reportId: string[];
  subject: string;
  scheduledAt: string;
  meetingLink: string;
  status: "completed" | "pending" | "cancelled" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  // Additional properties from usage
  nextLesson?: {
    scheduledAt: string;
    meetingLink: string;
  };
  newMemorized?: {
    new: string[];
    old: string[];
  };
  wantedForNextLesson?: {
    new: string[];
    old: string[];
  };
  currentLink?: string;
  date?: string;
  time?: string;
  groupName?: string;
  studentName?: string;
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
  students?: string[] | StudentInLesson[]; // Student IDs array or detailed student objects
  groupRate?: number;
  groupNotes?: string;
}
