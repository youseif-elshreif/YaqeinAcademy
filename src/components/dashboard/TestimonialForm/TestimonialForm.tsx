import React, { useState } from "react";
import { TestimonialFormProps } from "@/src/types";
import styles from "./TestimonialForm.module.css";

const TestimonialForm: React.FC<TestimonialFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    content: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "الاسم يجب أن يكون أطول من حرفين";
    }

    if (!formData.content.trim()) {
      newErrors.content = "محتوى الرأي مطلوب";
    } else if (formData.content.trim().length < 10) {
      newErrors.content = "محتوى الرأي يجب أن يكون أطول من 10 أحرف";
    } else if (formData.content.trim().length > 500) {
      newErrors.content = "محتوى الرأي يجب أن يكون أقل من 500 حرف";
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
      setFormData({ name: "", content: "" });
      setErrors({});
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.testimonialForm}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          اسم صاحب الرأي <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          placeholder="أدخل اسم صاحب الرأي"
          disabled={isLoading}
        />
        {errors.name && (
          <span className={styles.errorMessage}>{errors.name}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>
          محتوى الرأي <span className={styles.required}>*</span>
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          className={`${styles.textarea} ${
            errors.content ? styles.inputError : ""
          }`}
          placeholder="أدخل محتوى الرأي..."
          rows={4}
          disabled={isLoading}
        />
        <div className={styles.charCount}>{formData.content.length}/500</div>
        {errors.content && (
          <span className={styles.errorMessage}>{errors.content}</span>
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
