// مثال على كيفية استخدام ReportContext في كومبوننت لإنشاء تقرير درس

"use client";
import React, { useState } from "react";
import { useReportContext } from "@/contexts/ReportContext";

interface CreateReportFormProps {
  lessonId: string;
  studentId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CreateReportForm: React.FC<CreateReportFormProps> = ({
  lessonId,
  studentId,
  onSuccess,
  onCancel,
}) => {
  const { createLessonReport, isLoading, error } = useReportContext();

  const [formData, setFormData] = useState({
    attended: true,
    completeLesson: true,
    doneHomework: false,
    content: "",
    notes: "",
    rating: 5,
    newMemorized: { new: [], old: [] },
    wantedForNextLesson: { new: [], old: [] },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createLessonReport(lessonId, {
        studentId,
        attended: formData.attended,
        content: formData.content || " ", // backend requires non-empty string
        notes: formData.notes,
        rating: formData.rating,
        newMemorized: formData.newMemorized,
        wantedForNextLesson: formData.wantedForNextLesson,
      });

      onSuccess?.();
    } catch (err) {
      console.error("Failed to create report:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>إنشاء تقرير درس</h3>

      {error && <div className="error">{error}</div>}

      <label>
        <input
          type="checkbox"
          checked={formData.attended}
          onChange={(e) =>
            setFormData({ ...formData, attended: e.target.checked })
          }
        />
        حضر الطالب
      </label>

      <label>
        <input
          type="checkbox"
          checked={formData.completeLesson}
          onChange={(e) =>
            setFormData({ ...formData, completeLesson: e.target.checked })
          }
        />
        أكمل الدرس
      </label>

      <label>
        <input
          type="checkbox"
          checked={formData.doneHomework}
          onChange={(e) =>
            setFormData({ ...formData, doneHomework: e.target.checked })
          }
        />
        أكمل الواجب
      </label>

      <label>
        التقييم (1-5):
        <input
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={(e) =>
            setFormData({ ...formData, rating: parseInt(e.target.value) })
          }
        />
      </label>

      <label>
        المحتوى:
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
      </label>

      <label>
        ملاحظات:
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </label>

      <div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "جاري الحفظ..." : "حفظ التقرير"}
        </button>
        <button type="button" onClick={onCancel}>
          إلغاء
        </button>
      </div>
    </form>
  );
};
