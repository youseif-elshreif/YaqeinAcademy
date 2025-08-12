"use client";
import React, { useEffect } from "react";
import { useAdminModal } from "@/contexts/AdminModalContext";
import AddUserModal from "./AddUserModal";
import AddCourseModal from "./AddCourseModal";
import EditCourseModal from "./EditCourseModal";
import DeleteCourseModal from "./DeleteCourseModal";
import AddGroupModal from "./AddGroupModal";
import AddMembersModal from "./AddMembersModal";
import GroupActionsModal from "./GroupActionsModal";
import ConfirmDeleteGroupModal from "./ConfirmDeleteGroupModal";
import RemoveMemberModal from "./RemoveMemberModal";
import { coursesData } from "../../../data/courses";

const AdminModalsContainer: React.FC = () => {
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
    selectedCourseId,
    selectedGroupData,
    selectedGroupActionsData,
    selectedGroupForDeletion,
    selectedGroupForMemberRemoval,
    selectedGroupForEdit,
    closeAddCourseModal,
    closeEditCourseModal,
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
      removeMemberModalOpen
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
  ]);

  // Get selected course name for delete modal
  const selectedCourse = selectedCourseId
    ? coursesData.find((c) => c.id === selectedCourseId)
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
      {/* Add User Modal */}
      {addUserModalOpen && <AddUserModal />}

      {/* Add Course Modal */}
      {addCourseModalOpen && (
        <AddCourseModal
          isOpen={addCourseModalOpen}
          onClose={closeAddCourseModal}
        />
      )}

      {/* Edit Course Modal */}
      {editCourseModalOpen && (
        <EditCourseModal
          isOpen={editCourseModalOpen}
          onClose={closeEditCourseModal}
          courseId={selectedCourseId}
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
    </>
  );
};

export default AdminModalsContainer;
