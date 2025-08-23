import { useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { UserFormData, UserType } from "@/utils/types";
import { CheckboxField } from "@/components/auth";
import CountrySelect from "@/components/auth/CountrySelect";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { FaSave, FaPlus } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  FormField,
  ModalActions,
  UserTypeSelector,
  SelectedUserTypeHeader,
  ErrorDisplay,
} from "@/components/common/Modal";
import baseStyles from "../../../../../styles/BaseModal.module.css";

const AddUserModal = () => {
  const { addUserModalOpen, saveNewUser, closeAddUserModal } = useAdminModal();

  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(
    null
  );

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    phoneNumber: "",
    country: "",
    userType: "student",
    age: null,
    hasQuranMemorization: false,
    numOfPartsofQuran: 0,
    quranLevel: "",
    meetingLink: "",
    quranMemorized: "",
    subject: "",
    bio: "",
    address: "",
    privateCredits: 0,
    publicCredits: 0,
  });

  const [countryCode, setCountryCode] = useState<CountryCode | "">("");
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
      setSelectedUserType(null);
      // Reset form data
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        phoneNumber: "",
        country: "",
        userType: "student",
        subject: "",
        bio: "",
        address: "",
        privateCredits: 0,
        publicCredits: 0,
        age: null,
        hasQuranMemorization: false,
        numOfPartsofQuran: 0,
        quranLevel: "",
        meetingLink: "",
        quranMemorized: "",
      });
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
      case "password":
        if (!value.trim()) return "كلمة المرور مطلوبة";
        if (value.length < 6) return "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
        return "";
      case "phone":
        if (!value.trim()) return "رقم الهاتف مطلوب";
        if (!countryCode) return "يرجى اختيار البلد أولاً";
        if (!isValidPhoneNumber(value, countryCode)) {
          return "رقم الهاتف غير صحيح لهذا البلد";
        }
        return "";
      case "country":
        if (!value.trim()) return "البلد مطلوب";
        return "";
      case "age":
        const ageNum = parseInt(value);
        if (selectedUserType === "student") {
          if (!value.trim()) return "العمر مطلوب";
          if (isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
            return "العمر يجب أن يكون بين 5 و 100 سنة";
          }
        }
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
    errors.password = validateField("password", formData.password || "");
    errors.phone = validateField("phone", formData.phone || "");
    errors.country = validateField("country", formData.country);

    // Validate teacher specific fields
    if (selectedUserType === "teacher") {
      errors.meetingLink = validateField(
        "meetingLink",
        formData.meetingLink || ""
      );
    }

    // Validate student specific fields
    if (selectedUserType === "student") {
      errors.age = validateField("age", formData.age?.toString() || "");
    }

    // Remove empty errors
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUserTypeSelect = (type: UserType) => {
    setSelectedUserType(type);
    // Reset form when changing user type
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      phoneNumber: "",
      country: "",
      userType: "student",
      age: null,
      hasQuranMemorization: false,
      numOfPartsofQuran: 0,
      quranLevel: "",
      meetingLink: "",
      quranMemorized: "",
      subject: "",
      bio: "",
      address: "",
      privateCredits: 0,
      publicCredits: 0,
    });
    // Reset Quran memorization checkbox
    setHasQuranMemorization(false);
    // Reset password visibility
    setShowPassword(false);
    // Reset errors
    setFieldErrors({});
    setServerError("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "numOfPartsofQuran" ||
        name === "age" ||
        name === "PrivitelessonCredits"
          ? parseInt(value) || 0
          : type === "checkbox" && "checked" in e.target
          ? (e.target as HTMLInputElement).checked
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

  const handleCountryChange = (
    selectedCountry: string,
    selectedCountryCode: CountryCode
  ) => {
    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
    }));
    setCountryCode(selectedCountryCode);

    // Clear country error
    if (fieldErrors.country) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.country;
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
      // Add mode - create new user
      await saveNewUser(formData, selectedUserType);

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        phoneNumber: "",
        country: "",
        userType: "student",
        age: null,
        hasQuranMemorization: false,
        numOfPartsofQuran: 0,
        quranLevel: "",
        meetingLink: "",
        quranMemorized: "",
        subject: "",
        bio: "",
        address: "",
        privateCredits: 0,
        publicCredits: 0,
      });
      setHasQuranMemorization(false);
      setShowPassword(false);
      setFieldErrors({});
      setServerError("");
    } catch (error: any) {
      console.error(`❌ Error creating user:`, error);
      // عرض رسالة الخطأ من السيرفر
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        `حدث خطأ أثناء إنشاء المستخدم`;
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only render if modal is open
  if (!addUserModalOpen) {
    return null;
  }

  // Modal actions configuration
  const modalActions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: "حفظ المستخدم",
      onClick: () => {}, // Will be handled by form submit
      variant: "primary" as const,
      disabled: isSubmitting,
      loading: isSubmitting,
      icon: <FaSave />,
      type: "submit" as const,
    },
  ];

  return (
    <ModalContainer
      isOpen={addUserModalOpen}
      isClosing={isClosing}
      variant="add"
      size="large"
    >
      <ModalHeader
        title="إضافة مستخدم جديد"
        icon={<FaPlus />}
        onClose={handleClose}
        disabled={isSubmitting}
        variant="add"
      />

      <div className={baseStyles.modalBody}>
        {!selectedUserType ? (
          <UserTypeSelector
            onSelect={handleUserTypeSelect}
            disabled={isSubmitting}
          />
        ) : (
          <div className={baseStyles.userForm}>
            <SelectedUserTypeHeader
              userType={selectedUserType}
              mode="add"
              onChangeType={() => setSelectedUserType(null)}
              disabled={isSubmitting}
            />

            <form onSubmit={handleSubmit} className={baseStyles.form}>
              <ErrorDisplay message={serverError} />

              <div className={baseStyles.formGrid}>
                {/* Common Fields */}
                <FormField
                  label="الاسم الكامل"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={fieldErrors.name}
                  disabled={isSubmitting}
                  required
                />

                <FormField
                  label="البريد الإلكتروني"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={fieldErrors.email}
                  disabled={isSubmitting}
                  required
                />

                <FormField
                  label="كلمة المرور"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={fieldErrors.password}
                  disabled={isSubmitting}
                  placeholder="أدخل كلمة المرور"
                  showPasswordToggle
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  required
                />

                <div className={baseStyles.inputGroup}>
                  <label className={baseStyles.label}>البلد</label>
                  <CountrySelect onChange={handleCountryChange} />
                  {fieldErrors.country && (
                    <div className={baseStyles.fieldError}>
                      {fieldErrors.country}
                    </div>
                  )}
                </div>

                <FormField
                  label="رقم الهاتف"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={fieldErrors.phone}
                  disabled={isSubmitting}
                  placeholder={
                    countryCode
                      ? `مثال للرقم في ${formData.country}`
                      : "اختر البلد أولاً"
                  }
                  required
                />

                {/* Teacher Specific Fields */}
                {selectedUserType === "teacher" && (
                  <FormField
                    label="رابط الاجتماع"
                    name="meetingLink"
                    type="url"
                    value={formData.meetingLink}
                    onChange={handleInputChange}
                    error={fieldErrors.meetingLink}
                    disabled={isSubmitting}
                    required
                  />
                )}

                {/* Student Specific Fields */}
                {selectedUserType === "student" && (
                  <>
                    <FormField
                      label="العمر"
                      name="age"
                      type="number"
                      value={formData.age || ""}
                      onChange={handleInputChange}
                      error={fieldErrors.age}
                      disabled={isSubmitting}
                      placeholder="أدخل العمر"
                      min="5"
                      max="100"
                      required
                    />

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
                      <>
                        <FormField
                          label="القرآن المحفوظ"
                          name="quranMemorized"
                          value={formData.quranMemorized}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          placeholder="مثال: الفاتحة، البقرة..."
                        />

                        <FormField
                          label="عدد الأجزاء المحفوظة"
                          name="numOfPartsofQuran"
                          type="number"
                          value={formData.numOfPartsofQuran}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          min="0"
                          max="30"
                        />
                      </>
                    )}
                  </>
                )}
              </div>

              <ModalActions actions={modalActions} />
            </form>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default AddUserModal;
