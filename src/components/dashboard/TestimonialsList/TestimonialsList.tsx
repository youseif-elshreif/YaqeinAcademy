import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { TestimonialListProps } from "@/src/types";
import ViewTestimonialModal from "@/src/components/common/Modals/ViewTestimonialModal";
import styles from "./TestimonialsList.module.css";

const TestimonialsList: React.FC<TestimonialListProps> = ({
  testimonials,
  onApprove,
  onReject,
  onDelete,
}) => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const truncateText = (text: string, maxLines: number = 3) => {
    const words = text.split(" ");
    const wordsPerLine = 12; // تقريبياً
    const maxWords = maxLines * wordsPerLine;

    if (words.length <= maxWords) {
      return text;
    }

    return words.slice(0, maxWords).join(" ") + "...";
  };

  const handleViewTestimonial = (testimonial: any) => {
    setSelectedTestimonial(testimonial);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setSelectedTestimonial(null);
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (adminAccepted: boolean) => {
    return adminAccepted ? styles.approved : styles.pending;
  };

  const getStatusText = (adminAccepted: boolean) => {
    return adminAccepted ? "موافق عليه" : "في الانتظار";
  };

  if (testimonials.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>لا توجد آراء متاحة</p>
      </div>
    );
  }

  return (
    <div className={styles.testimonialsList}>
      {testimonials.map((testimonial) => (
        <div key={testimonial._id} className={styles.testimonialCard}>
          <div className={styles.testimonialHeader}>
            <div className={styles.testimonialInfo}>
              <h3 className={styles.testimonialName}>{testimonial.name}</h3>
              <span className={styles.rating}>⭐ {testimonial.rating}/5</span>
            </div>
            <div className={styles.testimonialStatus}>
              <span
                className={`${styles.statusBadge} ${getStatusColor(
                  testimonial.adminAccepted
                )}`}
              >
                {getStatusText(testimonial.adminAccepted)}
              </span>
            </div>
          </div>

          <div className={styles.testimonialContent}>
            <p>{truncateText(testimonial.txt)}</p>
            {testimonial.txt.split(" ").length > 36 && (
              <button
                onClick={() => handleViewTestimonial(testimonial)}
                className={styles.viewButton}
              >
                <FiEye className={styles.viewIcon} />
                عرض الرأي كاملاً
              </button>
            )}
          </div>

          <div className={styles.testimonialMeta}>
            <div className={styles.timestamps}>
              <span className={styles.timestamp}>
                تاريخ الإنشاء: {formatDate(testimonial.createdAt)}
              </span>
            </div>
          </div>

          <div className={styles.testimonialActions}>
            {!testimonial.adminAccepted && (
              <>
                <button
                  onClick={() => onApprove(testimonial._id)}
                  className={`${styles.actionButton} ${styles.approveButton}`}
                >
                  موافقة
                </button>
              </>
            )}
            {testimonial.adminAccepted && (
              <button
                onClick={() => onReject(testimonial._id)}
                className={`${styles.actionButton} ${styles.rejectButton}`}
              >
                إلغاء الموافقة
              </button>
            )}
            <button
              onClick={() => onDelete(testimonial._id)}
              className={`${styles.actionButton} ${styles.deleteButton}`}
            >
              حذف
            </button>
          </div>
        </div>
      ))}

      {/* View Testimonial Modal */}
      {selectedTestimonial && (
        <ViewTestimonialModal
          isOpen={isViewModalOpen}
          onClose={handleCloseModal}
          testimonial={selectedTestimonial}
        />
      )}
    </div>
  );
};

export default TestimonialsList;
