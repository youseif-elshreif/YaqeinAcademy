import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ClassData,
  StudentData,
  SelectedClassData,
} from "@/components/TeacherDashboard/MonthlyClassTable/types";

interface ModalContextType {
  // Modal states
  completeModalOpen: boolean;
  postponeModalOpen: boolean;
  nicknameModalOpen: boolean;
  studentAllDataModalOpen: boolean;
  editGroupNameModalOpen: boolean;
  groupCompleteModalOpen: boolean;
  addClassLinkModalOpen: boolean;

  // Selected data
  selectedClass: SelectedClassData | null;
  selectedStudent: StudentData | null;
  studentAllData: any;
  selectedGroupData: {
    classId: number;
    currentGroupName: string;
  } | null;
  selectedGroupClass: ClassData | null;
  selectedClassForLink: {
    id: number;
    date: string;
    time: string;
    studentName?: string;
    groupName?: string;
    classLink?: string; // Add classLink to interface
  } | null;

  // Modal actions
  openCompleteModal: (classData: ClassData) => void;
  openPostponeModal: (classData: ClassData) => void;
  openNicknameModal: (studentData: StudentData) => void;
  openStudentDataModal: (studentId: number) => void;
  openEditGroupNameModal: (groupData: {
    classId: number;
    currentGroupName: string;
  }) => void;
  openGroupCompleteModal: (classData: ClassData) => void;
  openAddClassLinkModal: (classData: ClassData) => void;

  // Close actions
  closeCompleteModal: () => void;
  closePostponeModal: () => void;
  closeNicknameModal: () => void;
  closeStudentDataModal: () => void;
  closeEditGroupNameModal: () => void;
  closeGroupCompleteModal: () => void;
  closeAddClassLinkModal: () => void;

  // Save actions
  saveClassCompletion: (completionData: any) => void;
  savePostpone: (postponeData: any) => void;
  saveNickname: (nickname: string) => void;
  saveGroupName: (newGroupName: string) => void;
  saveClassLink: (link: string) => void;
  saveGroupCompletion: (completionData: any[]) => void;
}

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
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [studentAllDataModalOpen, setStudentAllDataModalOpen] = useState(false);
  const [editGroupNameModalOpen, setEditGroupNameModalOpen] = useState(false);
  const [groupCompleteModalOpen, setGroupCompleteModalOpen] = useState(false);
  const [addClassLinkModalOpen, setAddClassLinkModalOpen] = useState(false);

  // Selected data states
  const [selectedClass, setSelectedClass] = useState<SelectedClassData | null>(
    null
  );
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(
    null
  );
  const [studentAllData, setStudentAllData] = useState<any>(null);
  const [selectedGroupData, setSelectedGroupData] = useState<{
    classId: number;
    currentGroupName: string;
  } | null>(null);
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
      const modalClassData = {
        id: classData.id,
        studentName: classData.students[0].studentName,
        date: classData.date,
        time: classData.time,
      };
      setSelectedClass(modalClassData);
      setCompleteModalOpen(true);
    }
  };

  const openPostponeModal = (classData: ClassData) => {
    const modalClassData = {
      id: classData.id,
      studentName:
        classData.students.length > 1
          ? classData.groupName
          : classData.students[0].studentName,
      date: classData.date,
      time: classData.time,
    };
    setSelectedClass(modalClassData);
    setPostponeModalOpen(true);
  };

  const openNicknameModal = (studentData: StudentData) => {
    setSelectedStudent(studentData);
    setNicknameModalOpen(true);
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

  const openEditGroupNameModal = (groupData: {
    classId: number;
    currentGroupName: string;
  }) => {
    setSelectedGroupData(groupData);
    setEditGroupNameModalOpen(true);
  };

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

  const closeNicknameModal = () => {
    setNicknameModalOpen(false);
    setSelectedStudent(null);
  };

  const closeStudentDataModal = () => {
    setStudentAllDataModalOpen(false);
    setStudentAllData(null);
  };

  const closeEditGroupNameModal = () => {
    setEditGroupNameModalOpen(false);
    setSelectedGroupData(null);
  };

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

  const savePostpone = (postponeData: any) => {
    if (!selectedClass) return;

    const updatedClasses = classes.map((cls) => {
      if (cls.id === selectedClass.id) {
        const updatedClass: ClassData = {
          ...cls,
          status:
            postponeData.action === "cancelled" ? "cancelled" : "postponed",
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

  const saveNickname = (nickname: string) => {
    if (!selectedStudent) return;

    const updatedClasses = classes.map((cls) => ({
      ...cls,
      students: cls.students.map((student) =>
        student.studentId === selectedStudent.studentId
          ? { ...student, nickname }
          : student
      ),
    }));

    onClassesUpdate(updatedClasses);
    closeNicknameModal();
  };

  const saveGroupName = (newGroupName: string) => {
    if (!selectedGroupData) return;

    const updatedClasses = classes.map((cls) => {
      if (cls.id === selectedGroupData.classId) {
        return {
          ...cls,
          groupName: newGroupName,
        };
      }
      return cls;
    });

    onClassesUpdate(updatedClasses);
    closeEditGroupNameModal();
  };

  const saveClassLink = (link: string) => {
    if (!selectedClassForLink) return;

    const updatedClasses = classes.map((cls) => {
      if (cls.id === selectedClassForLink.id) {
        return {
          ...cls,
          classLink: link,
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

  const contextValue: ModalContextType = {
    // Modal states
    completeModalOpen,
    postponeModalOpen,
    nicknameModalOpen,
    studentAllDataModalOpen,
    editGroupNameModalOpen,
    groupCompleteModalOpen,
    addClassLinkModalOpen,

    // Selected data
    selectedClass,
    selectedStudent,
    studentAllData,
    selectedGroupData,
    selectedGroupClass,
    selectedClassForLink,

    // Modal actions
    openCompleteModal,
    openPostponeModal,
    openNicknameModal,
    openStudentDataModal,
    openEditGroupNameModal,
    openGroupCompleteModal,
    openAddClassLinkModal,

    // Close actions
    closeCompleteModal,
    closePostponeModal,
    closeNicknameModal,
    closeStudentDataModal,
    closeEditGroupNameModal,
    closeGroupCompleteModal,
    closeAddClassLinkModal,

    // Save actions
    saveClassCompletion,
    savePostpone,
    saveNickname,
    saveGroupName,
    saveClassLink,
    saveGroupCompletion,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
