import { BaseUser, BaseFormData, BaseComponentProps } from "./base.types";
export interface User extends BaseUser {
  phone?: string;
  age?: number;
  quranMemorized?: string;
  numOfPartsofQuran?: number;
  isVerified?: boolean;
  avatar?: string;
  money?: number;
  numberOflessonsCridets?: number;
}
export interface RegisterData extends BaseFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  quranMemorized: string;
  numOfPartsofQuran: number;
  age: number;
  country: string;
  quranLevel: string;
}
export interface RegisterFormData extends BaseFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  quranMemorized?: string;
  numOfPartsofQuran: number;
  age: number;
  country: string;
  city?: string;
  quranLevel: string;
  hasQuranMemorization?: boolean;
  terms?: boolean;
}
export interface AuthLayoutProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  pageTitle?: string;
  pageDescription?: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface LoginFormData {
  email: string;
  password: string;
}
export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormData | "general", string>
>;
export type LoginFormErrors = Partial<
  Record<keyof LoginFormData | "general", string>
>;
export interface UserStats {
  completedLessons: number;
  missedLessons: number;
  attendedLessons: number;
  PrivitelessonCredits: number;
  PubliclessonCredits: number;
  GroupUsualDate?: any;
  GroupMeetingLink?: string;
  GroupName?: string;
}
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  getUserData: (shouldRedirect?: boolean) => Promise<void>;
  register: (regData: RegisterData) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateUserData: (userData: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}
export interface RefreshTokenResponse {
  accessToken: string;
}
export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "UPDATE_USER_START" }
  | { type: "UPDATE_USER_SUCCESS"; payload: User }
  | { type: "UPDATE_USER_FAILURE"; payload: string };
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}
export type UserType = "student" | "teacher" | "admin";
