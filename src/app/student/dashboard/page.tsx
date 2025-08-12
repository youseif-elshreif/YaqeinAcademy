"use client";

import { StudentDashboardProvider } from "@/contexts/StudentDashboardContext";
import StudentDashboard from "@/components/StudentDashboard/StudentDashboard";

export default function StudentDashboardPage() {
  return (
    <StudentDashboardProvider>
      <StudentDashboard />
    </StudentDashboardProvider>
  );
}
