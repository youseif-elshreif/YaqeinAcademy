import { useState } from "react";
import styles from "./PostponeClassModal.module.css";
import { FaTimes, FaClock, FaBan } from "react-icons/fa";

interface ClassData {
  id: number;
  studentName: string;
  date: string;
  time: string;
}

interface PostponeData {
  action: "postponed" | "cancelled";
  reason: string;
  newDate?: string;
  newTime?: string;
}

interface PostponeClassModalProps {
  classData: ClassData;
  onSave: (postponeData: PostponeData) => void;
  onClose: () => void;
}

const PostponeClassModal = ({
  classData,
  onSave,
  onClose,
}: PostponeClassModalProps) => {
  const [action, setAction] = useState<"postponed" | "cancelled">("postponed");
  const [reason, setReason] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [error, setError] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (reason.trim() === "") {
      setError("يرجى إدخال سبب التأجيل أو الإلغاء");
      return false;
    }

    if (action === "postponed") {
      if (newDate.trim() === "") {
        setError("يرجى اختيار التاريخ الجديد للحصة");
        return false;
      }
      if (newTime.trim() === "") {
        setError("يرجى اختيار الوقت الجديد للحصة");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const postponeData: PostponeData = {
        action,
        reason: reason.trim(),
        ...(action === "postponed" && {
          newDate: newDate,
          newTime: newTime,
        }),
      };

      // TODO: Replace with actual API call when backend is ready
      console.log("=== POSTPONE/CANCEL CLASS API CALL ===");
      console.log("Class Data:", classData);
      console.log("Action:", action);
      console.log("Reason:", reason.trim());
      console.log(`API Endpoint: PUT /api/classes/${action}`);
      console.log("Request Body:", {
        classId: classData.id,
        action,
        reason: reason.trim(),
        studentName: classData.studentName,
        originalDate: classData.date,
        originalTime: classData.time,
        ...(action === "postponed" && {
          newDate: newDate,
          newTime: newTime,
        }),
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`✅ Class ${action} successfully`);
      onSave(postponeData);
    } catch (error) {
      console.error(`❌ Error ${action} class:`, error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = () => {
    // This function is kept for backward compatibility but now just triggers form submit
    const form = document.querySelector(
      "#postpone-class-form"
    ) as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 280);
  };

  return (
    <div
      className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ""}`}
      onClick={handleClose}
    >
      <form
        id="postpone-class-form"
        className={`${styles.modal} ${isClosing ? styles.modalSlideOut : ""}`}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>تأجيل أو إلغاء الحصة</h2>
          <button onClick={handleClose} className={styles.closeBtn}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.classInfo}>
            <p>
              <strong>الطالب:</strong> {classData.studentName}
            </p>
            <p>
              <strong>التاريخ:</strong> {classData.date}
            </p>
            <p>
              <strong>الوقت:</strong> {classData.time}
            </p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>نوع الإجراء</h4>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="action"
                  value="postponed"
                  checked={action === "postponed"}
                  onChange={(e) =>
                    setAction(e.target.value as "postponed" | "cancelled")
                  }
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>⏰ تأجيل الحصة</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="action"
                  value="cancelled"
                  checked={action === "cancelled"}
                  onChange={(e) =>
                    setAction(e.target.value as "postponed" | "cancelled")
                  }
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>
                  <FaBan /> إلغاء الحصة
                </span>
              </label>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              سبب {action === "postponed" ? "التأجيل" : "الإلغاء"}
            </h4>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError(""); // Clear error when user starts typing
              }}
              className={styles.textarea}
              placeholder={`أدخل سبب ${
                action === "postponed" ? "تأجيل" : "إلغاء"
              } الحصة...`}
              rows={4}
              required
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>

          {action === "postponed" && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>الميعاد الجديد</h4>
              <div className={styles.dateTimeContainer}>
                <div className={styles.dateField}>
                  <label className={styles.fieldLabel}>التاريخ الجديد</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => {
                      setNewDate(e.target.value);
                      if (error) setError("");
                    }}
                    className={styles.dateInput}
                    required
                  />
                </div>
                <div className={styles.timeField}>
                  <label className={styles.fieldLabel}>الوقت الجديد</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => {
                      setNewTime(e.target.value);
                      if (error) setError("");
                    }}
                    className={styles.timeInput}
                    required
                  />
                </div>
              </div>
            </div>
          )}
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
                {action === "postponed" ? "جاري التأجيل" : "جاري الإلغاء"}
              </>
            ) : action === "postponed" ? (
              <>
                <FaClock /> تأجيل الحصة
              </>
            ) : (
              <>
                <FaBan /> إلغاء الحصة
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostponeClassModal;
