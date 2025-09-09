"use client";

import { StudentDashboardProvider } from "@/src/contexts/StudentDashboardContext";
import StudentDashboard from "@/src/components/dashboard/student/StudentDashboard";
import { withStudentProtection } from "@/src/components/auth/withRoleProtection";

function StudentDashboardPage() {
  return (
    <StudentDashboardProvider>
      <StudentDashboard />
    </StudentDashboardProvider>
  );
}

export default withStudentProtection(StudentDashboardPage);
