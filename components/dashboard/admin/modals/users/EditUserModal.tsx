import { useState, useEffect } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import {
  FaTimes,
  FaEdit,
  FaSave,
  FaUser,
  FaGraduationCap,
} from "react-icons/fa";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  // Student specific
  quranMemorized?: string;
  numOfPartsofQuran?: number;
  age?: number;
  // Teacher specific
  meetingLink?: string;
  pricePerClass?: number;
}

const EditUserModal: React.FC = () => {
  const { editUserModalOpen, closeEditUserModal, selectedUserData } =
    useAdminModal();

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize form with user data
  useEffect(() => {
    if (selectedUserData) {
      setFormData({
        name: selectedUserData.name || "",
        email: selectedUserData.email || "",
        phone: selectedUserData.phoneNumber || selectedUserData.phone || "",
        quranMemorized: selectedUserData.quranMemorized || "",
        numOfPartsofQuran: selectedUserData.numOfPartsofQuran || 0,
        age: selectedUserData.age || 0,
        meetingLink: selectedUserData.meetingLink || "",
        pricePerClass: selectedUserData.pricePerClass || 0,
      });
    }
  }, [selectedUserData]);

  if (!editUserModalOpen || !selectedUserData) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeEditUserModal();
      setIsClosing(false);
      setErrorMessage("");
    }, 300);
  };

  const handleInputChange = (
    field: keyof UserFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage("اسم المستخدم مطلوب");
      return false;
    }

    if (!formData.email.trim()) {
      setErrorMessage("البريد الإلكتروني مطلوب");
      return false;
    }

    if (!formData.phone.trim()) {
      setErrorMessage("رقم الهاتف مطلوب");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("البريد الإلكتروني غير صحيح");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API
      console.log("Updating user:", formData);

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("✅ User updated successfully");
      handleClose();
    } catch (error: any) {
      console.error("❌ Error updating user:", error);
      setErrorMessage("حدث خطأ أثناء تحديث البيانات. يرجى المحاولة مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStudent = selectedUserData.userType === "student";
  const isTeacher = selectedUserData.userType === "teacher";

  return (
    <div
      className={`${baseStyles.modalOverlay} ${
        isClosing ? baseStyles.fadeOut : ""
      }`}
    >
      <div
        className={`${baseStyles.modal} ${
          isClosing ? baseStyles.modalSlideOut : ""
        }`}
      >
        <div className={baseStyles.modalHeader}>
          <h2 className={baseStyles.modalTitle}>
            <FaEdit className={baseStyles.titleIcon} />
            تعديل بيانات {isStudent ? "الطالب" : "المعلم"}:{" "}
            {selectedUserData.name}
          </h2>
          <button
            onClick={handleClose}
            className={baseStyles.closeButton}
            disabled={isSubmitting}
          >
            <FaTimes />
          </button>
        </div>

        <div className={baseStyles.modalBody}>
          {errorMessage && (
            <div className={baseStyles.errorMessage}>
              <span className={baseStyles.errorText}>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={baseStyles.form}>
            {/* Basic Information */}
            <div className={baseStyles.section}>
              <h3 className={baseStyles.sectionTitle}>
                <FaUser className={baseStyles.sectionIcon} />
                المعلومات الأساسية
              </h3>

              <div className={baseStyles.inputGroup}>
                <label className={baseStyles.label}>الاسم الكامل:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={baseStyles.textInput}
                  placeholder="أدخل الاسم الكامل"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className={baseStyles.inputGroup}>
                <label className={baseStyles.label}>البريد الإلكتروني:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={baseStyles.textInput}
                  placeholder="أدخل البريد الإلكتروني"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className={baseStyles.inputGroup}>
                <label className={baseStyles.label}>رقم الهاتف:</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={baseStyles.textInput}
                  placeholder="أدخل رقم الهاتف"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            {/* Student Specific Fields */}
            {isStudent && (
              <div className={baseStyles.section}>
                <h3 className={baseStyles.sectionTitle}>
                  <FaGraduationCap className={baseStyles.sectionIcon} />
                  بيانات الطالب
                </h3>

                <div className={baseStyles.formRow}>
                  <div className={baseStyles.inputGroup}>
                    <label className={baseStyles.label}>العمر:</label>
                    <input
                      type="number"
                      value={formData.age || ""}
                      onChange={(e) =>
                        handleInputChange("age", parseInt(e.target.value) || 0)
                      }
                      className={baseStyles.textInput}
                      placeholder="أدخل العمر"
                      disabled={isSubmitting}
                      min="5"
                      max="100"
                    />
                  </div>

                  <div className={baseStyles.inputGroup}>
                    <label className={baseStyles.label}>
                      عدد الأجزاء المحفوظة:
                    </label>
                    <input
                      type="number"
                      value={formData.numOfPartsofQuran || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "numOfPartsofQuran",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className={baseStyles.textInput}
                      placeholder="عدد الأجزاء"
                      disabled={isSubmitting}
                      min="0"
                      max="30"
                    />
                  </div>
                </div>

                <div className={baseStyles.inputGroup}>
                  <label className={baseStyles.label}>مستوى الحفظ:</label>
                  <textarea
                    value={formData.quranMemorized || ""}
                    onChange={(e) =>
                      handleInputChange("quranMemorized", e.target.value)
                    }
                    className={baseStyles.textarea}
                    placeholder="اكتب تفاصيل مستوى الحفظ..."
                    disabled={isSubmitting}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Teacher Specific Fields */}
            {isTeacher && (
              <div className={baseStyles.section}>
                <h3 className={baseStyles.sectionTitle}>
                  <FaGraduationCap className={baseStyles.sectionIcon} />
                  بيانات المعلم
                </h3>

                <div className={baseStyles.inputGroup}>
                  <label className={baseStyles.label}>رابط الحصص:</label>
                  <input
                    type="url"
                    value={formData.meetingLink || ""}
                    onChange={(e) =>
                      handleInputChange("meetingLink", e.target.value)
                    }
                    className={baseStyles.textInput}
                    placeholder="أدخل رابط الحصص (Zoom, Meet, etc.)"
                    disabled={isSubmitting}
                  />
                </div>

                <div className={baseStyles.inputGroup}>
                  <label className={baseStyles.label}>
                    سعر الحصة (جنيه مصري):
                  </label>
                  <input
                    type="number"
                    value={formData.pricePerClass || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "pricePerClass",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className={baseStyles.textInput}
                    placeholder="أدخل سعر الحصة"
                    disabled={isSubmitting}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            )}

            <div className={baseStyles.formActions}>
              <button
                type="button"
                onClick={handleClose}
                className={baseStyles.cancelButton}
                disabled={isSubmitting}
              >
                إلغاء
              </button>
              <button
                type="submit"
                className={baseStyles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className={baseStyles.loading}>جارٍ التحديث...</span>
                ) : (
                  <>
                    <FaSave />
                    حفظ التغييرات
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
