import { useState, useEffect } from "react";
import styles from "./AddCourseModal.module.css";
import {
  FaTimes,
  FaSave,
  FaBook,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { coursesData } from "../../../data/courses";

interface CourseFormData {
  title: string;
  description: string;
  teacherName: string;
  duration: string;
  startDate: string;
  endDate: string;
}

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number | null;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  isOpen,
  onClose,
  courseId,
}) => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    teacherName: "",
    duration: "",
    startDate: "",
    endDate: "",
  });

  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load course data when courseId changes
  useEffect(() => {
    if (courseId && isOpen) {
      const course = coursesData.find((c) => c.id === courseId);
      if (course) {
        setFormData({
          title: course.title,
          description: course.shortDescription,
          teacherName: course.teacherName,
          duration: course.duration,
          startDate: course.startDate,
          endDate: "", // Add endDate to course data if needed
        });
      }
    }
  }, [courseId, isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      // Reset form
      setFormData({
        title: "",
        description: "",
        teacherName: "",
        duration: "",
        startDate: "",
        endDate: "",
      });
    }, 300);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("=== UPDATE COURSE API CALL ===");
      console.log("Course ID:", courseId);
      console.log("Updated Course Data:", formData);
      console.log("✅ Course update request logged to console");

      handleClose();
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ""}`}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modalSlideOut : ""}`}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <FaBook />
            تعديل الدورة
          </h2>
          <button
            onClick={handleClose}
            className={styles.closeButton}
            disabled={isSubmitting}
          >
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.formLabel}>
                  عنوان الدورة *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="أدخل عنوان الدورة"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="teacherName" className={styles.formLabel}>
                  اسم المدرس *
                </label>
                <input
                  type="text"
                  id="teacherName"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="أدخل اسم المدرس"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="duration" className={styles.formLabel}>
                  <FaClock />
                  مدة الدورة *
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="مثال: شهران، 8 أسابيع"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="startDate" className={styles.formLabel}>
                  <FaCalendarAlt />
                  تاريخ البداية *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="endDate" className={styles.formLabel}>
                  <FaCalendarAlt />
                  تاريخ النهاية
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  disabled={isSubmitting}
                />
              </div>

              <div
                className={styles.formGroup}
                style={{ gridColumn: "1 / -1" }}
              >
                <label htmlFor="description" className={styles.formLabel}>
                  وصف الدورة *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  placeholder="أدخل وصف مفصل للدورة"
                  rows={4}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={handleClose}
                className={styles.cancelButton}
                disabled={isSubmitting}
              >
                إلغاء
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <FaSave />
                    حفظ التغييرات
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;
