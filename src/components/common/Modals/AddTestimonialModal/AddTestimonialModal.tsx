import React, { useState } from "react";
import {
  ModalContainer,
  ModalHeader,
  ErrorDisplay,
} from "@/src/components/common/Modal";
import TestimonialForm from "@/src/components/dashboard/TestimonialForm";
import { TestimonialFormData } from "@/src/types";
// import styles from "./AddTestimonialModal.module.css"; // Unused import

interface AddTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TestimonialFormData) => Promise<void>;
  isLoading?: boolean;
}

const AddTestimonialModal: React.FC<AddTestimonialModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const handleSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    setSubmitError(""); // Clear previous errors
    try {
      await onSubmit(data);
      handleClose(); // Close modal on success
    } catch (error) {
      // Set user-friendly error message
      setSubmitError("حدث خطأ أثناء إرسال رأيك. يرجى المحاولة مرة أخرى.");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setSubmitError(""); // Clear error when closing
      onClose();
    }, 300);
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={handleClose}
      isClosing={isClosing}
      variant="add"
      size="medium"
    >
      <ModalHeader
        title="إضافة رأي جديد"
        onClose={handleClose}
        disabled={isSubmitting || isLoading}
        variant="add"
      />

      <div style={{ overflowY: "auto" }}>
        <ErrorDisplay message={submitError} />
        <TestimonialForm
          onSubmit={handleSubmit}
          isLoading={isSubmitting || isLoading}
        />
      </div>
    </ModalContainer>
  );
};

export default AddTestimonialModal;
