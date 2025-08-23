import { useState, useEffect } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import { FaEdit, FaSave } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  FormField,
  ModalActions,
  SelectField,
} from "@/components/common/Modal";

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

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: إضافة منطق تحديث الحلقة
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

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: "حفظ التغييرات",
      onClick: () => {},
      variant: "primary" as const,
      disabled: isSubmitting,
      icon: <FaSave />,
      type: "submit" as const,
    },
  ];

  return (
    <ModalContainer isOpen={true} isClosing={isClosing} variant="add">
      <ModalHeader
        title="تعديل الحلقة"
        icon={<FaEdit />}
        onClose={handleClose}
        disabled={isSubmitting}
        variant="add"
      />
      <div className={baseStyles.modalBody}>
        <form onSubmit={handleSubmit} className={baseStyles.form}>
          <div className={baseStyles.formGrid}>
            <SelectField
              label="اليوم"
              name="day"
              value={formData.day}
              onChange={handleSelectChange}
              options={dayOptions}
              required
              disabled={isSubmitting}
            />

            <FormField
              label="الوقت"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleTextChange}
              required
              disabled={isSubmitting}
            />

            <FormField
              label="التاريخ"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleTextChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <ModalActions actions={actions} alignment="right" />
        </form>
      </div>
    </ModalContainer>
  );
};

export default EditLessonModal;
