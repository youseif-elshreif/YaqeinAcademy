import { useState, useEffect } from "react";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import { FaEdit, FaSave } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  FormField,
  ModalActions,
} from "@/src/components/common/Modal";
import { useLessonsContext } from "@/src/contexts/LessonsContext";

const EditLessonModal: React.FC = () => {
  const { closeEditLessonModal, selectedLessonData } = useAdminModal();
  const { updateLesson } = useLessonsContext();

  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    time: "",
    date: "",
    subject: "string",
    meetingLink: "",
  });

  useEffect(() => {
    if (selectedLessonData) {
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
      if (!updateLesson || !selectedLessonData) {
        throw new Error("Missing lesson context");
      }
      const { date, time } = formData;
      const scheduledAt = new Date(`${date}T${time}:00`).toISOString();
      await updateLesson(selectedLessonData.id, {
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
    <ModalContainer
      isOpen={true}
      isClosing={isClosing}
      variant="add"
      onClose={handleClose}
    >
      <ModalHeader
        title="تعديل الدرس"
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
              label="رابط الاجتماع"
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
