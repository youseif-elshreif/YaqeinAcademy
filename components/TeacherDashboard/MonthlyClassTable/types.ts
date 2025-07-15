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

export interface ClassData {
  id: number;
  date: string;
  time: string;
  status: string;
  groupName: string;
  groupRate: number;
  groupNotes: string;
  classLink?: string; // Link to join the class (Zoom, Google Meet, etc.)
  students: StudentINClassData[];
}

export interface StudentData {
  studentId: number;
  studentName: string;
  nickname: string;
}

export interface SelectedClassData {
  id: number;
  studentName: string;
  date: string;
  time: string;
}
