import React, { useState } from "react";
import { TestimonialFormProps } from "@/src/types";
import RatingComponent from "@/src/components/common/UI/RatingComponent";
import styles from "./TestimonialForm.module.css";

const TestimonialForm: React.FC<TestimonialFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    txt: "",
    hide: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.hide && !formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    } else if (!formData.hide && formData.name.trim().length < 2) {
      newErrors.name = "الاسم يجب أن يكون أطول من حرفين";
    }

    if (!formData.txt.trim()) {
      newErrors.txt = "محتوى الرأي مطلوب";
    } else if (formData.txt.trim().length < 10) {
      newErrors.txt = "محتوى الرأي يجب أن يكون أطول من 10 أحرف";
    } else if (formData.txt.trim().length > 500) {
      newErrors.txt = "محتوى الرأي يجب أن يكون أقل من 500 حرف";
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "التقييم يجب أن يكون بين 1 و 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({ name: "", rating: 5, txt: "", hide: false });
      setErrors({});
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    }
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.testimonialForm}>
      {/* Checkbox للإخفاء */}
      <div className={styles.formGroup}>
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="hide"
            checked={formData.hide}
            onChange={(e) => handleInputChange("hide", e.target.checked)}
            className={styles.checkbox}
            disabled={isLoading}
          />
          <label htmlFor="hide" className={styles.checkboxLabel}>
            إخفاء الاسم (سيظهر كـ &quot;شخص مجهول&quot;)
          </label>
        </div>
      </div>

      {/* حقل الاسم */}
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          اسم صاحب الرأي{" "}
          {!formData.hide && <span className={styles.required}>*</span>}
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          placeholder={
            formData.hide ? "سيظهر كـ 'شخص مجهول'" : "أدخل اسم صاحب الرأي"
          }
          disabled={isLoading || formData.hide}
        />
        {errors.name && (
          <span className={styles.errorMessage}>{errors.name}</span>
        )}
      </div>

      {/* مكون التقييم */}
      <div className={styles.formGroup}>
        <RatingComponent
          value={formData.rating}
          onChange={(rating) => handleInputChange("rating", rating)}
          label="تقييمك للأكاديمية:"
          disabled={isLoading}
        />
        {errors.rating && (
          <span className={styles.errorMessage}>{errors.rating}</span>
        )}
      </div>

      {/* محتوى الرأي */}
      <div className={styles.formGroup}>
        <label htmlFor="txt" className={styles.label}>
          محتوى الرأي <span className={styles.required}>*</span>
        </label>
        <textarea
          id="txt"
          value={formData.txt}
          onChange={(e) => handleInputChange("txt", e.target.value)}
          className={`${styles.textarea} ${
            errors.txt ? styles.inputError : ""
          }`}
          placeholder="أدخل محتوى الرأي..."
          rows={4}
          disabled={isLoading}
        />
        <div className={styles.charCount}>{formData.txt.length}/500</div>
        {errors.txt && (
          <span className={styles.errorMessage}>{errors.txt}</span>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? "جاري الإضافة..." : "إضافة الرأي"}
      </button>
    </form>
  );
};

export default TestimonialForm;
