import React, { createContext, useContext, useState, ReactNode } from "react";
import { ClassData, ModalContextType } from "@/types";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
  classes: ClassData[];
  onClassesUpdate: (classes: ClassData[]) => void;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  classes,
  onClassesUpdate,
}) => {
  // Modal states
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [studentAllDataModalOpen, setStudentAllDataModalOpen] = useState(false);
  // Edit group name modal removed
  const [groupCompleteModalOpen, setGroupCompleteModalOpen] = useState(false);
  const [addClassLinkModalOpen, setAddClassLinkModalOpen] = useState(false);
  const [studentListModalOpen, setStudentListModalOpen] = useState(false);
  const [studentReportsModalOpen, setStudentReportsModalOpen] = useState(false);

  // Selected data states
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null); // legacy
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null); // raw lesson
  const [selectedLessonForStudents, setSelectedLessonForStudents] = useState<
    any | null
  >(null);
  const [studentAllData, setStudentAllData] = useState<any>(null);
  const [selectedStudentForReports, setSelectedStudentForReports] = useState<{
    id: string;
    name?: string;
  } | null>(null);
  // Removed selectedGroupData state
  const [selectedGroupClass, setSelectedGroupClass] =
    useState<ClassData | null>(null); // legacy
  const [selectedClassForLink, setSelectedClassForLink] = useState<{
    id: string | number;
    date: string;
    time: string;
    studentName?: string;
    groupName?: string;
    classLink?: string; // Add classLink to type
  } | null>(null);

  // Open modal actions
  const openCompleteModal = (lesson: any) => {
    setSelectedLesson(lesson);
    const members = Array.isArray(lesson?.groupId?.members)
      ? lesson.groupId.members
      : [];
    if (members.length > 1) {
      setGroupCompleteModalOpen(true);
    } else {
      setCompleteModalOpen(true);
    }
  };

  // openPostponeModal removed

  const openStudentDataModal = (studentId: number) => {
    const student = classes
      .flatMap((c) => c.students)
      .find((s) => s.studentId === studentId);

    if (student) {
      const studentClasses = classes
        .filter((c) => c.students.some((s) => s.studentId === studentId))
        .map((c) => ({
          classId: c.id,
          date: c.date,
          time: c.time,
          status: c.status,
          rate: student.rate,
          completed: student.completed,
          notes: student.notes,
          nextPrep: student.nextPrep,
        }));

      const studentAllDataObj = {
        studentId: student.studentId,
        studentName: student.studentName,
        nickname: student.nickname || "",
        classes: studentClasses,
      };

      setStudentAllData(studentAllDataObj);
      setStudentAllDataModalOpen(true);
    }
  };

  // openEditGroupNameModal removed

  const openGroupCompleteModal = (classData: ClassData) => {
    setSelectedGroupClass(classData);
    setGroupCompleteModalOpen(true);
  };

  const openStudentListModal = (lesson: any) => {
    setSelectedLessonForStudents(lesson);
    setStudentListModalOpen(true);
  };

  const openStudentReportsModal = (student: { id: string; name?: string }) => {
    setSelectedStudentForReports(student);
    setStudentReportsModalOpen(true);
  };

  const openAddClassLinkModal = (classData: ClassData) => {
    const classForLink = {
      id: classData.id,
      date: classData.date,
      time: classData.time,
      studentName:
        classData.students.length === 1
          ? classData.students[0].studentName
          : undefined,
      groupName:
        classData.students.length > 1 ? classData.groupName : undefined,
      classLink: classData.classLink, // Include current classLink
    };
    setSelectedClassForLink(classForLink);
    setAddClassLinkModalOpen(true);
  };

  // Close actions
  const closeCompleteModal = () => {
    setCompleteModalOpen(false);
    setSelectedClass(null);
    setSelectedLesson(null);
  };

  // closePostponeModal removed

  const closeStudentDataModal = () => {
    setStudentAllDataModalOpen(false);
    setStudentAllData(null);
  };

  // closeEditGroupNameModal removed

  const closeGroupCompleteModal = () => {
    setGroupCompleteModalOpen(false);
    setSelectedGroupClass(null);
    setSelectedLesson(null);
  };

  const closeAddClassLinkModal = () => {
    setAddClassLinkModalOpen(false);
    setSelectedClassForLink(null);
  };

  const closeStudentListModal = () => {
    setStudentListModalOpen(false);
    setSelectedLessonForStudents(null);
  };

  const closeStudentReportsModal = () => {
    setStudentReportsModalOpen(false);
    setSelectedStudentForReports(null);
  };

  // Save actions
  const saveClassCompletion = (completionData: any) => {
    if (!selectedClass) return;

    const updatedClasses = classes.map((cls) => {
      if (cls.id === selectedClass.id) {
        const updatedStudents = cls.students.map((student) => ({
          ...student,
          rate: completionData.rate,
          completed: completionData.completed,
          nextPrep: completionData.nextPrep,
          notes: completionData.notes,
        }));

        return {
          ...cls,
          status: "completed",
          students: updatedStudents,
          groupRate: completionData.rate,
          groupNotes: completionData.notes,
        };
      }
      return cls;
    });

    onClassesUpdate(updatedClasses);
    closeCompleteModal();
  };

  // saveClassPostpone removed

  // saveGroupName removed

  const saveClassLink = (classLink: string, classId: number) => {
    const updatedClasses = classes.map((cls) => {
      if (cls.id === classId) {
        return {
          ...cls,
          classLink: classLink,
        };
      }
      return cls;
    });

    onClassesUpdate(updatedClasses);
    closeAddClassLinkModal();
  };

  const saveGroupCompletion = (completionData: any[]) => {
    if (!selectedGroupClass) return;

    const updatedClasses = classes.map((cls) => {
      if (cls.id === selectedGroupClass.id) {
        // Update each student with their individual completion data
        const updatedStudents = cls.students.map((student) => {
          const studentCompletion = completionData.find(
            (completion) => completion.studentId === student.studentId
          );

          if (studentCompletion) {
            return {
              ...student,
              rate: studentCompletion.rate,
              completed: studentCompletion.completed,
              nextPrep: studentCompletion.nextPrep,
              notes: studentCompletion.notes,
            };
          }
          return student;
        });

        // Calculate average group rate
        const totalRate = completionData.reduce(
          (sum, data) => sum + data.rate,
          0
        );
        const averageRate = Math.round(totalRate / completionData.length);

        return {
          ...cls,
          status: "completed",
          students: updatedStudents,
          groupRate: averageRate,
          groupNotes: `Group completion: ${completionData.length} students completed`,
        };
      }
      return cls;
    });

    onClassesUpdate(updatedClasses);
    closeGroupCompleteModal();
  };

  // Type cast as ModalContextType while omitting removed fields; interface will be updated separately.
  const contextValue = {
    // Modal states
    completeModalOpen,
    studentAllDataModalOpen,

    groupCompleteModalOpen,
    addClassLinkModalOpen,
    studentListModalOpen,
    studentReportsModalOpen,

    // Selected data
    selectedClass,
    selectedLesson,
    selectedLessonForStudents,
    selectedStudentForReports,
    studentAllData,

    selectedGroupClass,
    selectedClassForLink,

    // Modal actions
    openCompleteModal,
    openStudentDataModal,

    openGroupCompleteModal,
    openAddClassLinkModal,
    openStudentListModal,
    openStudentReportsModal,

    // Close actions
    closeCompleteModal,
    closeStudentDataModal,

    closeGroupCompleteModal,
    closeAddClassLinkModal,
    closeStudentListModal,
    closeStudentReportsModal,

    // Save actions
    saveClassCompletion,

    saveClassLink,
    saveGroupCompletion,
  } as unknown as ModalContextType;

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
