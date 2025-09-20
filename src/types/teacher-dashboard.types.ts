import { StudentAllData, StudentCompletedClassData } from "./student.types";
import { LessonLike } from "./dashboard.types";

export interface TeacherSummaryCardsProps {
  classes: LessonLike[];
  money: number;
  numberOflessonsCridets: number;
}
export interface ClassModalsProps {
  onEdit: (lesson: any) => void;
  onDelete: (lesson: any) => void;
  onAddLink: (lesson: any) => void;
}
export interface StudentAllDataComponentProps {
  studentData: StudentAllData;
}
export interface StudentViewData {
  studentId: number;
  studentName: string;
  nickname: string;
  classes: StudentCompletedClassData[];
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
  initialClasses: any[];
  loading?: boolean;
}
export interface ClassTableProps {
  classes: any[];
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
  classItem: any; // raw lesson from API
}
export interface MobileClassCardsProps {
  classes: any[];
}
export interface ClassCardProps {
  classItem: any; // raw lesson from API
}
export interface ClassModalsProps {
  completeModalOpen: boolean;
  selectedClass: {
    id: number;
    studentName: string;
    date: string;
    time: string;
  } | null;
  onSaveClassCompletion: (completionData: any) => void;
  onCloseCompleteModal: () => void;
  groupCompleteModalOpen: boolean;
  selectedGroupClass: any;
  onSaveGroupCompletion: (completionData: any[]) => void;
  onCloseGroupCompleteModal: () => void;
  studentAllDataModalOpen: boolean;
  studentAllData: any;
  onCloseStudentAllData: () => void;
}
