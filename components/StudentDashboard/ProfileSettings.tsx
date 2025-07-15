import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./ProfileSettings.module.css";

interface User {
  email: string;
  name: string;
  phone: string;
}

interface StudentDataProps {
  studentData: User;
}

const ProfileSettings = ({ studentData }: StudentDataProps) => {
  const { updateUserData } = useAuth();
  const [editState, setEditState] = useState<boolean>(false);
  const [student, setStudent] = useState<User>({
    name: studentData.name,
    email: studentData.email,
    phone: studentData.phone,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editState) return;

    setIsSubmitting(true);

    try {
      console.log("📤 Submitting profile data:", student);
      updateUserData(student);
      setEditState(false);
    } catch (error) {
      console.error("❌ Profile update error:", error);
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
    field: keyof User
  ) {
    // const value = field === "age" ? Number(e.target.value) : e.target.value;
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
        <button
          className={styles.saveButton}
          style={{ marginTop: "0px" }}
          onClick={handleEditBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner}></span>
              جاري الحفظ
            </>
          ) : editState ? (
            "إلغاء التعديل"
          ) : (
            "تعديل الملف الشخصي"
          )}
        </button>
      </div>

      <div className={styles.profileCard}>
        <form id="profile-form" onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>الاسم الكامل</label>
              <input
                type="text"
                value={student.name}
                disabled={!editState || isSubmitting}
                className={`${styles.formInput} ${
                  (!editState || isSubmitting) && styles.disabledInput
                }`}
                onChange={(e) => handleInputChange(e, "name")}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>البريد الإلكتروني</label>
              <input
                type="email"
                value={student.email}
                disabled={!editState || isSubmitting}
                className={`${styles.formInput} ${
                  (!editState || isSubmitting) && styles.disabledInput
                }`}
                onChange={(e) => handleInputChange(e, "email")}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>رقم الهاتف</label>
              <input
                type="tel"
                value={student.phone}
                disabled={!editState || isSubmitting}
                className={`${styles.formInput} ${
                  (!editState || isSubmitting) && styles.disabledInput
                }`}
                onChange={(e) => handleInputChange(e, "phone")}
                required
              />
            </div>

            {/* <div className={styles.formGroup}>
              <label className={styles.formLabel}>السن</label>
              <input
                type="number"
                value={student.age}
                disabled={!editState || isSubmitting}
                className={`${styles.formInput} ${
                  (!editState || isSubmitting) && styles.disabledInput
                }`}
                onChange={(e) => handleInputChange(e, "age")}
                min="5"
                max="100"
                required
              />
            </div> */}

            {/* <div className={styles.formGroup}>
              <label className={styles.formLabel}>رقم الطالب</label>
              <input
                type="text"
                value={student.id}
                disabled
                className={`${styles.formInput} ${styles.disabledInput}`}
                onChange={(e) => handleInputChange(e, "id")}
                readOnly
              />
            </div> */}

            {editState && (
              <button
                type="submit"
                onClick={handleSaveChanges}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
