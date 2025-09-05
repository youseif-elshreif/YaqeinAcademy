import { useState, useCallback, useEffect } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { useGroupsContext } from "@/contexts/GroupsContext";
import { useStudentsContext } from "@/contexts/StudentsContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import styles from "./AddMembersModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  ErrorDisplay,
} from "@/components/common/Modal";
import { FaUserPlus, FaPlus, FaMinus, FaSave } from "react-icons/fa";
import Button from "@/components/common/Button";

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
  const { addGroupMember, getGroups } = useGroupsContext();
  const { getStudents } = useStudentsContext();

  const [memberInputs, setMemberInputs] = useState<MemberInput[]>([
    { id: "1", memberId: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<MemberFormErrors>({});
  const [students, setStudents] = useState<Array<{ id: string; name: string }>>(
    []
  );
  const [loadingStudents, setLoadingStudents] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeAddMembersModal();
      setIsClosing(false);
    }, 300);
  };

  // Load students data when component mounts
  const fetchStudents = useCallback(async () => {
    try {
      setLoadingStudents(true);
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const studentsData = await getStudents(token);
      console.log("Raw students data:", studentsData);

      // studentsData is already an array of users with role: "student"
      // No need to filter or access .students property
      const combinedStudents = studentsData.map((student: any) => ({
        id: student._id,
        name: student.name,
      }));

      console.log("Combined students:", combinedStudents);
      setStudents(combinedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoadingStudents(false);
    }
  }, [getStudents]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

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
          newErrors[input.id] = "يجب اختيار طالب";
        }
      } else {
        hasValidInput = true;
        // No need for length validation since we're using select dropdown
      }
    });

    const filledInputs = memberInputs.filter(
      (input) => input.memberId.trim() !== ""
    );

    if (!hasValidInput) {
      setErrorMessage("يرجى اختيار طالب واحد على الأقل");
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

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: "إضافة الأعضاء",
      onClick: () => {},
      variant: "primary" as const,
      disabled: isSubmitting,
      icon: <FaSave />,
      type: "submit" as const,
    },
  ];

  return (
    <ModalContainer isOpen={true} isClosing={isClosing} variant="add">
      <ModalHeader
        title="إضافة أعضاء للحلقة"
        icon={<FaUserPlus />}
        onClose={handleClose}
        disabled={isSubmitting}
        variant="add"
      />

      <div className={baseStyles.modalBody}>
        <div className={styles.groupInfo}>
          <h3 className={styles.groupName}>{groupName}</h3>
          <span className={styles.groupType}>
            {groupType === "private" ? "حلقة خاصة" : "حلقة عامة"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className={baseStyles.form}>
          <ErrorDisplay message={errorMessage} />

          <div className={styles.modalBody}>
            <div className={styles.instructionsBox}>
              <p className={styles.instructions}>
                {groupType === "private"
                  ? "يمكنك إضافة طالب واحد فقط للحلقة الخاصة"
                  : "يمكنك إضافة عدة طلاب للحلقة العامة"}
              </p>
            </div>
            <div>
              <div className={styles.membersInputs}>
                {memberInputs.map((input, index) => (
                  <div key={input.id} className={baseStyles.inputGroup}>
                    <div className={styles.inputWrapper}>
                      <label className={baseStyles.label}>
                        اختيار الطالب {index + 1}:
                      </label>
                      <select
                        value={input.memberId}
                        onChange={(e) =>
                          handleInputChange(input.id, e.target.value)
                        }
                        className={`${baseStyles.select} ${
                          fieldErrors[input.id] ? baseStyles.inputError : ""
                        }`}
                        disabled={isSubmitting || loadingStudents}
                      >
                        <option value="">
                          {loadingStudents
                            ? "جاري تحميل الطلاب..."
                            : "اختر الطالب"}
                        </option>
                        {students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))}
                      </select>
                      {fieldErrors[input.id] && (
                        <span className={baseStyles.errorText}>
                          {fieldErrors[input.id]}
                        </span>
                      )}
                    </div>

                    {memberInputs.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeMemberInput(input.id)}
                        variant="danger"
                        size="small"
                        icon={<FaMinus />}
                        disabled={isSubmitting}
                      >
                        حذف
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {groupType === "public" && (
                <Button
                  type="button"
                  onClick={addMemberInput}
                  variant="secondary"
                  fullWidth
                  icon={<FaPlus />}
                  disabled={isSubmitting}
                >
                  إضافة طالب آخر
                </Button>
              )}
            </div>
          </div>

          <ModalActions actions={actions} alignment="right" />
        </form>
      </div>
    </ModalContainer>
  );
};

export default AddMembersModal;
