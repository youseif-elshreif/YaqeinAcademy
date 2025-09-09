// ==================================================
// Course & API Types
// ==================================================

import { BaseCourse } from "./base.types";

export interface Course extends Omit<BaseCourse, "id"> {
  _id?: string; // MongoDB ObjectId format
  id?: string | number; // Optional frontend id
  telegramLink: string;
  linkId: string;
  startAt: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CourseData extends Omit<BaseCourse, "duration"> {
  duration: number; // Override to number type
  studentsCount: number;
  rating: number;
}
