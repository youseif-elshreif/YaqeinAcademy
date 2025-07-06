import { useState } from "react";
import styles from "./CompleteClassModal.module.css";
import { FaTimes, FaPlus } from "react-icons/fa";

interface ClassData {
  id: number;
  studentName: string;
  date: string;
  time: string;
}

interface CompletionData {
  rate: number;
  completed: {
    newMemorization: string[];
    review: string[];
  };
  nextPrep: {
    newMemorization: string[];
    review: string[];
  };
  notes: string;
}

interface CompleteClassModalProps {
  classData: ClassData;
  initialData?: CompletionData; // البيانات المحفوظة للطالب
  isGroup?: boolean; // 🎯 إضافة الـ flag ده
  onSave: (completionData: CompletionData) => void;
  onClose: () => void;
}

const CompleteClassModal = ({
  classData,
  initialData, // البيانات المحفوظة
  isGroup = false, // 🎯 Default false للـ single students
  onSave,
  onClose,
}: CompleteClassModalProps) => {
  const [step, setStep] = useState(1);
  const [rate, setrate] = useState(initialData?.rate || 7);
  const [isClosing, setIsClosing] = useState(false);
  const [error, setError] = useState({
    new: "",
    review: "",
    nextNew: "",
    nextReview: "",
  });
  const [newMemorization, setNewMemorization] = useState(
    initialData?.completed?.newMemorization || [""]
  );
  const [review, setReview] = useState(initialData?.completed?.review || [""]);
  const [nextNewMemorization, setNextNewMemorization] = useState(
    initialData?.nextPrep?.newMemorization || [""]
  );
  const [nextReview, setNextReview] = useState(
    initialData?.nextPrep?.review || [""]
  );
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addField = (type: "new" | "review" | "nextNew" | "nextReview") => {
    switch (type) {
      case "new":
        setNewMemorization([...newMemorization, ""]);
        break;
      case "review":
        setReview([...review, ""]);
        break;
      case "nextNew":
        setNextNewMemorization([...nextNewMemorization, ""]);
        break;
      case "nextReview":
        setNextReview([...nextReview, ""]);
        break;
    }
  };

  const removeField = (
    type: "new" | "review" | "nextNew" | "nextReview",
    index: number
  ) => {
    switch (type) {
      case "new":
        if (newMemorization.length > 1) {
          setNewMemorization(newMemorization.filter((_, i) => i !== index));
        }
        break;
      case "review":
        if (review.length > 1) {
          setReview(review.filter((_, i) => i !== index));
        }
        break;
      case "nextNew":
        if (nextNewMemorization.length > 1) {
          setNextNewMemorization(
            nextNewMemorization.filter((_, i) => i !== index)
          );
        }
        break;
      case "nextReview":
        if (nextReview.length > 1) {
          setNextReview(nextReview.filter((_, i) => i !== index));
        }
        break;
    }
  };

  const updateField = (
    type: "new" | "review" | "nextNew" | "nextReview",
    index: number,
    value: string
  ) => {
    switch (type) {
      case "new":
        const newNew = [...newMemorization];
        newNew[index] = value;
        setNewMemorization(newNew);
        break;
      case "review":
        const newReview = [...review];
        newReview[index] = value;
        setReview(newReview);
        break;
      case "nextNew":
        const newNextNew = [...nextNewMemorization];
        newNextNew[index] = value;
        setNextNewMemorization(newNextNew);
        break;
      case "nextReview":
        const newNextReview = [...nextReview];
        newNextReview[index] = value;
        setNextReview(newNextReview);
        break;
    }
  };

  function firstValidation() {
    let hasError = false;
    const newMemorizationError = newMemorization.some(
      (item) => item.trim() === ""
    );
    const reviewError = review.some((item) => item.trim() === "");

    if (newMemorizationError) {
      setError((prev) => ({ ...prev, new: "هذا الحقل مطلوب" }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, new: "" }));
    }

    if (reviewError) {
      setError((prev) => ({ ...prev, review: "هذا الحقل مطلوب" }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, review: "" }));
    }

    if (hasError) {
      return false;
    }

    return true;
  }

  function secondValidation() {
    let hasError = false;
    const nextNewMemorizationError = nextNewMemorization.some(
      (item) => item.trim() === ""
    );
    const nextReviewError = nextReview.some((item) => item.trim() === "");

    if (nextNewMemorizationError) {
      setError((prev) => ({ ...prev, nextNew: "هذا الحقل مطلوب" }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, nextNew: "" }));
    }

    if (nextReviewError) {
      setError((prev) => ({ ...prev, nextReview: "هذا الحقل مطلوب" }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, nextReview: "" }));
    }

    if (hasError) {
      return false;
    }

    return true;
  }

  const handleNext = () => {
    firstValidation() && setStep(2);
  };
  const handlePrev = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (firstValidation()) {
        setStep(2);
      }
      return;
    }

    if (!secondValidation()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const completionData: CompletionData = {
        rate,
        completed: {
          newMemorization: newMemorization.filter((item) => item.trim() !== ""),
          review: review.filter((item) => item.trim() !== ""),
        },
        nextPrep: {
          newMemorization: nextNewMemorization.filter(
            (item) => item.trim() !== ""
          ),
          review: nextReview.filter((item) => item.trim() !== ""),
        },
        notes,
      };

      // TODO: Replace with actual API call when backend is ready
      console.log("=== COMPLETE CLASS API CALL ===");
      console.log("Class Data:", classData);
      console.log("Completion Data:", completionData);
      console.log("Is Group:", isGroup);

      if (isGroup) {
        // 🎯 لو group - مجرد save local بدون API call
        console.log("=== SAVE STUDENT DATA IN GROUP ===");
        console.log("Student:", classData.studentName);
        console.log("Data saved locally - no API call yet");
        console.log("Will be submitted with group when all students are done");

        // مجرد حفظ local وإغلاق الـ modal
        onSave(completionData);
      } else {
        // 🎯 لو single student - عمل API call فوراً
        console.log("=== SINGLE STUDENT COMPLETE CLASS API CALL ===");
        console.log("API Endpoint: POST /api/classes/complete-single");
        console.log("Request Body:", {
          classId: classData.id,
          studentCompletion: {
            studentName: classData.studentName,
            ...completionData,
          },
        });

        // Simulate API delay for single student
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log("✅ Single student class completion saved successfully");
        onSave(completionData);
      }
    } catch (error) {
      console.error("❌ Error saving class completion:", error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = () => {
    // This function is kept for backward compatibility but now just triggers form submit
    const form = document.querySelector(
      "#complete-class-form"
    ) as HTMLFormElement;
    if (form) {
      form.requestSubmit();
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
              <button
                type="button"
                onClick={() => removeField(type, index)}
                className={styles.removeBtn}
              >
                <FaTimes />
              </button>
            )}
          </div>
          {error[type] && error[type].length > 0 && (
            <span className={styles.errorText}>{error[type]}</span>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addField(type)}
        className={styles.addBtn}
      >
        <FaPlus /> إضافة حقل جديد
      </button>
    </div>
  );

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 280);
  };

  return (
    <div
      className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ""}`}
      onClick={handleClose}
    >
      <form
        id="complete-class-form"
        className={`${styles.modal} ${isClosing ? styles.modalSlideOut : ""}`}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {step === 1 ? "إكمال الحصة" : "تحديد المطلوب للحصة القادمة"}
          </h2>
          <button onClick={handleClose} className={styles.closeBtn}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.classInfo}>
            <p>
              <strong>الطالب:</strong> {classData.studentName}
            </p>
            <p>
              <strong>التاريخ:</strong> {classData.date}
            </p>
            <p>
              <strong>الوقت:</strong> {classData.time}
            </p>
          </div>

          {step === 1 ? (
            <div className={styles.stepContent}>
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>تقييم أداء الطالب</h4>
                <div className={styles.rateContainer}>
                  <label className={styles.rateLabel}>التقييم من 10:</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={rate}
                    onChange={(e) => setrate(Number(e.target.value))}
                    className={styles.rateSlider}
                  />
                  <span className={styles.rateValue}>{rate}/10</span>
                </div>
              </div>

              {renderDynamicFields(newMemorization, "new", "الحفظ الجديد")}
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
                ما المطلوب تحضيره للحصة القادمة؟
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
        </div>

        <div className={styles.modalFooter}>
          <button
            type="button"
            onClick={handleClose}
            className={styles.cancelBtn}
            disabled={isSubmitting}
          >
            إلغاء
          </button>
          {step === 1 ? (
            <button
              type="submit"
              className={styles.nextBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  جاري التحميل
                </>
              ) : (
                "التالي"
              )}
            </button>
          ) : (
            <>
              <button
                type="submit"
                className={styles.saveBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    {isGroup ? "جاري الحفظ..." : "جاري إكمال الحصة..."}
                  </>
                ) : isGroup ? (
                  "حفظ البيانات"
                ) : (
                  "حفظ وإكمال الحصة"
                )}
              </button>
              <button
                type="button"
                onClick={handlePrev}
                className={styles.saveBtn}
                disabled={isSubmitting}
              >
                السابق
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompleteClassModal;
