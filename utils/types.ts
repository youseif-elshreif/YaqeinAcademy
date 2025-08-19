export interface Lesson {
  _id: string;
  groupId: string;
  reportId: string[];
  subject: string;
  scheduledAt: string;
  meetingLink: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LessonManagementItem {
  id: string;
  title: string;
  groupName: string;
  teacherName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  attendanceCount: number;
  totalStudents: number;
}

export interface Teacher {
  numberOflessonsCridets: number;
  _id: string;
  userId: string;
  specialization: string[];
  meetingLink: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserTeacher {
  country: string;
  city: string;
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  quranMemorized: string;
  numOfPartsofQuran: number;
  isVerified: boolean;
  freeLessonUsed: boolean;
  PrivitelessonCredits: number;
  PubliclessonCredits: number;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TeachersResponse {
  teachers: Teacher[];
  userTeahcer: UserTeacher[];
}

export interface CombinedTeacherData {
  teacherInfo: Teacher;
  userInfo: UserTeacher;
}
// ==================================================
// User & Authentication Types
// ==================================================

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
}

export interface RegisterData {
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

export interface RegisterFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number | null;
  hasQuranMemorization: boolean;
  numOfPartsofQuran: number;
  country: string;
  quranLevel: string;
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

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  meetingLink?: string; // For teachers only
  quranMemorized?: string; // For students only
  numOfPartsofQuran?: number; // For students only
}

export type UserType = "admin" | "teacher" | "student";

// ==================================================
// Student Types
// ==================================================

export interface Student {
  id: string;
  name: string;
  payedClasses: number;
  nextPaymentDate: string;
  amountPaid: number;
  remainingClasses: number;
  postponedClasses: number;
  canceledClasses: number;
  absentClasses: number;
  attendedClasses: number;
  rate: number;
  phone: string;
  groupName: string;
}

export interface StudentData {
  studentId: number;
  studentName: string;
  nickname: string;
}

export interface StudentINClassData {
  studentId: number;
  studentName: string;
  nickname: string;
  rate?: number | null;
  completed?: {
    newMemorization: string[];
    review: string[];
  } | null;
  notes?: string;
  nextPrep?: {
    newMemorization: string[];
    review: string[];
  } | null;
}

export interface StudentAllData {
  studentId: number;
  studentName: string;
  nickname: string;
  totalClasses: number;
  completedClasses: number;
  postponedClasses: number;
  canceledClasses: number;
  absentClasses: number;
  overallRate: number;
}

export interface StudentCompletedClassData {
  id: number;
  date: string;
  time: string;
  rate: number;
  completed: {
    newMemorization: string[];
    review: string[];
  };
  notes: string;
  nextPrep: {
    newMemorization: string[];
    review: string[];
  };
}

export interface StudentGroupData {
  usualDate: {
    firstDay: string;
    firstDayTime: string;
    secondDay?: string;
    secondDayTime?: string;
    thirdDay?: string;
    thirdDayTime?: string;
  };
  meetingLink: string;
}

export interface StudentPayment {
  studentId: string;
  studentName: string;
  totalPaid: number;
  lastPaymentDate: string;
  status: "paid" | "unpaid" | "partial";
}

// ==================================================
// Teacher Types
// ==================================================

export interface Teacher {
  id: string;
  name: string;
  phone: string;
  pricePerClass: number;
  totalDueThisMonth: number;
  totalClassesThisMonth: number;
  completedClasses: number;
  remainingClasses: number;
  postponedClasses: number;
  canceledClasses: number;
  absentClasses: number;
  classLink: string;
  assignedGroups: string[];
}

export interface TeacherData {
  teacherId: number;
  teacherName: string;
  totalStudents: number;
  totalClasses: number;
  completedClasses: number;
  nextClass: string;
  groupsCount: number;
  totalEarnings: number;
}

export interface TeacherPayment {
  teacherId: string;
  teacherName: string;
  totalPaid: number;
  monthlyPayments: MonthlyPayment[];
  lastPaymentDate?: string;
}

// ==================================================
// Group Types
// ==================================================

export interface Group {
  id: string;
  name: string;
  teacherName: string;
  classDate: string; // مثلا بصيغة ISO أو "2025-07-10 08:00"
  totalClasses: number;
  postponedClasses: number;
  remainingClasses: number;
  canceledClasses: number;
  classLink: string;
  students: string[];
}

export interface GroupData {
  id: string;
  name: string;
  teacherName: string;
}

export interface GroupClassData {
  id: number;
  date: string;
  time: string;
  groupName: string;
  students: Student[];
}

// ==================================================
// Class & Lesson Types
// ==================================================

export interface ClassData {
  id: number;
  date: string;
  time: string;
  status: string;
  groupName: string;
  groupRate: number;
  groupNotes: string;
  classLink?: string; // Link to join the class (Zoom, Google Meet, etc.)
  students: StudentINClassData[];
}

export interface Lesson {
  id: string;
  title: string;
  groupName: string;
  teacherName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  attendanceCount: number;
  totalStudents: number;
}

export interface SelectedClassData {
  id: number;
  studentName: string;
  date: string;
  time: string;
}

export interface CompletionData {
  newMemorization: string[];
  review: string[];
  rate: number;
  notes: string;
  nextPrep: {
    newMemorization: string[];
    review: string[];
  };
}

export interface StudentCompletionData extends CompletionData {
  studentId: number;
  studentName: string;
}

export interface PostponeData {
  reason: string;
  newDate: string;
  newTime: string;
  notifyStudents: boolean;
}

// ==================================================
// Course Types
// ==================================================

export interface Course {
  id: number;
  title: string;
  teacherName: string;
  startDate: string;
  duration: string;
  shortDescription: string;
  type: string;
  createdAt: string;
}

export interface CourseFormData {
  title: string;
  teacherName: string;
  startDate: string;
  duration: string;
  shortDescription: string;
  type: string;
}

// ==================================================
// Payment Types
// ==================================================

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  status: "paid" | "unpaid" | "partial";
  allowedLessons: number;
  usedLessons: number;
  paymentDate?: string;
  dueDate: string;
  paymentMethod?: "cash" | "bank_transfer" | "card";
  notes?: string;
}

export interface PaymentHistory {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  method: string;
  notes?: string;
}

export interface MonthlyPayment {
  month: string;
  amount: number;
}

export interface FinancialSummary {
  totalIncomeThisMonth: number;
  totalTeacherPayments: number;
  netProfitThisMonth: number;
  growthPercentage: number;
}

export interface MonthlyIncome {
  month: string;
  studentPayments: number;
  teacherPayments: number;
  netProfit: number;
}

// ==================================================
// Dashboard & Statistics Types
// ==================================================

export interface DashboardStats {
  totalTeachers: number;
  totalStudents: number;
  totalLessonsThisMonth: number;
  totalIncomeThisMonth: number;
  teacherGrowth: number;
  studentGrowth: number;
  lessonGrowth: number;
  incomeGrowth: number;
}

export interface ChartData {
  incomeData: Array<{ month: string; income: number }>;
  userGrowthData: Array<{ month: string; students: number; teachers: number }>;
  paymentStatusData: Array<{ name: string; value: number; color: string }>;
}

// ==================================================
// Component Props Types
// ==================================================

export interface StudentListProps {
  Students: Student[];
}

export interface StudentItemProps {
  studentitem: Student;
}

export interface TeacherListProps {
  Teachers: Teacher[];
}

export interface TeacherItemProps {
  teacher: Teacher;
}

export interface GroupListProps {
  groups: Group[];
}

export interface UserManagementProps {
  studentData: Student[];
}

export interface StudentAllDataComponentProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentData;
}

export interface TeacherSummaryCardsProps {
  classes: ClassData[];
}

export interface MonthlyClassTableProps {
  classes: ClassData[];
  students: StudentData[];
  onClassSelect: (classData: SelectedClassData) => void;
}

export interface ClassTableProps {
  classes: ClassData[];
  onClassSelect: (classData: SelectedClassData) => void;
}

export interface ClassTableRowProps {
  classData: ClassData;
  onView: () => void;
  onComplete: () => void;
  onPostpone: () => void;
  onEdit: () => void;
}

export interface MobileClassCardsProps {
  classes: ClassData[];
  onClassSelect: (classData: SelectedClassData) => void;
}

export interface ClassCardProps {
  classData: ClassData;
  onView: () => void;
  onComplete: () => void;
  onPostpone: () => void;
  onEdit: () => void;
}

export interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface Tab {
  id: string;
  label: string;
}

export interface StudentDataProps {
  user: User;
}

// ==================================================
// Modal Props Types
// ==================================================

export interface CompleteClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassData;
  onComplete: (completionData: CompletionData) => void;
}

export interface GroupCompleteClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: GroupClassData;
  onComplete: (completionData: StudentCompletionData[]) => void;
}

export interface PostponeClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassData;
  onPostpone: (postponeData: PostponeData) => void;
}

export interface EditGroupNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: GroupData;
  onSave: (groupName: string) => void;
}

export interface AddNicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentData;
  onSave: (nickname: string) => void;
}

export interface EditClassLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLink: string;
  onSave: (newLink: string) => void;
}

export interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (courseData: CourseFormData) => void;
}

export interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  onSave: (courseData: CourseFormData) => void;
}

export interface DeleteCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  onDelete: () => void;
}

export interface ClassModalsProps {
  selectedClass: ClassData | null;
  modals: {
    complete: boolean;
    postpone: boolean;
    link: boolean;
  };
  onCloseModal: (modal: "complete" | "postpone" | "link") => void;
  onCompleteClass: (completionData: CompletionData) => void;
  onPostponeClass: (postponeData: PostponeData) => void;
  onUpdateLink: (newLink: string) => void;
}

// ==================================================
// Context Types
// ==================================================

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

export interface AdminDashboardContextType {
  groups: any[]; // ✅ إضافة البيانات
  teachers: TeachersResponse | null;
  students: any[]; // ✅ بيانات الطلاب
  getTeachers: (token: string) => Promise<any>;
  createTeacher: (token: string, teacherData: any) => Promise<any>;
  updateMember: (
    token: string,
    memberId: string,
    memberData: any
  ) => Promise<any>;
  updateTeacher: (
    token: string,
    teacherId: string,
    teacherData: any
  ) => Promise<any>;
  updateStudent: (
    token: string,
    studentId: string,
    studentData: any
  ) => Promise<any>;
  deleteTeacher: (token: string, teacherId: string) => Promise<any>;
  createStudent: (studentData: any) => Promise<any>;
  createAdmin: (adminData: any) => Promise<any>;
  createGroup: (token: string, groupData: any) => Promise<any>;
  updateGroup: (token: string, groupId: string, groupData: any) => Promise<any>;
  deleteGroup: (token: string, groupId: string) => Promise<any>;
  addGroupMember: (
    token: string,
    groupId: string,
    memberData: { memberId: string }
  ) => Promise<any>;
  removeGroupMember: (
    token: string,
    groupId: string,
    memberId: string
  ) => Promise<any>;
  getStudents: (token: string) => Promise<any>;
  getGroups: (token: string) => Promise<any>;
}

export interface UsualDate {
  firstDay: string;
  firstDayTime?: string;
  secondDay?: string;
  secondDayTime?: string;
  thirdDay?: string;
  thirdDayTime?: string;
}

export interface UserStats {
  completedLessons: number;
  attendedLessons: number;
  missedLessons: number;
  GroupName: string;
  GroupMeetingLink: string;
  GroupUsualDate: UsualDate;
  typeOfGroup: string;
  lessonCredits: number;
  PrivitelessonCredits: number;
}

export interface StudentDashboardContextType {
  getUserStats: () => Promise<UserStats>;
  userStats: UserStats | null;
  getUserLessons: () => Promise<Lesson[]>;
  userLessons: Lesson[];
}

export interface ModalContextType {
  // Modal states
  completeModalOpen: boolean;
  postponeModalOpen: boolean;
  nicknameModalOpen: boolean;
  studentAllDataModalOpen: boolean;
  editGroupNameModalOpen: boolean;
  groupCompleteModalOpen: boolean;
  addClassLinkModalOpen: boolean;

  // Modal data
  selectedClass: ClassData | null;
  selectedStudent: {
    studentId: number;
    studentName?: string;
    nickname?: string;
    groupName?: string;
    classLink?: string; // Add classLink to interface
  } | null;
  studentAllData: any;
  selectedGroupData: {
    classId: number;
    currentGroupName: string;
  } | null;
  selectedGroupClass: ClassData | null;
  selectedClassForLink: {
    id: number;
    date: string;
    time: string;
    studentName?: string;
    groupName?: string;
    classLink?: string;
  } | null;

  // Modal actions
  openCompleteModal: (classData: ClassData) => void;
  openPostponeModal: (classData: ClassData) => void;
  openNicknameModal: (studentData: StudentData) => void;
  openStudentDataModal: (studentId: number) => void;
  openEditGroupNameModal: (groupData: {
    classId: number;
    currentGroupName: string;
  }) => void;
  openGroupCompleteModal: (classData: ClassData) => void;
  openAddClassLinkModal: (classData: ClassData) => void;

  // Close actions
  closeCompleteModal: () => void;
  closePostponeModal: () => void;
  closeNicknameModal: () => void;
  closeStudentDataModal: () => void;
  closeEditGroupNameModal: () => void;
  closeGroupCompleteModal: () => void;
  closeAddClassLinkModal: () => void;

  // Save actions
  saveClassCompletion: (completionData: any) => void;
  saveClassPostpone: (postponeData: any) => void;
  saveStudentNickname: (nickname: string, studentId: number) => void;
  saveGroupName: (groupName: string, classId: number) => void;
  saveGroupCompletion: (completionData: any) => void;
  saveClassLink: (classLink: string, classId: number) => void;
}

export interface ModalProviderProps {
  children: React.ReactNode;
}

export interface AdminModalContextType {
  // Modal states
  addUserModalOpen: boolean;
  addCourseModalOpen: boolean;
  editCourseModalOpen: boolean;
  deleteCourseModalOpen: boolean;
  addGroupModalOpen: boolean;
  editGroupModalOpen: boolean;
  addMembersModalOpen: boolean;
  groupActionsModalOpen: boolean;
  confirmDeleteGroupModalOpen: boolean;
  removeMemberModalOpen: boolean;
  lessonsModalOpen: boolean;
  addLessonModalOpen: boolean;
  editLessonModalOpen: boolean;
  deleteLessonModalOpen: boolean;
  userActionsModalOpen: boolean;
  editUserModalOpen: boolean;
  deleteUserModalOpen: boolean;

  // Selected data
  selectedUserType: UserType | null;
  selectedCourseId: number | null;
  selectedGroupData: {
    id: string;
    name: string;
    type: "private" | "public";
  } | null;
  selectedGroupActionsData: {
    id: string;
    name: string;
  } | null;
  selectedGroupForDeletion: {
    id: string;
    name: string;
  } | null;
  selectedGroupForMemberRemoval: {
    id: string;
    name: string;
  } | null;
  selectedGroupForEdit: {
    id: string;
    name: string;
  } | null;
  selectedGroupForLessons: {
    groupId: string;
    groupName: string;
  } | null;
  selectedLessonData: {
    id: string;
    day: string;
    time: string;
    date: string;
  } | null;
  selectedUserForActions: {
    id: string;
    name: string;
    userType: "student" | "teacher";
    fullData?: any; // البيانات الكاملة للمستخدم
  } | null;
  selectedUserData: any;

  // Modal actions
  openAddUserModal: () => void;
  openAddCourseModal: () => void;
  openEditCourseModal: (courseId: number) => void;
  openDeleteCourseModal: (courseId: number) => void;
  openAddGroupModal: () => void;
  openEditGroupModal: (groupData: { id: string; name: string }) => void;
  openAddMembersModal: (groupData: {
    id: string;
    name: string;
    type: "private" | "public";
  }) => void;
  openGroupActionsModal: (groupData: { id: string; name: string }) => void;
  openConfirmDeleteGroupModal: (groupData: {
    id: string;
    name: string;
  }) => void;
  openRemoveMemberModal: (groupData: { id: string; name: string }) => void;
  openLessonsModal: (groupData: { groupId: string; groupName: string }) => void;
  openAddLessonModal: () => void;
  openEditLessonModal: (lessonData: {
    id: string;
    day: string;
    time: string;
    date: string;
  }) => void;
  openDeleteLessonModal: (lessonData: {
    id: string;
    day: string;
    time: string;
    date: string;
  }) => void;

  // User actions
  openUserActionsModal: (userData: {
    id: string;
    name: string;
    userType: "student" | "teacher";
    fullData?: any;
  }) => void;
  openEditUserModal: (userData: any) => void;
  openDeleteUserModal: (userData: {
    id: string;
    name: string;
    userType: "student" | "teacher";
  }) => void;

  // Close actions
  closeAddUserModal: () => void;
  closeAddCourseModal: () => void;
  closeEditCourseModal: () => void;
  closeDeleteCourseModal: () => void;
  closeAddGroupModal: () => void;
  closeEditGroupModal: () => void;
  closeAddMembersModal: () => void;
  closeGroupActionsModal: () => void;
  closeConfirmDeleteGroupModal: () => void;
  closeRemoveMemberModal: () => void;
  closeLessonsModal: () => void;
  closeAddLessonModal: () => void;
  closeEditLessonModal: () => void;
  closeDeleteLessonModal: () => void;
  closeUserActionsModal: () => void;
  closeEditUserModal: () => void;
  closeDeleteUserModal: () => void;

  // User type selection
  setUserType: (type: UserType | null) => void;

  // Save actions
  saveNewUser: (userData: UserFormData, userType: UserType) => Promise<void>;
  saveNewGroup: (groupData: any) => Promise<void>;
  handleDeleteGroup: (groupId: string) => Promise<void>;
}

export interface AdminModalProviderProps {
  children: React.ReactNode;
}

// ==================================================
// API & Auth Types
// ==================================================

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
