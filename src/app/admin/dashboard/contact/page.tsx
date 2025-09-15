"use client";
import React, {
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  useContactContext,
  type ContactInfo,
} from "@/src/contexts/ContactContext";
import styles from "./contact.module.css";
import { FormField, ErrorDisplay } from "@/src/components/common/Modal";
import Button from "@/src/components/common/Button";

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

  const parseNumbers = (value: string): string[] => {
    const parts = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    return parts;
  };

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
    } catch {
      throw new Error("خطأ في تحميل بيانات التواصل");
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

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        await fetchContactData();
      } catch {
        setErrorMessage("خطأ في تحميل بيانات التواصل");
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

      try {
        await fetchContactData();
      } catch {
        setContact(payload);
        setPhoneInput(payload.phone.join(", "));
        setWhatsappInput(payload.whatsappNumber.join(", "));
      }

      setEditMode(false);
    } catch {
      setErrorMessage("خطأ في تحديث بيانات التواصل");
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
              حفظ التغييرات
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
              label="أرقام الهاتف (يمكن فصلها بـ , )"
              name="phone"
              value={phoneInput}
              onChange={(e) => handleChange(e, "phone")}
              disabled={!editMode || isSubmitting || isLoading}
            />

            <FormField
              label="واتساب (يمكن إدخال أكثر من رقم بـ , )"
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
