// Centralized types for AdminDashboard UserManagement and related components

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
  phoneNumber: string;
  groupName: string;
}

export interface Teacher {
  id: string;
  name: string;
  phoneNumber: string;
  pricePerClass: number;
  totalDueThisMonth: number;
  totalClassesThisMonth: number;
  completedClasses: number;
  remainingClasses: number;
  postponedClasses: number;
  canceledClasses: number;
  absentClasses: number;
  classLink: string;
  groups: string[];
}

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

// Props interfaces for components
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

// Dashboard statistics interfaces
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

export interface UserManagementProps {
  studentData: Student[];
  teacherData: Teacher[];
  groupData: Group[];
}