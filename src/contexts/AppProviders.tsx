"use client";
import React, { ReactNode } from "react";
import { ContactProvider } from "./ContactContext";
import { TeachersProvider } from "./TeachersContext";
import { StudentsProvider } from "./StudentsContext";
import { CoursesProvider } from "./CoursesContext";
import { GroupsProvider } from "./GroupsContext";
import { LessonsProvider } from "./LessonsContext";
import { AdminStatsProvider } from "./AdminStatsContext";
import { ReportProvider } from "./ReportContext";
import { TestimonialsProvider } from "./TestimonialsContext";

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * مجموعة موحدة من جميع الـ Context Providers للتطبيق
 * هذا المكون يجمع جميع الـ contexts في مكان واحد لسهولة الإدارة
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ContactProvider>
      <AdminStatsProvider>
        <TeachersProvider>
          <StudentsProvider>
            <CoursesProvider>
              <GroupsProvider>
                <LessonsProvider>
                  <TestimonialsProvider>
                    <ReportProvider>{children}</ReportProvider>
                  </TestimonialsProvider>
                </LessonsProvider>
              </GroupsProvider>
            </CoursesProvider>
          </StudentsProvider>
        </TeachersProvider>
      </AdminStatsProvider>
    </ContactProvider>
  );
};

export { useContactContext } from "./ContactContext";
export { useTeachersContext } from "./TeachersContext";
export { useStudentsContext } from "./StudentsContext";
export { useCoursesContext } from "./CoursesContext";
export { useGroupsContext } from "./GroupsContext";
export { useLessonsContext } from "./LessonsContext";
export { useAdminStatsContext } from "./AdminStatsContext";
export { useReportContext } from "./ReportContext";
export { useTestimonials } from "./TestimonialsContext";

export type { ContactInfo } from "./ContactContext";
