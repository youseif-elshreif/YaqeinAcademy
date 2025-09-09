"use client";
import React from "react";
import { UnifiedReportsModal } from "@/src/components/dashboard/shared/ReportsModal";
import { StudentReportsModalProps } from "@/src/types";

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
