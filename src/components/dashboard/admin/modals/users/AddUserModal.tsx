import { useState } from "react";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import { UserFormData } from "@/src/types/admin.types";
import { UserType } from "@/src/types/auth.types";
import { CheckboxField } from "@/src/components/auth";
import CountrySelect from "@/src/components/auth/CountrySelect";
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
} from "@/src/components/common/Modal";
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
    city: "",
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

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        phoneNumber: "",
        country: "",
        city: "",
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
          return "خطأ في تحديث الحلقة: الاسم يجب أن يكون على الأقل 2 حرف";
        return "";
      case "email":
        if (!value.trim()) return "البريد الإلكتروني مطلوب";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "البريد الإلكتروني غير صالح";
        return "";
      case "password":
        if (!value.trim()) return "كلمة المرور مطلوبة";
        if (value.length < 6) return "كلمة المرور يجب أن تكون على الأقل 6 أحرف";
        return "";
      case "phone":
        if (!value.trim()) return "رقم الهاتف مطلوب";
        if (!countryCode) return "يرجى اختيار رمز الدولة";
        if (!isValidPhoneNumber(value, countryCode)) {
          return "رقم الهاتف غير صالح";
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
            return "العمر يجب أن يكون بين 5 و 100";
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
            return "رابط الاجتماع غير صالح";
          }
        }
        return "";
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    errors.name = validateField("name", formData.name);
    errors.email = validateField("email", formData.email);
    errors.password = validateField("password", formData.password || "");
    errors.phone = validateField("phone", formData.phone || "");
    errors.country = validateField("country", formData.country);

    if (selectedUserType === "teacher") {
      errors.meetingLink = validateField(
        "meetingLink",
        formData.meetingLink || ""
      );
    }

    if (selectedUserType === "student") {
      errors.age = validateField("age", formData.age?.toString() || "");
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUserTypeSelect = (type: UserType) => {
    setSelectedUserType(type);

    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      phoneNumber: "",
      country: "",
      city: "",
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

    setServerError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await saveNewUser(formData, selectedUserType);

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        phoneNumber: "",
        country: "",
        city: "",
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
    } catch (error: unknown) {
      const errorObj = error as any;
      const errorMessage =
        errorObj?.response?.data?.message ||
        errorObj?.message ||
        `حدث خطأ غير متوقع`;
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!addUserModalOpen) {
    return null;
  }

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
      onClose={handleClose}
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
                <FormField
                  label="اسم المستخدم"
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
                  <label className={baseStyles.label}>
                    الدولة
                    <span className={baseStyles.required}>*</span>
                  </label>
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
                      ? `رقم الهاتف الدولي ${formData.country}`
                      : "رقم الهاتف"
                  }
                  required
                />

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

                    <div
                      className={baseStyles.inputGroup}
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <CheckboxField
                        id="hasQuranMemorization"
                        name="hasQuranMemorization"
                        checked={hasQuranMemorization}
                        onChange={handleCheckboxChange}
                        label="هل يحفظ القرآن الكريم؟"
                        disabled={isSubmitting}
                      />
                    </div>

                    {hasQuranMemorization && (
                      <>
                        <FormField
                          label="عدد الأجزاء المحفوظة"
                          name="quranMemorized"
                          value={formData.quranMemorized}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          placeholder="أدخل عدد الأجزاء المحفوظة..."
                        />

                        <FormField
                          label="عدد الأجزاء في القرآن"
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
