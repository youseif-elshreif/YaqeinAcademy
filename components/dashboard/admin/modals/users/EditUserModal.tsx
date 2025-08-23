"use client";

import { useEffect, useMemo, useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { UserFormData, UserType } from "@/utils/types";
import { CheckboxField } from "@/components/auth";
import CountrySelect from "@/components/auth/CountrySelect";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { FaSave, FaEdit } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  FormField,
  ModalActions,
  SelectedUserTypeHeader,
  ErrorDisplay,
} from "@/components/common/Modal";
import baseStyles from "../../../../../styles/BaseModal.module.css";

const EditUserModal = () => {
  const {
    editUserModalOpen,
    closeEditUserModal,
    selectedUserData,
    updateUser,
  } = useAdminModal();

  // Derive user type from selected user
  const currentUserType: UserType = useMemo(() => {
    if (!selectedUserData) return "student";
    if (
      selectedUserData.role === "admin" ||
      selectedUserData.userType === "admin"
    )
      return "admin";
    if (
      selectedUserData.role === "teacher" ||
      selectedUserData.userType === "teacher" ||
      selectedUserData.meetingLink
    )
      return "teacher";
    return "student";
  }, [selectedUserData]);

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

  // Populate form when modal opens
  useEffect(() => {
    if (editUserModalOpen && selectedUserData) {
      setFormData({
        name: selectedUserData.name || "",
        email: selectedUserData.email || "",
        password: "",
        phone: selectedUserData.phone || selectedUserData.phoneNumber || "",
        phoneNumber:
          selectedUserData.phoneNumber || selectedUserData.phone || "",
        country: selectedUserData.country || "",
        userType: currentUserType,
        age: selectedUserData.age || null,
        hasQuranMemorization: selectedUserData.hasQuranMemorization || false,
        numOfPartsofQuran: selectedUserData.numOfPartsofQuran || 0,
        quranLevel: selectedUserData.quranLevel || "",
        meetingLink: selectedUserData.meetingLink || "",
        quranMemorized: selectedUserData.quranMemorized || "",
        subject: selectedUserData.subject || "",
        bio: selectedUserData.bio || "",
        address: selectedUserData.address || "",
        privateCredits: selectedUserData.privateCredits || 0,
        publicCredits: selectedUserData.publicCredits || 0,
      });
      setHasQuranMemorization(selectedUserData.hasQuranMemorization || false);
      if (selectedUserData.countryCode) {
        setCountryCode(selectedUserData.countryCode as CountryCode);
      }
    }
  }, [editUserModalOpen, selectedUserData, currentUserType]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeEditUserModal();
      setIsClosing(false);
      setFieldErrors({});
      setServerError("");
      setShowPassword(false);
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
        if (value && value.length < 6)
          return "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
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
        if (currentUserType === "student") {
          const ageNum = parseInt(value);
          if (!value.trim()) return "العمر مطلوب";
          if (isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
            return "العمر يجب أن يكون بين 5 و 100 سنة";
          }
        }
        return "";
      case "meetingLink":
        if (currentUserType === "teacher" && value) {
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

    errors.name = validateField("name", formData.name);
    errors.email = validateField("email", formData.email);
    if (formData.password) {
      errors.password = validateField("password", formData.password);
    }
    errors.phone = validateField("phone", formData.phone || "");
    errors.country = validateField("country", formData.country);

    if (currentUserType === "teacher") {
      errors.meetingLink = validateField(
        "meetingLink",
        formData.meetingLink || ""
      );
    }
    if (currentUserType === "student") {
      errors.age = validateField("age", formData.age?.toString() || "");
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
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
        name === "privateCredits" ||
        name === "publicCredits"
          ? parseInt(value) || 0
          : type === "checkbox" && "checked" in e.target
          ? (e.target as HTMLInputElement).checked
          : value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const e = { ...prev };
        delete e[name];
        return e;
      });
    }
  };

  const handleCountryChange = (
    selectedCountry: string,
    selectedCountryCode: CountryCode
  ) => {
    setFormData((prev) => ({ ...prev, country: selectedCountry }));
    setCountryCode(selectedCountryCode);

    if (fieldErrors.country) {
      setFieldErrors((prev) => {
        const e = { ...prev };
        delete e.country;
        return e;
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
    setServerError("");

    if (!selectedUserData?.id) {
      setServerError("معرف المستخدم مفقود");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
      };
      if (formData.password) payload.password = formData.password;

      if (currentUserType === "teacher") {
        payload.meetingLink = formData.meetingLink;
        payload.subject = formData.subject;
        payload.bio = formData.bio;
      }
      if (currentUserType === "student") {
        payload.age = formData.age;
        payload.privateCredits = formData.privateCredits;
        payload.publicCredits = formData.publicCredits;
        payload.hasQuranMemorization = hasQuranMemorization;
        if (hasQuranMemorization) {
          payload.quranMemorized = formData.quranMemorized;
          payload.numOfPartsofQuran = formData.numOfPartsofQuran;
        }
      }

      await updateUser(selectedUserData.id, payload, currentUserType);
      handleClose();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "حدث خطأ أثناء التحديث";
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!editUserModalOpen) return null;

  const modalActions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: "حفظ التغييرات",
      onClick: () => {},
      variant: "primary" as const,
      disabled: isSubmitting,
      loading: isSubmitting,
      icon: <FaSave />,
      type: "submit" as const,
    },
  ];

  return (
    <ModalContainer
      isOpen={editUserModalOpen}
      isClosing={isClosing}
      variant="add"
      size="large"
    >
      <ModalHeader
        title={`تعديل بيانات ${
          currentUserType === "teacher"
            ? "مدرس"
            : currentUserType === "admin"
            ? "إدارة"
            : "طالب"
        }`}
        icon={<FaEdit />}
        onClose={handleClose}
        disabled={isSubmitting}
        variant="add"
      />

      <div className={baseStyles.modalBody}>
        <div className={baseStyles.userForm}>
          <SelectedUserTypeHeader
            userType={currentUserType}
            userName={formData.name}
            mode="edit"
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
                label="كلمة المرور الجديدة (اختياري)"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                error={fieldErrors.password}
                disabled={isSubmitting}
                placeholder="اتركه فارغاً إذا لم ترد تغييره"
                showPasswordToggle
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
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
              {currentUserType === "teacher" && (
                <>
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

                  <FormField
                    label="التخصص"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    placeholder="مثال: تحفيظ القرآن، التجويد..."
                  />

                  <FormField
                    label="نبذة عن المدرس"
                    name="bio"
                    type="textarea"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    placeholder="نبذة مختصرة عن المدرس وخبراته..."
                    rows={3}
                    fullWidth
                  />
                </>
              )}

              {/* Student Specific Fields */}
              {currentUserType === "student" && (
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

                  <FormField
                    label="الدروس الخاصة"
                    name="privateCredits"
                    type="number"
                    value={formData.privateCredits || 0}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    placeholder="عدد الدروس الخاصة المتاحة"
                    min="0"
                  />

                  <FormField
                    label="الدروس العامة"
                    name="publicCredits"
                    type="number"
                    value={formData.publicCredits || 0}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    placeholder="عدد الدروس العامة المتاحة"
                    min="0"
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
      </div>
    </ModalContainer>
  );
};

export default EditUserModal;
