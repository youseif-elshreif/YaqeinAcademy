import { useState, useEffect } from "react";
import styles from "./CompleteClassModal.module.css";
import { FaPlus } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
} from "@/src/components/common/Modal";
import { useTeacherDashboard } from "@/src/contexts/TeacherDashboardContext";
import { useLessonsContext } from "@/src/contexts/LessonsContext";
import Button from "@/src/components/common/Button";
import RatingComponent from "@/src/components/common/UI/RatingComponent/RatingComponent";
import { CompleteClassModalProps } from "@/src/types";
import {
  quranSurahs,
  SurahRange,
  formatSurahRanges,
} from "@/src/utils/quranSurahs";

export default function CompleteClassModal(props: CompleteClassModalProps) {
  const { lessonId, scheduledAt, student, groupName, onClose, existingData } =
    props;
  const { reportLesson } = useTeacherDashboard();
  const { completeLesson } = useLessonsContext();
  const [step, setStep] = useState(1);
  const [ratingNew, setRatingNew] = useState(3);
  const [ratingOld, setRatingOld] = useState(3);
  const [isClosing, setIsClosing] = useState(false);
  const [error, setError] = useState({
    new: "",
    review: "",
    nextNew: "",
    nextReview: "",
  });

  // Field-specific errors for verse validation
  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: {
      [index: number]: { fromVerse?: string; toVerse?: string };
    };
  }>({
    new: {},
    review: {},
    nextNew: {},
    nextReview: {},
  });

  // Free text mode toggles
  const [freeTextMode, setFreeTextMode] = useState<{
    [key: string]: { [index: number]: boolean };
  }>({
    new: {},
    review: {},
    nextNew: {},
    nextReview: {},
  });

  // Free text values
  const [freeTextValues, setFreeTextValues] = useState<{
    [key: string]: { [index: number]: string };
  }>({
    new: {},
    review: {},
    nextNew: {},
    nextReview: {},
  });
  const [attended, setAttended] = useState<boolean | null>(null);
  const [newMemorization, setNewMemorization] = useState<SurahRange[]>([
    { surah: "", fromVerse: 1, toVerse: 1 },
  ]);
  const [review, setReview] = useState<SurahRange[]>([
    { surah: "", fromVerse: 1, toVerse: 1 },
  ]);
  const [nextNewMemorization, setNextNewMemorization] = useState<SurahRange[]>([
    { surah: "", fromVerse: 1, toVerse: 1 },
  ]);
  const [nextReview, setNextReview] = useState<SurahRange[]>([
    { surah: "", fromVerse: 1, toVerse: 1 },
  ]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingData) {
      setRatingNew(existingData.ratingNew || 3);
      setRatingOld(existingData.ratingOld || 3);
      setAttended(existingData.attended);
      // Convert existing string data to SurahRange format if needed
      // For now, we'll initialize with empty ranges since we're changing the format
      setNewMemorization([{ surah: "", fromVerse: 1, toVerse: 1 }]);
      setReview([{ surah: "", fromVerse: 1, toVerse: 1 }]);
      setNextNewMemorization([{ surah: "", fromVerse: 1, toVerse: 1 }]);
      setNextReview([{ surah: "", fromVerse: 1, toVerse: 1 }]);
      setNotes(existingData.notes);
    }
  }, [existingData]);

  const addField = (type: "new" | "review" | "nextNew" | "nextReview") => {
    const newRange: SurahRange = { surah: "", fromVerse: 1, toVerse: 1 };

    // Get the current array to determine the new index
    const getCurrentArray = () => {
      switch (type) {
        case "new":
          return newMemorization;
        case "review":
          return review;
        case "nextNew":
          return nextNewMemorization;
        case "nextReview":
          return nextReview;
        default:
          return [];
      }
    };

    const currentArray = getCurrentArray();
    const newIndex = currentArray.length;

    // Add the new range to the appropriate array
    if (type === "new") setNewMemorization([...newMemorization, newRange]);
    if (type === "review") setReview([...review, newRange]);
    if (type === "nextNew")
      setNextNewMemorization([...nextNewMemorization, newRange]);
    if (type === "nextReview") setNextReview([...nextReview, newRange]);

    // Initialize the states for the new field
    setFreeTextMode((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [newIndex]: false,
      },
    }));

    setFreeTextValues((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [newIndex]: "",
      },
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [newIndex]: {},
      },
    }));
  };

  const removeField = (
    type: "new" | "review" | "nextNew" | "nextReview",
    index: number
  ) => {
    const getCurrentLength = () => {
      switch (type) {
        case "new":
          return newMemorization.length;
        case "review":
          return review.length;
        case "nextNew":
          return nextNewMemorization.length;
        case "nextReview":
          return nextReview.length;
        default:
          return 0;
      }
    };

    if (getCurrentLength() <= 1) return; // Don't remove if it's the last field

    // Remove from the appropriate array
    if (type === "new")
      setNewMemorization(newMemorization.filter((_, i) => i !== index));
    if (type === "review") setReview(review.filter((_, i) => i !== index));
    if (type === "nextNew")
      setNextNewMemorization(nextNewMemorization.filter((_, i) => i !== index));
    if (type === "nextReview")
      setNextReview(nextReview.filter((_, i) => i !== index));

    // Clean up states by removing the specific index and reindexing
    const cleanupState = (
      setState: React.Dispatch<React.SetStateAction<any>>
    ) => {
      setState((prev: any) => {
        const newState = { ...prev };
        const typeState = { ...newState[type] };

        // Remove the deleted index
        delete typeState[index];

        // Reindex remaining items
        const reindexed: any = {};
        let newIndex = 0;
        for (let i = 0; i < getCurrentLength(); i++) {
          if (i !== index && typeState[i] !== undefined) {
            reindexed[newIndex] = typeState[i];
            newIndex++;
          }
        }

        newState[type] = reindexed;
        return newState;
      });
    };

    cleanupState(setFreeTextMode);
    cleanupState(setFreeTextValues);
    cleanupState(setFieldErrors);
  };

  const validateVerse = (
    type: "new" | "review" | "nextNew" | "nextReview",
    index: number,
    field: "fromVerse" | "toVerse",
    value: number,
    surahName: string
  ) => {
    const surah = quranSurahs.find((s) => s.name === surahName);
    if (!surah) return;

    const maxVerses = surah.verses;
    let errorMessage = "";

    if (value < 1) {
      errorMessage = "رقم الآية يجب أن يكون أكبر من 0";
    } else if (value > maxVerses) {
      errorMessage = `رقم الآية يجب ألا يزيد عن ${maxVerses}`;
    }

    setFieldErrors((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [index]: {
          ...prev[type][index],
          [field]: errorMessage,
        },
      },
    }));
  };

  const updateField = (
    type: "new" | "review" | "nextNew" | "nextReview",
    index: number,
    field: keyof SurahRange,
    value: string | number
  ) => {
    const updateArray = (arr: SurahRange[]) => {
      const newArr = [...arr];
      newArr[index] = { ...newArr[index], [field]: value };
      return newArr;
    };

    if (type === "new") setNewMemorization(updateArray(newMemorization));
    if (type === "review") setReview(updateArray(review));
    if (type === "nextNew")
      setNextNewMemorization(updateArray(nextNewMemorization));
    if (type === "nextReview") setNextReview(updateArray(nextReview));

    // Validate verse numbers
    if (field === "fromVerse" || field === "toVerse") {
      const currentArray =
        type === "new"
          ? newMemorization
          : type === "review"
          ? review
          : type === "nextNew"
          ? nextNewMemorization
          : nextReview;
      const currentSurah = currentArray[index]?.surah;
      if (currentSurah && typeof value === "number") {
        validateVerse(type, index, field, value, currentSurah);
      }
    }

    // Clear verse errors when surah changes
    if (field === "surah") {
      setFieldErrors((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          [index]: {},
        },
      }));
    }
  };

  const toggleFreeTextMode = (
    type: "new" | "review" | "nextNew" | "nextReview",
    index: number
  ) => {
    setFreeTextMode((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [index]: !prev[type][index],
      },
    }));

    // Clear errors when toggling
    setFieldErrors((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [index]: {},
      },
    }));
  };

  const updateFreeText = (
    type: "new" | "review" | "nextNew" | "nextReview",
    index: number,
    value: string
  ) => {
    setFreeTextValues((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [index]: value,
      },
    }));
  };

  const firstValidation = () => {
    let ok = true;

    // Check new memorization
    const newErr = newMemorization.some((_, index) => {
      const isFreeText = freeTextMode.new?.[index];
      if (isFreeText) {
        return !freeTextValues.new?.[index]?.trim();
      }
      return (
        !newMemorization[index].surah ||
        newMemorization[index].surah.trim() === ""
      );
    });

    // Check review
    const revErr = review.some((_, index) => {
      const isFreeText = freeTextMode.review?.[index];
      if (isFreeText) {
        return !freeTextValues.review?.[index]?.trim();
      }
      return !review[index].surah || review[index].surah.trim() === "";
    });

    // Check for verse validation errors
    const hasVerseErrors =
      Object.values(fieldErrors.new).some((errors) =>
        Object.values(errors).some((error) => error)
      ) ||
      Object.values(fieldErrors.review).some((errors) =>
        Object.values(errors).some((error) => error)
      );

    setError((p) => ({
      ...p,
      new: newErr ? "يجب ملء هذا الحقل" : "",
      review: revErr ? "يجب ملء هذا الحقل" : "",
    }));

    ok = !(newErr || revErr || hasVerseErrors) && ok;
    return ok;
  };

  const secondValidation = () => {
    let ok = true;

    // Check next new memorization
    const nextNewErr = nextNewMemorization.some((_, index) => {
      const isFreeText = freeTextMode.nextNew?.[index];
      if (isFreeText) {
        return !freeTextValues.nextNew?.[index]?.trim();
      }
      return (
        !nextNewMemorization[index].surah ||
        nextNewMemorization[index].surah.trim() === ""
      );
    });

    // Check next review
    const nextRevErr = nextReview.some((_, index) => {
      const isFreeText = freeTextMode.nextReview?.[index];
      if (isFreeText) {
        return !freeTextValues.nextReview?.[index]?.trim();
      }
      return !nextReview[index].surah || nextReview[index].surah.trim() === "";
    });

    // Check for verse validation errors
    const hasVerseErrors =
      Object.values(fieldErrors.nextNew).some((errors) =>
        Object.values(errors).some((error) => error)
      ) ||
      Object.values(fieldErrors.nextReview).some((errors) =>
        Object.values(errors).some((error) => error)
      );

    setError((p) => ({
      ...p,
      nextNew: nextNewErr ? "يجب ملء هذا الحقل" : "",
      nextReview: nextRevErr ? "يجب ملء هذا الحقل" : "",
    }));

    ok = !(nextNewErr || nextRevErr || hasVerseErrors) && ok;
    return ok;
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 280);
  };

  const submitAbsent = async () => {
    if (props.mode === "single") {
      try {
        setIsSubmitting(true);
        await reportLesson(lessonId, {
          studentId: student.id,
          attended: false,
          wantedForNextLesson: { new: [], old: [] },
          newMemorized: {
            ratingNew: 0,
            new: [],
            ratingOld: 0,
            old: [],
          },
          notes: "",
          rating: 0,
        });
        await completeLesson(lessonId);
        handleClose();
      } finally {
        setIsSubmitting(false);
      }
    } else {
      props.onSave({
        ratingNew: 0,
        ratingOld: 0,
        completed: { newMemorization: [], review: [] },
        nextPrep: { newMemorization: [], review: [] },
        notes: "",
        attended: false,
      });
      handleClose();
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attended === null) return; // must choose
    if (attended === false) return; // handled by submitAbsent

    if (step === 1) {
      if (firstValidation()) setStep(2);
      return;
    }
    if (!secondValidation()) return;

    setIsSubmitting(true);
    try {
      // Helper function to get values (either formatted surah ranges or free text)
      const getFieldValues = (
        ranges: SurahRange[],
        type: "new" | "review" | "nextNew" | "nextReview"
      ): string[] => {
        return ranges
          .map((_, index) => {
            const isFreeText = freeTextMode[type]?.[index];
            if (isFreeText) {
              return freeTextValues[type]?.[index] || "";
            }
            return formatSurahRanges([ranges[index]])[0] || "";
          })
          .filter((value) => value.trim() !== "");
      };

      const payload = {
        studentId: student.id,
        attended: true,
        wantedForNextLesson: {
          new: getFieldValues(nextNewMemorization, "nextNew"),
          old: getFieldValues(nextReview, "nextReview"),
        },
        newMemorized: {
          ratingNew: ratingNew,
          new: getFieldValues(newMemorization, "new"),
          ratingOld: ratingOld,
          old: getFieldValues(review, "review"),
        },
        notes,
        rating: 0,
      };
      if (props.mode === "single") {
        await reportLesson(lessonId, payload);
        await completeLesson(lessonId);
      } else {
        props.onSave({
          ratingNew,
          ratingOld,
          completed: {
            newMemorization: payload.newMemorized.new,
            review: payload.newMemorized.old,
          },
          nextPrep: {
            newMemorization: payload.wantedForNextLesson.new,
            review: payload.wantedForNextLesson.old,
          },
          notes,
          attended: true,
        });
      }
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDynamicFields = (
    fields: SurahRange[],
    type: "new" | "review" | "nextNew" | "nextReview",
    title: string
  ) => (
    <div className={styles.section}>
      <h4 className={styles.sectionTitle}>{title}</h4>
      {fields.map((field, index) => {
        const selectedSurah = quranSurahs.find((s) => s.name === field.surah);
        const maxVerses = selectedSurah?.verses || 1;

        const isFreeText = freeTextMode[type]?.[index];
        const hasFieldErrors = fieldErrors[type]?.[index];

        return (
          <div key={`${type}-field-${index}`}>
            {/* Free text toggle */}
            <div className={styles.freeTextToggle}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={isFreeText || false}
                  onChange={() => toggleFreeTextMode(type, index)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>كتابة نص حر</span>
              </label>
            </div>

            <div className={styles.fieldGroup}>
              {isFreeText ? (
                <div className={styles.freeTextContainer}>
                  <input
                    type="text"
                    value={freeTextValues[type]?.[index] || ""}
                    onChange={(e) =>
                      updateFreeText(type, index, e.target.value)
                    }
                    className={`${styles.textInput} ${
                      error[type] && !freeTextValues[type]?.[index]?.trim()
                        ? styles.inputError
                        : ""
                    }`}
                    placeholder={`أدخل ${title} ${index + 1}`}
                  />
                </div>
              ) : (
                <div className={styles.surahFieldsContainer}>
                  {/* السورة */}
                  <div className={styles.surahField}>
                    <label className={styles.fieldLabel}>السورة</label>
                    <select
                      value={field.surah}
                      onChange={(e) =>
                        updateField(type, index, "surah", e.target.value)
                      }
                      className={`${styles.selectInput} ${
                        error[type] &&
                        (!field.surah || field.surah.trim() === "")
                          ? styles.inputError
                          : ""
                      }`}
                    >
                      <option value="">اختر السورة</option>
                      {quranSurahs.map((surah) => (
                        <option key={surah.number} value={surah.name}>
                          {surah.number}. {surah.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* من */}
                  <div className={styles.verseField}>
                    <label className={styles.fieldLabel}>من</label>
                    <input
                      type="number"
                      min="1"
                      value={field.fromVerse}
                      onChange={(e) =>
                        updateField(
                          type,
                          index,
                          "fromVerse",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className={`${styles.numberInput} ${
                        hasFieldErrors?.fromVerse ? styles.inputError : ""
                      }`}
                    />
                    {hasFieldErrors?.fromVerse && (
                      <span className={styles.verseErrorText}>
                        {hasFieldErrors.fromVerse}
                      </span>
                    )}
                  </div>

                  {/* إلى */}
                  <div className={styles.verseField}>
                    <label className={styles.fieldLabel}>إلى</label>
                    <input
                      type="number"
                      min={field.fromVerse}
                      value={field.toVerse}
                      onChange={(e) =>
                        updateField(
                          type,
                          index,
                          "toVerse",
                          parseInt(e.target.value) || field.fromVerse
                        )
                      }
                      className={`${styles.numberInput} ${
                        hasFieldErrors?.toVerse ? styles.inputError : ""
                      }`}
                    />
                    {hasFieldErrors?.toVerse && (
                      <span className={styles.verseErrorText}>
                        {hasFieldErrors.toVerse}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {fields.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeField(type, index)}
                  variant="danger"
                  size="small"
                >
                  <span style={{ color: "white" }}>حذف</span>
                </Button>
              )}
            </div>

            {/* Main field error */}
            {error[type] &&
              error[type].length > 0 &&
              ((isFreeText && !freeTextValues[type]?.[index]?.trim()) ||
                (!isFreeText &&
                  (!field.surah || field.surah.trim() === ""))) && (
                <span className={styles.errorText}>{error[type]}</span>
              )}
          </div>
        );
      })}
      <Button
        type="button"
        onClick={() => addField(type)}
        variant="secondary"
        icon={<FaPlus />}
      >
        إضافة حقل جديد
      </Button>
    </div>
  );

  const actions = (() => {
    if (attended === null) {
      return [
        {
          label: "إلغاء",
          onClick: handleClose,
          variant: "secondary" as const,
          disabled: isSubmitting,
        },
      ];
    }
    if (attended === false) {
      return [
        {
          label: "إلغاء",
          onClick: handleClose,
          variant: "secondary" as const,
          disabled: isSubmitting,
        },
        {
          label: "إرسال الغياب",
          onClick: submitAbsent,
          variant: "primary" as const,
          disabled: isSubmitting,
          loading: isSubmitting,
        },
      ];
    }
    if (step === 1) {
      return [
        {
          label: "إلغاء",
          onClick: handleClose,
          variant: "secondary" as const,
          disabled: isSubmitting,
        },
        {
          label: "التالي",
          onClick: () => {},
          type: "submit" as const,
          variant: "primary" as const,
          disabled: isSubmitting,
        },
      ];
    }
    return [
      {
        label: "إلغاء",
        onClick: handleClose,
        variant: "secondary" as const,
        disabled: isSubmitting,
      },
      {
        label: "السابق",
        onClick: handlePrev,
        type: "button" as const,
        variant: "secondary" as const,
        disabled: isSubmitting,
      },
      {
        label: props.mode === "single" ? "حفظ وإتمام" : "حفظ الطالب",
        onClick: () => {},
        type: "submit" as const,
        variant: "primary" as const,
        disabled: isSubmitting,
        loading: isSubmitting,
      },
    ];
  })();

  return (
    <ModalContainer
      isOpen={true}
      isClosing={isClosing}
      variant="add"
      onClose={handleClose}
    >
      <ModalHeader
        title={
          attended === null
            ? "حضور الطالب"
            : step === 1
            ? "إكمال الحلقة"
            : "تحديد المطلوب للحلقة القادمة"
        }
        onClose={handleClose}
        disabled={isSubmitting}
        variant="add"
      />
      <form
        id="complete-class-form"
        className={styles.modalBody}
        onSubmit={handleSubmit}
      >
        <div>
          <div className={styles.classInfo}>
            <p>
              <strong>الحلقة:</strong> {groupName || "حلقة"}
            </p>
            <p>
              <strong>الطالب:</strong> {student.name}
            </p>
            <p>
              <strong>الموعد:</strong>{" "}
              {new Date(scheduledAt).toLocaleString("ar-EG", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>

          {attended === null && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>هل حضر الطالب؟</h4>
              <div className={styles.attendButtons}>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setAttended(true)}
                >
                  نعم
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setAttended(false)}
                >
                  لا
                </Button>
              </div>
            </div>
          )}

          {attended !== null && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>حالة الحضور</h4>
              <div className={styles.attendanceStatus}>
                <div className={styles.attendanceInfo}>
                  <span
                    className={`${styles.statusBadge} ${
                      attended ? styles.statusPresent : styles.statusAbsent
                    }`}
                  >
                    {attended ? "حاضر" : "غائب"}
                  </span>
                  <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={() => setAttended(null)}
                    className={styles.editButton}
                  >
                    تعديل
                  </Button>
                </div>
              </div>
            </div>
          )}

          {attended === true && (
            <>
              {step === 1 ? (
                <div className={styles.stepContent}>
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>تقييم الحفظ الجديد</h4>
                    <RatingComponent
                      value={ratingNew}
                      onChange={setRatingNew}
                      label="تقييم الحفظ الجديد من 5:"
                      size="medium"
                    />
                  </div>
                  {renderDynamicFields(newMemorization, "new", "الحفظ الجديد")}

                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>تقييم المراجعة</h4>
                    <RatingComponent
                      value={ratingOld}
                      onChange={setRatingOld}
                      label="تقييم المراجعة من 5:"
                      size="medium"
                    />
                  </div>
                  {renderDynamicFields(review, "review", "المراجعة")}
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>ملاحظات إضافية</h4>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={styles.textarea}
                      placeholder="أدخل أي ملاحظات حول أداء الطالب..."
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    ما المطلوب تحضيره للحلقة القادمة؟
                  </h3>
                  {renderDynamicFields(
                    nextNewMemorization,
                    "nextNew",
                    "الحفظ الجديد المطلوب"
                  )}
                  {renderDynamicFields(
                    nextReview,
                    "nextReview",
                    "المراجعة المطلوبة"
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <ModalActions actions={actions} alignment="right" />
      </form>
    </ModalContainer>
  );
}
