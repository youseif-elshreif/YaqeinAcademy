import { useState } from "react";
import styles from "./AddNicknameModal.module.css";
import { FaTag, FaSave } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  FormField,
  ErrorDisplay,
} from "@/components/common/Modal";

interface StudentData {
  studentId: number;
  studentName: string;
  nickname: string;
}

interface AddNicknameModalProps {
  studentData: StudentData;
  onSave: (nickname: string) => void;
  onClose: () => void;
}

const AddNicknameModal = ({
  studentData,
  onSave,
  onClose,
}: AddNicknameModalProps) => {
  const [nickname, setNickname] = useState(studentData.nickname || "");
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call when backend is ready
      console.log("=== ADD/UPDATE NICKNAME API CALL ===");
      console.log("Student ID:", studentData.studentId);
      console.log("Student Name:", studentData.studentName);
      console.log("Old Nickname:", studentData.nickname);
      console.log("New Nickname:", nickname.trim());
      console.log("API Endpoint: PUT /api/students/nickname");
      console.log("Request Body:", {
        studentId: studentData.studentId,
        nickname: nickname.trim(),
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("✅ Nickname updated successfully");
      onSave(nickname.trim());
    } catch (error) {
      console.error("❌ Error updating nickname:", error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 280); // Match the animation duration
  };

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: isSubmitting ? "جاري الحفظ" : "حفظ اللقب",
      onClick: () => {},
      variant: "primary" as const,
      disabled: isSubmitting,
      loading: isSubmitting,
      icon: <FaSave />,
      type: "submit" as const,
    },
  ];

  return (
    <ModalContainer isOpen={true} isClosing={isClosing} variant="add">
      <ModalHeader
        title="إضافة/تعديل اللقب"
        icon={<FaTag />}
        onClose={handleClose}
        disabled={isSubmitting}
        variant="add"
      />
      <form onSubmit={handleSubmit}>
        <div className={styles.modalBody}>
          <div className={styles.studentInfo}>
            <p>
              <strong>اسم الطالب:</strong> {studentData.studentName}
            </p>
            {studentData.nickname && (
              <p>
                <strong>اللقب الحالي:</strong> {studentData.nickname}
              </p>
            )}
          </div>

          <div className={styles.inputSection}>
            <FormField
              label="اللقب الجديد"
              name="nickname"
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                if (error) setError("");
              }}
              placeholder="أدخل لقباً مناسباً للطالب..."
              required
              disabled={isSubmitting}
            />
            <ErrorDisplay message={error || undefined} />
            <div className={styles.inputHint}>
              سيساعدك اللقب في التعرف على الطالب بسهولة أكبر
            </div>
          </div>
        </div>
        <ModalActions actions={actions} alignment="right" />
      </form>
    </ModalContainer>
  );
};

export default AddNicknameModal;
