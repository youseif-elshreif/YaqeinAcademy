"use client";
import React, { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  WarningPanel,
  ConfirmTextInput,
} from "@/src/components/common/Modal";
import { ConfirmTeacherAccountingModalProps } from "@/src/types/admin.types";

const ConfirmTeacherAccountingModal: React.FC<
  ConfirmTeacherAccountingModalProps
> = ({ isOpen, onClose, teacherId, teacherName, onConfirmAccounting }) => {
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

  const handleConfirmAccounting = async () => {
    if (confirmText.trim().toLowerCase() !== "نعم") {
      return;
    }

    setIsLoading(true);
    try {
      await onConfirmAccounting(teacherId);

      setConfirmText("");
      handleClose();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isAccountingEnabled =
    confirmText.trim().toLowerCase() === "نعم" && !isLoading;

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isLoading,
    },
    {
      label: isLoading ? "جاري المحاسبة..." : "تأكيد المحاسبة",
      onClick: handleConfirmAccounting,
      variant: "primary" as const,
      disabled: !isAccountingEnabled,
      icon: <FaCalculator />,
    },
  ];

  return (
    <ModalContainer
      isOpen={true}
      isClosing={isClosing}
      variant="default"
      onClose={handleClose}
    >
      <ModalHeader
        title="محاسبة المعلم"
        icon={<FaCalculator />}
        onClose={handleClose}
        disabled={isLoading}
        variant="default"
      />
      <div className={baseStyles.modalBody}>
        <WarningPanel
          title="هل أنت متأكد من محاسبة هذا المعلم؟"
          text="سيتم إعادة تصفير رصيد الحصص الخاص بالمعلم."
        />

        <div className={baseStyles.groupInfo}>
          <h4 className={baseStyles.groupName}>&ldquo;{teacherName}&rdquo;</h4>
          <p className={baseStyles.groupId}>المعرف: {teacherId}</p>
          <p className={baseStyles.warningText}>
            سيتم تصفير عدد الحصص المستحقة للمعلم وإعادة تعيينها إلى صفر
          </p>
        </div>

        <ConfirmTextInput
          label={
            <>
              اكتب كلمة &quot;<strong>نعم</strong>&quot; في الصندوق للتأكيد:
            </>
          }
          value={confirmText}
          onChange={setConfirmText}
          disabled={isLoading}
          placeholder="نعم"
        />

        <ModalActions actions={actions} alignment="right" />
      </div>
    </ModalContainer>
  );
};

export default ConfirmTeacherAccountingModal;
