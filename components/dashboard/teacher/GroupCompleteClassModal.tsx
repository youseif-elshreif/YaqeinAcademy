import { useState } from "react";
import styles from "./GroupCompleteClassModal.module.css";
import CompleteClassModal from "./CompleteClassModal";
import { FaCheck, FaUser } from "react-icons/fa";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
} from "@/components/common/Modal";

interface Student {
  id: number;
  name: string;
}

interface GroupClassData {
  id: number;
  groupName: string;
  students: Student[];
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

interface StudentCompletionData extends CompletionData {
  studentId: number;
  studentName: string;
}

interface GroupCompleteClassModalProps {
  groupClassData: GroupClassData;
  onSave: (completionData: StudentCompletionData[]) => void;
  onClose: () => void;
}

const GroupCompleteClassModal = ({
  groupClassData,
  onSave,
  onClose,
}: GroupCompleteClassModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [currentStudentIndex, setCurrentStudentIndex] = useState<number | null>(
    null
  );
  const [completedStudents, setCompletedStudents] = useState<Set<number>>(
    new Set()
  );
  const [studentCompletions, setStudentCompletions] = useState<
    Map<number, CompletionData>
  >(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStudentClick = (studentIndex: number) => {
    setCurrentStudentIndex(studentIndex);
  };

  const handleStudentCompletion = (completionData: CompletionData) => {
    const studentId = groupClassData.students[currentStudentIndex!].id;

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
      const allCompletions: StudentCompletionData[] = Array.from(
        studentCompletions.entries()
      ).map(([studentId, completion]) => {
        const student = groupClassData.students.find(
          (s) => s.id === studentId
        )!;
        return {
          ...completion,
          studentId,
          studentName: student.name,
        };
      });

      // TODO: Replace with actual API call when backend is ready
      console.log("=== GROUP COMPLETE CLASS API CALL ===");
      console.log("Group Class Data:", groupClassData);
      console.log("All Student Completions:", allCompletions);
      console.log("API Endpoint: POST /api/classes/complete-group");
      console.log("Request Body:", {
        classId: groupClassData.id,
        groupName: groupClassData.groupName,
        completions: allCompletions,
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("✅ Group class completion saved successfully");
      onSave(allCompletions);
    } catch (error) {
      console.error("❌ Error saving group completion:", error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const allStudentsCompleted =
    completedStudents.size === groupClassData.students.length;
  const currentStudent =
    currentStudentIndex !== null
      ? groupClassData.students[currentStudentIndex]
      : null;

  // Get existing completion data for current student if exists
  const currentStudentData =
    currentStudentIndex !== null
      ? studentCompletions.get(
          groupClassData.students[currentStudentIndex].id
        ) || undefined
      : undefined;

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: allStudentsCompleted ? "حفظ جميع البيانات" : "أكمل بيانات الطلاب",
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
            <h3 className={styles.groupName}>{groupClassData.groupName}</h3>
            <div className={styles.classDetails}>
              <p>
                <strong>التاريخ:</strong> {groupClassData.date}
              </p>
              <p>
                <strong>الوقت:</strong> {groupClassData.time}
              </p>
            </div>
          </div>

          <div className={styles.studentsSection}>
            <h4 className={styles.sectionTitle}>
              الطلاب ({completedStudents.size}/{groupClassData.students.length})
            </h4>

            <div className={styles.studentsList}>
              {groupClassData.students.map((student, index) => (
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
                  width: `${
                    (completedStudents.size / groupClassData.students.length) *
                    100
                  }%`,
                }}
              />
            </div>
            <span className={styles.progressText}>
              تم إكمال {completedStudents.size} من{" "}
              {groupClassData.students.length} طلاب
            </span>
          </div>
        </div>
        <ModalActions actions={actions} alignment="right" />
      </ModalContainer>

      {/* Individual Student Modal */}
      {currentStudentIndex !== null && currentStudent && (
        <CompleteClassModal
          classData={{
            id: groupClassData.id,
            studentName: currentStudent.name,
            date: groupClassData.date,
            time: groupClassData.time,
          }}
          initialData={currentStudentData} // البيانات المحفوظة
          isGroup={true} // 🎯 إضافة الـ flag ده
          onSave={handleStudentCompletion}
          onClose={handleCloseStudentModal}
        />
      )}
    </>
  );
};

export default GroupCompleteClassModal;
