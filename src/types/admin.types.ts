import { Teacher } from "./teacher.types";
import { User } from "./auth.types";
import { BaseModalProps } from "./base.types";
export interface Member {
  _id: string;
  name: string;
  email: string;
  role?: string;
}
export interface RemoveMemberModalProps extends BaseModalProps {
  groupId: string;
  groupName: string;
  onSuccess?: () => void;
}
export interface AddMembersModalProps extends BaseModalProps {
  groupId: string;
  groupName: string;
  groupType: "private" | "public";
  onSuccess?: () => void;
}
export interface MemberInput {
  id: string;
  memberId: string;
  name?: string;
  email?: string;
}
export interface CourseFormData {
  _id?: string;
  title: string;
  description: string;
  telegramLink: string;
  duration: string;
  startAt: string;
}
export interface AddCourseModalProps {
  isEditMode?: boolean;
  editCourseId?: string;
}
export interface DeleteCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string | null;
  courseName?: string;
}
export interface MemberFormErrors {
  name?: string;
  email?: string;
  phone?: string;
}
export interface ConfirmDeleteGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  groupName: string;
  onConfirmDelete: (groupId: string) => void;
}
export interface LessonsModalProps {
  groupId: string;
  groupName: string;
}
export interface UILesson {
  id: string;
  day: string;
  time: string; // HH:mm 24h
  date: string; // ISO string
  meetingLink?: string;
  status?: string;
}
export interface UILessonCard {
  id: string;
  day: string;
  time: string; // HH:mm 24h
  date: string; // ISO string
  meetingLink?: string;
  status?: string;
}
export interface LessonCardProps {
  lesson: UILessonCard;
  showActions?: boolean; // default true
  onEdit?: (l: UILessonCard) => void;
  onDelete?: (l: UILessonCard) => void;
}
export interface AdminCardProps {
  admin: {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  };
}
export interface MobileAdminCardsProps {
  admins: AdminUser[];
}
export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
}
export interface StudentUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  phoneNumber?: string;
  country?: string;
  age?: number;
  quranMemorized?: string;
  numOfPartsofQuran?: number;
  PrivitelessonCredits?: number;
  createdAt: string;
  updatedAt?: string;
  isActive?: boolean;
}
export interface TeacherUser {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  meetingLink?: string;
  lessonsBalance?: number;
  numberOflessonsCridets?: number;
  specialization?: string[];
  availability?: string;
  createdAt: string;
  updatedAt?: string;
  userId?:
    | string
    | {
        _id: string;
        name: string;
        email: string;
        phone?: string;
        meetingLink?: string;
        country?: string;
        city?: string;
        role?: string;
        quranMemorized?: string;
        numOfPartsofQuran?: number;
        isVerified?: boolean;
        freeLessonUsed?: boolean;
        PrivitelessonCredits?: number;
        PubliclessonCredits?: number;
        isEmailVerified?: boolean;
      };
  teacherInfo?: {
    meetingLink?: string;
  };
}
export interface AdminTableRowProps {
  admin: AdminUser;
}
export interface StudentTableRowProps {
  studentitem: User & {
    _id?: string;
    phoneNumber?: string;
    country?: string;
    age?: number;
    quranMemorized?: string;
    numOfPartsofQuran?: number;
    PrivitelessonCredits?: number;
  };
}
export interface TeacherTableRowProps {
  teacher: Teacher;
}
export interface MobileStudentCardsProps {
  Students: User[];
}
export interface StudentCardProps {
  studentItem: User;
}
export interface MobileTeacherCardsProps {
  teachers: Teacher[];
}
export interface TeacherCardProps {
  teacher: Teacher;
}
export interface GroupApiData {
  _id: string;
  name: string;
  description?: string;
  type: "private" | "public";
  teacherId: {
    _id: string;
  };
  members: Member[];
  lessons: GroupLesson[];
  meetingLink: string;
  isActive: boolean;
  usualDate: {
    firstDay?: string;
    firstDayTime?: string;
    secondDay?: string;
    secondDayTime?: string;
    thirdDay?: string;
    thirdDayTime?: string;
  };
  createdAt: string;
  updatedAt: string;
}
export interface GroupLesson {
  _id: string;
  scheduledAt: string;
  meetingLink: string;
  status: string;
}
export interface LessonForModal {
  _id: string;
  scheduledAt: string;
  meetingLink: string;
  status: string;
  groupId: {
    _id: string;
    name: string;
    meetingLink: string;
    members: Member[];
  };
}
export interface PaymentMethodType {
  value: string;
  label: string;
}
export interface TimeSlot {
  day: string;
  time: string;
}
export interface GroupFormData {
  name: string;
  description: string;
  type: "private" | "public";
  teacherId: string;
  meetingLink: string;
  timeSlots: TimeSlot[];
}
export interface GroupFormErrors {
  name?: string;
  description?: string;
  teacherId?: string;
  meetingLink?: string;
  timeSlots?: string;
}
export interface AddGroupModalProps {
  isEditMode?: boolean;
  editGroupId?: string;
}
export interface GroupActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  groupName: string;
  onEdit: (groupId: string, groupName: string) => void;
  onDelete: (groupId: string, groupName: string) => void;
  onAddMember: (
    groupId: string,
    groupName: string,
    groupType: "private" | "public"
  ) => void;
  onRemoveMember: (groupId: string, groupName: string) => void;
}
export interface TeacherOption {
  id: string;
  name: string;
  userId?: {
    name: string;
    _id: string;
  };
}
export interface LessonFormData {
  subject: string;
  scheduledAt: string;
  meetingLink: string;
  groupId: string;
}
export interface EditLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: {
    _id: string;
    subject: string;
    scheduledAt: string;
    meetingLink: string;
    groupId: string;
  } | null;
}
export interface DeleteLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: {
    _id: string;
    subject: string;
  } | null;
}
export interface AddLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId?: string;
}
export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  phoneNumber?: string; // Alternative field name for phone
  password?: string;
  role?: "student" | "teacher" | "admin"; // Made optional
  userType?: string; // Current user type for editing
  country?: string;
  city?: string;
  age?: number | null;
  quranMemorized?: string;
  numOfPartsofQuran?: number;
  meetingLink?: string; // For teacher users
  hasQuranMemorization?: boolean; // For student users
  subject?: string; // For courses or subjects
  quranLevel?: string; // For student Quran level
  bio?: string; // User biography
  address?: string; // User address
  privateCredits?: number; // Private credits for user
  publicCredits?: number; // Public credits for user
}
export interface UserFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  password?: string;
  role?: string;
  country?: string;
  city?: string;
  age?: string;
  quranMemorized?: string;
  numOfPartsofQuran?: string;
  meetingLink?: string;
}
export interface UserUpdatePayload {
  name: string;
  email: string;
  phone: string;
  age?: number;
  hasQuranMemorization?: boolean;
  quranMemorized?: string;
  numOfPartsofQuran?: number;
  meetingLink?: string;
}
export interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
}
export interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    id: string;
    name: string;
    userType: string;
  } | null;
}
export interface EditTeacherLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherData: {
    id: string;
    name: string;
    currentLink: string;
  } | null;
}

export interface CreditsFormData {
  privateAmount: number;
}
