"use client";
import React, { useState } from "react";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import { useTeachersContext } from "@/src/contexts/TeachersContext";
import styles from "@/src/styles/BaseModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  FormField,
  ErrorDisplay,
} from "@/src/components/common/Modal";

interface TeacherPriceFormData {
  money: number;
}

const SetTeacherPriceModal: React.FC = () => {
  const {
    setTeacherPriceModalOpen,
    closeSetTeacherPriceModal,
    selectedTeacherForPrice,
  } = useAdminModal();
  const { getTeachers, updateMember } = useTeachersContext();

  const [formData, setFormData] = useState<TeacherPriceFormData>({
    money: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (setTeacherPriceModalOpen && selectedTeacherForPrice) {
      const currentMoney =
        selectedTeacherForPrice.fullData?.userId?.money ||
        selectedTeacherForPrice.fullData?.money ||
        selectedTeacherForPrice.money ||
        0;
      setFormData({
        money: currentMoney,
      });
      setError(null);
    }
  }, [setTeacherPriceModalOpen, selectedTeacherForPrice]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      money: parseFloat(value) || 0,
    }));

    if (error) {
      setError(null);
    }
  };

  const validateForm = (): boolean => {
    if (formData.money < 0) {
      setError("سعر الحلقة لا يمكن أن يكون سالباً");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTeacherForPrice) {
      setError("لم يتم اختيار معلم");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // تحديث سعر الحلقة للمعلم
      if (selectedTeacherForPrice.userId) {
        await updateMember(selectedTeacherForPrice.userId._id, {
          name: selectedTeacherForPrice.userId.name,
          phone: selectedTeacherForPrice.userId.phone,
          email: selectedTeacherForPrice.userId.email,
          money: formData.money,
        });
      }

      closeSetTeacherPriceModal();
    } catch {
      setError("خطأ في تحديث سعر الحلقة للمعلم");
    } finally {
      await getTeachers();
      setIsSubmitting(false);
    }
  };

  if (!setTeacherPriceModalOpen) return null;

  const actions = [
    {
      label: "إلغاء",
      onClick: closeSetTeacherPriceModal,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: isSubmitting ? "جاري المعالجة..." : "تحديث السعر",
      onClick: () => {},
      variant: "primary" as const,
      disabled: isSubmitting,
      type: "submit" as const,
    },
  ];

  return (
    <ModalContainer isOpen={true} onClose={closeSetTeacherPriceModal}>
      <ModalHeader
        title="تعديل سعر الحلقة للمعلم"
        onClose={closeSetTeacherPriceModal}
        isOpen={true}
      />
      <div className={styles.modalBody}>
        {selectedTeacherForPrice && (
          <div className={styles.studentInfo}>
            <p>
              <strong>المعلم:</strong> {selectedTeacherForPrice.name}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <FormField
              label="سعر الحلقة (ج.م)"
              name="money"
              type="number"
              value={formData.money || 0}
              onChange={handleInputChange}
              min={0}
              disabled={isSubmitting}
              placeholder="أدخل سعر الحلقة"
            />
          </div>
          <ErrorDisplay message={error || undefined} />

          <ModalActions actions={actions} alignment="right" />
        </form>
      </div>
    </ModalContainer>
  );
};

export default SetTeacherPriceModal;
