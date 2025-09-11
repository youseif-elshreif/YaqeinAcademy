export interface AppProvidersProps {
  children: React.ReactNode;
}
export interface ModalProviderProps {
  children: React.ReactNode;
}
export interface UnifiedReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId?: string;
  lessonId?: string;
  groupId?: string;
  title?: string;
  className?: string;
}
export interface TeacherDashboardContextType {
  teacherLessons: any[];
  getMyLessons: () => Promise<any[]>;
  reportLesson: (lessonId: string, payload: any) => Promise<any>;
  reportMultipleAndComplete: (
    lessonId: string,
    reports: Array<{
      studentId: string;
      attended: boolean;
      wantedForNextLesson: { new: string[]; old: string[] };
      newMemorized: { new: string[]; old: string[] };
      notes: string;
      rating: number;
    }>
  ) => Promise<void>;
  reportForLessons: (
    lessonId: string,
    reports: Array<{
      studentId: string;
      wantedForNextLesson: { new: string[]; old: string[] };
      newMemorized: { new: string[]; old: string[] };
      notes: string;
      rating: number;
    }>
  ) => Promise<void>;
  isLoading: boolean;
  isInitialLoading: boolean;
}
export interface StudentDashboardContextType {
  getUserStats: () => Promise<any>;
  userStats: any;
  getUserLessons: () => Promise<any>;
  userLessons: any[];
  getNextLesson: () => Promise<any>;
  nextLessonData: any;
  isLoading: boolean;
  isInitialLoading: boolean;
}
