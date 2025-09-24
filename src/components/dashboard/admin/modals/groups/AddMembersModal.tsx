import { useState, useCallback, useEffect } from "react";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import { useGroupsContext } from "@/src/contexts/GroupsContext";
import { useStudentsContext } from "@/src/contexts/StudentsContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import styles from "./AddMembersModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  ErrorDisplay,
} from "@/src/components/common/Modal";
import { FaUserPlus, FaPlus, FaMinus, FaSave } from "react-icons/fa";
import Button from "@/src/components/common/Button";
import { User } from "@/src/types/auth.types";
import {
  MemberInput,
  AddMembersModalProps,
  MemberFormErrors,
} from "@/src/types/admin.types";

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

  const fetchStudents = useCallback(async () => {
    try {
      setLoadingStudents(true);

      const studentsData = await getStudents();

      const combinedStudents = studentsData.map((student: User) => ({
        id: student._id,
        name: student.name,
      }));
      setStudents(combinedStudents);
    } catch (error) {
      throw error;
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

    if (errorMessage) {
      setErrorMessage("");
    }

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
        if (memberInputs.length === 1) {
          newErrors[input.id] = "يجب اختيار طالب";
        }
      } else {
        hasValidInput = true;
      }
    });

    const filledInputs = memberInputs.filter(
      (input) => input.memberId.trim() !== ""
    );

    if (!hasValidInput) {
      setErrorMessage("يجب إضافة طالب واحد على الأقل");
      setFieldErrors(newErrors);
      return false;
    }

    if (groupType === "private" && filledInputs.length > 1) {
      setErrorMessage("الحلقة الفردية تقبل طالبًا واحدًا فقط");
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
      const filledInputs = memberInputs.filter(
        (input) => input.memberId.trim() !== ""
      );

      for (const input of filledInputs) {
        await addGroupMember(groupId, {
          memberId: input.memberId.trim(),
        });
      } // Refresh groups data after successful operation
      await getGroups();

      if (onSuccess) {
        onSuccess();
      }

      handleClose();
    } catch (error: unknown) {
      const errorObj = error as any;
      if (errorObj?.response?.data?.message) {
        setErrorMessage(errorObj.response.data.message);
      } else if (errorObj?.message) {
        setErrorMessage(errorObj.message);
      } else {
        setErrorMessage("خطأ في إضافة أعضاء الحلقة. يرجى المحاولة مرة أخرى");
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
    <ModalContainer
      isOpen={true}
      isClosing={isClosing}
      variant="add"
      onClose={handleClose}
    >
      <ModalHeader
        title="إضافة أعضاء للحلقة"
        icon={<FaUserPlus />}
        onClose={handleClose}
        isOpen={true}
        variant="add"
      />

      <div className={baseStyles.modalBody}>
        <div className={styles.groupInfo}>
          <h3 className={styles.groupName}>{groupName}</h3>
          <span className={styles.groupType}>
            {groupType === "private" ? "حلقة فردية" : "حلقة جماعية"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className={baseStyles.form}>
          <ErrorDisplay message={errorMessage} />

          <div className={styles.modalBody}>
            <div className={styles.instructionsBox}>
              <p className={styles.instructions}>
                {groupType === "private"
                  ? "يمكنك إضافة طالب واحد فقط للحلقة الفردية"
                  : "يمكنك إضافة عدة طلاب للحلقة الجماعية"}
              </p>
            </div>
            <div>
              <div className={styles.membersInputs}>
                {memberInputs.map((input, index) => (
                  <div key={input.id} className={baseStyles.inputGroup}>
                    <div className={styles.inputWrapper}>
                      <label className={baseStyles.label}>
                        رقم الطالب {index + 1}:
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
                            ? "جارٍ تحميل الطلاب..."
                            : "اختر طالبًا"}
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
                  إضافة طالب
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
