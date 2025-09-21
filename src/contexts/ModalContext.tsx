import React, { createContext, useContext, useState, ReactNode } from "react";
import { ClassData, ModalContextType, StudentInLesson } from "@/src/types";

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
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [studentAllDataModalOpen, setStudentAllDataModalOpen] = useState(false);

  const [groupCompleteModalOpen, setGroupCompleteModalOpen] = useState(false);
  const [addClassLinkModalOpen, setAddClassLinkModalOpen] = useState(false);
  const [studentListModalOpen, setStudentListModalOpen] = useState(false);
  const [studentReportsModalOpen, setStudentReportsModalOpen] = useState(false);

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

  const openCompleteModal = (lesson: any) => {
    setSelectedLesson(lesson);
    const members = Array.isArray(lesson?.groupId?.members)
      ? lesson.groupId.members
      : [];
    setGroupCompleteModalOpen(true);
    // if (members.length > 1) {
    // } else {
    //   setCompleteModalOpen(true);
    // }
  };

  const openStudentDataModal = (studentId: number) => {
    const student = classes
      .flatMap((c) =>
        Array.isArray(c.students)
          ? c.students.filter(
              (s): s is StudentInLesson =>
                typeof s === "object" && s !== null && "studentId" in s
            )
          : []
      )
      .find((s) => s.studentId === studentId.toString());

    if (student) {
      const studentClasses = classes
        .filter(
          (c) =>
            Array.isArray(c.students) &&
            c.students.some(
              (s) =>
                typeof s === "object" &&
                s !== null &&
                "studentId" in s &&
                s.studentId === studentId.toString()
            )
        )
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
        classData.students.length === 1 &&
        typeof classData.students[0] === "object" &&
        classData.students[0] !== null &&
        "studentName" in classData.students[0]
          ? classData.students[0].studentName
          : undefined,
      groupName:
        classData.students.length > 1 ? classData.groupName : undefined,
      classLink: classData.classLink, // Include current classLink
    };
    setSelectedClassForLink(classForLink);
    setAddClassLinkModalOpen(true);
  };

  const closeCompleteModal = () => {
    setCompleteModalOpen(false);
    setSelectedClass(null);
    setSelectedLesson(null);
  };

  const closeStudentDataModal = () => {
    setStudentAllDataModalOpen(false);
    setStudentAllData(null);
  };

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

  const contextValue = {
    completeModalOpen,
    studentAllDataModalOpen,

    groupCompleteModalOpen,
    addClassLinkModalOpen,
    studentListModalOpen,
    studentReportsModalOpen,

    selectedClass,
    selectedLesson,
    selectedLessonForStudents,
    selectedStudentForReports,
    studentAllData,

    selectedGroupClass,
    selectedClassForLink,

    openCompleteModal,
    openStudentDataModal,

    openGroupCompleteModal,
    openAddClassLinkModal,
    openStudentListModal,
    openStudentReportsModal,

    closeCompleteModal,
    closeStudentDataModal,

    closeGroupCompleteModal,
    closeAddClassLinkModal,
    closeStudentListModal,
    closeStudentReportsModal,

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
