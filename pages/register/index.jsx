import { useState } from "react";
import {
  AuthLayout,
  InputField,
  AuthButton,
  ErrorMessage,
  CheckboxField,
  TextareaField,
  withGuestProtection,
} from "@/components/auth";
import styles from "./register.module.css";
import { useAuth } from "@/contexts/AuthContext";
import CountrySelect from "@/components/auth/CountrySelect";
import { isValidPhoneNumber } from "libphonenumber-js"; // ✅ تعديل: استيراد المكتبة

const RegisterPage = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: null,
    hasQuranMemorization: "",
    numOfPartsofQuran: 0,
    country: "",
    quranLevel: "",
  });

  const [countryCode, setCountryCode] = useState(""); // ✅ تعديل: تخزين كود الدولة المختارة
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
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
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "الاسم الكامل مطلوب";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "رقم الهاتف مطلوب";
    } else if (
      !isValidPhoneNumber(formData.phoneNumber, countryCode.toUpperCase()) // ✅ تعديل: التحقق حسب الدولة
    ) {
      newErrors.phoneNumber = "رقم الهاتف غير صحيح بالنسبة للدولة المختارة";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await register({
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        quranMemorized: formData.hasQuranMemorization,
        numOfPartsofQuran: 0,
        country: formData.country, // ✅ تعديل: إرسال الدولة للسيرفر
      });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general:
          error.message ||
          "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.",
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
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="أدخل اسمك الكامل"
          label="الاسم الكامل"
          required
          error={errors.fullName}
          disabled={isSubmitting}
        />

        <InputField
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="مثال: 01234567890"
          label="رقم الهاتف"
          required
          error={errors.phoneNumber}
          disabled={isSubmitting}
        />

        <CountrySelect
          value={formData.country}
          onChange={(country, code) => {
            setFormData((prev) => ({ ...prev, country })); // ✅ تعديل: حفظ اسم الدولة
            setCountryCode(code); // ✅ تعديل: حفظ كود الدولة
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
          value={formData.age}
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
