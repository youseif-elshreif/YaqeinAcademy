import { useState } from "react";
import styles from "./AddCourseModal.module.css";
import {
  FaTimes,
  FaSave,
  FaBook,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
interface CourseFormData {
  title: string;
  description: string;
  teacherName: string;
  duration: string;
  startDate: string;
  endDate: string;
}

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose }) => {
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "maxStudents" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("=== ADD NEW COURSE API CALL ===");
      console.log("Course Data:", formData);
      console.log("API Endpoint: /api/courses/create");
      console.log("✅ Course creation request logged to console");

      handleClose();
    } catch (error) {
      console.error("❌ Error creating course:", error);
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
            إنشاء دورة جديدة
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
              {/* Course Title */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>عنوان الدورة</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="مثال: دورة تحفيظ القرآن للمبتدئين"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Teacher Name */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>اسم المدرس</label>
                <input
                  type="text"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="اختر المدرس"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Duration */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <FaClock />
                  مدة الدورة
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="مثال: 8 أسابيع، 3 أشهر"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Start Date */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <FaCalendarAlt />
                  تاريخ البداية
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* End Date */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <FaCalendarAlt />
                  تاريخ النهاية
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Description */}
              <div
                className={styles.formGroup}
                style={{ gridColumn: "1 / -1" }}
              >
                <label className={styles.formLabel}>وصف الدورة</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  placeholder="اكتب وصفاً مفصلاً عن محتوى الدورة وأهدافها..."
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
                    إنشاء الدورة
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

export default AddCourseModal;
