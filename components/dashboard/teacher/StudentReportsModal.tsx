"use client";
import React from "react";
import { UnifiedReportsModal } from "@/components/dashboard/shared/ReportsModal";

interface StudentReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: { id: string; name?: string };
}

const StudentReportsModal: React.FC<StudentReportsModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  // نمرر student للمودال الموحد عشان يعرف إنه للمعلم
  return (
    <UnifiedReportsModal isOpen={isOpen} onClose={onClose} student={student} />
  );
};

export default StudentReportsModal;
