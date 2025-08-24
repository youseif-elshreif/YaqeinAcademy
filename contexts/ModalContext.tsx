import React, { createContext, useContext, useState, ReactNode } from "react";
import { ClassData, ModalContextType } from "@/utils/types";

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
  const [postponeModalOpen, setPostponeModalOpen] = useState(false);
  const [studentAllDataModalOpen, setStudentAllDataModalOpen] = useState(false);
  // Edit group name modal removed
  const [groupCompleteModalOpen, setGroupCompleteModalOpen] = useState(false);
  const [addClassLinkModalOpen, setAddClassLinkModalOpen] = useState(false);

  // Selected data states
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [studentAllData, setStudentAllData] = useState<any>(null);
  // Removed selectedGroupData state
  const [selectedGroupClass, setSelectedGroupClass] =
    useState<ClassData | null>(null);
  const [selectedClassForLink, setSelectedClassForLink] = useState<{
    id: number;
    date: string;
    time: string;
    studentName?: string;
    groupName?: string;
    classLink?: string; // Add classLink to type
  } | null>(null);

  // Open modal actions
  const openCompleteModal = (classData: ClassData) => {
    // Check if it's a group class (more than 1 student)
    if (classData.students.length > 1) {
      setSelectedGroupClass(classData);
      setGroupCompleteModalOpen(true);
    } else {
      setSelectedClass(classData);
      setCompleteModalOpen(true);
    }
  };

  const openPostponeModal = (classData: ClassData) => {
    setSelectedClass(classData);
    setPostponeModalOpen(true);
  };

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
  };

  const closePostponeModal = () => {
    setPostponeModalOpen(false);
    setSelectedClass(null);
  };

  const closeStudentDataModal = () => {
    setStudentAllDataModalOpen(false);
    setStudentAllData(null);
  };

  // closeEditGroupNameModal removed

  const closeGroupCompleteModal = () => {
    setGroupCompleteModalOpen(false);
    setSelectedGroupClass(null);
  };

  const closeAddClassLinkModal = () => {
    setAddClassLinkModalOpen(false);
    setSelectedClassForLink(null);
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

  const saveClassPostpone = (postponeData: any) => {
    if (!selectedClass) return;

    const updatedClasses = classes.map((cls) => {
      if (cls.id === selectedClass.id) {
        const updatedClass: ClassData = {
          ...cls,
          // Use the standardized statuses: cancelled or scheduled (no 'postponed' status)
          status:
            postponeData.action === "cancelled" ? "cancelled" : "scheduled",
          groupNotes: postponeData.reason,
        };

        // إذا كان تأجيل، أضف التاريخ والوقت الجديد
        if (
          postponeData.action === "postponed" &&
          postponeData.newDate &&
          postponeData.newTime
        ) {
          updatedClass.date = postponeData.newDate;
          updatedClass.time = postponeData.newTime;
        }

        return updatedClass;
      }
      return cls;
    });

    onClassesUpdate(updatedClasses);
    closePostponeModal();
  };

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
    postponeModalOpen,
    studentAllDataModalOpen,

    groupCompleteModalOpen,
    addClassLinkModalOpen,

    // Selected data
    selectedClass,
    studentAllData,

    selectedGroupClass,
    selectedClassForLink,

    // Modal actions
    openCompleteModal,
    openPostponeModal,
    openStudentDataModal,

    openGroupCompleteModal,
    openAddClassLinkModal,

    // Close actions
    closeCompleteModal,
    closePostponeModal,
    closeStudentDataModal,

    closeGroupCompleteModal,
    closeAddClassLinkModal,

    // Save actions
    saveClassCompletion,
    saveClassPostpone,

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
