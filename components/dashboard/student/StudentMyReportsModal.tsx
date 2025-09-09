"use client";
import React from "react";
import { UnifiedReportsModal } from "@/components/dashboard/shared/ReportsModal";
import { StudentMyReportsModalProps } from "@/types";

export default function StudentMyReportsModal({
  isOpen,
  onClose,
}: StudentMyReportsModalProps) {
  // نمرر undefined كـ student عشان يعرف إنه للطالب مش للمعلم
  return (
    <UnifiedReportsModal
      isOpen={isOpen}
      onClose={onClose}
      student={undefined}
    />
  );
}


