// ==================================================
// Group Types
// ==================================================

import { TimeSlot } from "./admin.types";

// Base group interface for consistency
export interface BaseGroup {
  id: string;
  name: string;
  teacherName: string;
  type: "private" | "public";
  studentsCount: number;
  totalClasses: number;
  completedClasses: number;
  remainingClasses: number;
  postponedClasses: number;
  canceledClasses: number;
  classLink: string;
  meetingLink?: string;
  students: string[];
}

// Extended group interface for API responses
export interface Group extends Omit<BaseGroup, "studentsCount"> {
  classDate: string;
  schedule?: {
    day: string;
    time: string;
  };
}

// Alias for consistency - points to BaseGroup
export interface GroupData extends BaseGroup {
  schedule: {
    day: string;
    time: string;
  };
}

export interface ApiGroup {
  _id: string;
  name: string;
  description?: string;
  type: "private" | "public";
  teacherId: {
    _id: string;
    userId: {
      name: string;
    };
  };
  meetingLink: string;
  timeSlots: TimeSlot[];
  members: any[];
  createdAt: string;
  updatedAt: string;
}
