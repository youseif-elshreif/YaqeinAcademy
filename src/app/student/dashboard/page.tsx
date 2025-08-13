"use client";

import { StudentDashboardProvider } from "@/contexts/StudentDashboardContext";
import StudentDashboard from "@/components/dashboard/student/StudentDashboard";

export default function StudentDashboardPage() {
  return (
    <StudentDashboardProvider>
      <StudentDashboard />
    </StudentDashboardProvider>
  );
}
