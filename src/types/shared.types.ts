// تعريفات مشتركة للواجهات المستخدمة في عدة ملفات
import { Lesson } from "./lesson.types";
import { Student } from "./student.types";

// واجهة Student البسيطة المستخدمة في teacher-dashboard
export interface SimpleStudent {
  _id: string;
  name: string;
  email: string;
}

// واجهة CompletionData للمعلمين
export interface TeacherCompletionData {
  [studentId: string]: {
    attendance: boolean;
    rating: number;
    behavior: number;
    homework: number;
    notes: string;
  };
}

// Modal Props المشتركة
export interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface StudentReportsModalProps extends CommonModalProps {
  student: { id: string; name?: string } | null;
}

export interface StudentListModalProps extends CommonModalProps {
  lesson: Lesson;
  onOpenStudentReports?: (
    student: Student | { id: string; name: string }
  ) => void;
}

export interface EditClassLinkModalProps extends CommonModalProps {
  classData: Lesson;
  classInfo?: Lesson;
  onSave: (link: string) => void;
  onSubmit?: (link: string) => void; // Updated to match actual usage
}
