import { useState, useEffect, useCallback } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { useGroupsContext } from "@/contexts/GroupsContext";
import { useTeachersContext } from "@/contexts/TeachersContext";
import { useLessonsContext } from "@/contexts/LessonsContext";
import { createLessonSchedule } from "@/utils/date";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import styles from "./AddGroupModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  FormField,
  SelectField,
  ErrorDisplay,
} from "@/components/common/Modal";
import {
  FaSave,
  FaUsers,
  FaCalendarAlt,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import Button from "@/components/common/Button";

interface TimeSlot {
  day: string;
  time: string;
}

interface GroupFormData {
  name: string;
  description: string;
  type: "private" | "public";
  teacherId: string;
  meetingLink: string;
  timeSlots: TimeSlot[];
}

interface GroupFormErrors {
  name?: string;
  description?: string;
  teacherId?: string;
  meetingLink?: string;
  timeSlots?: string;
}

// removed local ErrorMessage in favor of shared ErrorDisplay

interface AddGroupModalProps {
  isEditMode?: boolean;
  editGroupId?: string;
}

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
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);

  // Load teachers data when component mounts
  const fetchTeachers = useCallback(async () => {
    try {
      setLoadingTeachers(true);
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const teachersData = await getTeachers(token);

      // Create teachers list with combined data
      const combinedTeachers = teachersData
        .filter(
          (teacher: any) => teacher.userId && typeof teacher.userId === "object"
        )
        .map((teacher: any) => ({
          id: teacher._id,
          name: teacher.userId.name,
        }));

      setTeachers(combinedTeachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoadingTeachers(false);
    }
  }, [getTeachers]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  // Load group data when in edit mode
  const fetchGroupData = useCallback(async () => {
    if (!isEditMode || !editGroupId) return;

    try {
      setIsLoading(true);
      setErrorMessage("");
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setErrorMessage("لا يوجد رمز مصادقة");
        return;
      }

      const groupsData = await getGroups(token);
      const targetGroup = groupsData.find((group) => group._id === editGroupId);

      if (targetGroup) {
        // تحويل البيانات إلى نموذج النموذج
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
    } catch (error: any) {
      console.error("Error fetching group data:", error);
      setErrorMessage("حدث خطأ أثناء جلب بيانات الحلقة");
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
      // Reset form data
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

      // Close the appropriate modal based on mode
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

    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }

    // Clear field-specific error
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

    // اسم الحلقة
    if (!formData.name.trim()) {
      newErrors.name = "اسم الحلقة مطلوب";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "اسم الحلقة يجب أن يكون 3 أحرف على الأقل";
    }

    // المدرس
    if (!formData.teacherId.trim()) {
      newErrors.teacherId = "يجب اختيار المدرس";
    }

    // الوصف (اختياري، لكن لو موجود يبقى أقل من 500 حرف)
    if (
      formData.description.trim() &&
      formData.description.trim().length > 500
    ) {
      newErrors.description = "الوصف يجب أن يكون أقل من 500 حرف";
    }

    // رابط الاجتماع
    if (!formData.meetingLink.trim()) {
      newErrors.meetingLink = "رابط الاجتماع مطلوب";
    } else if (!/^https?:\/\/.+/.test(formData.meetingLink)) {
      newErrors.meetingLink = "رابط الاجتماع يجب أن يبدأ بـ http أو https";
    }

    // المواعيد
    const firstTimeSlot = formData.timeSlots[0];
    if (!firstTimeSlot.day || !firstTimeSlot.time) {
      newErrors.timeSlots = "يجب إدخال موعد واحد على الأقل (اليوم والوقت)";
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to create lessons for the group
  const createGroupLessons = async (
    groupId: string,
    meetingLink: string,
    weekdays: string[],
    times: string[],
    token: string
  ) => {
    try {
      console.log("🔄 Creating lessons for group:", {
        groupId,
        weekdays,
        times,
      });

      // Generate lesson schedule using the date utility
      const schedule = createLessonSchedule(weekdays, times, meetingLink);

      console.log("📅 Generated schedule:", schedule);

      // Add each lesson to the group
      for (const lesson of schedule) {
        console.log("➕ Adding lesson:", lesson.scheduledAt);
        await addLessonToGroup(token, groupId, lesson);
      }

      console.log(
        `✅ Successfully created ${schedule.length} lessons for group ${groupId}`
      );
    } catch (error) {
      console.error("❌ Error creating group lessons:", error);
      // Don't throw error - group creation was successful, lesson creation is secondary
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
        setErrorMessage("لا يوجد رمز مصادقة. يرجى تسجيل الدخول مرة أخرى");
        return;
      }

      // Transform timeSlots to API format
      const usualDate: any = {};
      const weekdays: string[] = [];
      const times: string[] = [];

      formData.timeSlots.forEach((slot, index) => {
        if (slot.day && slot.time) {
          // For API compatibility (existing backend format)
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

          // For lesson scheduling (new format)
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
        // Edit existing group
        console.log("Updating group with data:", groupData);
        response = await updateGroup(token, editGroupId, groupData);
        console.log("Updated group response:", response);
      } else {
        // Create new group
        console.log("Creating group with data:", groupData);
        response = await createGroup(token, groupData);
        console.log("Created group response:", response);
      }

      // Refresh groups data after successful operation
      await getGroups(token);

      // For new groups, create lessons and open members modal
      if (!isEditMode) {
        // Create lessons for the new group
        if (weekdays.length > 0 && times.length > 0) {
          console.log("🔄 إنشاء الحصص للمجموعة الجديدة...");
          await createGroupLessons(
            response._id,
            formData.meetingLink,
            weekdays,
            times,
            token
          );
        } else {
          console.log("⚠️ لم يتم تحديد مواعيد للمجموعة - لن يتم إنشاء حصص");
        }

        // Close current modal
        handleClose();

        // Open members modal
        setTimeout(() => {
          openAddMembersModal({
            id: response._id,
            name: response.name,
            type: response.type,
          });
        }, 400);
      } else {
        // Just close modal for edit mode
        handleClose();
      }
    } catch (error: any) {
      console.error(
        `❌ Error ${isEditMode ? "updating" : "creating"} group:`,
        error
      );

      // Handle different types of errors
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          `حدث خطأ أثناء ${
            isEditMode ? "تحديث" : "إنشاء"
          } الحلقة. يرجى المحاولة مرة أخرى`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const daysOfWeek = [
    { value: "", label: "اختر اليوم" },
    { value: "السبت", label: "السبت" },
    { value: "الأحد", label: "الأحد" },
    { value: "الاثنين", label: "الاثنين" },
    { value: "الثلاثاء", label: "الثلاثاء" },
    { value: "الأربعاء", label: "الأربعاء" },
    { value: "الخميس", label: "الخميس" },
    { value: "الجمعة", label: "الجمعة" },
  ];

  const teacherOptions = [
    {
      value: "",
      label: loadingTeachers ? "جاري تحميل المدرسين..." : "اختر المدرس",
    },
    ...teachers.map((t: any) => ({ value: t.id, label: t.name })),
  ];

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: isEditMode ? "حفظ التعديلات" : "حفظ الحلقة",
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
    >
      <ModalHeader
        title={isEditMode ? "تعديل الحلقة" : "إضافة حلقة جديدة"}
        icon={<FaUsers />}
        onClose={handleClose}
        disabled={isSubmitting}
        variant="add"
      />

      <div className={baseStyles.modalBody}>
        {isLoading ? (
          <div className={styles.form}>
            <div className={baseStyles.formGrid}>
              {/* Skeleton for form fields */}
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
              
              <div className={baseStyles.inputGroup} style={{ gridColumn: "1 / -1" }}>
                <div className={styles.skeletonLabel}></div>
                <div className={styles.skeletonTextarea}></div>
              </div>
              
              <div className={baseStyles.inputGroup} style={{ gridColumn: "1 / -1" }}>
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
                placeholder="مثال: حلقة التأسيس"
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
                label="اختيار المدرس"
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
                label="الوصف"
                name="description"
                type="textarea"
                value={formData.description}
                onChange={handleInputChange}
                error={fieldErrors.description}
                disabled={isSubmitting}
                placeholder="وصف مختصر للحلقة"
                rows={3}
                fullWidth
              />

              <div
                className={baseStyles.inputGroup}
                style={{ gridColumn: "1 / -1" }}
              >
                <label className={baseStyles.label}>
                  <FaCalendarAlt className={styles.labelIcon} /> مواعيد الدروس
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
                    إضافة موعد آخر
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
