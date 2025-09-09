import { useState, useEffect } from "react";
import styles from "./AddClassLinkModal.module.css";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  FormField,
  ErrorDisplay,
} from "@/components/common/Modal";
import { EditClassLinkModalProps } from "@/types";

const EditClassLinkModal = ({
  isOpen,
  onClose,
  onSubmit,
  classInfo,
}: EditClassLinkModalProps) => {
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Set the current link when modal opens
  useEffect(() => {
    if (isOpen && classInfo?.currentLink) {
      setLink(classInfo.currentLink);
    } else if (isOpen) {
      setLink("");
    }
  }, [isOpen, classInfo?.currentLink]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!link.trim()) {
      setError("يرجى إدخال رابط الحلقة");
      return;
    }

    // Basic URL validation
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(link.trim())) {
      setError("يرجى إدخال رابط صحيح");
      return;
    }

    setIsLoading(true);

    try {
      // Add http:// if not present
      let finalLink = link.trim();
      if (
        !finalLink.startsWith("http://") &&
        !finalLink.startsWith("https://")
      ) {
        finalLink = "https://" + finalLink;
      }

      await onSubmit(finalLink);
      onClose();
    } catch (error) {setError("حدث خطأ في تحديث الرابط");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen || !classInfo) return null;

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isLoading,
    },
    {
      label: isLoading ? "جاري التحديث..." : "تحديث الرابط",
      onClick: () => {},
      variant: "primary" as const,
      disabled: isLoading,
      loading: isLoading,
      icon: <FaExternalLinkAlt />,
      type: "submit" as const,
    },
  ];

  return (
    <ModalContainer isOpen={true} variant="add" onClose={handleClose}>
      <ModalHeader
        title="تعديل رابط الحلقة"
        icon={<FaExternalLinkAlt />}
        onClose={handleClose}
        disabled={isLoading}
        variant="add"
      />
      <div className={styles.modalBody}>
        <div className={styles.classInfo}>
          <h3 className={styles.classInfoTitle}>معلومات الحلقة:</h3>
          <div className={styles.classDetails}>
            <div className={styles.classDetail}>
              <span className={styles.label}>التاريخ:</span>
              <span className={styles.value}>{classInfo.date}</span>
            </div>
            <div className={styles.classDetail}>
              <span className={styles.label}>الوقت:</span>
              <span className={styles.value}>{classInfo.time}</span>
            </div>
            <div className={styles.classDetail}>
              <span className={styles.label}>
                {classInfo.groupName ? "الحلقة:" : "الطالب:"}
              </span>
              <span className={styles.value}>
                {classInfo.groupName || classInfo.studentName}
              </span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <FormField
              label="رابط الحلقة"
              name="classLink"
              type="url"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
                if (error) setError("");
              }}
              placeholder="https://zoom.us/j/1234567890 أو https://meet.google.com/xxx-yyyy-zzz"
              required
              disabled={isLoading}
              fullWidth
            />
            <ErrorDisplay message={error || undefined} />
            <p className={styles.helpText}>
              يمكنك إدخال رابط من Zoom، Google Meet، Microsoft Teams، أو أي منصة
              أخرى
            </p>
          </div>

          <ModalActions actions={actions} alignment="right" />
        </form>
      </div>
    </ModalContainer>
  );
};

export default EditClassLinkModal;

