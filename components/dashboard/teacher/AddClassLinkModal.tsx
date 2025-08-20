import { useState, useEffect } from "react";
import styles from "./AddClassLinkModal.module.css";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";

interface EditClassLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (link: string) => void;
  classInfo: {
    id: number;
    date: string;
    time: string;
    studentName?: string;
    groupName?: string;
    currentLink?: string; // Add current link to props
  } | null;
}

const EditClassLinkModal = ({
  isOpen,
  onClose,
  onSubmit,
  classInfo,
}: EditClassLinkModalProps) => {
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      alert("يرجى إدخال رابط الحلقة");
      return;
    }

    // Basic URL validation
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(link.trim())) {
      alert("يرجى إدخال رابط صحيح");
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
    } catch (error) {
      console.error("Error updating link:", error);
      alert("حدث خطأ في تحديث الرابط");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen || !classInfo) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <FaExternalLinkAlt />
            تعديل رابط الحلقة
          </h2>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            type="button"
          >
            <FaTimes />
          </button>
        </div>

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
              <label htmlFor="classLink" className={styles.label}>
                رابط الحلقة:
              </label>
              <input
                id="classLink"
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://zoom.us/j/1234567890 أو https://meet.google.com/xxx-yyyy-zzz"
                className={styles.input}
                required
                disabled={isLoading}
              />
              <p className={styles.helpText}>
                يمكنك إدخال رابط من Zoom، Google Meet، Microsoft Teams، أو أي
                منصة أخرى
              </p>
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                onClick={handleClose}
                className={styles.cancelButton}
                disabled={isLoading}
              >
                إلغاء
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                <FaExternalLinkAlt />
                {isLoading ? "جاري التحديث..." : "تحديث الرابط"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClassLinkModal;
