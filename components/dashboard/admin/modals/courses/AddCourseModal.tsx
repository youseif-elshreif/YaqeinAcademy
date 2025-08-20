import { useState, useEffect } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import { getCourseById } from "@/data/mockCourses";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import { FaTimes, FaSave, FaBook, FaTelegram, FaEdit } from "react-icons/fa";

interface CourseFormData {
  _id?: string;
  title: string;
  description: string;
  telegramLink: string;
}

interface AddCourseModalProps {
  isEditMode?: boolean;
  editCourseId?: string;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isEditMode = false,
  editCourseId,
}) => {
  const { closeAddCourseModal, closeEditCourseModal } = useAdminModal();
  const { getCourseByIdAPI, createCourse, updateCourse } =
    useAdminDashboardContext();

  const [formData, setFormData] = useState<CourseFormData>({
    _id: "",
    title: "",
    description: "",
    telegramLink: "",
  });

  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string>("");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (isEditMode) {
        closeEditCourseModal();
      } else {
        closeAddCourseModal();
      }
      setIsClosing(false);
      setFieldErrors({});
      setServerError("");
      // Reset form
      setFormData({
        _id: "",
        title: "",
        description: "",
        telegramLink: "",
      });
    }, 300);
  };

  // Load course data when in edit mode
  const fetchCourseData = async () => {
    if (!isEditMode || !editCourseId) return;

    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setServerError("لا يوجد رمز مصادقة. يرجى تسجيل الدخول مرة أخرى");
        return;
      }

      try {
        // Try API call first using context
        const courseData = await getCourseByIdAPI(token, editCourseId);
        setFormData({
          _id: courseData._id || courseData.id,
          title: courseData.title || "",
          description: courseData.description || "",
          telegramLink: courseData.telegramLink || "",
        });
      } catch (apiError) {
        // Fallback to mock data if API fails
        console.log("API not available, using mock data...", apiError);
        const mockCourse = getCourseById(editCourseId);

        if (mockCourse) {
          setFormData({
            _id: mockCourse._id,
            title: mockCourse.title,
            description: mockCourse.description,
            telegramLink: mockCourse.telegramLink,
          });
        } else {
          throw new Error("لم يتم العثور على الدورة");
        }
      }
    } catch (error) {
      console.error("Error loading course data:", error);
      setServerError("حدث خطأ أثناء تحميل بيانات الدورة");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isEditMode && editCourseId) {
      fetchCourseData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, editCourseId]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "title":
        if (!value.trim()) return "عنوان الدورة مطلوب";
        if (value.trim().length < 3)
          return "عنوان الدورة يجب أن يكون أكثر من 3 أحرف";
        return "";
      case "description":
        if (!value.trim()) return "وصف الدورة مطلوب";
        if (value.trim().length < 10)
          return "وصف الدورة يجب أن يكون أكثر من 10 أحرف";
        return "";
      case "telegramLink":
        if (!value.trim()) return "رابط التليجرام مطلوب";
        try {
          new URL(value);
          if (!value.includes("t.me") && !value.includes("telegram.me")) {
            return "يجب أن يكون رابط تليجرام صحيح";
          }
          return "";
        } catch {
          return "رابط التليجرام غير صحيح";
        }
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    errors.title = validateField("title", formData.title);
    errors.description = validateField("description", formData.description);
    errors.telegramLink = validateField("telegramLink", formData.telegramLink);

    // Remove empty errors
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear server error when user makes changes
    if (serverError) {
      setServerError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setServerError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setServerError("لا يوجد رمز مصادقة. يرجى تسجيل الدخول مرة أخرى");
        return;
      }

      if (isEditMode && editCourseId) {
        // Update existing course using context
        await updateCourse(token, editCourseId, formData);
      } else {
        // Create new course using context
        await createCourse(token, formData);
      }

      // Reset form after successful submission
      setFormData({
        _id: "",
        title: "",
        description: "",
        telegramLink: "",
      });
      setFieldErrors({});
      setServerError("");

      // Close modal
      handleClose();
    } catch (error: any) {
      console.error("❌ Error saving course:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "حدث خطأ أثناء حفظ الدورة";
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
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
            <h2 className={baseStyles.modalTitle}>جاري التحميل...</h2>
          </div>
          <div className={baseStyles.modalBody}>
            <div className={baseStyles.loadingSpinner}>
              <span className={baseStyles.spinner}></span>
              <p>جاري تحميل بيانات الدورة...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <h2 className={baseStyles.modalTitle}>
            <FaBook />
            {isEditMode ? "تعديل الدورة" : "إضافة دورة جديدة"}
          </h2>
          <button
            onClick={handleClose}
            className={baseStyles.closeButton}
            disabled={isSubmitting}
          >
            <FaTimes />
          </button>
        </div>

        <div className={baseStyles.modalBody}>
          <form onSubmit={handleSubmit} className={baseStyles.form}>
            {/* Server Error Display */}
            {serverError && (
              <div className={baseStyles.errorMessage}>{serverError}</div>
            )}

            <div className={baseStyles.formGrid}>
              {/* Course Title */}
              <div className={baseStyles.inputGroup}>
                <label className={baseStyles.label}>
                  <FaBook className={baseStyles.labelIcon} />
                  عنوان الدورة
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`${baseStyles.textInput} ${
                    fieldErrors.title ? baseStyles.inputError : ""
                  }`}
                  placeholder="مثال: دورة تأسيس القرآن الكريم"
                  disabled={isSubmitting}
                />
                {fieldErrors.title && (
                  <span className={baseStyles.fieldError}>
                    {fieldErrors.title}
                  </span>
                )}
              </div>

              {/* Telegram Link */}
              <div className={baseStyles.inputGroup}>
                <label className={baseStyles.label}>
                  <FaTelegram className={baseStyles.labelIcon} />
                  رابط التليجرام
                </label>
                <input
                  type="url"
                  name="telegramLink"
                  value={formData.telegramLink}
                  onChange={handleInputChange}
                  className={`${baseStyles.textInput} ${
                    fieldErrors.telegramLink ? baseStyles.inputError : ""
                  }`}
                  placeholder="https://t.me/channelname"
                  disabled={isSubmitting}
                />
                {fieldErrors.telegramLink && (
                  <span className={baseStyles.fieldError}>
                    {fieldErrors.telegramLink}
                  </span>
                )}
              </div>

              {/* Course Description */}
              <div
                className={`${baseStyles.inputGroup} ${baseStyles.fullWidth}`}
              >
                <label className={baseStyles.label}>
                  <FaEdit className={baseStyles.labelIcon} />
                  وصف الدورة
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`${baseStyles.textarea} ${
                    fieldErrors.description ? baseStyles.inputError : ""
                  }`}
                  placeholder="وصف مفصل للدورة ومحتواها..."
                  rows={4}
                  disabled={isSubmitting}
                />
                {fieldErrors.description && (
                  <span className={baseStyles.fieldError}>
                    {fieldErrors.description}
                  </span>
                )}
              </div>
            </div>

            <div className={baseStyles.formActions}>
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
                  <>
                    <span className={baseStyles.spinner}></span>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <FaSave />
                    {isEditMode ? "تحديث الدورة" : "إنشاء الدورة"}
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
