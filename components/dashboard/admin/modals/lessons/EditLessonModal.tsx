import { useState, useEffect } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import { FaEdit, FaSave } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  FormField,
  ModalActions,
} from "@/components/common/Modal";
import { useLessonsContext } from "@/contexts/LessonsContext";
import { useAuth } from "@/contexts/AuthContext";

const EditLessonModal: React.FC = () => {
  const { closeEditLessonModal, selectedLessonData } = useAdminModal();
  const { updateLesson } = useLessonsContext();
  const { token } = useAuth();

  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    time: "",
    date: "",
    subject: "string",
    meetingLink: "",
  });

  // تعبئة البيانات عند فتح المودال
  useEffect(() => {
    if (selectedLessonData) {
      // Normalize ISO date to YYYY-MM-DD for date input
      const rawDate = selectedLessonData.date;
      const d = new Date(rawDate);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      setFormData({
        time: selectedLessonData.time,
        date: `${yyyy}-${mm}-${dd}`,
        subject: " ",
        meetingLink: selectedLessonData.meetingLink || "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!token || !updateLesson || !selectedLessonData) {
        throw new Error("Missing token or lesson context");
      }
      const { date, time } = formData;
      const scheduledAt = new Date(`${date}T${time}:00`).toISOString();
      await updateLesson(token, selectedLessonData.id, {
        scheduledAt,
        subject: " ",
        meetingLink: formData.meetingLink || undefined,
      });
      handleClose();
    } catch (error) {
      console.error("Error updating lesson:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

            <FormField
              label="رابط الحصة"
              name="meetingLink"
              type="url"
              value={formData.meetingLink}
              onChange={handleTextChange}
              disabled={isSubmitting}
              placeholder="https://..."
            />
          </div>
          <ModalActions actions={actions} alignment="right" />
        </form>
      </div>
    </ModalContainer>
  );
};

export default EditLessonModal;
