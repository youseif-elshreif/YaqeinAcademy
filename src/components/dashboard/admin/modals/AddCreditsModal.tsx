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
      setError("??? ?????? ?? ???? ?? ???? ??????");
      return false;
    }

    if (formData.privateAmount === 0) {
      setError("??? ????? ??? ???? ???? ?? ???");
      return false;
    }

    if (formData.privateAmount > 31) {
      setError("??? ?????? ?? ???? ?? ?????? 31");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudentForCredits) {
      setError("?? ???? ???? ????");
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
        0 // publicAmount ?????? 0
      ); // Close modal on success
      closeAddCreditsModal();
    } catch {
      setError("??? ??? ????? ????? ??????");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!addCreditsModalOpen) return null;

  const actions = [
    {
      label: "?????",
      onClick: closeAddCreditsModal,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: isSubmitting ? "???? ???????..." : "????? ??????",
      onClick: () => {},
      variant: "primary" as const,
      disabled: isSubmitting || formData.privateAmount <= 0,
      type: "submit" as const,
    },
  ];

  return (
    <ModalContainer isOpen={true} onClose={closeAddCreditsModal}>
      <ModalHeader
        title="????? ????? ??????"
        onClose={closeAddCreditsModal}
        isOpen={true}
      />
      <div className={styles.modalBody}>
        {selectedStudentForCredits && (
          <div className={styles.studentInfo}>
            <p>
              <strong>??????:</strong> {selectedStudentForCredits.name}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <FormField
              label="??? ?????? ????????"
              name="privateAmount"
              type="number"
              value={formData.privateAmount}
              onChange={handleInputChange}
              min={1}
              max={100}
              disabled={isSubmitting}
              placeholder="???? ??? ??????"
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
