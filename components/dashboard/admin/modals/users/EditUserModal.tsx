import { useState, useEffect } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import { useAuth } from "@/contexts/AuthContext";
import { CheckboxField, ErrorMessage } from "@/components/auth";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import styles from "./EditUserModal.module.css";
import countries from "@/public/data/country.json";
import {
  FaTimes,
  FaSave,
  FaUserShield,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaEye,
  FaEyeSlash,
  FaEdit,
} from "react-icons/fa";

interface EditUserFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  quranMemorized?: string;
  numOfPartsofQuran?: number;
  PrivitelessonCredits?: number;
  age?: number;
  country?: string;
  meetingLink?: string; // For teachers
}

const EditUserModal: React.FC = () => {
  const { editUserModalOpen, closeEditUserModal, selectedUserData } =
    useAdminModal();
  const { updateTeacher, updateStudent, getTeachers, getStudents } =
    useAdminDashboardContext();
  const { token } = useAuth();

  const [formData, setFormData] = useState<EditUserFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    quranMemorized: "",
    numOfPartsofQuran: 0,
    PrivitelessonCredits: 0,
    age: 0,
    country: "",
    meetingLink: "",
  });

  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasQuranMemorization, setHasQuranMemorization] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string>("");

  // Determine user type from selected data
  const getUserType = () => {
    if (!selectedUserData) return null;

    // Check if it's from teacher table (has teacherInfo and userInfo)
    if (selectedUserData.teacherInfo && selectedUserData.userInfo) {
      return "teacher";
    }

    // Check if it's from student table or has student-specific fields
    if (
      selectedUserData.quranMemorized !== undefined ||
      selectedUserData.numOfPartsofQuran !== undefined ||
      selectedUserData.age !== undefined
    ) {
      return "student";
    }

    // Default fallback based on userType if available
    return selectedUserData.userType || "student";
  };

  const userType = getUserType();

  // Load initial data when modal opens
  useEffect(() => {
    if (editUserModalOpen && selectedUserData) {
      // Handle different data structures
      let userData;

      if (selectedUserData.teacherInfo && selectedUserData.userInfo) {
        // Teacher data from combined structure
        userData = {
          ...selectedUserData.userInfo,
          meetingLink: selectedUserData.teacherInfo.meetingLink,
        };
      } else if (selectedUserData.fullData) {
        // Data from fullData property
        userData = selectedUserData.fullData;
      } else {
        // Direct data
        userData = selectedUserData;
      }

      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        password: "", // Always empty for security
        phone: userData.phone || "",
        quranMemorized: userData.quranMemorized || "",
        numOfPartsofQuran: userData.numOfPartsofQuran || 0,
        PrivitelessonCredits: userData.PrivitelessonCredits || 0,
        age: userData.age || 0,
        country: userData.country || "",
        meetingLink: userData.meetingLink || "",
      });

      // Set Quran memorization checkbox state
      setHasQuranMemorization(!!userData.quranMemorized);

      // Reset states
      setShowPassword(false);
      setFieldErrors({});
      setServerError("");
      setIsClosing(false);
      setIsSubmitting(false);
    }
  }, [editUserModalOpen, selectedUserData]);

  if (!editUserModalOpen || !selectedUserData) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeEditUserModal();
      setIsClosing(false);
      setFieldErrors({});
      setServerError("");
    }, 300);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "الاسم مطلوب";
        if (value.trim().length < 2)
          return "الاسم يجب أن يكون أكثر من حرف واحد";
        return "";
      case "email":
        if (!value.trim()) return "البريد الإلكتروني مطلوب";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "البريد الإلكتروني غير صحيح";
        return "";
      case "phone":
        if (!value.trim()) return "رقم الهاتف مطلوب";
        if (value.length < 10) return "رقم الهاتف غير صحيح";
        return "";
      case "password":
        // Password is optional in edit mode
        if (value && value.length < 6)
          return "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
        return "";
      case "meetingLink":
        if (userType === "teacher" && value) {
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
    errors.phone = validateField("phone", formData.phone);

    // Validate password only if provided
    if (formData.password) {
      errors.password = validateField("password", formData.password);
    }

    // Validate teacher specific fields
    if (userType === "teacher" && formData.meetingLink) {
      errors.meetingLink = validateField("meetingLink", formData.meetingLink);
    }

    // Remove empty errors
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "numOfPartsofQuran" ||
        name === "PrivitelessonCredits" ||
        name === "age"
          ? parseInt(value) || 0
          : value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      country: value,
    }));
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

    // Clear previous errors
    setServerError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for submission
      const submitData: any = { ...formData };

      // Remove password if empty (don't update password)
      if (!submitData.password) {
        delete submitData.password;
      }

      // Get user ID
      let userId;
      if (selectedUserData.teacherInfo && selectedUserData.userInfo) {
        userId = selectedUserData.userInfo._id;
      } else if (selectedUserData.fullData) {
        userId = selectedUserData.fullData._id || selectedUserData.fullData.id;
      } else {
        userId = selectedUserData._id || selectedUserData.id;
      }

      if (!userId) {
        throw new Error("لم يتم العثور على معرف المستخدم");
      }

      // Call appropriate update function based on user type
      if (userType === "teacher") {
        // For teachers, prepare data with meetingLink
        const teacherData = {
          name: submitData.name,
          email: submitData.email,
          phone: submitData.phone,
          meetingLink: submitData.meetingLink,
          ...(submitData.password && { password: submitData.password }),
        };
        await updateTeacher(token!, userId, teacherData);
        await getTeachers(token!);
      } else {
        // For students, use all student-specific fields
        await updateStudent(token!, userId, submitData);
        await getStudents(token!);
      }

      // Close modal on success
      handleClose();
    } catch (error: any) {
      console.error("❌ Error updating user:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "حدث خطأ أثناء تحديث بيانات المستخدم";
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserTypeIcon = () => {
    switch (userType) {
      case "admin":
        return <FaUserShield />;
      case "teacher":
        return <FaChalkboardTeacher />;
      case "student":
        return <FaGraduationCap />;
      default:
        return <FaEdit />;
    }
  };

  const getUserTypeLabel = () => {
    switch (userType) {
      case "admin":
        return "الإدارة";
      case "teacher":
        return "المدرس";
      case "student":
        return "الطالب";
      default:
        return "المستخدم";
    }
  };

  return (
    <div
      className={`${baseStyles.modalOverlay} ${
        isClosing ? baseStyles.fadeOut : ""
      }`}
      onClick={handleClose}
    >
      <div
        className={`${baseStyles.modal} ${
          isClosing ? baseStyles.modalSlideOut : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={baseStyles.modalHeader}>
          <div className={baseStyles.modalTitle}>
            <FaEdit className={baseStyles.titleIcon} />
            تعديل بيانات {getUserTypeLabel()}
          </div>
          <button
            onClick={handleClose}
            className={baseStyles.closeButton}
            disabled={isSubmitting}
          >
            <FaTimes />
          </button>
        </div>

        <div className={baseStyles.modalBody}>
          <div className={styles.editUserContainer}>
            {/* User Type Indicator */}
            <div className={styles.userTypeIndicator}>
              {getUserTypeIcon()}
              <span>
                تعديل بيانات {getUserTypeLabel()}: {formData.name}
              </span>
            </div>

            <form onSubmit={handleSubmit} className={baseStyles.form}>
              {/* Server Error Display */}
              {serverError && (
                <div className={baseStyles.serverError}>
                  <ErrorMessage message={serverError} />
                </div>
              )}

              <div className={baseStyles.formGrid}>
                {/* Basic Information Section */}
                <div
                  className={styles.formSection}
                  style={{ gridColumn: "1 / -1" }}
                >
                  <h3 className={styles.sectionTitle}>المعلومات الأساسية</h3>
                </div>

                {/* Name */}
                <div className={baseStyles.inputGroup}>
                  <label className={baseStyles.label}>الاسم الكامل</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${baseStyles.textInput} ${
                      fieldErrors.name ? baseStyles.inputError : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.name && (
                    <div className={baseStyles.fieldError}>
                      {fieldErrors.name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className={baseStyles.inputGroup}>
                  <label className={baseStyles.label}>البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${baseStyles.textInput} ${
                      fieldErrors.email ? baseStyles.inputError : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.email && (
                    <div className={baseStyles.fieldError}>
                      {fieldErrors.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className={baseStyles.inputGroup}>
                  <label className={baseStyles.label}>
                    كلمة المرور الجديدة (اختيارية)
                  </label>
                  <div className={baseStyles.passwordInputWrapper}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`${baseStyles.textInput} ${
                        fieldErrors.password ? baseStyles.inputError : ""
                      }`}
                      placeholder="اتركها فارغة للاحتفاظ بكلمة المرور الحالية"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={baseStyles.passwordToggleBtn}
                      disabled={isSubmitting}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <div className={baseStyles.fieldError}>
                      {fieldErrors.password}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className={baseStyles.inputGroup}>
                  <label className={baseStyles.label}>رقم الهاتف</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`${baseStyles.textInput} ${
                      fieldErrors.phone ? baseStyles.inputError : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.phone && (
                    <div className={baseStyles.fieldError}>
                      {fieldErrors.phone}
                    </div>
                  )}
                </div>

                {/* Teacher Specific Fields */}
                {userType === "teacher" && (
                  <>
                    <div
                      className={styles.formSection}
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <h3 className={styles.sectionTitle}>معلومات المدرس</h3>
                    </div>

                    <div
                      className={baseStyles.inputGroup}
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <label className={baseStyles.label}>رابط الاجتماع</label>
                      <input
                        type="url"
                        name="meetingLink"
                        value={formData.meetingLink}
                        onChange={handleInputChange}
                        className={`${baseStyles.textInput} ${
                          fieldErrors.meetingLink ? baseStyles.inputError : ""
                        }`}
                        disabled={isSubmitting}
                      />
                      {fieldErrors.meetingLink && (
                        <div className={baseStyles.fieldError}>
                          {fieldErrors.meetingLink}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Student Specific Fields */}
                {userType === "student" && (
                  <>
                    <div
                      className={styles.formSection}
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <h3 className={styles.sectionTitle}>معلومات الطالب</h3>
                    </div>

                    {/* Age */}
                    <div className={baseStyles.inputGroup}>
                      <label className={baseStyles.label}>العمر</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className={baseStyles.textInput}
                        min="0"
                        max="100"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Country */}
                    <div className={baseStyles.inputGroup}>
                      <label className={baseStyles.label}>الدولة</label>
                      <select
                        name="country"
                        value={formData.country || ""}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className={baseStyles.textInput}
                        disabled={isSubmitting}
                      >
                        <option value="">اختر الدولة</option>
                        {Object.entries(countries).map(([code, name]) => (
                          <option key={code} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Private Lesson Credits */}
                    <div className={baseStyles.inputGroup}>
                      <label className={baseStyles.label}>
                        أرصدة الدروس الخاصة
                      </label>
                      <input
                        type="number"
                        name="PrivitelessonCredits"
                        value={formData.PrivitelessonCredits}
                        onChange={handleInputChange}
                        className={baseStyles.textInput}
                        min="0"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Checkbox for Quran Memorization */}
                    <div
                      className={baseStyles.inputGroup}
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
                      <div
                        className={styles.conditionalFields}
                        style={{ gridColumn: "1 / -1", display: "contents" }}
                      >
                        <div
                          className={`${baseStyles.inputGroup} ${baseStyles.fadeIn}`}
                        >
                          <label className={baseStyles.label}>
                            القرآن المحفوظ
                          </label>
                          <input
                            type="text"
                            name="quranMemorized"
                            value={formData.quranMemorized}
                            onChange={handleInputChange}
                            className={baseStyles.textInput}
                            placeholder="مثال: الفاتحة، البقرة..."
                            disabled={isSubmitting}
                          />
                        </div>

                        <div
                          className={`${baseStyles.inputGroup} ${baseStyles.fadeIn}`}
                        >
                          <label className={baseStyles.label}>
                            عدد الأجزاء المحفوظة
                          </label>
                          <input
                            type="number"
                            name="numOfPartsofQuran"
                            value={formData.numOfPartsofQuran}
                            onChange={handleInputChange}
                            className={baseStyles.textInput}
                            min="0"
                            max="30"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

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
                    <>
                      <span className={baseStyles.spinner}></span>
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      حفظ التعديلات
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
