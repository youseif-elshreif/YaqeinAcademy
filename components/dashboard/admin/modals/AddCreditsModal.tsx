"use client";
import React, { useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { CreditsFormData } from "@/utils/types";
import styles from "@/styles/BaseModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  FormField,
  ErrorDisplay,
} from "@/components/common/Modal";

const AddCreditsModal: React.FC = () => {
  const {
    addCreditsModalOpen,
    closeAddCreditsModal,
    selectedStudentForCredits,
    addCreditsToStudent,
  } = useAdminModal();

  const [formData, setFormData] = useState<CreditsFormData>({
    privateAmount: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (addCreditsModalOpen) {
      setFormData({ privateAmount: 0 });
      setError(null);
    }
  }, [addCreditsModalOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));

    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const validateForm = (): boolean => {
    if (formData.privateAmount < 0) {
      setError("عدد الدروس لا يمكن أن يكون سالباً");
      return false;
    }

    if (formData.privateAmount === 0) {
      setError("يجب إضافة عدد دروس أكبر من صفر");
      return false;
    }

    if (formData.privateAmount > 31) {
      setError("عدد الدروس لا يمكن أن يتجاوز 31");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudentForCredits) {
      setError("لا يوجد طالب محدد");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log("=== ADDING CREDITS ===");
      console.log("Student ID:", selectedStudentForCredits.userId);
      console.log("Private Amount:", formData.privateAmount);

      await addCreditsToStudent(
        selectedStudentForCredits.userId,
        formData.privateAmount,
        0 // publicAmount دائماً 0
      );

      console.log("✅ Credits added successfully");

      // Close modal on success
      closeAddCreditsModal();
    } catch (error) {
      console.error("❌ Error adding credits:", error);
      setError("حدث خطأ أثناء إضافة الدروس");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!addCreditsModalOpen) return null;

  const actions = [
    {
      label: "إلغاء",
      onClick: closeAddCreditsModal,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: isSubmitting ? "جاري الإضافة..." : "إضافة الدروس",
      onClick: () => {},
      variant: "primary" as const,
      disabled: isSubmitting || formData.privateAmount <= 0,
      type: "submit" as const,
    },
  ];

  return (
    <ModalContainer isOpen={true}>
      <ModalHeader
        title="إضافة حلقات مستحقة"
        onClose={closeAddCreditsModal}
        disabled={isSubmitting}
      />
      <div className={styles.modalBody}>
        {selectedStudentForCredits && (
          <div className={styles.studentInfo}>
            <p>
              <strong>الطالب:</strong> {selectedStudentForCredits.name}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <FormField
              label="عدد الدروس الخصوصية"
              name="privateAmount"
              type="number"
              value={formData.privateAmount}
              onChange={handleInputChange}
              min={1}
              max={100}
              disabled={isSubmitting}
              placeholder="أدخل عدد الدروس"
            />
          </div>
          <ErrorDisplay message={error || undefined} />

          <ModalActions actions={actions} alignment="right" />
        </form>
      </div>
    </ModalContainer>
  );
};

export default AddCreditsModal;
