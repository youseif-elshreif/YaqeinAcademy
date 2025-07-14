import { useState } from "react";
import Link from "next/link";
import {
  AuthLayout,
  InputField,
  AuthButton,
  ErrorMessage,
  CheckboxField,
  withGuestProtection,
} from "@/components/auth";
import styles from "./login.module.css";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
    } catch (e) {
      setErrors((prev) => ({
        ...prev,
        general: "ادخل البريد الالكتروني وكلمة المرور بشكل صحيح",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <AuthLayout
      title="تسجيل الدخول"
      subtitle="أهلاً بك مرة أخرى في أكاديمية يقين"
      footerText="ليس لديك حساب؟"
      footerLinkText="إنشاء حساب جديد"
      footerLinkHref="/register"
      pageTitle="تسجيل الدخول - أكاديمية يقين"
      pageDescription="تسجيل الدخول إلى حسابك في أكاديمية يقين للعلوم الشرعية"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <ErrorMessage message={errors.general} type="error" />

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
          value={formData.password}
          onChange={handleInputChange}
          placeholder="أدخل كلمة المرور"
          label="كلمة المرور"
          required
          error={errors.password}
          disabled={isSubmitting}
          autoComplete="current-password"
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={togglePasswordVisibility}
        />

        <div className={styles.options}>
          <CheckboxField
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
            label="تذكرني"
            disabled={isSubmitting}
            className={styles.rememberMe}
          />
          <Link href="/forgot-password" className={styles.forgotLink}>
            نسيت كلمة المرور؟
          </Link>
        </div>

        <AuthButton
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          loadingText="جاري تسجيل الدخول..."
        >
          تسجيل الدخول
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default withGuestProtection(LoginPage);
