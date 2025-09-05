"use client";
import React, {
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useContactContext, type ContactInfo } from "@/contexts/ContactContext";
import styles from "./contact.module.css";
import { FormField, ErrorDisplay } from "@/components/common/Modal";
import Button from "@/components/common/Button";

export default function AdminContactPage() {
  const { token } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { getContactInfo, updateContactInfo } = useContactContext();
  const [contact, setContact] = useState<ContactInfo>({
    email: "",
    phone: [""],
    address: "",
    whatsappNumber: [""],
    telegramLink: "",
    facebook: "",
    linkedin: "",
  });
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [whatsappInput, setWhatsappInput] = useState<string>("");

  // Helper to parse numbers with multiple delimiters: , ، - _
  const parseNumbers = (value: string): string[] => {
    // Arabic comma U+060C included
    const parts = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    return parts;
  };

  // دالة منفصلة لجلب البيانات
  const fetchContactData = useCallback(async () => {
    if (!token) return;
    try {
      const raw = await getContactInfo();
      const data: any = (raw && (raw as any).data) || raw || {};
      const contactData: ContactInfo = {
        email: data.email ?? "",
        phone: Array.isArray(data.phone) ? data.phone : [],
        address: data.address ?? "",
        whatsappNumber: Array.isArray(data.whatsappNumber)
          ? data.whatsappNumber
          : [],
        telegramLink: data.telegramLink ?? "",
        facebook: data.facebook ?? "",
        linkedin: data.linkedin ?? "",
      };
      setContact(contactData);
      setPhoneInput(contactData.phone.join(", "));
      setWhatsappInput(contactData.whatsappNumber.join(", "));
      return contactData;
    } catch (err: any) {
      throw new Error(err?.message || "حدث خطأ أثناء تحميل معلومات التواصل");
    }
  }, [token, getContactInfo]);

  type ContactField =
    | "email"
    | "phone"
    | "address"
    | "whatsappNumber"
    | "telegramLink"
    | "facebook"
    | "linkedin";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ContactField
  ) => {
    const { value } = e.target;
    if (field === "phone") {
      setPhoneInput(value);
      setContact((prev) => ({ ...prev, phone: parseNumbers(value) }));
      return;
    }
    if (field === "whatsappNumber") {
      setWhatsappInput(value);
      setContact((prev) => ({ ...prev, whatsapp: parseNumbers(value) }));
      return;
    }
    setContact((prev) => ({ ...prev, [field]: value } as ContactInfo));
  };

  // Fetch current contact info
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        await fetchContactData();
      } catch (err: any) {
        setErrorMessage(err?.message || "حدث خطأ أثناء تحميل معلومات التواصل");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [getContactInfo, token, fetchContactData]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const payload: ContactInfo = {
        email: contact.email || "",
        phone: parseNumbers(phoneInput),
        address: contact.address || "",
        whatsappNumber: parseNumbers(whatsappInput),
        telegramLink: contact.telegramLink || "",
        facebook: contact.facebook || "",
        linkedin: contact.linkedin || "",
      };
      await updateContactInfo(payload);

      // جلب البيانات المحدثة من السيرفر
      try {
        await fetchContactData();
      } catch {
        console.log("تم حفظ البيانات ولكن حدث خطأ في جلب البيانات المحدثة");
        // لا نعرض خطأ للمستخدم لأن التحديث تم بنجاح
        setContact(payload);
        setPhoneInput(payload.phone.join(", "));
        setWhatsappInput(payload.whatsappNumber.join(", "));
      }

      setEditMode(false);
    } catch (err: any) {
      setErrorMessage(err?.message || "حدث خطأ أثناء حفظ البيانات");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileEditeHeader}>
        <h2 className={styles.profileTitle}>معلومات التواصل</h2>
        <div>
          {!editMode ? (
            <Button
              type="button"
              variant="primary"
              onClick={() => setEditMode(true)}
              disabled={isLoading}
            >
              تعديل
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditMode(false)}
              disabled={isSubmitting}
            >
              إلغاء
            </Button>
          )}
        </div>
      </div>

      <div className={styles.profileCard}>
        {errorMessage && <ErrorDisplay message={errorMessage} />}
        <form onSubmit={onSubmit}>
          <div className={styles.formGrid}>
            <FormField
              label="البريد الإلكتروني"
              name="email"
              type="email"
              value={contact.email}
              onChange={(e) => handleChange(e, "email")}
              disabled={!editMode || isSubmitting || isLoading}
            />

            <FormField
              label="أرقام الهاتف (افصل بينها بـ , )"
              name="phone"
              value={phoneInput}
              onChange={(e) => handleChange(e, "phone")}
              disabled={!editMode || isSubmitting || isLoading}
            />

            <FormField
              label="واتساب (يمكن إضافة أكثر من رقم؛ افصل بينها بـ , )"
              name="whatsapp"
              value={whatsappInput}
              onChange={(e) => handleChange(e, "whatsappNumber")}
              disabled={!editMode || isSubmitting || isLoading}
            />

            <FormField
              label="رابط تليجرام"
              name="telegramLink"
              type="url"
              value={contact.telegramLink}
              onChange={(e) => handleChange(e, "telegramLink")}
              disabled={!editMode || isSubmitting || isLoading}
            />

            <FormField
              label="فيسبوك"
              name="facebook"
              type="url"
              value={contact.facebook}
              onChange={(e) => handleChange(e, "facebook")}
              disabled={!editMode || isSubmitting || isLoading}
            />

            <FormField
              label="لينكدإن"
              name="linkedin"
              type="url"
              value={contact.linkedin}
              onChange={(e) => handleChange(e, "linkedin")}
              disabled={!editMode || isSubmitting || isLoading}
            />

            <FormField
              label="العنوان"
              name="address"
              type="textarea"
              value={contact.address || ""}
              onChange={(e) => handleChange(e, "address")}
              disabled={!editMode || isSubmitting || isLoading}
              rows={3}
              fullWidth
            />
          </div>

          {editMode && !isLoading && (
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              حفظ التغييرات
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
