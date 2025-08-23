"use client";
import React, { useEffect } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import AddUserModal from "./users/AddUserModal";
import EditUserModal from "./users/EditUserModal";
import AddCourseModal from "./courses/AddCourseModal";
import DeleteCourseModal from "./courses/DeleteCourseModal";
import AddGroupModal from "./groups/AddGroupModal";
import AddMembersModal from "./groups/AddMembersModal";
import GroupActionsModal from "./groups/GroupActionsModal";
import ConfirmDeleteGroupModal from "./groups/ConfirmDeleteGroupModal";
import RemoveMemberModal from "./groups/RemoveMemberModal";
import LessonsModal from "./lessons/LessonsModal";
import AddLessonModal from "./lessons/AddLessonModal";
import EditLessonModal from "./lessons/EditLessonModal";
import DeleteLessonModal from "./lessons/DeleteLessonModal";
import UserActionsModal from "./users/UserActionsModal";
import DeleteUserModal from "./users/DeleteUserModal";
import AddCreditsModal from "./AddCreditsModal";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";

const AdminModalsContainer: React.FC = () => {
  const { courses } = useAdminDashboardContext();
  const {
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
    selectedCourseId,
    selectedGroupData,
    selectedGroupActionsData,
    selectedGroupForDeletion,
    selectedGroupForMemberRemoval,
    selectedGroupForEdit,
    selectedGroupForLessons,
    closeDeleteCourseModal,
    closeGroupActionsModal,
    closeConfirmDeleteGroupModal,
    closeRemoveMemberModal,
    openConfirmDeleteGroupModal,
    openRemoveMemberModal,
    openAddMembersModal,
    openEditGroupModal,
    handleDeleteGroup,
  } = useAdminModal();

  useEffect(() => {
    if (
      addUserModalOpen ||
      addCourseModalOpen ||
      editCourseModalOpen ||
      deleteCourseModalOpen ||
      addGroupModalOpen ||
      editGroupModalOpen ||
      addMembersModalOpen ||
      confirmDeleteGroupModalOpen ||
      removeMemberModalOpen ||
      lessonsModalOpen ||
      addLessonModalOpen ||
      editLessonModalOpen ||
      deleteLessonModalOpen ||
      userActionsModalOpen ||
      editUserModalOpen ||
      deleteUserModalOpen ||
      addCreditsModalOpen
    ) {
      document.documentElement.style.overflowY = "hidden"; // Disable scrolling
    }
    return () => {
      document.documentElement.style.overflowY = "auto"; // Re-enable scrolling on unmount
    };
  }, [
    addUserModalOpen,
    addCourseModalOpen,
    editCourseModalOpen,
    deleteCourseModalOpen,
    addGroupModalOpen,
    editGroupModalOpen,
    addMembersModalOpen,
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
  ]);

  // Get selected course name for delete modal
  const selectedCourse = selectedCourseId
    ? courses.find((c) => c._id === selectedCourseId)
    : null;

  // Wrapper for handleDeleteGroup to refresh data
  const handleDeleteGroupWithRefresh = async (groupId: string) => {
    try {
      await handleDeleteGroup(groupId);
      // No need for callback since handleDeleteGroup now handles refresh internally
    } catch (error) {
      console.error("Error in delete group wrapper:", error);
      throw error;
    }
  };

  return (
    <>
      {/* Add/Edit User Modals */}
      {addUserModalOpen && <AddUserModal />}
      {editUserModalOpen && <EditUserModal />}

      {/* Add Course Modal */}
      {addCourseModalOpen && <AddCourseModal />}

      {/* Edit Course Modal */}
      {editCourseModalOpen && (
        <AddCourseModal
          isEditMode={true}
          editCourseId={selectedCourseId?.toString()}
        />
      )}

      {/* Delete Course Modal */}
      {deleteCourseModalOpen && (
        <DeleteCourseModal
          isOpen={deleteCourseModalOpen}
          onClose={closeDeleteCourseModal}
          courseId={selectedCourseId}
          courseName={selectedCourse?.title}
        />
      )}

      {/* Add Group Modal */}
      {addGroupModalOpen && <AddGroupModal />}

      {/* Edit Group Modal - using AddGroupModal in edit mode */}
      {editGroupModalOpen && selectedGroupForEdit && (
        <AddGroupModal
          isEditMode={true}
          editGroupId={selectedGroupForEdit.id}
        />
      )}

      {/* Add Members Modal */}
      {addMembersModalOpen && selectedGroupData && (
        <AddMembersModal
          groupId={selectedGroupData.id}
          groupName={selectedGroupData.name}
          groupType={selectedGroupData.type}
          onSuccess={() => {
            console.log("Members added successfully!");
          }}
        />
      )}

      {/* Group Actions Modal */}
      {groupActionsModalOpen && selectedGroupActionsData && (
        <GroupActionsModal
          isOpen={groupActionsModalOpen}
          onClose={closeGroupActionsModal}
          groupId={selectedGroupActionsData.id}
          groupName={selectedGroupActionsData.name}
          onEdit={(groupId, groupName) => {
            console.log("Edit group:", groupId, groupName);
            openEditGroupModal({ id: groupId, name: groupName });
          }}
          onDelete={(groupId, groupName) => {
            console.log("Delete group:", groupId, groupName);
            openConfirmDeleteGroupModal({ id: groupId, name: groupName });
          }}
          onAddMember={(groupId, groupName, groupType) => {
            console.log("Add member to group:", groupId, groupName, groupType);
            openAddMembersModal({
              id: groupId,
              name: groupName,
              type: groupType,
            });
          }}
          onRemoveMember={(groupId, groupName) => {
            console.log("Remove member from group:", groupId, groupName);
            openRemoveMemberModal({ id: groupId, name: groupName });
          }}
        />
      )}

      {/* Confirm Delete Group Modal */}
      {confirmDeleteGroupModalOpen && selectedGroupForDeletion && (
        <ConfirmDeleteGroupModal
          isOpen={confirmDeleteGroupModalOpen}
          onClose={closeConfirmDeleteGroupModal}
          groupId={selectedGroupForDeletion.id}
          groupName={selectedGroupForDeletion.name}
          onConfirmDelete={handleDeleteGroupWithRefresh}
        />
      )}

      {/* Remove Member Modal */}
      {removeMemberModalOpen && selectedGroupForMemberRemoval && (
        <RemoveMemberModal
          isOpen={removeMemberModalOpen}
          onClose={closeRemoveMemberModal}
          groupId={selectedGroupForMemberRemoval.id}
          groupName={selectedGroupForMemberRemoval.name}
          onSuccess={() => {
            console.log("Member removed successfully!");
          }}
        />
      )}

      {/* Lessons Modal */}
      {lessonsModalOpen && selectedGroupForLessons && (
        <LessonsModal
          groupId={selectedGroupForLessons.groupId}
          groupName={selectedGroupForLessons.groupName}
        />
      )}

      {/* Add Lesson Modal */}
      {addLessonModalOpen && <AddLessonModal />}

      {/* Edit Lesson Modal */}
      {editLessonModalOpen && <EditLessonModal />}

      {/* Delete Lesson Modal */}
      {deleteLessonModalOpen && <DeleteLessonModal />}

      {/* User Actions Modal */}
      {userActionsModalOpen && <UserActionsModal />}

      {/* Delete User Modal */}
      {deleteUserModalOpen && <DeleteUserModal />}

      {/* Add Credits Modal */}
      {addCreditsModalOpen && <AddCreditsModal />}
    </>
  );
};

export default AdminModalsContainer;
