// مثال على كيفية استخدام completeLesson من LessonsContext

"use client";
import React, { useState } from "react";
import { useLessonsContext } from "@/contexts/LessonsContext";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
} from "@/components/common/Modal";

interface CompleteLessonModalProps {
  isOpen: boolean;
  lessonId: string;
  lessonTitle?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CompleteLessonModal: React.FC<CompleteLessonModalProps> = ({
  isOpen,
  lessonId,
  lessonTitle = "الدرس",
  onClose,
  onSuccess,
}) => {
  const { completeLesson, isLoading, error } = useLessonsContext();
  const [isClosing, setIsClosing] = useState(false);

  const handleComplete = async () => {
    try {
      await completeLesson(lessonId);
      onSuccess?.();
      handleClose();
    } catch (err) {
      console.error("Failed to complete lesson:", err);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 250);
  };

  return (
    <ModalContainer isOpen={isOpen} isClosing={isClosing} variant="default">
      <ModalHeader
        title="إتمام الحصة"
        onClose={handleClose}
        variant="default"
      />

      <div style={{ padding: "20px" }}>
        {error && (
          <div style={{ color: "red", marginBottom: "16px" }}>خطأ: {error}</div>
        )}

        <p>هل أنت متأكد من رغبتك في إتمام &ldquo;{lessonTitle}&rdquo;؟</p>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
          لن تتمكن من التراجع عن هذا الإجراء بعد التأكيد.
        </p>
      </div>

      <ModalActions
        actions={[
          {
            label: isLoading ? "جاري الإتمام..." : "تأكيد الإتمام",
            onClick: handleComplete,
            variant: "primary",
            disabled: isLoading,
          },
          {
            label: "إلغاء",
            onClick: handleClose,
            variant: "secondary",
            disabled: isLoading,
          },
        ]}
      />
    </ModalContainer>
  );
};

// مثال على الاستخدام في كومبوننت آخر:
export const ExampleUsage = () => {
  const [showModal, setShowModal] = useState(false);
  const lessonId = "example-lesson-id";

  return (
    <div>
      <button onClick={() => setShowModal(true)}>إتمام الحصة</button>

      <CompleteLessonModal
        isOpen={showModal}
        lessonId={lessonId}
        lessonTitle="حفظ سورة البقرة"
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          console.log("تم إتمام الحصة بنجاح!");
          // يمكن إضافة المزيد من الإجراءات هنا
        }}
      />
    </div>
  );
};
