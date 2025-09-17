import { BaseModalProps } from "./base.types";
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
export interface StudentReportsModalProps extends BaseModalProps {
  student: { id: string; name?: string } | null;
}
export interface StudentListModalProps extends BaseModalProps {
  lesson: any;
  onOpenStudentReports?: (student: any) => void;
}
export interface EditClassLinkModalProps extends BaseModalProps {
  classData: any;
  classInfo?: any;
  onSave: (link: string) => void;
  onSubmit?: (data: any) => void;
}
export interface ClassModalsProps {
  selectedLesson: any;
  selectedStudent: any;
  selectedClass: any;
  studentAllData?: any;
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
export interface MonthlyClassTableProps {
  classes: any[];
}
export interface LessonLike {
  id: number;
  status: string;
}

export interface MobileClassCardsProps {
  classes: any[];
}
export interface ClassTableProps {
  classes: any[];
}
