import { useState, useEffect } from "react";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import { useCoursesContext } from "@/src/contexts/CoursesContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import { FaSave, FaBook } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  FormField,
  ModalActions,
  ErrorDisplay,
} from "@/src/components/common/Modal";
import { CourseFormData, AddCourseModalProps } from "@/src/types";
const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isEditMode = false,
  editCourseId,
}) => {
  const { closeAddCourseModal, closeEditCourseModal } = useAdminModal();
  const { getCourseByIdAPI, createCourse, updateCourse } = useCoursesContext();
  const [formData, setFormData] = useState<CourseFormData>({
    _id: "",
    title: "",
    description: "",
    telegramLink: "",
    duration: "",
    startAt: "",
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
      setFormData({
        _id: "",
        title: "",
        description: "",
        telegramLink: "",
        duration: "",
        startAt: "",
      });
    }, 300);
  };
  const fetchCourseData = async () => {
    if (!isEditMode || !editCourseId) return;
    try {
      setIsLoading(true);

      try {
        const courseData = await getCourseByIdAPI(editCourseId);
        setFormData({
          _id: courseData._id || courseData.id,
          title: courseData.title || "",
          description: courseData.description || "",
          telegramLink: courseData.telegramLink || "",
          duration: courseData.duration || "",
          startAt: courseData.startAt || "",
        });
      } catch {
        setServerError("حدث خطأ أثناء تحميل بيانات الدورة");
      }
    } catch {
      setServerError("حدث خطأ أثناء تحميل بيانات الدورة");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isEditMode && editCourseId) {
      fetchCourseData();
    }
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
      case "duration":
        if (!value.trim()) return "مدة الدورة مطلوبة";
        return "";
      case "startAt":
        if (!value.trim()) return "تاريخ بداية الدورة مطلوب";
        return "";
      default:
        return "";
    }
  };
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    errors.title = validateField("title", formData.title);
    errors.description = validateField("description", formData.description);
    errors.telegramLink = validateField("telegramLink", formData.telegramLink);
    errors.duration = validateField("duration", formData.duration);
    errors.startAt = validateField("startAt", formData.startAt);
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
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    if (serverError) {
      setServerError("");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      if (isEditMode && editCourseId) {
        await updateCourse(editCourseId, {
          ...formData,
        });
      } else {
        await createCourse({
          ...formData,
        });
      }
      setFormData({
        _id: "",
        title: "",
        description: "",
        telegramLink: "",
        duration: "",
        startAt: "",
      });
      setFieldErrors({});
      setServerError("");
      handleClose();
    } catch {
      setServerError("حدث خطأ أثناء حفظ الدورة");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading) {
    return (
      <ModalContainer isOpen={true} isClosing={isClosing} onClose={handleClose}>
        <ModalHeader
          title="جاري التحميل..."
          onClose={handleClose}
          isOpen={true}
        />
        <div className={baseStyles.modalBody}>
          <div className={baseStyles.loadingSpinner}>
            <span className={baseStyles.spinner}></span>
            <p>جاري تحميل بيانات الدورة...</p>
          </div>
        </div>
      </ModalContainer>
    );
  }
  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: isEditMode ? "تحديث الدورة" : "إنشاء الدورة",
      onClick: () => {},
      variant: "primary" as const,
      disabled: isSubmitting,
      icon: <FaSave />,
      type: "submit" as const,
    },
  ];
  return (
    <ModalContainer
      isOpen={true}
      isClosing={isClosing}
      variant="add"
      size="large"
      onClose={handleClose}
    >
      <ModalHeader
        title={isEditMode ? "تعديل الدورة" : "إضافة دورة جديدة"}
        icon={<FaBook />}
        onClose={handleClose}
        isOpen={true}
        variant="add"
      />
      <div className={baseStyles.modalBody}>
        <form onSubmit={handleSubmit} className={baseStyles.form}>
          <ErrorDisplay message={serverError} />
          <div className={baseStyles.formGrid}>
            <FormField
              label="عنوان الدورة"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              error={fieldErrors.title}
              disabled={isSubmitting}
              placeholder="مثال: دورة تأسيس القرآن الكريم"
              fullWidth={false}
            />
            <FormField
              label="رابط التليجرام"
              name="telegramLink"
              type="url"
              value={formData.telegramLink}
              onChange={handleInputChange}
              error={fieldErrors.telegramLink}
              disabled={isSubmitting}
              placeholder="https://t.me/channelname"
            />
            <FormField
              label="مدة الدورة"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              error={fieldErrors.duration}
              disabled={isSubmitting}
              placeholder="مثال: 3 أشهر"
            />
            <FormField
              label="تاريخ البداية"
              name="startAt"
              type="date"
              value={formData.startAt}
              onChange={handleInputChange}
              error={fieldErrors.startAt}
              disabled={isSubmitting}
            />
            <FormField
              label="وصف الدورة"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleInputChange}
              error={fieldErrors.description}
              disabled={isSubmitting}
              placeholder="وصف مفصل للدورة ومحتواها..."
              rows={4}
              fullWidth
            />
          </div>
          <ModalActions actions={actions} alignment="right" />
        </form>
      </div>
    </ModalContainer>
  );
};
export default AddCourseModal;
