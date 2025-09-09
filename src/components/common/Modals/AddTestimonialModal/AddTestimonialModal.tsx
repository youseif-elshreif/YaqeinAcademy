import React, { useState } from 'react';
import { ModalContainer, ModalHeader } from '@/src/components/common/Modal';
import TestimonialForm from '@/src/components/dashboard/TestimonialForm';
import { TestimonialFormData } from '@/src/types';
import styles from './AddTestimonialModal.module.css';

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
  isLoading = false
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      handleClose(); // Close modal on success
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
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
      
      <div className={styles.modalBody}>
        <TestimonialForm
          onSubmit={handleSubmit}
          isLoading={isSubmitting || isLoading}
        />
      </div>
    </ModalContainer>
  );
};

export default AddTestimonialModal;
