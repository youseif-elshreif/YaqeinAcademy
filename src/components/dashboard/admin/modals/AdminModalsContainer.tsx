"use client";
import React, { useEffect } from "react";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import AddUserModal from "./users/AddUserModal";
import EditUserModal from "./users/EditUserModal";
import EditTeacherLinkModal from "./users/EditTeacherLinkModal";
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
import { useCoursesContext } from "@/src/contexts/CoursesContext";
import StudentListModal from "@/src/components/dashboard/teacher/StudentListModal";
import StudentReportsModal from "@/src/components/dashboard/teacher/StudentReportsModal";

const AdminModalsContainer: React.FC = () => {
  const { courses } = useCoursesContext();
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
    studentListModalOpen,
    studentReportsModalOpen,
    editTeacherLinkModalOpen,
    selectedCourseId,
    selectedLessonForStudents,
    selectedStudentForReports,
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
    closeAddMembersModal,
    openConfirmDeleteGroupModal,
    openRemoveMemberModal,
    openAddMembersModal,
    openEditGroupModal,
    handleDeleteGroup,
    closeStudentListModal,
    closeStudentReportsModal,
    openStudentReportsModal,
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
      addCreditsModalOpen ||
      studentListModalOpen ||
      editTeacherLinkModalOpen
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
    studentListModalOpen,
    editTeacherLinkModalOpen,
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
          isOpen={addMembersModalOpen}
          onClose={closeAddMembersModal}
          groupId={selectedGroupData.id}
          groupName={selectedGroupData.name}
          groupType={selectedGroupData.type}
          onSuccess={() => {}}
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
            openEditGroupModal({ id: groupId, name: groupName });
          }}
          onDelete={(groupId, groupName) => {
            openConfirmDeleteGroupModal({ id: groupId, name: groupName });
          }}
          onAddMember={(groupId, groupName, groupType) => {
            openAddMembersModal({
              id: groupId,
              name: groupName,
              type: groupType,
            });
          }}
          onRemoveMember={(groupId, groupName) => {
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
          onSuccess={() => {}}
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

      {/* Student List Modal (shared) */}
      {studentListModalOpen && selectedLessonForStudents && (
        <StudentListModal
          isOpen={studentListModalOpen}
          onClose={closeStudentListModal}
          lesson={selectedLessonForStudents}
          onOpenStudentReports={(s) => openStudentReportsModal(s)}
        />
      )}

      {studentReportsModalOpen && selectedStudentForReports && (
        <StudentReportsModal
          isOpen={studentReportsModalOpen}
          onClose={closeStudentReportsModal}
          student={selectedStudentForReports}
        />
      )}

      {/* Edit Teacher Link Modal */}
      {editTeacherLinkModalOpen && <EditTeacherLinkModal />}
    </>
  );
};

export default AdminModalsContainer;
