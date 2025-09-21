"use client";
// REMOVED LOGS BY cleanup (safe) — original lines commented for review
import React, { createContext, useContext, useState } from "react";
import {
  UserFormData,
  UserType,
  AdminModalContextType,
  AdminModalProviderProps,
} from "@/src/types";
import { useTeachersContext } from "./TeachersContext";
import { useStudentsContext } from "./StudentsContext";
import { useAdminStatsContext } from "./AdminStatsContext";
import { useGroupsContext } from "./GroupsContext";

const AdminModalContext = createContext<AdminModalContextType | undefined>(
  undefined
);

export const AdminModalProvider: React.FC<AdminModalProviderProps> = ({
  children,
}) => {
  const {
    createTeacher,
    getTeachers,
    updateTeacherMeetingLink,
    updateTeacher,
  } = useTeachersContext();
  const {
    createStudent,
    getStudents,
    addCreditsToStudent: addCreditsAPI,
    updateStudent,
    updateMember,
  } = useStudentsContext();
  const { createAdmin, getAdmins } = useAdminStatsContext();
  const { getGroups } = useGroupsContext();

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [addCourseModalOpen, setAddCourseModalOpen] = useState(false);
  const [editCourseModalOpen, setEditCourseModalOpen] = useState(false);
  const [deleteCourseModalOpen, setDeleteCourseModalOpen] = useState(false);
  const [addGroupModalOpen, setAddGroupModalOpen] = useState(false);
  const [editGroupModalOpen, setEditGroupModalOpen] = useState(false);
  const [addMembersModalOpen, setAddMembersModalOpen] = useState(false);
  const [groupActionsModalOpen, setGroupActionsModalOpen] = useState(false);
  const [confirmDeleteGroupModalOpen, setConfirmDeleteGroupModalOpen] =
    useState(false);
  const [
    confirmTeacherAccountingModalOpen,
    setConfirmTeacherAccountingModalOpen,
  ] = useState(false);
  const [removeMemberModalOpen, setRemoveMemberModalOpen] = useState(false);
  const [lessonsModalOpen, setLessonsModalOpen] = useState(false);
  const [addLessonModalOpen, setAddLessonModalOpen] = useState(false);
  const [editLessonModalOpen, setEditLessonModalOpen] = useState(false);
  const [deleteLessonModalOpen, setDeleteLessonModalOpen] = useState(false);

  const [userActionsModalOpen, setUserActionsModalOpen] = useState(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [addCreditsModalOpen, setAddCreditsModalOpen] = useState(false);
  const [studentListModalOpen, setStudentListModalOpen] = useState(false);
  const [studentReportsModalOpen, setStudentReportsModalOpen] = useState(false);
  const [editTeacherLinkModalOpen, setEditTeacherLinkModalOpen] =
    useState(false);
  const [setTeacherPriceModalOpen, setSetTeacherPriceModalOpen] =
    useState(false);

  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(
    null
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedGroupData, setSelectedGroupData] = useState<{
    id: string;
    name: string;
    type: "private" | "public";
  } | null>(null);

  const [selectedGroupActionsData, setSelectedGroupActionsData] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [selectedGroupForDeletion, setSelectedGroupForDeletion] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [selectedTeacherForAccounting, setSelectedTeacherForAccounting] =
    useState<{
      id: string;
      name: string;
    } | null>(null);

  const [selectedGroupForMemberRemoval, setSelectedGroupForMemberRemoval] =
    useState<{
      id: string;
      name: string;
    } | null>(null);

  const [selectedGroupForEdit, setSelectedGroupForEdit] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [selectedGroupForLessons, setSelectedGroupForLessons] = useState<{
    groupId: string;
    groupName: string;
  } | null>(null);

  const [selectedLessonData, setSelectedLessonData] = useState<{
    id: string;
    day: string;
    time: string;
    date: string;
    meetingLink?: string;
  } | null>(null);

  const [selectedUserForActions, setSelectedUserForActions] = useState<{
    id: string;
    name: string;
    userType: "student" | "teacher";
  } | null>(null);

  const [selectedUserData, setSelectedUserData] = useState<any>(null);
  const [selectedTeacherForLink, setSelectedTeacherForLink] =
    useState<any>(null);
  const [selectedTeacherForPrice, setSelectedTeacherForPrice] =
    useState<any>(null);
  const [selectedStudentForCredits, setSelectedStudentForCredits] = useState<{
    userId: string;
    name: string;
    fullData?: any;
  } | null>(null);
  const [selectedLessonForStudents, setSelectedLessonForStudents] = useState<
    any | null
  >(null);
  const [selectedStudentForReports, setSelectedStudentForReports] = useState<{
    id: string;
    name?: string;
  } | null>(null);

  const openAddUserModal = () => {
    setAddUserModalOpen(true);
    setSelectedUserType(null); // Reset user type selection
  };

  const openAddCourseModal = () => {
    setAddCourseModalOpen(true);
  };

  const openEditCourseModal = (courseId: string) => {
    setSelectedCourseId(courseId);
    setEditCourseModalOpen(true);
  };

  const openDeleteCourseModal = (courseId: string) => {
    setSelectedCourseId(courseId);
    setDeleteCourseModalOpen(true);
  };

  const openAddGroupModal = () => {
    setAddGroupModalOpen(true);
  };

  const openEditGroupModal = (groupData: { id: string; name: string }) => {
    setSelectedGroupForEdit(groupData);
    setEditGroupModalOpen(true);
  };

  const openAddMembersModal = (groupData: {
    id: string;
    name: string;
    type: "private" | "public";
  }) => {
    setSelectedGroupData(groupData);
    setAddMembersModalOpen(true);
  };

  const openGroupActionsModal = (groupData: { id: string; name: string }) => {
    setSelectedGroupActionsData(groupData);
    setGroupActionsModalOpen(true);
  };

  const openConfirmDeleteGroupModal = (groupData: {
    id: string;
    name: string;
  }) => {
    setSelectedGroupForDeletion(groupData);
    setConfirmDeleteGroupModalOpen(true);
  };

  const openRemoveMemberModal = (groupData: { id: string; name: string }) => {
    setSelectedGroupForMemberRemoval(groupData);
    setRemoveMemberModalOpen(true);
  };

  const closeAddUserModal = () => {
    setAddUserModalOpen(false);
    setSelectedUserType(null);
  };

  const closeAddCourseModal = () => {
    setAddCourseModalOpen(false);
  };

  const closeEditCourseModal = () => {
    setEditCourseModalOpen(false);
    setSelectedCourseId(null);
  };

  const closeDeleteCourseModal = () => {
    setDeleteCourseModalOpen(false);
    setSelectedCourseId(null);
  };

  const closeAddGroupModal = () => {
    setAddGroupModalOpen(false);
  };

  const closeEditGroupModal = () => {
    setEditGroupModalOpen(false);
    setSelectedGroupForEdit(null);
  };

  const closeAddMembersModal = () => {
    setAddMembersModalOpen(false);
    setSelectedGroupData(null);
  };

  const closeGroupActionsModal = () => {
    setGroupActionsModalOpen(false);
    setSelectedGroupActionsData(null);
  };

  const closeConfirmDeleteGroupModal = () => {
    setConfirmDeleteGroupModalOpen(false);
    setSelectedGroupForDeletion(null);
  };

  const openConfirmTeacherAccountingModal = (teacherData: {
    id: string;
    name: string;
  }) => {
    setSelectedTeacherForAccounting(teacherData);
    setConfirmTeacherAccountingModalOpen(true);
  };

  const closeConfirmTeacherAccountingModal = () => {
    setConfirmTeacherAccountingModalOpen(false);
    setSelectedTeacherForAccounting(null);
  };

  const closeRemoveMemberModal = () => {
    setRemoveMemberModalOpen(false);
    setSelectedGroupForMemberRemoval(null);
  };

  const openLessonsModal = (groupData: {
    groupId: string;
    groupName: string;
  }) => {
    setSelectedGroupForLessons(groupData);
    setLessonsModalOpen(true);
  };

  const closeLessonsModal = () => {
    setLessonsModalOpen(false);
    setSelectedGroupForLessons(null);
  };

  const openAddLessonModal = () => {
    setAddLessonModalOpen(true);
  };

  const closeAddLessonModal = () => {
    setAddLessonModalOpen(false);
  };

  const openEditLessonModal = (lessonData: {
    id: string;
    day: string;
    time: string;
    date: string;
    meetingLink?: string;
  }) => {
    setSelectedLessonData(lessonData);
    setEditLessonModalOpen(true);
  };

  const closeEditLessonModal = () => {
    setEditLessonModalOpen(false);
    setSelectedLessonData(null);
  };

  const openDeleteLessonModal = (lessonData: {
    id: string;
    day: string;
    time: string;
    date: string;
    meetingLink?: string;
  }) => {
    setSelectedLessonData(lessonData);
    setDeleteLessonModalOpen(true);
  };

  const closeDeleteLessonModal = () => {
    setDeleteLessonModalOpen(false);
    setSelectedLessonData(null);
  };

  const openUserActionsModal = (userData: {
    id: string;
    name: string;
    userType: "student" | "teacher";
    fullData?: any;
  }) => {
    setSelectedUserForActions(userData);
    setUserActionsModalOpen(true);
  };

  const closeUserActionsModal = () => {
    setUserActionsModalOpen(false);
    setSelectedUserForActions(null);
  };

  const openEditUserModal = (userData) => {
    setSelectedUserData(userData);
    setEditUserModalOpen(true);
  };

  const closeEditUserModal = () => {
    setEditUserModalOpen(false);
    setSelectedUserData(null);
  };

  const openEditTeacherLinkModal = (teacherData) => {
    setSelectedTeacherForLink(teacherData);
    setEditTeacherLinkModalOpen(true);
  };

  const closeEditTeacherLinkModal = () => {
    setEditTeacherLinkModalOpen(false);
    setSelectedTeacherForLink(null);
  };

  const openSetTeacherPriceModal = (teacherData) => {
    setSelectedTeacherForPrice(teacherData);
    setSetTeacherPriceModalOpen(true);
  };

  const closeSetTeacherPriceModal = () => {
    setSetTeacherPriceModalOpen(false);
    setSelectedTeacherForPrice(null);
  };

  const openDeleteUserModal = (userData: {
    id: string;
    name: string;
    userType: "student" | "teacher";
  }) => {
    setSelectedUserForActions(userData);
    setDeleteUserModalOpen(true);
  };

  const openAddCreditsModal = (studentData: {
    userId: string;
    name: string;
    phone: string;
    email: string;
    fullData?: any;
  }) => {
    setSelectedStudentForCredits(studentData);
    setAddCreditsModalOpen(true);

    setAddUserModalOpen(false);
    setSelectedUserType(null);
  };

  const openStudentListModal = (lesson) => {
    setSelectedLessonForStudents(lesson);
    setStudentListModalOpen(true);
  };

  const openStudentReportsModal = (student: { id: string; name?: string }) => {
    setSelectedStudentForReports(student);
    setStudentReportsModalOpen(true);
  };

  const closeDeleteUserModal = () => {
    setDeleteUserModalOpen(false);
    setSelectedUserForActions(null);
  };

  const closeAddCreditsModal = () => {
    setAddCreditsModalOpen(false);
    setSelectedStudentForCredits(null);
  };

  const closeStudentListModal = () => {
    setStudentListModalOpen(false);
    setSelectedLessonForStudents(null);
  };

  const closeStudentReportsModal = () => {
    setStudentReportsModalOpen(false);
    setSelectedStudentForReports(null);
  };

  const setUserType = (type: UserType | null) => {
    setSelectedUserType(type);
  };

  const saveNewUser = async (userData: UserFormData, userType: UserType) => {
    try {
      let result;

      switch (userType) {
        case "admin":
          const adminData = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
          };
          result = await createAdmin(adminData);
          break;

        case "teacher":
          const teacherData = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
            meetingLink: userData.meetingLink,
            availability: "",
          };
          result = await createTeacher(teacherData);
          break;

        case "student":
          const studentData = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
            country: userData.country,
            age: userData.age,
            quranMemorized: userData.quranMemorized || "",
            numOfPartsofQuran: userData.numOfPartsofQuran || 0,
            quranLevel: userData.quranLevel || "",
          };
          result = await createStudent(studentData);
          break;

        default:
          throw new Error(`Unsupported user type: ${userType}`);
      } // Refresh appropriate user list based on user type
      if (userType === "admin") {
        try {
          await getAdmins();
        } catch (error) {
          throw error;
        }
      } else {
        if (userType === "student") {
          await getStudents();
        } else if (userType === "teacher") {
          await getTeachers();
        }
      }

      const createdStudentId =
        (result && result.user && (result.user.id || result.user._id)) ||
        (result && (result.id || result._id));

      if (userType === "student" && createdStudentId) {
        setTimeout(() => {
          openAddCreditsModal({
            userId: createdStudentId,
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
          });
        }, 500);
      } else if (userType === "teacher" && result) {
        const teacherId = result.teacher?._id || result._id;
        const userId = result.user?._id || result.user?.id;
        if (teacherId && userId) {
          setTimeout(() => {
            openSetTeacherPriceModal({
              _id: teacherId,
              userId: userId,
              name: userData.name,
              phone: userData.phone,
              email: userData.email,
              fullData: {
                userId: {
                  _id: userId,
                  name: userData.name,
                  phone: userData.phone,
                  email: userData.email,
                  money: 0,
                },
              },
            });
          }, 500);
        } else {
          closeAddUserModal();
        }
      } else {
        closeAddUserModal();
      }
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (
    userId: string,
    userData: any,
    userType: UserType
  ) => {
    try {
      let result;

      switch (userType) {
        case "admin":
          result = await updateMember(userId, userData);
          break;

        case "teacher":
          result = await updateMember(userId, userData);
          break;

        case "student":
          result = await updateStudent(userId, userData);
          break;

        default:
          throw new Error(`Unsupported user type: ${userType}`);
      } // Refresh appropriate user list based on user type
      if (userType === "student") {
        await getStudents();
      } else if (userType === "teacher") {
        await getTeachers();
      } else {
        await getAdmins();
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateTeacherMeetingLinkOnly = async (
    teacherId: string,
    meetingLink: string
  ) => {
    try {
      const result = await updateTeacherMeetingLink(teacherId, meetingLink); // Refresh teachers data after update
      await getTeachers();

      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleTeacherAccounting = async (teacherId: string) => {
    try {
      // تصفير رصيد الحلقات للمعلم
      await updateTeacher(teacherId, {
        numberOflessonsCridets: 0,
      });
      // تحديث قائمة المعلمين
      await getTeachers();

      closeConfirmTeacherAccountingModal();
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteGroup = async () => {
    try {
      closeConfirmDeleteGroupModal();
      closeGroupActionsModal();

      await getGroups();
    } catch (error) {
      throw error;
    }
  };

  const addCreditsToStudent = async (userId: string, privateAmount: number) => {
    try {
      // إضافة الحلقات للطالب
      const result = await addCreditsAPI(userId, privateAmount);

      await getStudents();
      closeAddCreditsModal();

      return result;
    } catch (error) {
      throw error;
    }
  };

  const saveNewGroup = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Close modal after successful submission
      closeAddGroupModal();
    } catch (error) {
      throw error;
    }
  };

  const value: AdminModalContextType = {
    addUserModalOpen,
    addCourseModalOpen,
    editCourseModalOpen,
    deleteCourseModalOpen,
    addGroupModalOpen,
    editGroupModalOpen,
    addMembersModalOpen,
    groupActionsModalOpen,
    confirmDeleteGroupModalOpen,
    confirmTeacherAccountingModalOpen,
    removeMemberModalOpen,
    lessonsModalOpen,
    addLessonModalOpen,
    editLessonModalOpen,
    deleteLessonModalOpen,
    userActionsModalOpen,
    editUserModalOpen,
    deleteUserModalOpen,
    addCreditsModalOpen,
    studentListModalOpen,
    studentReportsModalOpen,
    editTeacherLinkModalOpen,
    setTeacherPriceModalOpen,

    selectedUserType,
    selectedCourseId,
    selectedGroupData,
    selectedGroupActionsData,
    selectedGroupForDeletion,
    selectedTeacherForAccounting,
    selectedGroupForMemberRemoval,
    selectedGroupForEdit,
    selectedGroupForLessons,
    selectedLessonData,
    selectedUserForActions,
    selectedUserData,
    selectedStudentForCredits,
    selectedLessonForStudents,
    selectedStudentForReports,
    selectedTeacherForLink,
    selectedTeacherForPrice,

    openAddUserModal,
    openAddCourseModal,
    openEditCourseModal,
    openDeleteCourseModal,
    openAddGroupModal,
    openEditGroupModal,
    openAddMembersModal,
    openGroupActionsModal,
    openConfirmDeleteGroupModal,
    openRemoveMemberModal,
    openLessonsModal,
    openAddLessonModal,
    openEditLessonModal,
    openDeleteLessonModal,
    openUserActionsModal,
    openEditUserModal,
    openDeleteUserModal,
    openAddCreditsModal,
    openStudentListModal,
    openStudentReportsModal,

    closeAddUserModal,
    closeAddCourseModal,
    closeEditCourseModal,
    closeDeleteCourseModal,
    closeAddGroupModal,
    closeEditGroupModal,
    closeAddMembersModal,
    closeGroupActionsModal,
    closeConfirmDeleteGroupModal,
    openConfirmTeacherAccountingModal,
    closeConfirmTeacherAccountingModal,
    closeRemoveMemberModal,
    closeLessonsModal,
    closeAddLessonModal,
    closeEditLessonModal,
    closeDeleteLessonModal,
    closeUserActionsModal,
    closeEditUserModal,
    closeDeleteUserModal,
    closeAddCreditsModal,
    closeStudentListModal,
    closeStudentReportsModal,

    setUserType,

    saveNewUser,
    updateUser,
    updateTeacherMeetingLinkOnly,
    saveNewGroup,
    handleDeleteGroup,
    handleTeacherAccounting,
    addCreditsToStudent,
    openEditTeacherLinkModal,
    closeEditTeacherLinkModal,
    openSetTeacherPriceModal,
    closeSetTeacherPriceModal,
  };

  return (
    <AdminModalContext.Provider value={value}>
      {children}
    </AdminModalContext.Provider>
  );
};

export const useAdminModal = (): AdminModalContextType => {
  const context = useContext(AdminModalContext);
  if (!context) {
    throw new Error("useAdminModal must be used within an AdminModalProvider");
  }
  return context;
};
