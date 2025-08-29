import { useState } from "react";
import styles from "./GroupCompleteClassModal.module.css";
import CompleteClassModal from "./CompleteClassModal";
import { useTeacherDashboard } from "@/contexts/TeacherDashboardContext";
import { FaCheck, FaUser } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
} from "@/components/common/Modal";

interface Student {
  id: string;
  name: string;
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

// legacy type removed

interface GroupCompleteClassModalProps {
  lessonId: string;
  groupName: string;
  scheduledAt: string;
  students: Student[];
  onClose: () => void;
}

const GroupCompleteClassModal = ({
  lessonId,
  groupName,
  scheduledAt,
  students,
  onClose,
}: GroupCompleteClassModalProps) => {
  const { reportLesson, completeLesson } = useTeacherDashboard();
  const [isClosing, setIsClosing] = useState(false);
  const [currentStudentIndex, setCurrentStudentIndex] = useState<number | null>(
    null
  );
  const [completedStudents, setCompletedStudents] = useState<Set<string>>(
    new Set()
  );
  const [studentCompletions, setStudentCompletions] = useState<
    Map<string, CompletionData & { attended: boolean }>
  >(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStudentClick = (studentIndex: number) => {
    setCurrentStudentIndex(studentIndex);
  };

  const handleStudentCompletion = (completionData: any) => {
    const studentId = students[currentStudentIndex!].id;

    // Save the completion data
    setStudentCompletions((prev) =>
      new Map(prev).set(studentId, completionData)
    );

    // Mark student as completed
    setCompletedStudents((prev) => new Set(prev).add(studentId));

    // Close the individual modal
    setCurrentStudentIndex(null);
  };

  const handleCloseStudentModal = () => {
    setCurrentStudentIndex(null);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 280);
  };

  const handleSubmitAll = async () => {
    setIsSubmitting(true);

    try {
      // Send reports for each student
      const entries = Array.from(studentCompletions.entries());
      for (const [studentId, completion] of entries) {
        const payload = {
          studentId,
          attended: completion.attended ?? true,
          wantedForNextLesson: {
            new: completion.nextPrep?.newMemorization || [],
            old: completion.nextPrep?.review || [],
          },
          newMemorized: {
            new: completion.completed?.newMemorization || [],
            old: completion.completed?.review || [],
          },
          notes: completion.notes || "",
          rating: completion.rate ?? 0,
        } as any;
        await reportLesson(lessonId, payload);
      }
      await completeLesson(lessonId);
      handleClose();
    } catch (error) {
      console.error("❌ Error saving group completion:", error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const allStudentsCompleted = completedStudents.size === students.length;
  const currentStudent =
    currentStudentIndex !== null ? students[currentStudentIndex] : null;

  // existing completion data not used in current UI

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: allStudentsCompleted ? "إتمام الحصة" : "أكمل بيانات الطلاب",
      onClick: handleSubmitAll,
      variant: "primary" as const,
      disabled: !allStudentsCompleted || isSubmitting,
      loading: isSubmitting,
    },
  ];

  return (
    <>
      <ModalContainer isOpen={true} isClosing={isClosing} variant="add">
        <ModalHeader
          title="إكمال حصة الحلقة"
          onClose={handleClose}
          disabled={isSubmitting}
          variant="add"
        />
        <div className={styles.modalBody}>
          <div className={styles.groupInfo}>
            <h3 className={styles.groupName}>{groupName}</h3>
            <div className={styles.classDetails}>
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
          </div>

          <div className={styles.studentsSection}>
            <h4 className={styles.sectionTitle}>
              الطلاب ({completedStudents.size}/{students.length})
            </h4>

            <div className={styles.studentsList}>
              {students.map((student, index) => (
                <div
                  key={student.id}
                  className={`${styles.studentCard} ${
                    completedStudents.has(student.id) ? styles.completed : ""
                  }`}
                  onClick={() => handleStudentClick(index)}
                >
                  <div className={styles.studentInfo}>
                    <FaUser className={styles.studentIcon} />
                    <span className={styles.studentName}>{student.name}</span>
                  </div>

                  <div className={styles.statusIndicator}>
                    {completedStudents.has(student.id) ? (
                      <FaCheck className={styles.checkIcon} />
                    ) : (
                      <span className={styles.pendingText}>انقر للإكمال</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.progressBar}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${(completedStudents.size / students.length) * 100}%`,
                }}
              />
            </div>
            <span className={styles.progressText}>
              تم إكمال {completedStudents.size} من {students.length} طلاب
            </span>
          </div>
        </div>
        <ModalActions actions={actions} alignment="right" />
      </ModalContainer>

      {/* Individual Student Modal */}
      {currentStudentIndex !== null && currentStudent && (
        <CompleteClassModal
          mode="group"
          lessonId={lessonId}
          scheduledAt={scheduledAt}
          student={{ id: currentStudent.id, name: currentStudent.name }}
          groupName={groupName}
          onSave={(data) => handleStudentCompletion({ ...data })}
          onClose={handleCloseStudentModal}
        />
      )}
    </>
  );
};

export default GroupCompleteClassModal;
