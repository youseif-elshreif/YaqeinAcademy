import { Teacher } from "./teacher.types";

export interface TeachersContextType {
  teachers: Teacher[];
  teachersStats: {
    totalTeachers: number;
    activeTeachers: number;
    onlineTeachers: number;
  };
  isLoading: boolean;
  error: string | null;
  getTeachers: () => Promise<Teacher[]>;
  createTeacher: (payload: Partial<Teacher>) => Promise<Teacher>;
  updateTeacher: (
    teacherId: string,
    data: Partial<Teacher>
  ) => Promise<Teacher>;
  deleteTeacher: (teacherId: string) => Promise<void>;
  updateTeacherMeetingLink: (
    teacherId: string,
    meetingLink: string
  ) => Promise<Teacher>;
  refreshTeachers: () => Promise<void>;
  setTeachers: (teachers: Teacher[]) => void;
}

export interface TeachersProviderProps {
  children: React.ReactNode;
}
