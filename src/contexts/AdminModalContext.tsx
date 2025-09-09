"use client";
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
import { useAuth } from "./AuthContext";

const AdminModalContext = createContext<AdminModalContextType | undefined>(
  undefined
);

export const AdminModalProvider: React.FC<AdminModalProviderProps> = ({
  children,
}) => {
  const { createTeacher, getTeachers, updateTeacherMeetingLink } =
    useTeachersContext();
  const {
    createStudent,
    getStudents,
    addCreditsToStudent: addCreditsAPI,
    updateStudent,
    updateMember,
  } = useStudentsContext();
  const { createAdmin, getAdmins } = useAdminStatsContext();
  const { deleteGroup, getGroups } = useGroupsContext();

  const { token } = useAuth();

  // Modal states
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
  const [removeMemberModalOpen, setRemoveMemberModalOpen] = useState(false);
  const [lessonsModalOpen, setLessonsModalOpen] = useState(false);
  const [addLessonModalOpen, setAddLessonModalOpen] = useState(false);
  const [editLessonModalOpen, setEditLessonModalOpen] = useState(false);
  const [deleteLessonModalOpen, setDeleteLessonModalOpen] = useState(false);

  // User actions modals
  const [userActionsModalOpen, setUserActionsModalOpen] = useState(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [addCreditsModalOpen, setAddCreditsModalOpen] = useState(false);
  const [studentListModalOpen, setStudentListModalOpen] = useState(false);
  const [studentReportsModalOpen, setStudentReportsModalOpen] = useState(false);
  const [editTeacherLinkModalOpen, setEditTeacherLinkModalOpen] =
    useState(false);

  // Selected data states
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
  const [selectedStudentForCredits, setSelectedStudentForCredits] = useState<{
    userId: string;
    name: string;
  } | null>(null);
  const [selectedLessonForStudents, setSelectedLessonForStudents] = useState<
    any | null
  >(null);
  const [selectedStudentForReports, setSelectedStudentForReports] = useState<{
    id: string;
    name?: string;
  } | null>(null);

  // Open modal actions
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

  // Close modal actions
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

  const closeRemoveMemberModal = () => {
    setRemoveMemberModalOpen(false);
    setSelectedGroupForMemberRemoval(null);
  };

  // Lessons Modal handlers
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

  // User Actions Modal handlers
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

  const openEditUserModal = (userData: any) => {
    setSelectedUserData(userData);
    setEditUserModalOpen(true);
  };

  const closeEditUserModal = () => {
    setEditUserModalOpen(false);
    setSelectedUserData(null);
  };

  const openEditTeacherLinkModal = (teacherData: any) => {
    setSelectedTeacherForLink(teacherData);
    setEditTeacherLinkModalOpen(true);
  };

  const closeEditTeacherLinkModal = () => {
    setEditTeacherLinkModalOpen(false);
    setSelectedTeacherForLink(null);
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
  }) => {
    setSelectedStudentForCredits(studentData);
    setAddCreditsModalOpen(true);
    // Close add user modal if it's open
    setAddUserModalOpen(false);
    setSelectedUserType(null);
  };

  // Open Student List Modal (shared with teacher modal component)
  const openStudentListModal = (lesson: any) => {
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

  // User type selection
  const setUserType = (type: UserType | null) => {
    setSelectedUserType(type);
  };

  // Save actions
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
          if (!token) {
            throw new Error("No authentication token available");
          }
          const teacherData = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
            meetingLink: userData.meetingLink,
            availability: "",
          };
          result = await createTeacher(token, teacherData);
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
          if (!token) {
            throw new Error("No authentication token available");
          }
          result = await createStudent(token, studentData);
          break;

        default:
          throw new Error(`Unsupported user type: ${userType}`);
      } // Refresh appropriate user list based on user type
      if (userType === "admin") {
        if (!token) {
        } else {
          try {
            await getAdmins(token);
          } catch (e) {}
        }
      } else if (token) {
        if (userType === "student") {
          await getStudents(token);
        } else if (userType === "teacher") {
          await getTeachers(token);
        }
      }

      // For students, automatically open credits modal
      // Try to extract created student id from different possible shapes
      const createdStudentId =
        (result && result.user && (result.user.id || result.user._id)) ||
        (result && (result.id || result._id));

      if (userType === "student" && createdStudentId) {
        setTimeout(() => {
          openAddCreditsModal({
            userId: createdStudentId,
            name: userData.name,
          });
        }, 500);
      } else {
        // Close modal after successful submission for non-students
        closeAddUserModal();
      }
    } catch (error) {
      // يمكنك إضافة رسالة خطأ هنا للمستخدم
      throw error;
    }
  };

  // Update User function
  const updateUser = async (
    userId: string,
    userData: any,
    userType: UserType
  ) => {
    try {
      if (!token) {
        throw new Error("No authentication token available");
      }

      let result;

      switch (userType) {
        case "admin":
          // Use updateMember for admin users
          result = await updateMember(token, userId, userData);
          break;

        case "teacher":
          // Use updateMember for teacher users as well
          result = await updateMember(token, userId, userData);
          break;

        case "student":
          result = await updateStudent(token, userId, userData);
          break;

        default:
          throw new Error(`Unsupported user type: ${userType}`);
      } // Refresh appropriate user list based on user type
      if (userType === "student") {
        await getStudents(token);
      } else if (userType === "teacher") {
        await getTeachers(token);
      } else {
        await getAdmins(token);
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  // Update teacher meeting link only
  const updateTeacherMeetingLinkOnly = async (
    teacherId: string,
    meetingLink: string
  ) => {
    try {
      if (!token) {
        throw new Error("No authentication token available");
      }

      const result = await updateTeacherMeetingLink(
        token,
        teacherId,
        meetingLink
      ); // Refresh teachers data after update
      await getTeachers(token);

      return result;
    } catch (error) {
      throw error;
    }
  };

  // Handle group deletion
  const handleDeleteGroup = async (groupId: string) => {
    try {
      if (!token) {
        throw new Error("No authentication token available");
      }
      const result = await deleteGroup(token, groupId); // Close modal after successful deletion
      closeConfirmDeleteGroupModal();
      closeGroupActionsModal();

      // Refresh groups data directly
      await getGroups(token);
    } catch (error) {
      throw error;
    }
  };

  // Add credits to student
  const addCreditsToStudent = async (
    studentId: string,
    privateAmount: number,
    publicAmount: number = 0
  ) => {
    try {
      if (!token) {
        throw new Error("No authentication token available");
      } // Use the API from AdminDashboardContext
      const result = await addCreditsAPI(
        token,
        studentId,
        privateAmount,
        publicAmount
      );

      getStudents(token);

      // Close modal after successful addition
      closeAddCreditsModal();

      return result;
    } catch (error) {
      throw error;
    }
  };

  // Save new group
  const saveNewGroup = async (groupData: any) => {
    try {
      // TODO: Add actual API call for creating groups
      // For now, just simulate the creation
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Close modal after successful submission
      closeAddGroupModal();
    } catch (error) {
      throw error;
    }
  };

  const value: AdminModalContextType = {
    // Modal states
    addUserModalOpen,
    addCourseModalOpen,
    editCourseModalOpen,
    deleteCourseModalOpen,
    addGroupModalOpen,
    editGroupModalOpen,
    addMembersModalOpen,
    groupActionsModalOpen,
    confirmDeleteGroupModalOpen,
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

    // Selected data
    selectedUserType,
    selectedCourseId,
    selectedGroupData,
    selectedGroupActionsData,
    selectedGroupForDeletion,
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

    // Modal actions
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

    // Close actions
    closeAddUserModal,
    closeAddCourseModal,
    closeEditCourseModal,
    closeDeleteCourseModal,
    closeAddGroupModal,
    closeEditGroupModal,
    closeAddMembersModal,
    closeGroupActionsModal,
    closeConfirmDeleteGroupModal,
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

    // User type selection
    setUserType,

    // Save actions
    saveNewUser,
    updateUser,
    updateTeacherMeetingLinkOnly,
    saveNewGroup,
    handleDeleteGroup,
    addCreditsToStudent,
    openEditTeacherLinkModal,
    closeEditTeacherLinkModal,
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
