"use client";
import React from "react";
import { UnifiedReportsModal } from "@/components/dashboard/shared/ReportsModal";

export default function StudentMyReportsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // نمرر undefined كـ student عشان يعرف إنه للطالب مش للمعلم
  return (
    <UnifiedReportsModal
      isOpen={isOpen}
      onClose={onClose}
      student={undefined}
    />
  );
}
