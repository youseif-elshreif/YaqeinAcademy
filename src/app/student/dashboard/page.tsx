"use client";

import { StudentDashboardProvider } from "@/contexts/StudentDashboardContext";
import StudentDashboard from "@/components/dashboard/student/StudentDashboard";
import { withStudentProtection } from "@/components/auth/withRoleProtection";

function StudentDashboardPage() {
  return (
    <StudentDashboardProvider>
      <StudentDashboard />
    </StudentDashboardProvider>
  );
}

export default withStudentProtection(StudentDashboardPage);
