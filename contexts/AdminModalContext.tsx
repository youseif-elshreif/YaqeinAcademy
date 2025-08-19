"use client";
import React, { createContext, useContext, useState } from "react";
import {
  UserFormData,
  UserType,
  AdminModalContextType,
  AdminModalProviderProps,
} from "@/utils/types";
import { useAdminDashboardContext } from "./AdminDashboardContext";
import { useAuth } from "./AuthContext";
import CountrySelect from "@/components/auth/CountrySelect";

const AdminModalContext = createContext<AdminModalContextType | undefined>(
  undefined
);

export const AdminModalProvider: React.FC<AdminModalProviderProps> = ({
  children,
}) => {
  const { createTeacher, createStudent, createAdmin, deleteGroup, getGroups } =
    useAdminDashboardContext();
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

  // Selected data states
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(
    null
  );
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
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
  } | null>(null);

  const [selectedUserForActions, setSelectedUserForActions] = useState<{
    id: string;
    name: string;
    userType: "student" | "teacher";
  } | null>(null);

  const [selectedUserData, setSelectedUserData] = useState<any>(null);

  // Open modal actions
  const openAddUserModal = () => {
    setAddUserModalOpen(true);
    setSelectedUserType(null); // Reset user type selection
  };

  const openAddCourseModal = () => {
    setAddCourseModalOpen(true);
  };

  const openEditCourseModal = (courseId: number) => {
    setSelectedCourseId(courseId);
    setEditCourseModalOpen(true);
  };

  const openDeleteCourseModal = (courseId: number) => {
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

  const openDeleteUserModal = (userData: {
    id: string;
    name: string;
    userType: "student" | "teacher";
  }) => {
    setSelectedUserForActions(userData);
    setDeleteUserModalOpen(true);
  };

  const closeDeleteUserModal = () => {
    setDeleteUserModalOpen(false);
    setSelectedUserForActions(null);
  };

  // User type selection
  const setUserType = (type: UserType | null) => {
    setSelectedUserType(type);
  };

  // Save actions
  const saveNewUser = async (userData: UserFormData, userType: UserType) => {
    try {
      console.log("=== CREATING NEW USER ===");
      console.log("User Type:", userType);
      console.log("User Data:", userData);

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
          };
          result = await createTeacher(token, teacherData);
          break;

        case "student":
          const studentData = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
            quranMemorized: userData.quranMemorized || "",
            numOfPartsofQuran: userData.numOfPartsofQuran || 0,
          };
          result = await createStudent(studentData);
          break;

        default:
          throw new Error(`Unsupported user type: ${userType}`);
      }

      console.log("✅ User created successfully:", result);

      // Close modal after successful submission
      closeAddUserModal();
    } catch (error) {
      console.error("❌ Error creating user:", error);
      // يمكنك إضافة رسالة خطأ هنا للمستخدم
      throw error;
    }
  };

  // Handle group deletion
  const handleDeleteGroup = async (groupId: string) => {
    try {
      if (!token) {
        throw new Error("No authentication token available");
      }

      console.log("=== DELETING GROUP ===");
      console.log("Group ID:", groupId);

      const result = await deleteGroup(token, groupId);
      console.log("✅ Group deleted successfully:", result);

      // Close modal after successful deletion
      closeConfirmDeleteGroupModal();
      closeGroupActionsModal();

      // Refresh groups data directly
      await getGroups(token);
    } catch (error) {
      console.error("❌ Error deleting group:", error);
      throw error;
    }
  };

  // Save new group
  const saveNewGroup = async (groupData: any) => {
    try {
      console.log("=== CREATING NEW GROUP ===");
      console.log("Group Data:", groupData);

      // TODO: Add actual API call for creating groups
      // For now, just simulate the creation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("✅ Group created successfully:", groupData);

      // Close modal after successful submission
      closeAddGroupModal();
    } catch (error) {
      console.error("❌ Error creating group:", error);
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

    // User type selection
    setUserType,

    // Save actions
    saveNewUser,
    saveNewGroup,
    handleDeleteGroup,
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
