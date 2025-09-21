import { BaseModalProps } from "./base.types";
import { ClassData } from "./lesson.types";
import { Student } from "./student.types";

export interface GroupCompleteClassModalProps extends BaseModalProps {
  lessonId: string;
  onSuccess?: () => void;
}
export interface CompletionData {
  rate: number;
  completed: {
    newMemorization: string[];
    review: string[];
  };
  nextPrep: {
    newMemorization: string[];
    review: string[];
  };
  notes: string;
}
export interface ClassModalsProps {
  selectedLesson: ClassData | null;
  selectedStudent: Student | null;
  selectedClass: ClassData | null;
  studentAllData?: Student;
  studentAllDataModalOpen?: boolean;
  isCompleteModalOpen: boolean;
  isStudentDataModalOpen: boolean;
  isGroupCompleteModalOpen: boolean;
  isAddClassLinkModalOpen: boolean;
  isStudentListModalOpen: boolean;
  isStudentReportsModalOpen: boolean;
  onCloseComplete: () => void;
  onCloseStudentData: () => void;
  onCloseStudentAllData?: () => void;
  onCloseGroupComplete: () => void;
  onCloseAddClassLink: () => void;
  onCloseStudentList: () => void;
  onCloseStudentReports: () => void;
}
export interface LessonLike {
  id: number;
  status: string;
}

export interface MobileClassCardsProps {
  classes: ClassData[];
}
export interface ClassTableProps {
  classes: ClassData[];
}
