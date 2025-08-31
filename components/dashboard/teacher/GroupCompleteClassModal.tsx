import { useState, useEffect } from "react";
import styles from "./GroupCompleteClassModal.module.css";
import CompleteClassModal from "./CompleteClassModal";
import { useTeacherDashboard } from "@/contexts/TeacherDashboardContext";
import { useLessonsContext } from "@/contexts/LessonsContext";
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
  onClose: () => void;
}

const GroupCompleteClassModal = ({
  lessonId,
  onClose,
}: GroupCompleteClassModalProps) => {
  const { reportLesson } = useTeacherDashboard();
  const { getLessonById } = useLessonsContext();

  // Lesson data state
  const [lessonData, setLessonData] = useState<any>(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(true);
  const [lessonError, setLessonError] = useState<string>("");

  // Modal states
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

  // Fetch lesson data on component mount
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setIsLoadingLesson(true);
        setLessonError("");
        const data = await getLessonById(lessonId);
        console.log("📚 Fetched lesson data:", data);
        setLessonData(data);
      } catch (error) {
        console.error("❌ Error fetching lesson data:", error);
        setLessonError("فشل في جلب بيانات الحصة");
      } finally {
        setIsLoadingLesson(false);
      }
    };

    if (lessonId) {
      fetchLessonData();
    }
  }, [lessonId, getLessonById]);

  // Extract students from lesson data
  const students: Student[] =
    lessonData?.groupId?.members?.map((member: any) => ({
      id: member._id,
      name: member.name,
    })) || [];

  const groupName = lessonData?.groupId?.name || "";
  const scheduledAt = lessonData?.scheduledAt || "";

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
      // await completeLesson(lessonId);
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
      <ModalContainer isOpen={!isClosing} variant="add">
        <ModalHeader
          title="إكمال حصة الحلقة"
          onClose={handleClose}
          disabled={isSubmitting || isLoadingLesson}
          variant="add"
        />
        <div className={styles.modalBody}>
          {isLoadingLesson ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>جاري تحميل بيانات الحصة...</p>
            </div>
          ) : lessonError ? (
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>{lessonError}</p>
              <button
                onClick={() => window.location.reload()}
                className={styles.retryButton}
              >
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <>
              <div className={styles.groupInfo}>
                <h3 className={styles.groupName}>{groupName}</h3>
                <div className={styles.classDetails}>
                  <p>
                    <strong>الموعد:</strong>{" "}
                    {scheduledAt &&
                      new Date(scheduledAt).toLocaleString("ar-EG", {
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
                        completedStudents.has(student.id)
                          ? styles.completed
                          : ""
                      }`}
                      onClick={() => handleStudentClick(index)}
                    >
                      <div className={styles.studentInfo}>
                        <FaUser className={styles.studentIcon} />
                        <span className={styles.studentName}>
                          {student.name}
                        </span>
                      </div>

                      <div className={styles.statusIndicator}>
                        {completedStudents.has(student.id) ? (
                          <FaCheck className={styles.checkIcon} />
                        ) : (
                          <span className={styles.pendingText}>
                            انقر للإكمال
                          </span>
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
                      width: `${
                        (completedStudents.size / students.length) * 100
                      }%`,
                    }}
                  />
                </div>
                <span className={styles.progressText}>
                  تم إكمال {completedStudents.size} من {students.length} طلاب
                </span>
              </div>
            </>
          )}
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
