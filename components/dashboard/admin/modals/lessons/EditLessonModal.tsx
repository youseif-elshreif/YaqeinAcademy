import { useState, useEffect } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import { FaTimes, FaEdit, FaSave } from "react-icons/fa";

const EditLessonModal: React.FC = () => {
  const { closeEditLessonModal, selectedLessonData } = useAdminModal();

  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    day: "",
    time: "",
    date: "",
  });

  // تعبئة البيانات عند فتح المودال
  useEffect(() => {
    if (selectedLessonData) {
      setFormData({
        day: selectedLessonData.day,
        time: selectedLessonData.time,
        date: selectedLessonData.date,
      });
    }
  }, [selectedLessonData]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeEditLessonModal();
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
      // TODO: إضافة منطق تحديث الحصة
      console.log("Updating lesson:", selectedLessonData?.id, formData);

      // محاكاة API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      handleClose();
    } catch (error) {
      console.error("Error updating lesson:", error);
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

  if (!selectedLessonData) return null;

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
            <FaEdit className={baseStyles.titleIcon} />
            تعديل الحصة
          </div>
          <button
            onClick={handleClose}
            className={baseStyles.closeBtn}
            disabled={isSubmitting}
          >
            <FaTimes />
          </button>
        </div>

        <div className={baseStyles.modalBody}>
          <form onSubmit={handleSubmit} className={baseStyles.form}>
            <div className={baseStyles.formGrid}>
              <div className={baseStyles.inputGroup}>
                <label className={baseStyles.label}>
                  اليوم <span className={baseStyles.required}>*</span>
                </label>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                  className={baseStyles.select}
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

              <div className={baseStyles.inputGroup}>
                <label className={baseStyles.label}>
                  الوقت <span className={baseStyles.required}>*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={baseStyles.textInput}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={baseStyles.inputGroup}>
                <label className={baseStyles.label}>
                  التاريخ <span className={baseStyles.required}>*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={baseStyles.textInput}
                  required
                  disabled={isSubmitting}
                />
              </div>
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
                  <span className={baseStyles.loading}>جارٍ التحديث...</span>
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

export default EditLessonModal;
