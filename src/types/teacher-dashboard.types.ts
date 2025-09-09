export interface LessonLike {
  status: string;
}
export interface TeacherSummaryCardsProps {
  classes: LessonLike[];
}
export interface StudentListModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: any; // raw lesson with groupId.members
  onOpenStudentReports?: (student: { id: string; name?: string }) => void;
}
export interface StudentReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: { id: string; name?: string };
}
export interface EditClassLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (link: string) => void;
  classInfo: {
    id: number;
    date: string;
    time: string;
    studentName?: string;
    groupName?: string;
    currentLink?: string;
  } | null;
}
export interface ClassModalsProps {
  onEdit: (lesson: any) => void;
  onDelete: (lesson: any) => void;
  onAddLink: (lesson: any) => void;
}
export interface StudentCompletedClassData {
  _id: string;
  lessonId: string;
  studentId: string;
  rating: number;
  behavior: number;
  homework: number;
  attendance: boolean;
  notes: string;
  submissionDate: string;
  createdAt: string;
  updatedAt: string;
  classId?: number;
  date?: string;
  time?: string;
  status?: string;
  rate?: number | null;
  completed?: {
    newMemorization: string[];
    review: string[];
  } | null;
  nextPrep?: {
    newMemorization: string[];
    review: string[];
  } | null;
}
export interface StudentAllData {
  _id: string;
  name: string;
  email: string;
  completedClasses: StudentCompletedClassData[];
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
export interface Student {
  _id: string;
  name: string;
  email: string;
}
export interface CompletionData {
  [studentId: string]: {
    attendance: boolean;
    rating: number;
    behavior: number;
    homework: number;
    notes: string;
  };
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
