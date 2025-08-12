import { useState, useEffect, useCallback } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import styles from "./AddGroupModal.module.css";
import {
  FaTimes,
  FaSave,
  FaUsers,
  FaCalendarAlt,
  FaLink,
  FaPlus,
  FaMinus,
  FaExclamationTriangle,
} from "react-icons/fa";

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

// Error Message Component
interface ErrorMessageProps {
  message?: string;
  type?: "error" | "success" | "info";
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = "error",
}) => {
  if (!message) return null;

  return (
    <div className={`${styles.errorMessage} ${styles[type]}`}>
      <span className={styles.errorIcon}>
        <FaExclamationTriangle />
      </span>
      <span className={styles.errorText}>{message}</span>
    </div>
  );
};

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
  const { createGroup, updateGroup, getGroups } = useAdminDashboardContext();

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
        setErrorMessage("لم يتم العثور على المجموعة");
      }
    } catch (error: any) {
      console.error("Error fetching group data:", error);
      setErrorMessage("حدث خطأ أثناء جلب بيانات المجموعة");
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

    // اسم المجموعة
    if (!formData.name.trim()) {
      newErrors.name = "اسم المجموعة مطلوب";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "اسم المجموعة يجب أن يكون 3 أحرف على الأقل";
    }

    // معرف المدرس
    if (!formData.teacherId.trim()) {
      newErrors.teacherId = "معرف المدرس مطلوب";
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

      // Close current modal
      handleClose();

      // For new groups, open members modal
      if (!isEditMode) {
        setTimeout(() => {
          openAddMembersModal({
            id: response._id,
            name: response.name,
            type: response.type,
          });
        }, 400);
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
          } المجموعة. يرجى المحاولة مرة أخرى`
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

  return (
    <div
      className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ""}`}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modalSlideOut : ""}`}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isEditMode ? "تعديل المجموعة" : "إضافة مجموعة جديدة"}
          </h2>
          <button
            onClick={handleClose}
            className={styles.closeBtn}
            disabled={isSubmitting}
          >
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>جاري تحميل بيانات المجموعة...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <ErrorMessage message={errorMessage} type="error" />

              <div className={styles.formGrid}>
                {/* اسم المجموعة */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaUsers className={styles.labelIcon} />
                    اسم المجموعة
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${
                      fieldErrors.name ? styles.inputError : ""
                    }`}
                    placeholder="مثال: مجموعة التأسيس"
                    disabled={isSubmitting}
                  />
                  {fieldErrors.name && (
                    <span className={styles.fieldError}>
                      {fieldErrors.name}
                    </span>
                  )}
                </div>

                {/* نوع المجموعة */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>نوع المجموعة</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    disabled={isSubmitting}
                  >
                    <option value="private">خاصة</option>
                    <option value="public">عامة</option>
                  </select>
                </div>

                {/* معرف المدرس */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>معرف المدرس</label>
                  <input
                    type="text"
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${
                      fieldErrors.teacherId ? styles.inputError : ""
                    }`}
                    placeholder="أدخل معرف المدرس"
                    disabled={isSubmitting}
                  />
                  {fieldErrors.teacherId && (
                    <span className={styles.fieldError}>
                      {fieldErrors.teacherId}
                    </span>
                  )}
                </div>

                {/* رابط الاجتماع */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaLink className={styles.labelIcon} />
                    رابط الاجتماع
                  </label>
                  <input
                    type="url"
                    name="meetingLink"
                    value={formData.meetingLink}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${
                      fieldErrors.meetingLink ? styles.inputError : ""
                    }`}
                    placeholder="https://zoom.us/j/..."
                    disabled={isSubmitting}
                  />
                  {fieldErrors.meetingLink && (
                    <span className={styles.fieldError}>
                      {fieldErrors.meetingLink}
                    </span>
                  )}
                </div>

                {/* الوصف */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>الوصف</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`${styles.formTextarea} ${
                      fieldErrors.description ? styles.inputError : ""
                    }`}
                    placeholder="وصف مختصر للمجموعة"
                    rows={3}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.description && (
                    <span className={styles.fieldError}>
                      {fieldErrors.description}
                    </span>
                  )}
                </div>

                {/* المواعيد */}
                <div
                  className={styles.formGroup}
                  style={{ gridColumn: "1 / -1" }}
                >
                  <label className={styles.formLabel}>
                    <FaCalendarAlt className={styles.labelIcon} />
                    مواعيد الدروس
                  </label>
                  {formData.timeSlots.map((slot, index) => (
                    <div key={index} className={styles.timeSlotContainer}>
                      <div className={styles.timeSlotInputs}>
                        <select
                          value={slot.day}
                          onChange={(e) =>
                            handleTimeSlotChange(index, "day", e.target.value)
                          }
                          className={styles.formInput}
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
                          className={styles.formInput}
                          disabled={isSubmitting}
                        />

                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeTimeSlot(index)}
                            className={styles.removeSlotBtn}
                            disabled={isSubmitting}
                          >
                            <FaMinus />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {formData.timeSlots.length < 3 && (
                    <button
                      type="button"
                      onClick={addTimeSlot}
                      className={styles.addSlotBtn}
                      disabled={isSubmitting}
                    >
                      <FaPlus /> إضافة موعد آخر
                    </button>
                  )}
                  {fieldErrors.timeSlots && (
                    <span className={styles.fieldError}>
                      {fieldErrors.timeSlots}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={handleClose}
                  className={styles.cancelButton}
                  disabled={isSubmitting}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className={styles.loading}>جارٍ الحفظ...</span>
                  ) : (
                    <>
                      <FaSave className={styles.btnIcon} />
                      {isEditMode ? "حفظ التعديلات" : "حفظ المجموعة"}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddGroupModal;
