"use client";
import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import styles from "./contact.module.css";
import { FormField, ErrorDisplay } from "@/components/common/Modal";

interface ContactInfo {
  email: string;
  phone: string[];
  address: string;
  whatsappNumber: string[];
  telegramLink: string;
  facebook: string;
  linkedin: string;
}

export default function AdminContactPage() {
  const { token } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { getContactInfo, updateContactInfo } = useAdminDashboardContext();
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
      setContact((prev) => ({ ...prev, whatsappNumber: parseNumbers(value) }));
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
        if (!token) return;
        const raw = await getContactInfo(token);
        const data: any = (raw && (raw as any).data) || raw || {};
        const next: ContactInfo = {
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
        setContact(next);
        setPhoneInput(next.phone.join(", "));
        setWhatsappInput(next.whatsappNumber.join(", "));
      } catch (err: any) {
        setErrorMessage(err?.message || "حدث خطأ أثناء تحميل معلومات التواصل");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [getContactInfo, token]);

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
      await updateContactInfo(token, payload);
      setContact(payload);
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
            <button
              type="button"
              className={styles.saveButton}
              onClick={() => setEditMode(true)}
              disabled={isLoading}
            >
              تعديل
            </button>
          ) : (
            <button
              type="button"
              className={styles.saveButton}
              onClick={() => setEditMode(false)}
              disabled={isSubmitting}
            >
              إلغاء
            </button>
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
              name="whatsappNumber"
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
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  جاري الحفظ...
                </>
              ) : (
                "حفظ التغييرات"
              )}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
