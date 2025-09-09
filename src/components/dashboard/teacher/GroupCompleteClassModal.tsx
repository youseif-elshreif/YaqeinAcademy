import { useState, useEffect } from "react";
import styles from "./GroupCompleteClassModal.module.css";
import CompleteClassModal from "./CompleteClassModal";
import { useTeacherDashboard } from "@/src/contexts/TeacherDashboardContext";
import { useLessonsContext } from "@/src/contexts/LessonsContext";
import { FaCheck, FaUser } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
} from "@/src/components/common/Modal";
import Button from "@/src/components/common/Button";
import {
  Student,
  GroupCompleteClassModalProps,
  StudentCompletionDetails,
} from "@/src/types";

const GroupCompleteClassModal = ({
  lessonId,
  onClose,
}: GroupCompleteClassModalProps) => {
  const { reportLesson } = useTeacherDashboard();
  const { getLessonById, completeLesson } = useLessonsContext();

  const [lessonData, setLessonData] = useState<any>(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(true);
  const [lessonError, setLessonError] = useState<string>("");

  const [isClosing, setIsClosing] = useState(false);
  const [currentStudentIndex, setCurrentStudentIndex] = useState<number | null>(
    null
  );
  const [completedStudents, setCompletedStudents] = useState<Set<string>>(
    new Set()
  );
  const [studentCompletions, setStudentCompletions] = useState<
    Map<string, StudentCompletionDetails>
  >(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setIsLoadingLesson(true);
        setLessonError("");
        const data = await getLessonById(lessonId);
        setLessonData(data);
      } catch (error) {
        setLessonError("خطأ في جلب بيانات الدرس");
      } finally {
        setIsLoadingLesson(false);
      }
    };

    if (lessonId) {
      fetchLessonData();
    }
  }, [lessonId, getLessonById]);

  const students: Student[] =
    lessonData?.groupId?.members?.map((member: any) => ({
      _id: member._id,
      id: member._id, // تأكد من وجود id
      name: member.name,
    })) || [];

  const groupName = lessonData?.groupId?.name || "";
  const scheduledAt = lessonData?.scheduledAt || "";

  const handleStudentClick = (studentIndex: number) => {
    setCurrentStudentIndex(studentIndex);
  };

  const handleStudentCompletion = (completionData: any) => {
    const student = students[currentStudentIndex!];
    const studentId = student._id; // Save the completion data
    setStudentCompletions((prev) =>
      new Map(prev).set(studentId, completionData)
    );

    setCompletedStudents((prev) => new Set(prev).add(studentId));

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const allStudentsCompleted = completedStudents.size === students.length;
  const currentStudent =
    currentStudentIndex !== null ? students[currentStudentIndex] : null;

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: allStudentsCompleted ? "حفظ النتائج" : "إتمام جميع الطلاب",
      onClick: handleSubmitAll,
      variant: "primary" as const,
      disabled: !allStudentsCompleted || isSubmitting,
      loading: isSubmitting,
    },
  ];

  return (
    <>
      <ModalContainer isOpen={!isClosing} variant="add" onClose={handleClose}>
        <ModalHeader
          title="تقرير عن الحلقة"
          onClose={handleClose}
          disabled={isSubmitting || isLoadingLesson}
          variant="add"
        />
        <div className={styles.modalBody}>
          {isLoadingLesson ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>يتم تحميل بيانات الطلبة...</p>
            </div>
          ) : lessonError ? (
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>{lessonError}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
              >
                تحديث الحلقة
              </Button>
            </div>
          ) : (
            <>
              <div className={styles.groupInfo}>
                <h3 className={styles.groupName}>{groupName}</h3>
                <div className={styles.classDetails}>
                  <p>
                    <strong>الحلقة:</strong>{" "}
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
              <div
                style={{
                  padding: "10px",
                }}
              >
                <div className={styles.studentsSection}>
                  <h4 className={styles.sectionTitle}>
                    الطلاب ({completedStudents.size}/{students.length})
                  </h4>

                  <div className={styles.studentsList}>
                    {students.map((student, index) => (
                      <div
                        key={student._id}
                        className={`${styles.studentCard} ${
                          completedStudents.has(student._id)
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
                          {completedStudents.has(student._id) ? (
                            <FaCheck className={styles.checkIcon} />
                          ) : (
                            <span className={styles.pendingText}>
                              تمت المراجعة
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
                    تم تحديد {completedStudents.size} من {students.length} طالب
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <ModalActions actions={actions} alignment="right" />
      </ModalContainer>

      {currentStudentIndex !== null && currentStudent && (
        <CompleteClassModal
          mode="group"
          lessonId={lessonId}
          scheduledAt={scheduledAt}
          student={{ id: currentStudent._id, name: currentStudent.name }}
          groupName={groupName}
          existingData={studentCompletions.get(currentStudent._id)} // تحديث البيانات الموجودة مسبقاً
          onSave={(data) => handleStudentCompletion({ ...data })}
          onClose={handleCloseStudentModal}
        />
      )}
    </>
  );
};

export default GroupCompleteClassModal;
