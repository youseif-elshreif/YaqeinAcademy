"use client";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import baseStyles from "../../../styles/BaseModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  WarningPanel,
  ConfirmTextInput,
} from "@/src/components/common/Modal";

export interface ConfirmDeleteTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonialId: string;
  testimonialName: string;
  testimonialText: string;
  onConfirmDelete: (id: string) => Promise<void>;
}

const ConfirmDeleteTestimonialModal: React.FC<
  ConfirmDeleteTestimonialModalProps
> = ({
  isOpen,
  onClose,
  testimonialId,
  testimonialName,
  testimonialText,
  onConfirmDelete,
}) => {
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

  const handleConfirmDelete = async () => {
    if (confirmText.trim().toLowerCase() !== "حذف") {
      return;
    }

    setIsLoading(true);
    try {
      await onConfirmDelete(testimonialId);
      setConfirmText("");
      handleClose();
    } catch {

    } finally {
      setIsLoading(false);
    }
  };

  const isDeleteEnabled =
    confirmText.trim().toLowerCase() === "حذف" && !isLoading;

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isLoading,
    },
    {
      label: isLoading ? "جاري الحذف..." : "حذف الرأي",
      onClick: handleConfirmDelete,
      variant: "danger" as const,
      disabled: !isDeleteEnabled,
      icon: <FaTrash />,
    },
  ];

  return (
    <ModalContainer
      isOpen={true}
      isClosing={isClosing}
      variant="delete"
      onClose={handleClose}
    >
      <ModalHeader
        title="حذف رأي الطالب"
        icon={<FaTrash />}
        onClose={handleClose}
        disabled={isLoading}
        variant="delete"
      />
      <div className={baseStyles.modalBody}>
        <WarningPanel
          title="هل أنت متأكد من حذف هذا الرأي؟"
          text="لا يمكن التراجع عن هذا الإجراء."
        />

        <div className={baseStyles.groupInfo}>
          <h4 className={baseStyles.groupName}>
            &ldquo;{testimonialName}&rdquo;
          </h4>
          <p className={baseStyles.groupId}>المعرف: {testimonialId}</p>
          <div className={baseStyles.testimonialPreview}>
            <p className={baseStyles.testimonialText}>
              &ldquo;
              {testimonialText.length > 100
                ? testimonialText.substring(0, 100) + "..."
                : testimonialText}
              &rdquo;
            </p>
          </div>
          <p className={baseStyles.warningText}>
            سيتم حذف هذا الرأي نهائياً من النظام
          </p>
        </div>

        <ConfirmTextInput
          label={
            <>
              اكتب كلمة &quot;<strong>حذف</strong>&quot; في الصندوق للتأكيد:
            </>
          }
          value={confirmText}
          onChange={setConfirmText}
          disabled={isLoading}
        />

        <ModalActions actions={actions} alignment="right" />
      </div>
    </ModalContainer>
  );
};

export default ConfirmDeleteTestimonialModal;
