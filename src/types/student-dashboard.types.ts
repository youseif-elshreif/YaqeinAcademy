export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role?: string;
  age?: number;
  quranMemorized?: string;
  numOfPartsofQuran?: number;
  isVerified?: boolean;
  createdAt?: string;
  avatar?: string;
  completedSessions?: number;
  remainingSessions?: number;
  attendedLessons?: number;
  PrivitelessonCredits?: number;
}
export interface ProfileUser {
  email: string;
  name: string;
  phone: string;
}
export interface StudentDataProps {
  studentData: ProfileUser;
}
export interface StudentSummaryCardsProps {
  studentData: User;
}
export interface Tab {
  id: string;
  label: string;
}
export interface DashboardTabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}
export interface StudentMyReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
