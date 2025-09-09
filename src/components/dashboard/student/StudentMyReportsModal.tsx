"use client";
import React from "react";
import { UnifiedReportsModal } from "@/src/components/dashboard/shared/ReportsModal";
import { StudentMyReportsModalProps } from "@/src/types";

export default function StudentMyReportsModal({
  isOpen,
  onClose,
}: StudentMyReportsModalProps) {

  return (
    <UnifiedReportsModal
      isOpen={isOpen}
      onClose={onClose}
      student={undefined}
    />
  );
}
