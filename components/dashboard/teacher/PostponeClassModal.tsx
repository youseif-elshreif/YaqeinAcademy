import { useState } from "react";
import styles from "./PostponeClassModal.module.css";
import { FaClock, FaBan } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  FormField,
  ErrorDisplay,
} from "@/components/common/Modal";

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

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: isSubmitting
        ? action === "postponed"
          ? "جاري التأجيل"
          : "جاري الإلغاء"
        : action === "postponed"
        ? "تأجيل الحلقة"
        : "إلغاء الحلقة",
      onClick: () => {},
      variant: (action === "postponed" ? "primary" : "danger") as
        | "primary"
        | "danger", // only allowed values
      disabled: isSubmitting,
      icon: action === "postponed" ? <FaClock /> : <FaBan />,
      type: "submit" as const,
    },
  ];

  return (
    <ModalContainer
      isOpen={true}
      isClosing={isClosing}
      variant={action === "postponed" ? "edit" : "delete"}
    >
      <ModalHeader
        title="تأجيل أو إلغاء الحلقة"
        onClose={handleClose}
        disabled={isSubmitting}
        variant={action === "postponed" ? "edit" : "delete"}
      />
      <form id="postpone-class-form" onSubmit={handleSubmit}>
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
                <span className={styles.radioText}>⏰ تأجيل الحلقة</span>
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
                  <FaBan /> إلغاء الحلقة
                </span>
              </label>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              سبب {action === "postponed" ? "التأجيل" : "الإلغاء"}
            </h4>
            <FormField
              label={`أدخل سبب ${
                action === "postponed" ? "تأجيل" : "إلغاء"
              } الحلقة...`}
              name="reason"
              type="textarea"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError("");
              }}
              rows={4}
              required
              disabled={isSubmitting}
            />
            <ErrorDisplay message={error || undefined} />
          </div>

          {action === "postponed" && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>الميعاد الجديد</h4>
              <div className={styles.dateTimeContainer}>
                <FormField
                  label="التاريخ الجديد"
                  name="newDate"
                  type="date"
                  value={newDate}
                  onChange={(e) => {
                    setNewDate(e.target.value);
                    if (error) setError("");
                  }}
                  required
                  disabled={isSubmitting}
                />
                <FormField
                  label="الوقت الجديد"
                  name="newTime"
                  type="time"
                  value={newTime}
                  onChange={(e) => {
                    setNewTime(e.target.value);
                    if (error) setError("");
                  }}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
          )}
        </div>
        <ModalActions actions={actions} alignment="right" />
      </form>
    </ModalContainer>
  );
};

export default PostponeClassModal;
