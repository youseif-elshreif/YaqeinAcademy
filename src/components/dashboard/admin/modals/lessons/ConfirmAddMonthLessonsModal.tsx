"use client";
import React, { useState } from "react";
import { FaCalendarWeek } from "react-icons/fa";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  WarningPanel,
  ConfirmTextInput,
} from "@/src/components/common/Modal";

interface ConfirmAddMonthLessonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
  onConfirmAdd: () => Promise<void>;
}

const ConfirmAddMonthLessonsModal: React.FC<
  ConfirmAddMonthLessonsModalProps
> = ({ isOpen, onClose, groupName, onConfirmAdd }) => {
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setConfirmText("");
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleConfirmAdd = async () => {
    if (confirmText.trim().toLowerCase() !== "نعم") {
      return;
    }

    setIsLoading(true);
    try {
      await onConfirmAdd();
      setConfirmText("");
      handleClose();
    } catch (error) {
      // Error will be handled by parent component
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isAddEnabled = confirmText.trim().toLowerCase() === "نعم" && !isLoading;

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isLoading,
    },
    {
      label: isLoading ? "جاري الإضافة..." : "إضافة الحلقات",
      onClick: handleConfirmAdd,
      variant: "primary" as const,
      disabled: !isAddEnabled,
      loading: isLoading,
    },
  ];

  return (
    <ModalContainer
      isOpen={isOpen}
      isClosing={isClosing}
      variant="add"
      size="medium"
      onClose={handleClose}
    >
      <ModalHeader
        title="تأكيد إضافة حلقات الشهر"
        icon={<FaCalendarWeek />}
        onClose={handleClose}
        disabled={isLoading}
        variant="add"
      />

      <div className={baseStyles.modalBody}>
        <WarningPanel
          title="هل أنت متأكد من إضافة حلقات الشهر؟"
          text={`سيتم إضافة جميع حلقات الشهر الحالي للحلقة "${groupName}" حسب الجدول المعتاد. هذا الإجراء سيقوم بإنشاء حلقات جديدة وفقاً لأيام ومواعيد الحلقة المحددة مسبقاً.`}
        />

        <ConfirmTextInput
          value={confirmText}
          onChange={setConfirmText}
          placeholder="اكتب 'نعم' للتأكيد"
          label="للمتابعة، اكتب 'نعم' في المربع أدناه:"
          disabled={isLoading}
        />
      </div>

      <ModalActions actions={actions} />
    </ModalContainer>
  );
};

export default ConfirmAddMonthLessonsModal;
