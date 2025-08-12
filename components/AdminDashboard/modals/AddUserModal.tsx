import { useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { UserFormData, UserType } from "@/utils/types";
import { CheckboxField, ErrorMessage } from "@/components/auth";
import styles from "./AddUserModal.module.css";
import {
  FaTimes,
  FaSave,
  FaUserShield,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const AddUserModal = () => {
  const { selectedUserType, setUserType, saveNewUser, closeAddUserModal } =
    useAdminModal();

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    meetingLink: "",
    quranMemorized: "",
    numOfPartsofQuran: 0,
  });

  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasQuranMemorization, setHasQuranMemorization] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string>("");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeAddUserModal();
      setIsClosing(false);
      setFieldErrors({});
      setServerError("");
    }, 300);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "الاسم مطلوب";
        if (value.trim().length < 2) return "الاسم يجب أن يكون أكثر من حرف واحد";
        return "";
      case "email":
        if (!value.trim()) return "البريد الإلكتروني مطلوب";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "البريد الإلكتروني غير صحيح";
        return "";
      case "password":
        if (!value.trim()) return "كلمة المرور مطلوبة";
        if (value.length < 6) return "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
        return "";
      case "phone":
        if (!value.trim()) return "رقم الهاتف مطلوب";
        if (value.length < 10) return "رقم الهاتف غير صحيح";
        return "";
      case "meetingLink":
        if (selectedUserType === "teacher") {
          if (!value.trim()) return "رابط الاجتماع مطلوب";
          try {
            new URL(value);
            return "";
          } catch {
            return "رابط الاجتماع غير صحيح";
          }
        }
        return "";
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    
    // Validate common fields
    errors.name = validateField("name", formData.name);
    errors.email = validateField("email", formData.email);
    errors.password = validateField("password", formData.password);
    errors.phone = validateField("phone", formData.phone);
    
    // Validate teacher specific fields
    if (selectedUserType === "teacher") {
      errors.meetingLink = validateField("meetingLink", formData.meetingLink);
    }
    
    // Remove empty errors
    Object.keys(errors).forEach(key => {
      if (!errors[key]) delete errors[key];
    });
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    // Reset form when changing user type
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      meetingLink: "",
      quranMemorized: "",
      numOfPartsofQuran: 0,
    });
    // Reset Quran memorization checkbox
    setHasQuranMemorization(false);
    // Reset password visibility
    setShowPassword(false);
    // Reset errors
    setFieldErrors({});
    setServerError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numOfPartsofQuran" ? parseInt(value) || 0 : value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setHasQuranMemorization(checked);

    // Reset Quran fields when unchecked
    if (!checked) {
      setFormData((prev) => ({
        ...prev,
        quranMemorized: "",
        numOfPartsofQuran: 0,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserType) return;

    // Clear previous errors
    setServerError("");
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await saveNewUser(formData, selectedUserType);

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        meetingLink: "",
        quranMemorized: "",
        numOfPartsofQuran: 0,
      });
      setHasQuranMemorization(false);
      setShowPassword(false);
      setFieldErrors({});
      setServerError("");
    } catch (error: any) {
      console.error("❌ Error creating user:", error);
      // عرض رسالة الخطأ من السيرفر
      const errorMessage = error?.response?.data?.message || error?.message || "حدث خطأ أثناء إنشاء المستخدم";
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserTypeIcon = (type: UserType) => {
    switch (type) {
      case "admin":
        return <FaUserShield />;
      case "teacher":
        return <FaChalkboardTeacher />;
      case "student":
        return <FaGraduationCap />;
    }
  };

  const getUserTypeLabel = (type: UserType) => {
    switch (type) {
      case "admin":
        return "إدارة";
      case "teacher":
        return "مدرس";
      case "student":
        return "طالب";
    }
  };

  return (
    <div
      className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ""}`}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modalSlideOut : ""}`}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>إضافة مستخدم جديد</h2>
          <button
            onClick={handleClose}
            className={styles.closeBtn}
            disabled={isSubmitting}
          >
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          {!selectedUserType ? (
            // User Type Selection Screen
            <div className={styles.userTypeSelection}>
              <h3 className={styles.selectionTitle}>اختر نوع المستخدم</h3>
              <div className={styles.userTypeGrid}>
                <button
                  className={styles.userTypeButton}
                  onClick={() => handleUserTypeSelect("admin")}
                >
                  <FaUserShield className={styles.userTypeIcon} />
                  <span>إدارة</span>
                </button>
                <button
                  className={styles.userTypeButton}
                  onClick={() => handleUserTypeSelect("teacher")}
                >
                  <FaChalkboardTeacher className={styles.userTypeIcon} />
                  <span>مدرس</span>
                </button>
                <button
                  className={styles.userTypeButton}
                  onClick={() => handleUserTypeSelect("student")}
                >
                  <FaGraduationCap className={styles.userTypeIcon} />
                  <span>طالب</span>
                </button>
              </div>
            </div>
          ) : (
            // User Form Screen
            <div className={styles.userForm}>
              <div className={styles.selectedUserType}>
                {getUserTypeIcon(selectedUserType)}
                <span>إضافة {getUserTypeLabel(selectedUserType)} جديد</span>
                <button
                  onClick={() => setUserType(null)}
                  className={styles.changeTypeButton}
                  disabled={isSubmitting}
                >
                  تغيير النوع
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Server Error Display */}
                {serverError && (
                  <div className={styles.serverError}>
                    <ErrorMessage message={serverError} />
                  </div>
                )}

                <div className={styles.formGrid}>
                  {/* Common Fields */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>الاسم الكامل</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`${styles.formInput} ${fieldErrors.name ? styles.inputError : ""}`}
                      disabled={isSubmitting}
                    />
                    {fieldErrors.name && (
                      <div className={styles.fieldError}>{fieldErrors.name}</div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${styles.formInput} ${fieldErrors.email ? styles.inputError : ""}`}
                      disabled={isSubmitting}
                    />
                    {fieldErrors.email && (
                      <div className={styles.fieldError}>{fieldErrors.email}</div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>كلمة المرور</label>
                    <div className={styles.passwordInputWrapper}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`${styles.formInput} ${fieldErrors.password ? styles.inputError : ""}`}
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.passwordToggleBtn}
                        disabled={isSubmitting}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <div className={styles.fieldError}>{fieldErrors.password}</div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>رقم الهاتف</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`${styles.formInput} ${fieldErrors.phone ? styles.inputError : ""}`}
                      disabled={isSubmitting}
                    />
                    {fieldErrors.phone && (
                      <div className={styles.fieldError}>{fieldErrors.phone}</div>
                    )}
                  </div>

                  {/* Teacher Specific Fields */}
                  {selectedUserType === "teacher" && (
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>رابط الاجتماع</label>
                      <input
                        type="url"
                        name="meetingLink"
                        value={formData.meetingLink}
                        onChange={handleInputChange}
                        className={`${styles.formInput} ${fieldErrors.meetingLink ? styles.inputError : ""}`}
                        disabled={isSubmitting}
                      />
                      {fieldErrors.meetingLink && (
                        <div className={styles.fieldError}>{fieldErrors.meetingLink}</div>
                      )}
                    </div>
                  )}

                  {/* Student Specific Fields */}
                  {selectedUserType === "student" && (
                    <>
                      {/* Checkbox for Quran Memorization */}
                      <div
                        className={styles.formGroup}
                        style={{ gridColumn: "1 / -1" }}
                      >
                        <CheckboxField
                          id="hasQuranMemorization"
                          name="hasQuranMemorization"
                          checked={hasQuranMemorization}
                          onChange={handleCheckboxChange}
                          label="هل يحفظ من القرآن الكريم؟"
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Conditional Quran Fields */}
                      {hasQuranMemorization && (
                        <>
                          <div
                            className={`${styles.formGroup} ${styles.fadeIn}`}
                          >
                            <label className={styles.formLabel}>
                              القرآن المحفوظ
                            </label>
                            <input
                              type="text"
                              name="quranMemorized"
                              value={formData.quranMemorized}
                              onChange={handleInputChange}
                              className={styles.formInput}
                              placeholder="مثال: الفاتحة، البقرة..."
                              disabled={isSubmitting}
                            />
                          </div>

                          <div
                            className={`${styles.formGroup} ${styles.fadeIn}`}
                          >
                            <label className={styles.formLabel}>
                              عدد الأجزاء المحفوظة
                            </label>
                            <input
                              type="number"
                              name="numOfPartsofQuran"
                              value={formData.numOfPartsofQuran}
                              onChange={handleInputChange}
                              className={styles.formInput}
                              min="0"
                              max="30"
                              disabled={isSubmitting}
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={handleClose}
                    className={styles.cancelButton}
                    disabled={isSubmitting}
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner}></span>
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        حفظ المستخدم
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
