import { useState } from "react";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import { FaCalendarPlus, FaSave } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  FormField,
  ModalActions,
} from "@/src/components/common/Modal";
import { useLessonsContext } from "@/src/contexts/LessonsContext";
import { useAuth } from "@/src/contexts/AuthContext";

const AddLessonModal: React.FC = () => {
  const { closeAddLessonModal, selectedGroupForLessons } = useAdminModal();
  const { addLessonToGroup } = useLessonsContext();
  const { token } = useAuth();

  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    time: "",
    date: "",
    meetingLink: "",
  });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeAddLessonModal();
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
      if (!token || !addLessonToGroup || !selectedGroupForLessons) {
        throw new Error("Missing token or group context");
      }
      const { date, time } = formData;

      const scheduledAt = new Date(`${date}T${time}:00`).toISOString();
      await addLessonToGroup(token, selectedGroupForLessons.groupId, {
        scheduledAt,
        subject: " ",
        meetingLink: formData.meetingLink,
      });
      handleClose();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const actions = [
    {
      label: "?????",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: "????? ??????",
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
        title="????? ??? ?????"
        icon={<FaCalendarPlus />}
        onClose={handleClose}
        disabled={isSubmitting}
        variant="add"
      />
      <div className={baseStyles.modalBody}>
        <form onSubmit={handleSubmit} className={baseStyles.form}>
          <div className={baseStyles.formGrid}>
            <FormField
              label="?????"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleTextChange}
              required
              disabled={isSubmitting}
            />

            <FormField
              label="???????"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleTextChange}
              required
              disabled={isSubmitting}
            />

            <FormField
              label="???? ?????"
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

export default AddLessonModal;
