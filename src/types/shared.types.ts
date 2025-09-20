// تعريفات مشتركة للواجهات المستخدمة في عدة ملفات

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
  lesson: any;
  onOpenStudentReports?: (student: any) => void;
}

export interface EditClassLinkModalProps extends CommonModalProps {
  classData: any;
  classInfo?: any;
  onSave: (link: string) => void;
  onSubmit?: (data: any) => void;
}