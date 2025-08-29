"use client";

import { useEffect, useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { FaSave, FaLink } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  FormField,
  ModalActions,
  ErrorDisplay,
} from "@/components/common/Modal";
import baseStyles from "../../../../../styles/BaseModal.module.css";

const EditTeacherLinkModal = () => {
  const {
    editTeacherLinkModalOpen,
    closeEditTeacherLinkModal,
    selectedTeacherForLink,
    updateTeacherMeetingLinkOnly,
  } = useAdminModal();

  const [meetingLink, setMeetingLink] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [serverError, setServerError] = useState("");

  // Populate form when modal opens
  useEffect(() => {
    if (editTeacherLinkModalOpen && selectedTeacherForLink) {
      console.log("=== EDIT TEACHER LINK MODAL OPENED ===");
      console.log("Selected Teacher Data:", selectedTeacherForLink);

      // Get meeting link from different possible locations
      const currentLink =
        selectedTeacherForLink.meetingLink ||
        selectedTeacherForLink.teacherInfo?.meetingLink ||
        selectedTeacherForLink.userId?.meetingLink ||
        "";

      console.log("Current Meeting Link:", currentLink);
      setMeetingLink(currentLink);
    }
  }, [editTeacherLinkModalOpen, selectedTeacherForLink]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeEditTeacherLinkModal();
      setIsClosing(false);
      setMeetingLink("");
      setFieldError("");
      setServerError("");
    }, 300);
  };

  const validateLink = (link: string): string => {
    if (!link.trim()) {
      return "رابط الاجتماع مطلوب";
    }
    try {
      new URL(link);
      return "";
    } catch {
      return "رابط الاجتماع غير صحيح";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMeetingLink(value);

    if (fieldError) {
      setFieldError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    console.log("=== SUBMITTING TEACHER LINK UPDATE ===");
    console.log("Selected Teacher Data:", selectedTeacherForLink);

    // Get teacher ID from different possible locations
    const teacherId =
      selectedTeacherForLink?.id ||
      selectedTeacherForLink?._id ||
      selectedTeacherForLink?.userId?._id ||
      selectedTeacherForLink?.userId?.id;

    console.log("Extracted Teacher ID:", teacherId);

    if (!teacherId) {
      setServerError("معرف المعلم مفقود");
      console.error(
        "No teacher ID found in selectedTeacherForLink:",
        selectedTeacherForLink
      );
      return;
    }

    // Validate link
    const error = validateLink(meetingLink);
    if (error) {
      setFieldError(error);
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Final meeting link:", meetingLink);
      await updateTeacherMeetingLinkOnly(teacherId, meetingLink);
      handleClose();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "حدث خطأ أثناء التحديث";
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!editTeacherLinkModalOpen) return null;

  const modalActions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: "حفظ الرابط",
      onClick: () => {},
      variant: "primary" as const,
      disabled: isSubmitting,
      loading: isSubmitting,
      icon: <FaSave />,
      type: "submit" as const,
    },
  ];

  const teacherName =
    selectedTeacherForLink?.name ||
    selectedTeacherForLink?.userId?.name ||
    "المعلم";

  return (
    <ModalContainer
      isOpen={editTeacherLinkModalOpen}
      isClosing={isClosing}
      variant="add"
      size="medium"
    >
      <ModalHeader
        title={`تعديل رابط حلقة ${teacherName}`}
        icon={<FaLink />}
        onClose={handleClose}
        disabled={isSubmitting}
        variant="add"
      />

      <div className={baseStyles.modalBody}>
        <form onSubmit={handleSubmit} className={baseStyles.form}>
          <ErrorDisplay message={serverError} />

          <div className={baseStyles.formGrid}>
            <FormField
              label="رابط الاجتماع"
              name="meetingLink"
              type="url"
              value={meetingLink}
              onChange={handleInputChange}
              error={fieldError}
              disabled={isSubmitting}
              placeholder="مثال: https://zoom.us/j/123456789"
              required
            />
          </div>

          <ModalActions actions={modalActions} />
        </form>
      </div>
    </ModalContainer>
  );
};

export default EditTeacherLinkModal;
