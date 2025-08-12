import { useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { UserFormData, UserType } from "@/utils/types";
import { CheckboxField } from "@/components/auth";
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

// Helper function to prepare API data based on user type
const prepareUserApiData = (userData: UserFormData, userType: UserType) => {
  const baseData = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    phone: userData.phone,
  };

  switch (userType) {
    case "admin":
      return {
        apiEndpoint: "/api/admin/create",
        requestBody: baseData,
      };
    case "teacher":
      return {
        apiEndpoint: "/api/teachers/create",
        requestBody: {
          ...baseData,
          meetingLink: userData.meetingLink,
        },
      };
    case "student":
      return {
        apiEndpoint: "/api/students/create",
        requestBody: {
          ...baseData,
          quranMemorized: userData.quranMemorized,
          numOfPartsofQuran: userData.numOfPartsofQuran,
        },
      };
    default:
      throw new Error(`Unsupported user type: ${userType}`);
  }
};

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

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeAddUserModal();
      setIsClosing(false);
    }, 300);
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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numOfPartsofQuran" ? parseInt(value) || 0 : value,
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
    if (!selectedUserType) return;

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Prepare the data using our helper function
      const { apiEndpoint, requestBody } = prepareUserApiData(
        formData,
        selectedUserType
      );

      console.log("API Endpoint:", apiEndpoint);
      console.log("Request Body:", requestBody);

      saveNewUser(formData, selectedUserType);
    } catch (error) {
      console.error("❌ Error creating user:", error);
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
                <div className={styles.formGrid}>
                  {/* Common Fields */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>الاسم الكامل</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                      disabled={isSubmitting}
                    />
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
                      className={styles.formInput}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>كلمة المرور</label>
                    <div className={styles.passwordInputWrapper}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        required
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
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>رقم الهاتف</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                      disabled={isSubmitting}
                    />
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
                        className={styles.formInput}
                        disabled={isSubmitting}
                      />
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
