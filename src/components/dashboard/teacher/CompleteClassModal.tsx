import { useState, useEffect } from "react";
import styles from "./CompleteClassModal.module.css";
import { FaPlus, FaTimes } from "react-icons/fa";
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
import { quranSurahs, SurahRange, formatSurahRanges } from "@/src/utils/quranSurahs";

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
  const [attended, setAttended] = useState<boolean | null>(null);
  const [newMemorization, setNewMemorization] = useState<SurahRange[]>([
    { surah: "", fromVerse: 1, toVerse: 1 }
  ]);
  const [review, setReview] = useState<SurahRange[]>([
    { surah: "", fromVerse: 1, toVerse: 1 }
  ]);
  const [nextNewMemorization, setNextNewMemorization] = useState<SurahRange[]>([
    { surah: "", fromVerse: 1, toVerse: 1 }
  ]);
  const [nextReview, setNextReview] = useState<SurahRange[]>([
    { surah: "", fromVerse: 1, toVerse: 1 }
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
    if (type === "new") setNewMemorization([...newMemorization, newRange]);
    if (type === "review") setReview([...review, newRange]);
    if (type === "nextNew")
      setNextNewMemorization([...nextNewMemorization, newRange]);
    if (type === "nextReview") setNextReview([...nextReview, newRange]);
  };

  const removeField = (
    type: "new" | "review" | "nextNew" | "nextReview",
    index: number
  ) => {
    if (type === "new" && newMemorization.length > 1)
      setNewMemorization(newMemorization.filter((_, i) => i !== index));
    if (type === "review" && review.length > 1)
      setReview(review.filter((_, i) => i !== index));
    if (type === "nextNew" && nextNewMemorization.length > 1)
      setNextNewMemorization(nextNewMemorization.filter((_, i) => i !== index));
    if (type === "nextReview" && nextReview.length > 1)
      setNextReview(nextReview.filter((_, i) => i !== index));
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
    if (type === "nextNew") setNextNewMemorization(updateArray(nextNewMemorization));
    if (type === "nextReview") setNextReview(updateArray(nextReview));
  };

  const firstValidation = () => {
    let ok = true;
    const newErr = newMemorization.some((s) => !s.surah || s.surah.trim() === "");
    const revErr = review.some((s) => !s.surah || s.surah.trim() === "");
    setError((p) => ({
      ...p,
      new: newErr ? "يجب اختيار السورة" : "",
      review: revErr ? "يجب اختيار السورة" : "",
    }));
    ok = !(newErr || revErr) && ok;
    return ok;
  };

  const secondValidation = () => {
    let ok = true;
    const nextNewErr = nextNewMemorization.some((s) => !s.surah || s.surah.trim() === "");
    const nextRevErr = nextReview.some((s) => !s.surah || s.surah.trim() === "");
    setError((p) => ({
      ...p,
      nextNew: nextNewErr ? "يجب اختيار السورة" : "",
      nextReview: nextRevErr ? "يجب اختيار السورة" : "",
    }));
    ok = !(nextNewErr || nextRevErr) && ok;
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
      const payload = {
        studentId: student.id,
        attended: true,
        wantedForNextLesson: {
          new: formatSurahRanges(nextNewMemorization.filter((s) => s.surah && s.surah.trim() !== "")),
          old: formatSurahRanges(nextReview.filter((s) => s.surah && s.surah.trim() !== "")),
        },
        newMemorized: {
          ratingNew: ratingNew,
          new: formatSurahRanges(newMemorization.filter((s) => s.surah && s.surah.trim() !== "")),
          ratingOld: ratingOld,
          old: formatSurahRanges(review.filter((s) => s.surah && s.surah.trim() !== "")),
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
        const selectedSurah = quranSurahs.find(s => s.name === field.surah);
        const maxVerses = selectedSurah?.verses || 1;
        
        return (
          <div key={`${type}-field-${index}`}>
            <div className={styles.fieldGroup}>
              <div className={styles.surahFieldsContainer}>
                {/* السورة */}
                <div className={styles.surahField}>
                  <label className={styles.fieldLabel}>السورة</label>
                  <select
                    value={field.surah}
                    onChange={(e) => updateField(type, index, "surah", e.target.value)}
                    className={`${styles.selectInput} ${
                      error[type] && (!field.surah || field.surah.trim() === "") ? styles.inputError : ""
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
                    max={maxVerses}
                    value={field.fromVerse}
                    onChange={(e) => updateField(type, index, "fromVerse", parseInt(e.target.value) || 1)}
                    className={styles.numberInput}
                  />
                </div>

                {/* إلى */}
                <div className={styles.verseField}>
                  <label className={styles.fieldLabel}>إلى</label>
                  <input
                    type="number"
                    min={field.fromVerse}
                    max={maxVerses}
                    value={field.toVerse}
                    onChange={(e) => updateField(type, index, "toVerse", parseInt(e.target.value) || field.fromVerse)}
                    className={styles.numberInput}
                  />
                </div>
              </div>

              {fields.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeField(type, index)}
                  variant="danger"
                  size="small"
                  icon={<FaTimes />}
                >
                  حذف
                </Button>
              )}
            </div>
            {error[type] && error[type].length > 0 && (!field.surah || field.surah.trim() === "") && (
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
