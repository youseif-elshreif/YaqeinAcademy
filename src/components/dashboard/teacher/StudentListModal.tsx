"use client";
import React, { useMemo, useState } from "react";
import { ModalContainer, ModalHeader } from "@/src/components/common/Modal";
import LessonCard from "@/src/components/dashboard/admin/modals/lessons/components/LessonCard";
import { UILessonCard } from "@/src/types/admin.types";
import styles from "./StudentListModal.module.css";
import { StudentListModalProps } from "@/src/types";

const StudentListModal: React.FC<StudentListModalProps> = ({
  isOpen,
  onClose,
  lesson,
  onOpenStudentReports,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const members = useMemo(
    () =>
      Array.isArray(lesson?.groupId?.members) ? lesson.groupId.members : [],
    [lesson]
  );

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 250);
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      isClosing={isClosing}
      variant="default"
      onClose={handleClose}
    >
      <ModalHeader
        title={`طلاب الحلقة: ${lesson?.groupId?.name || "-"}`}
        onClose={handleClose}
        variant="default"
      />
      <div className={styles.modalBody}>
        {/* Lesson summary card (reused) */}
        <LessonCard
          showActions={false}
          lesson={
            {
              id: lesson?._id,
              day: new Date(lesson?.scheduledAt).toLocaleDateString("ar-EG", {
                weekday: "long",
              }),
              time: `${String(
                new Date(lesson?.scheduledAt).getHours()
              ).padStart(2, "0")}:${String(
                new Date(lesson?.scheduledAt).getMinutes()
              ).padStart(2, "0")}`,
              date: new Date(lesson?.scheduledAt).toISOString(),
              meetingLink: lesson?.meetingLink || lesson?.groupId?.meetingLink,
              status: lesson?.status,
            } as UILessonCard
          }
        />

        {members.length === 0 ? (
          <div className={styles.empty}>لا يوجد طلاب</div>
        ) : (
          <ul className={styles.studentList}>
            {members.map((m: any) => (
              <li
                key={m?._id}
                className={styles.studentItem}
                style={{ marginTop: "0.5rem" }}
              >
                <div className={styles.studentName}>{m?._id || m}</div>
                <button
                  className={styles.viewBtn}
                  onClick={() => {
                    if (onOpenStudentReports) {
                      onOpenStudentReports({
                        id: m?._id || m?.id || "",
                        name: " m?.name",
                      });
                    }
                  }}
                >
                  عرض تقارير الطالب
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ModalContainer>
  );
};

export default StudentListModal;
