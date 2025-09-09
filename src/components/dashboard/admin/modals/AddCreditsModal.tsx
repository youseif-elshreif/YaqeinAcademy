"use client";
import React, { useState } from "react";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import { CreditsFormData } from "@/src/types";
import styles from "@/src/styles/BaseModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  FormField,
  ErrorDisplay,
} from "@/src/components/common/Modal";

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

    if (error) {
      setError(null);
    }
  };

  const validateForm = (): boolean => {
    if (formData.privateAmount < 0) {
      setError("عدد الحصص لا يمكن أن يكون سالبًا");
      return false;
    }

    if (formData.privateAmount === 0) {
      setError("يجب إدخال عدد صحيح أكبر من الصفر");
      return false;
    }

    if (formData.privateAmount > 31) {
      setError("عدد الحصص لا يمكن أن يتجاوز 31");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudentForCredits) {
      setError("لم يتم اختيار طالب");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addCreditsToStudent(
        selectedStudentForCredits.userId,
        formData.privateAmount,
        0
      );
      closeAddCreditsModal();
    } catch {
      setError("خطأ في إضافة الرصيد للطالب");
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
      label: isSubmitting ? "جاري المعالجة..." : "إضافة الرصيد",
      onClick: () => {},
      variant: "primary" as const,
      disabled: isSubmitting || formData.privateAmount <= 0,
      type: "submit" as const,
    },
  ];

  return (
    <ModalContainer isOpen={true} onClose={closeAddCreditsModal}>
      <ModalHeader
        title="إضافة رصيد للطالب"
        onClose={closeAddCreditsModal}
        isOpen={true}
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
              label="عدد الحصص الخاصة"
              name="privateAmount"
              type="number"
              value={formData.privateAmount}
              onChange={handleInputChange}
              min={1}
              max={100}
              disabled={isSubmitting}
              placeholder="أدخل عدد الحصص"
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
