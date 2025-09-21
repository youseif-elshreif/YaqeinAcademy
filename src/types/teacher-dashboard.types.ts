import { StudentAllData, StudentCompletedClassData } from "./student.types";
import { LessonLike } from "./dashboard.types";
import { Lesson } from "./lesson.types";
import { Student } from "./student.types";

export interface TeacherSummaryCardsProps {
  classes: LessonLike[];
  money: number;
  numberOflessonsCridets: number;
}
export interface ClassModalsProps {
  onEdit: (lesson: Lesson) => void;
  onDelete: (lesson: Lesson) => void;
  onAddLink: (lesson: Lesson) => void;
}
export interface StudentAllDataComponentProps {
  studentData: StudentAllData;
}
// Extend Student interface to include additional properties needed for teacher dashboard
export interface StudentViewData extends Student {
  studentId?: number; // Alternative field name
  studentName?: string; // Alternative field name
  nickname?: string; // Alternative field name
  classes?: StudentCompletedClassData[]; // Made optional to allow Student objects without classes
}
export interface StudentAllDataComponentViewProps {
  studentData: StudentViewData | null;
  onClose: () => void;
  onViewClassDetails?: (classData: StudentCompletedClassData) => void;
}
export interface GroupClassCompletionData {
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
export interface StudentCompletionDetails extends GroupClassCompletionData {
  attended: boolean;
}
export interface GroupCompleteClassModalProps {
  lessonId: string;
  onClose: () => void;
  onSuccess: () => void;
}
export interface MonthlyClassTableProps {
  initialClasses: Lesson[];
  loading?: boolean;
}
export interface ClassTableProps {
  classes: Lesson[];
}
export interface BaseProps {
  lessonId: string;
  scheduledAt: string;
  student: { id: string; name: string };
  groupName?: string;
  onClose: () => void;
  existingData?: GroupStudentCompletion;
}
export interface GroupStudentCompletion {
  rate: number;
  completed: { newMemorization: string[]; review: string[] };
  nextPrep: { newMemorization: string[]; review: string[] };
  notes: string;
  attended: boolean;
}
export type CompleteClassModalProps =
  | (BaseProps & { mode: "single"; onSave?: never })
  | (BaseProps & {
      mode: "group";
      onSave: (data: GroupStudentCompletion) => void;
    });
export interface ClassTableRowProps {
  classItem: Lesson; // raw lesson from API
}
export interface MobileClassCardsProps {
  classes: Lesson[];
}
export interface ClassCardProps {
  classItem: Lesson; // raw lesson from API
}
export interface ClassModalsProps {
  completeModalOpen: boolean;
  selectedClass: {
    id: number;
    studentName: string;
    date: string;
    time: string;
  } | null;
  onSaveClassCompletion: (completionData: GroupClassCompletionData) => void;
  onCloseCompleteModal: () => void;
  groupCompleteModalOpen: boolean;
  selectedGroupClass: Lesson | null;
  onSaveGroupCompletion: (completionData: GroupClassCompletionData[]) => void;
  onCloseGroupCompleteModal: () => void;
  studentAllDataModalOpen: boolean;
  studentAllData: Student | null;
  onCloseStudentAllData: () => void;
}
