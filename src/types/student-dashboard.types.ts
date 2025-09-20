import { User as AuthUser } from "./auth.types";

export interface User extends AuthUser {
  money?: number;
  id: string;
  completedSessions?: number;
  remainingSessions?: number;
  missedLessons?: number;
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
