"use client";
import React from "react";
import { FiMessageSquare, FiStar } from "react-icons/fi";
import baseStyles from "../../../styles/BaseModal.module.css";
import { ModalContainer, ModalHeader } from "@/src/components/common/Modal";
import Button from "../Button";

export interface ViewTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: {
    _id: string;
    name: string;
    txt: string;
    rating?: number;
    createdAt: string;
    adminAccepted: boolean;
  };
}

const ViewTestimonialModal: React.FC<ViewTestimonialModalProps> = ({
  isOpen,
  onClose,
  testimonial,
}) => {
  if (!isOpen || !testimonial) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className={baseStyles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <FiStar
            key={index}
            className={`${baseStyles.star} ${
              index < rating ? baseStyles.starFilled : baseStyles.starEmpty
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <ModalContainer isOpen={true} variant="default" onClose={onClose}>
      <ModalHeader
        title="عرض رأي الطالب"
        icon={<FiMessageSquare />}
        onClose={onClose}
        variant="default"
      />
      <div className={baseStyles.modalBody}>
        <div className={baseStyles.testimonialView}>
          {/* Author Info */}
          <div className={baseStyles.authorSection}>
            <h3 className={baseStyles.authorName}>{testimonial.name}</h3>
            {testimonial.rating && (
              <div className={baseStyles.ratingSection}>
                <span className={baseStyles.ratingLabel}>التقييم:</span>
                {renderStars(testimonial.rating)}
                <span className={baseStyles.ratingValue}>
                  {testimonial.rating}/5
                </span>
              </div>
            )}
            <p className={baseStyles.testimonialDate}>
              تاريخ الكتابة: {formatDate(testimonial.createdAt)}
            </p>
          </div>

          {/* Testimonial Content */}
          <div className={baseStyles.contentSection}>
            <h4 className={baseStyles.contentTitle}>نص الرأي:</h4>
            <div className={baseStyles.testimonialText}>
              <p>{testimonial.txt}</p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className={baseStyles.modalActions}>
          <Button
            variant="secondary"
            onClick={onClose}
            className={`${baseStyles.button} ${baseStyles.buttonSecondary}`}
          >
            إغلاق
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ViewTestimonialModal;
