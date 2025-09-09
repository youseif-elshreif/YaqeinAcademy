import React from 'react';
import { TestimonialListProps } from '@/src/types';
import styles from './TestimonialsList.module.css';

const TestimonialsList: React.FC<TestimonialListProps> = ({
  testimonials,
  onApprove,
  onReject,
  onDelete
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return styles.approved;
      case 'pending':
        return styles.pending;
      case 'rejected':
        return styles.rejected;
      default:
        return styles.pending;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'موافق عليه';
      case 'pending':
        return 'في الانتظار';
      case 'rejected':
        return 'مرفوض';
      default:
        return 'غير محدد';
    }
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
        <div key={testimonial.id} className={styles.testimonialCard}>
          <div className={styles.testimonialHeader}>
            <div className={styles.testimonialInfo}>
              <h3 className={styles.testimonialName}>{testimonial.name}</h3>
              <span className={styles.testimonialId}>#{testimonial.id}</span>
            </div>
            <div className={styles.testimonialStatus}>
              <span className={`${styles.statusBadge} ${getStatusColor(testimonial.status)}`}>
                {getStatusText(testimonial.status)}
              </span>
            </div>
          </div>
          
          <div className={styles.testimonialContent}>
            <p>{testimonial.content}</p>
          </div>
          
          <div className={styles.testimonialMeta}>
            <div className={styles.timestamps}>
              <span className={styles.timestamp}>
                تاريخ الإنشاء: {formatDate(testimonial.createdAt)}
              </span>
              {testimonial.updatedAt.getTime() !== testimonial.createdAt.getTime() && (
                <span className={styles.timestamp}>
                  آخر تحديث: {formatDate(testimonial.updatedAt)}
                </span>
              )}
            </div>
          </div>
          
          <div className={styles.testimonialActions}>
            {testimonial.status === 'pending' && (
              <>
                <button
                  onClick={() => onApprove(testimonial.id)}
                  className={`${styles.actionButton} ${styles.approveButton}`}
                >
                  موافقة
                </button>
                <button
                  onClick={() => onReject(testimonial.id)}
                  className={`${styles.actionButton} ${styles.rejectButton}`}
                >
                  رفض
                </button>
              </>
            )}
            {testimonial.status === 'approved' && (
              <button
                onClick={() => onReject(testimonial.id)}
                className={`${styles.actionButton} ${styles.rejectButton}`}
              >
                إلغاء الموافقة
              </button>
            )}
            {testimonial.status === 'rejected' && (
              <button
                onClick={() => onApprove(testimonial.id)}
                className={`${styles.actionButton} ${styles.approveButton}`}
              >
                موافقة
              </button>
            )}
            <button
              onClick={() => onDelete(testimonial.id)}
              className={`${styles.actionButton} ${styles.deleteButton}`}
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialsList;
