"use client";

import { useState } from "react";
import {
  AuthButton,
  AuthLayout,
  InputField,
  ErrorMessage,
  CheckboxField,
  TextareaField,
  withGuestProtection,
} from "@/components/auth";
import styles from "./register.module.css";
import { useAuth } from "@/contexts/AuthContext";
import CountrySelect from "@/components/auth/CountrySelect";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { RegisterFormData, RegisterFormErrors } from "@/utils/types";

const RegisterPage = () => {
  const { register } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: null,
    hasQuranMemorization: false,
    numOfPartsofQuran: 0,
    country: "",
    quranLevel: "",
  });

  const [countryCode, setCountryCode] = useState<CountryCode | "">("");
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    // استخدام type guard للتحقق من وجود checked
    const checked = "checked" in e.target ? e.target.checked : false;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof RegisterFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (name === "hasQuranMemorization" && !checked) {
      setFormData((prev) => ({
        ...prev,
        quranLevel: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: RegisterFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم الكامل مطلوب";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (
      !countryCode ||
      !isValidPhoneNumber(formData.phone, countryCode)
    ) {
      newErrors.phone = "رقم الهاتف غير صحيح بالنسبة للدولة المختارة";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتان";
    }

    if (!formData.age) {
      newErrors.age = "السن مطلوب";
    } else if (formData.age < 5 || formData.age > 100) {
      newErrors.age = "السن يجب أن يكون بين 5 و 100 سنة";
    }

    if (formData.hasQuranMemorization && !formData.quranLevel.trim()) {
      newErrors.quranLevel = "يرجى تحديد مستوى الحفظ";
    }

    if (!formData.country) {
      newErrors.country = "الدولة مطلوبة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await register({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        quranMemorized: formData.hasQuranMemorization ? "true" : "false",
        numOfPartsofQuran: formData.numOfPartsofQuran,
        country: formData.country,
        quranLevel: formData.quranLevel,
      });
    } catch {
      setErrors((prev) => ({
        ...prev,
        general: "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="إنشاء حساب جديد"
      subtitle="انضم إلى أكاديمية يقين للعلوم الشرعية"
      footerText="لديك حساب بالفعل؟"
      footerLinkText="تسجيل الدخول"
      footerLinkHref="/login"
      pageTitle="إنشاء حساب جديد - أكاديمية يقين"
      pageDescription="إنشاء حساب جديد للتسجيل في دورات أكاديمية يقين للعلوم الشرعية"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <ErrorMessage message={errors.general} type="error" />

        <InputField
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="أدخل اسمك الكامل"
          label="الاسم الكامل"
          required
          error={errors.name}
          disabled={isSubmitting}
        />

        <InputField
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="مثال: 01234567890"
          label="رقم الهاتف"
          required
          error={errors.phone}
          disabled={isSubmitting}
        />

        <CountrySelect
          onChange={(country, code) => {
            setFormData((prev) => ({ ...prev, country }));
            setCountryCode(code as CountryCode);
          }}
        />
        {errors.country && <p className={styles.errorText}>{errors.country}</p>}

        <InputField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="أدخل بريدك الإلكتروني"
          label="البريد الإلكتروني"
          required
          error={errors.email}
          disabled={isSubmitting}
          autoComplete="email"
        />

        <InputField
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          placeholder="أدخل كلمة المرور"
          label="كلمة المرور"
          required
          error={errors.password}
          disabled={isSubmitting}
          autoComplete="new-password"
          showPasswordToggle={true}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <InputField
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="أعد كتابة كلمة المرور"
          label="تأكيد كلمة المرور"
          required
          error={errors.confirmPassword}
          disabled={isSubmitting}
          autoComplete="new-password"
          showPasswordToggle={true}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <InputField
          id="age"
          name="age"
          type="number"
          value={formData.age || ""}
          onChange={handleInputChange}
          placeholder="أدخل سنك"
          label="السن"
          required
          error={errors.age}
          disabled={isSubmitting}
          min="5"
          max="100"
        />

        <CheckboxField
          id="hasQuranMemorization"
          name="hasQuranMemorization"
          checked={formData.hasQuranMemorization}
          onChange={handleInputChange}
          label="هل تحفظ من القرآن الكريم؟"
          disabled={isSubmitting}
        />

        {formData.hasQuranMemorization && (
          <TextareaField
            id="quranLevel"
            name="quranLevel"
            value={formData.quranLevel}
            onChange={handleInputChange}
            placeholder="اكتب ما تحفظه بالتفصيل..."
            label="مستوى الحفظ"
            required
            error={errors.quranLevel}
            disabled={isSubmitting}
            rows={4}
            helpText="(اكتب ما تحفظه بالتفصيل حتى لو كان من سور متفرقة – مثال: البقرة من 1 إلى 50، الكهف، جزء عم…)"
            className={styles.fadeIn}
          />
        )}

        <AuthButton
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          loadingText="جاري إنشاء الحساب..."
        >
          إنشاء حساب
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default withGuestProtection(RegisterPage);
