import { useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import styles from "./ProfileSettings.module.css";
import { FormField, ErrorDisplay } from "@/src/components/common/Modal";
import Button from "../../common/Button";
import { ProfileUser, StudentDataProps } from "@/src/types";

const ProfileSettings = ({ studentData }: StudentDataProps) => {
  const { updateUserData } = useAuth();
  const [editState, setEditState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [student, setStudent] = useState<ProfileUser>({
    name: studentData.name,
    email: studentData.email,
    phone: studentData.phone,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editState) return;

    setIsSubmitting(true);

    try {
      await updateUserData(student);
      setEditState(false);
      setErrorMessage(null);
    } catch (error: any) {
      if (error.response.data.message === "Internal server error") {
        setErrorMessage("تأكد من ان البينات صحيحية و غير مكررة من قبل");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveChanges = () => {
    const form = document.querySelector("#profile-form") as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ProfileUser
  ) {
    setStudent({ ...student, [field]: e.target.value });
  }

  function handleEditBtn() {
    if (!editState) {
      setEditState(true);
    } else {
      setEditState(false);
      setStudent(studentData);
    }
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileEditeHeader}>
        <h3 className={styles.profileTitle}>الملف الشخصي</h3>
        <Button
          onClick={handleEditBtn}
          disabled={isSubmitting}
          loading={isSubmitting}
          variant={editState ? "secondary" : "primary"}
        >
          {editState ? "إلغاء التعديل" : "تعديل الملف الشخصي"}
        </Button>
      </div>

      <div className={styles.profileCard}>
        <form id="profile-form" onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            {errorMessage && <ErrorDisplay message={errorMessage} />}

            <FormField
              label="الاسم الكامل"
              name="name"
              type="text"
              value={student.name}
              onChange={(e) => handleInputChange(e as any, "name")}
              disabled={!editState || isSubmitting}
              required
            />

            <FormField
              label="البريد الإلكتروني"
              name="email"
              type="email"
              value={student.email}
              onChange={(e) => handleInputChange(e as any, "email")}
              disabled={!editState || isSubmitting}
              required
            />

            <FormField
              label="رقم الهاتف"
              name="phone"
              type="tel"
              value={student.phone}
              onChange={(e) => handleInputChange(e as any, "phone")}
              disabled={!editState || isSubmitting}
              required
            />
            {editState && (
              <Button
                type="submit"
                onClick={handleSaveChanges}
                disabled={isSubmitting}
                loading={isSubmitting}
                variant="primary"
              >
                حفظ التغييرات
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
