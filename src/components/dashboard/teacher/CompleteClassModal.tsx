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
  const [newMemorization, setNewMemorization] = useState<string[]>([""]);
  const [review, setReview] = useState<string[]>([""]);
  const [nextNewMemorization, setNextNewMemorization] = useState<string[]>([
    "",
  ]);
  const [nextReview, setNextReview] = useState<string[]>([""]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingData) {
      setRatingNew(existingData.ratingNew || 3);
      setRatingOld(existingData.ratingOld || 3);
      setAttended(existingData.attended);
      setNewMemorization(
        existingData.completed.newMemorization.length > 0
          ? existingData.completed.newMemorization
          : [""]
      );
      setReview(
        existingData.completed.review.length > 0
          ? existingData.completed.review
          : [""]
      );
      setNextNewMemorization(
        existingData.nextPrep.newMemorization.length > 0
          ? existingData.nextPrep.newMemorization
          : [""]
      );
      setNextReview(
        existingData.nextPrep.review.length > 0
          ? existingData.nextPrep.review
          : [""]
      );
      setNotes(existingData.notes);
    }
  }, [existingData]);

  const addField = (type: "new" | "review" | "nextNew" | "nextReview") => {
    if (type === "new") setNewMemorization([...newMemorization, ""]);
    if (type === "review") setReview([...review, ""]);
    if (type === "nextNew")
      setNextNewMemorization([...nextNewMemorization, ""]);
    if (type === "nextReview") setNextReview([...nextReview, ""]);
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
    value: string
  ) => {
    if (type === "new")
      setNewMemorization(
        Object.assign([...newMemorization], { [index]: value })
      );
    if (type === "review")
      setReview(Object.assign([...review], { [index]: value }));
    if (type === "nextNew")
      setNextNewMemorization(
        Object.assign([...nextNewMemorization], { [index]: value })
      );
    if (type === "nextReview")
      setNextReview(Object.assign([...nextReview], { [index]: value }));
  };

  const firstValidation = () => {
    let ok = true;
    const newErr = newMemorization.some((s) => s.trim() === "");
    const revErr = review.some((s) => s.trim() === "");
    setError((p) => ({
      ...p,
      new: newErr ? "هذا الحقل مطلوب" : "",
      review: revErr ? "هذا الحقل مطلوب" : "",
    }));
    ok = !(newErr || revErr) && ok;
    return ok;
  };

  const secondValidation = () => {
    let ok = true;
    const nextNewErr = nextNewMemorization.some((s) => s.trim() === "");
    const nextRevErr = nextReview.some((s) => s.trim() === "");
    setError((p) => ({
      ...p,
      nextNew: nextNewErr ? "هذا الحقل مطلوب" : "",
      nextReview: nextRevErr ? "هذا الحقل مطلوب" : "",
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
          new: nextNewMemorization.filter((s) => s.trim() !== ""),
          old: nextReview.filter((s) => s.trim() !== ""),
        },
        newMemorized: {
          ratingNew: ratingNew,
          new: newMemorization.filter((s) => s.trim() !== ""),
          ratingOld: ratingOld,
          old: review.filter((s) => s.trim() !== ""),
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
    fields: string[],
    type: "new" | "review" | "nextNew" | "nextReview",
    title: string
  ) => (
    <div className={styles.section}>
      <h4 className={styles.sectionTitle}>{title}</h4>
      {fields.map((field, index) => (
        <div key={`${type}-field-${index}`}>
          <div className={styles.fieldGroup}>
            <input
              type="text"
              value={field}
              onChange={(e) => updateField(type, index, e.target.value)}
              className={`${styles.textInput} ${
                error[type] && field.trim() === "" ? styles.inputError : ""
              }`}
              placeholder={`أدخل ${title} ${index + 1}`}
            />
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
          {error[type] && error[type].length > 0 && (
            <span className={styles.errorText}>{error[type]}</span>
          )}
        </div>
      ))}
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
