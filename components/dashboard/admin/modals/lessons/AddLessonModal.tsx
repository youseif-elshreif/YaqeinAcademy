import { useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import styles from "./AddLessonModal.module.css";
import { FaTimes, FaCalendarPlus, FaSave } from "react-icons/fa";

const AddLessonModal: React.FC = () => {
  const { closeAddLessonModal } = useAdminModal();

  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    day: "",
    time: "",
    date: "",
  });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeAddLessonModal();
      setIsClosing(false);
    }, 300);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      // TODO: إضافة منطق حفظ الحلقة
      console.log("Adding lesson:", formData);

      // محاكاة API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      handleClose();
    } catch (error) {
      console.error("Error adding lesson:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const dayOptions = [
    { value: "", label: "اختر اليوم" },
    { value: "الأحد", label: "الأحد" },
    { value: "الاثنين", label: "الاثنين" },
    { value: "الثلاثاء", label: "الثلاثاء" },
    { value: "الأربعاء", label: "الأربعاء" },
    { value: "الخميس", label: "الخميس" },
    { value: "الجمعة", label: "الجمعة" },
    { value: "السبت", label: "السبت" },
  ];

  return (
    <div
      className={`${baseStyles.modalOverlay} ${
        isClosing ? baseStyles.fadeOut : ""
      }`}
    >
      <div
        className={`${baseStyles.modal} ${
          isClosing ? baseStyles.modalSlideOut : ""
        }`}
      >
        <div className={baseStyles.modalHeader}>
          <div className={baseStyles.modalTitle}>
            <FaCalendarPlus className={baseStyles.titleIcon} />
            إضافة حصة جديدة
          </div>
          <button
            onClick={handleClose}
            className={baseStyles.closeBtn}
            disabled={isSubmitting}
          >
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                اليوم <span className={styles.required}>*</span>
              </label>
              <select
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                className={styles.select}
                required
                disabled={isSubmitting}
              >
                {dayOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                الوقت <span className={styles.required}>*</span>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={styles.input}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                التاريخ <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={styles.input}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className={baseStyles.modalFooter}>
              <button
                type="button"
                onClick={handleClose}
                className={baseStyles.cancelButton}
                disabled={isSubmitting}
              >
                إلغاء
              </button>
              <button
                type="submit"
                className={baseStyles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className={baseStyles.loading}>جارٍ الإضافة...</span>
                ) : (
                  <>
                    <FaSave />
                    إضافة الحلقة
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

export default AddLessonModal;
