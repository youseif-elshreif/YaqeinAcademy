import { useState } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import styles from "./AddMembersModal.module.css";
import {
  FaTimes,
  FaUserPlus,
  FaPlus,
  FaMinus,
  FaSave,
  FaExclamationTriangle,
} from "react-icons/fa";

interface AddMembersModalProps {
  groupId: string;
  groupName: string;
  groupType: "private" | "public";
  onSuccess?: () => void;
}

interface MemberInput {
  id: string;
  memberId: string;
}

interface MemberFormErrors {
  [key: string]: string; // Dynamic keys for member inputs
}

const AddMembersModal: React.FC<AddMembersModalProps> = ({
  groupId,
  groupName,
  groupType,
  onSuccess,
}) => {
  const { closeAddMembersModal } = useAdminModal();
  const { addGroupMember, getGroups } = useAdminDashboardContext();

  const [memberInputs, setMemberInputs] = useState<MemberInput[]>([
    { id: "1", memberId: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<MemberFormErrors>({});

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeAddMembersModal();
      setIsClosing(false);
    }, 300);
  };

  const handleInputChange = (id: string, value: string) => {
    setMemberInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, memberId: value } : input
      )
    );

    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }

    // Clear field-specific error
    if (fieldErrors[id]) {
      setFieldErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const addMemberInput = () => {
    const newId = Date.now().toString();
    setMemberInputs((prev) => [...prev, { id: newId, memberId: "" }]);
  };

  const removeMemberInput = (id: string) => {
    setMemberInputs((prev) => prev.filter((input) => input.id !== id));
  };

  const validateInputs = () => {
    const newErrors: MemberFormErrors = {};
    let hasValidInput = false;

    memberInputs.forEach((input) => {
      if (input.memberId.trim() === "") {
        // For empty fields, only show error if it's the only input
        if (memberInputs.length === 1) {
          newErrors[input.id] = "معرف العضو مطلوب";
        }
      } else {
        hasValidInput = true;
        // Validate member ID format if needed
        if (input.memberId.trim().length < 3) {
          newErrors[input.id] = "معرف العضو يجب أن يكون 3 أحرف على الأقل";
        }
      }
    });

    const filledInputs = memberInputs.filter(
      (input) => input.memberId.trim() !== ""
    );

    if (!hasValidInput) {
      setErrorMessage("يرجى إدخال معرف عضو واحد على الأقل");
      setFieldErrors(newErrors);
      return false;
    }

    if (groupType === "private" && filledInputs.length > 1) {
      setErrorMessage("الحلقات الخاصة تسمح بعضو واحد فقط");
      return false;
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setErrorMessage("لا يوجد رمز مصادقة. يرجى تسجيل الدخول مرة أخرى");
        return;
      }

      const filledInputs = memberInputs.filter(
        (input) => input.memberId.trim() !== ""
      );

      // Send separate requests for each member
      for (const input of filledInputs) {
        await addGroupMember(token, groupId, {
          memberId: input.memberId.trim(),
        });
      }

      console.log(
        `✅ Successfully added ${filledInputs.length} members to group`
      );

      // Refresh groups data after successful operation
      await getGroups(token);

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }

      handleClose();
    } catch (error: any) {
      console.error("❌ Error adding members:", error);

      // Handle different types of errors
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("حدث خطأ أثناء إضافة الأعضاء. يرجى المحاولة مرة أخرى");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${baseStyles.modalOverlay} ${
        isClosing ? baseStyles.fadeOut : ""
      }`}
    >
      <div
        className={`${baseStyles.modal} ${
          isClosing ? baseStyles.modalSlideOut : ""
        }`}
      >
        <div className={baseStyles.modalHeader}>
          <h2 className={baseStyles.modalTitle}>
            <FaUserPlus className={baseStyles.titleIcon} />
            إضافة أعضاء للحلقة
          </h2>
          <button
            onClick={handleClose}
            className={baseStyles.closeButton}
            disabled={isSubmitting}
          >
            <FaTimes />
          </button>
        </div>

        <div className={baseStyles.modalBody}>
          <div className={styles.groupInfo}>
            <h3 className={styles.groupName}>{groupName}</h3>
            <span className={styles.groupType}>
              {groupType === "private" ? "حلقة خاصة" : "حلقة عامة"}
            </span>
          </div>

          <form onSubmit={handleSubmit} className={baseStyles.form}>
            {errorMessage && (
              <div className={baseStyles.errorMessage}>
                <FaExclamationTriangle />
                {errorMessage}
              </div>
            )}

            <div className={styles.modalBody}>
              <div className={styles.instructionsBox}>
                <p className={styles.instructions}>
                  {groupType === "private"
                    ? "يمكنك إضافة عضو واحد فقط للحلقة الخاصة"
                    : "يمكنك إضافة عدة أعضاء للحلقة العامة"}
                </p>
              </div>

              <div className={styles.membersInputs}>
                {memberInputs.map((input, index) => (
                  <div key={input.id} className={baseStyles.inputGroup}>
                    <div className={styles.inputWrapper}>
                      <label className={baseStyles.label}>
                        معرف العضو {index + 1}:
                      </label>
                      <input
                        type="text"
                        value={input.memberId}
                        onChange={(e) =>
                          handleInputChange(input.id, e.target.value)
                        }
                        className={`${baseStyles.textInput} ${
                          fieldErrors[input.id] ? baseStyles.inputError : ""
                        }`}
                        placeholder="أدخل معرف العضو"
                        disabled={isSubmitting}
                      />
                      {fieldErrors[input.id] && (
                        <span className={baseStyles.errorText}>
                          {fieldErrors[input.id]}
                        </span>
                      )}
                    </div>

                    {memberInputs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMemberInput(input.id)}
                        className={styles.removeBtn}
                        disabled={isSubmitting}
                      >
                        <FaMinus />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {groupType === "public" && (
              <button
                type="button"
                onClick={addMemberInput}
                className={styles.addBtn}
                disabled={isSubmitting}
              >
                <FaPlus />
                إضافة عضو آخر
              </button>
            )}

            <div className={baseStyles.formActions}>
              <button
                type="button"
                onClick={handleClose}
                className={baseStyles.cancelButton}
                disabled={isSubmitting}
              >
                إلغاء
              </button>
              <button
                type="submit"
                className={`${baseStyles.submitButton}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className={styles.loading}>جارٍ الإضافة...</span>
                ) : (
                  <>
                    <FaSave />
                    إضافة الأعضاء
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMembersModal;
