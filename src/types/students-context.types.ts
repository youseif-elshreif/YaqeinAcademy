import { Student } from "./student.types";

export interface StudentsContextType {
  students: Student[];
  studentsStats: {
    totalStudents: number;
    activeStudents: number;
    verifiedStudents: number;
  };
  isLoading: boolean;
  error: string | null;
  getStudents: () => Promise<Student[]>;
  createStudent: (payload: Partial<Student>) => Promise<Student>;
  updateMember: (memberId: string, data: Partial<Student>) => Promise<Student>;
  refreshStudents: () => Promise<void>;
  setStudents: (students: Student[]) => void;
}

export interface StudentsProviderProps {
  children: React.ReactNode;
}
