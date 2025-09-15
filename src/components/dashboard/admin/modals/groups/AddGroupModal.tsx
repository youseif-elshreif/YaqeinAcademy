import { useState, useEffect, useCallback } from "react";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import { useGroupsContext } from "@/src/contexts/GroupsContext";
import { useTeachersContext } from "@/src/contexts/TeachersContext";
import { useLessonsContext } from "@/src/contexts/LessonsContext";
import { createLessonSchedule } from "@/src/utils/date";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import styles from "./AddGroupModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  FormField,
  SelectField,
  ErrorDisplay,
} from "@/src/components/common/Modal";
import {
  FaSave,
  FaUsers,
  FaCalendarAlt,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import Button from "@/src/components/common/Button";
import {
  TimeSlot,
  GroupFormData,
  GroupFormErrors,
  AddGroupModalProps,
  TeacherOption,
  Teacher,
} from "@/src/types";

const AddGroupModal: React.FC<AddGroupModalProps> = ({
  isEditMode = false,
  editGroupId,
}) => {
  const { closeAddGroupModal, closeEditGroupModal, openAddMembersModal } =
    useAdminModal();
  const { createGroup, updateGroup, getGroups } = useGroupsContext();
  const { getTeachers } = useTeachersContext();
  const { addLessonToGroup } = useLessonsContext();

  const [formData, setFormData] = useState<GroupFormData>({
    name: "",
    description: "",
    type: "private",
    teacherId: "",
    meetingLink: "",
    timeSlots: [{ day: "", time: "" }],
  });

  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<GroupFormErrors>({});
  const [teachers, setTeachers] = useState<TeacherOption[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);

  const fetchTeachers = useCallback(async () => {
    try {
      setLoadingTeachers(true);
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const teachersData = await getTeachers(token);

      const combinedTeachers = teachersData
        .filter(
          (teacher: Teacher) =>
            teacher.userId && typeof teacher.userId === "object"
        )
        .map((teacher: Teacher) => ({
          id: teacher._id,
          name: typeof teacher.userId === "object" ? teacher.userId.name : "",
        }));

      setTeachers(combinedTeachers);
    } catch {
    } finally {
      setLoadingTeachers(false);
    }
  }, [getTeachers]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const fetchGroupData = useCallback(async () => {
    if (!isEditMode || !editGroupId) return;

    try {
      setIsLoading(true);
      setErrorMessage("");
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setErrorMessage("لم يتم العثور على التوقيع");
        return;
      }

      const groupsData = await getGroups(token);
      const targetGroup = groupsData.find((group) => group._id === editGroupId);

      if (targetGroup) {
        const timeSlots: TimeSlot[] = [];

        if (
          targetGroup.usualDate?.firstDay &&
          targetGroup.usualDate?.firstDayTime
        ) {
          timeSlots.push({
            day: targetGroup.usualDate.firstDay,
            time: targetGroup.usualDate.firstDayTime,
          });
        }
        if (
          targetGroup.usualDate?.secondDay &&
          targetGroup.usualDate?.secondDayTime
        ) {
          timeSlots.push({
            day: targetGroup.usualDate.secondDay,
            time: targetGroup.usualDate.secondDayTime,
          });
        }
        if (
          targetGroup.usualDate?.thirdDay &&
          targetGroup.usualDate?.thirdDayTime
        ) {
          timeSlots.push({
            day: targetGroup.usualDate.thirdDay,
            time: targetGroup.usualDate.thirdDayTime,
          });
        }

        if (timeSlots.length === 0) {
          timeSlots.push({ day: "", time: "" });
        }

        setFormData({
          name: targetGroup.name || "",
          description: targetGroup.description || "",
          type: targetGroup.type || "private",
          teacherId: targetGroup.teacherId?._id || "",
          meetingLink: targetGroup.meetingLink || "",
          timeSlots: timeSlots,
        });
      } else {
        setErrorMessage("لم يتم العثور على الحلقة");
      }
    } catch {
      setErrorMessage("خطأ في تحميل بيانات الحلقة");
    } finally {
      setIsLoading(false);
    }
  }, [getGroups, editGroupId, isEditMode]);

  useEffect(() => {
    fetchGroupData();
  }, [fetchGroupData]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setFormData({
        name: "",
        description: "",
        type: "private",
        teacherId: "",
        meetingLink: "",
        timeSlots: [{ day: "", time: "" }],
      });
      setErrorMessage("");
      setFieldErrors({});

      if (isEditMode) {
        closeEditGroupModal();
      } else {
        closeAddGroupModal();
      }
      setIsClosing(false);
    }, 300);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }

    if (fieldErrors[name as keyof GroupFormErrors]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleTimeSlotChange = (
    index: number,
    field: "day" | "time",
    value: string
  ) => {
    const newTimeSlots = [...formData.timeSlots];
    newTimeSlots[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      timeSlots: newTimeSlots,
    }));
  };

  const addTimeSlot = () => {
    if (formData.timeSlots.length < 3) {
      setFormData((prev) => ({
        ...prev,
        timeSlots: [...prev.timeSlots, { day: "", time: "" }],
      }));
    }
  };

  const removeTimeSlot = (index: number) => {
    if (formData.timeSlots.length > 1) {
      const newTimeSlots = formData.timeSlots.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        timeSlots: newTimeSlots,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: GroupFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "اسم الحلقة مطلوب";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "اسم الحلقة يجب أن يكون 3 أحرف على الأقل";
    }

    if (!formData.teacherId.trim()) {
      newErrors.teacherId = "يجب اختيار معلم";
    }

    if (
      formData.description.trim() &&
      formData.description.trim().length > 500
    ) {
      newErrors.description = "الوصف يجب أن يكون أقل من 500 حرف";
    }

    if (!formData.meetingLink.trim()) {
      newErrors.meetingLink = "رابط الاجتماع مطلوب";
    } else if (!/^https?:\/\/.+/.test(formData.meetingLink)) {
      newErrors.meetingLink = "رابط الاجتماع يجب أن يبدأ بـ http أو https";
    }

    const firstTimeSlot = formData.timeSlots[0];
    if (!firstTimeSlot.day || !firstTimeSlot.time) {
      newErrors.timeSlots = "يجب تحديد يوم ووقت على الأقل (الموعد الأول)";
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createGroupLessons = async (
    groupId: string,
    meetingLink: string,
    weekdays: string[],
    times: string[],
    token: string
  ) => {
    try {
      const schedule = createLessonSchedule(weekdays, times, meetingLink);

      for (const lesson of schedule) {
        await addLessonToGroup(token, groupId, lesson);
      }
    } catch (error: any) {
      // Log error but don't fail the group creation process
      console.warn("Failed to create lessons for group:", error);
      // Optionally, you could set a warning message
      throw new Error("تم إنشاء الحلقة بنجاح ولكن فشل في إضافة بعض الدروس");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(""); // Clear any previous errors

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setErrorMessage(
          "لم يتم العثور على التوقيع. يرجى تسجيل الدخول مرة أخرى"
        );
        return;
      }

      const usualDate: Record<string, string> = {};
      const weekdays: string[] = [];
      const times: string[] = [];

      formData.timeSlots.forEach((slot, index) => {
        if (slot.day && slot.time) {
          const dayKey =
            index === 0 ? "firstDay" : index === 1 ? "secondDay" : "thirdDay";
          const timeKey =
            index === 0
              ? "firstDayTime"
              : index === 1
              ? "secondDayTime"
              : "thirdDayTime";
          usualDate[dayKey] = slot.day;
          usualDate[timeKey] = slot.time;

          weekdays.push(slot.day);
          times.push(slot.time);
        }
      });

      const groupData = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        teacherId: formData.teacherId,
        meetingLink: formData.meetingLink,
        usualDate,
        weekdays, // Add for lesson scheduling
        times, // Add for lesson scheduling
      };

      let response;

      if (isEditMode && editGroupId) {
        response = await updateGroup(token, editGroupId, groupData);
      } else {
        response = await createGroup(token, groupData);
      }

      await getGroups(token);

      if (!isEditMode) {
        if (weekdays.length > 0 && times.length > 0) {
          await createGroupLessons(
            response._id,
            formData.meetingLink,
            weekdays,
            times,
            token
          );
        }

        handleClose();

        setTimeout(() => {
          openAddMembersModal({
            id: response._id,
            name: response.name,
            type: response.type,
          });
        }, 400);
      } else {
        handleClose();
      }
    } catch (error: unknown) {
      const errorObj = error as any;
      if (errorObj?.response?.data?.message) {
        setErrorMessage(errorObj.response.data.message);
      } else if (errorObj?.message) {
        setErrorMessage(errorObj.message);
      } else {
        setErrorMessage(
          `حدث خطأ أثناء ${
            isEditMode ? "التحديث" : "الإنشاء"
          } للحلقة. يرجى المحاولة مرة أخرى`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const daysOfWeek = [
    { value: "", label: "اختر اليوم" },
    { value: "الأحد", label: "الأحد" },
    { value: "الإثنين", label: "الإثنين" },
    { value: "الثلاثاء", label: "الثلاثاء" },
    { value: "الأربعاء", label: "الأربعاء" },
    { value: "الخميس", label: "الخميس" },
    { value: "الجمعة", label: "الجمعة" },
    { value: "السبت", label: "السبت" },
  ];

  const teacherOptions = [
    {
      value: "",
      label: loadingTeachers ? "جاري تحميل المعلمين..." : "اختر معلم",
    },
    ...teachers.map((t: TeacherOption) => ({ value: t.id, label: t.name })),
  ];

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: isEditMode ? "حفظ التغييرات" : "إنشاء الحلقة",
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
      size="large"
      onClose={handleClose}
    >
      <ModalHeader
        title={isEditMode ? "تعديل الحلقة" : "إنشاء حلقة جديدة"}
        icon={<FaUsers />}
        onClose={handleClose}
        isOpen={true}
        variant="add"
      />

      <div className={baseStyles.modalBody}>
        {isLoading ? (
          <div className={styles.form}>
            <div className={baseStyles.formGrid}>
              <div className={baseStyles.inputGroup}>
                <div className={styles.skeletonLabel}></div>
                <div className={styles.skeletonInput}></div>
              </div>

              <div className={baseStyles.inputGroup}>
                <div className={styles.skeletonLabel}></div>
                <div className={styles.skeletonInput}></div>
              </div>

              <div className={baseStyles.inputGroup}>
                <div className={styles.skeletonLabel}></div>
                <div className={styles.skeletonInput}></div>
              </div>

              <div className={baseStyles.inputGroup}>
                <div className={styles.skeletonLabel}></div>
                <div className={styles.skeletonInput}></div>
              </div>

              <div
                className={baseStyles.inputGroup}
                style={{ gridColumn: "1 / -1" }}
              >
                <div className={styles.skeletonLabel}></div>
                <div className={styles.skeletonTextarea}></div>
              </div>

              <div
                className={baseStyles.inputGroup}
                style={{ gridColumn: "1 / -1" }}
              >
                <div className={styles.skeletonLabel}></div>
                <div className={baseStyles.timeSlotRow}>
                  <div className={styles.skeletonSelect}></div>
                  <div className={styles.skeletonSelect}></div>
                </div>
                <div className={styles.skeletonButton}></div>
              </div>
            </div>

            <div className={styles.loadingMessage}>
              <div className={styles.loadingSpinner}></div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <ErrorDisplay message={errorMessage} />

            <div className={baseStyles.formGrid}>
              <FormField
                label="اسم الحلقة"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={fieldErrors.name}
                disabled={isSubmitting}
                placeholder="أدخل اسم الحلقة"
              />

              <SelectField
                label="نوع الحلقة"
                name="type"
                value={formData.type}
                onChange={handleInputChange as any}
                options={[
                  { value: "private", label: "خاصة" },
                  { value: "public", label: "عامة" },
                ]}
                disabled={isSubmitting}
              />

              <SelectField
                label="اسم المعلم"
                name="teacherId"
                value={formData.teacherId}
                onChange={handleInputChange as any}
                options={teacherOptions}
                disabled={isSubmitting || loadingTeachers}
                error={fieldErrors.teacherId}
              />

              <FormField
                label="رابط الاجتماع"
                name="meetingLink"
                type="url"
                value={formData.meetingLink}
                onChange={handleInputChange}
                error={fieldErrors.meetingLink}
                disabled={isSubmitting}
                placeholder="https://zoom.us/j/..."
              />

              <FormField
                label="وصف الحلقة"
                name="description"
                type="textarea"
                value={formData.description}
                onChange={handleInputChange}
                error={fieldErrors.description}
                disabled={isSubmitting}
                placeholder="أدخل وصف الحلقة (اختياري)"
                rows={3}
                fullWidth
              />

              <div
                className={baseStyles.inputGroup}
                style={{ gridColumn: "1 / -1" }}
              >
                <label className={baseStyles.label}>
                  <FaCalendarAlt className={styles.labelIcon} /> أوقات الحلقة
                </label>
                {formData.timeSlots.map((slot, index) => (
                  <div key={index} className={baseStyles.timeSlotRow}>
                    <select
                      value={slot.day}
                      onChange={(e) =>
                        handleTimeSlotChange(index, "day", e.target.value)
                      }
                      className={baseStyles.select}
                      disabled={isSubmitting}
                    >
                      {daysOfWeek.map((day) => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                    </select>

                    <input
                      type="time"
                      value={slot.time}
                      onChange={(e) =>
                        handleTimeSlotChange(index, "time", e.target.value)
                      }
                      className={baseStyles.textInput}
                      disabled={isSubmitting}
                    />

                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => removeTimeSlot(index)}
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

                {fieldErrors.timeSlots && (
                  <span className={styles.fieldError}>
                    {fieldErrors.timeSlots}
                  </span>
                )}

                {formData.timeSlots.length < 3 && (
                  <Button
                    type="button"
                    onClick={addTimeSlot}
                    variant="secondary"
                    icon={<FaPlus />}
                    disabled={isSubmitting}
                  >
                    إضافة وقت جديد
                  </Button>
                )}
              </div>
            </div>

            <ModalActions actions={actions} alignment="right" />
          </form>
        )}
      </div>
    </ModalContainer>
  );
};

export default AddGroupModal;
