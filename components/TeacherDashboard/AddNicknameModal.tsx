import { useState } from "react";
import styles from "./AddNicknameModal.module.css";
import { FaTag, FaTimes, FaSave } from "react-icons/fa";

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

  return (
    <div
      className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ""}`}
      onClick={handleClose}
    >
      <form
        className={`${styles.modal} ${isClosing ? styles.modalSlideOut : ""}`}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <FaTag /> إضافة/تعديل اللقب
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className={styles.closeBtn}
          >
            <FaTimes />
          </button>
        </div>

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
            <label className={styles.inputLabel} htmlFor="nickname">
              اللقب الجديد:
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={styles.textInput}
              placeholder="أدخل لقباً مناسباً للطالب..."
              maxLength={20}
              required
              disabled={isSubmitting}
            />
            <div className={styles.inputHint}>
              سيساعدك اللقب في التعرف على الطالب بسهولة أكبر
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            type="button"
            onClick={handleClose}
            className={styles.cancelBtn}
            disabled={isSubmitting}
          >
            إلغاء
          </button>
          <button
            type="submit"
            className={styles.saveBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                جاري الحفظ
              </>
            ) : (
              <>
                <FaSave /> حفظ اللقب
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNicknameModal;
