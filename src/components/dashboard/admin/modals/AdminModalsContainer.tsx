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

  const selectedCourse = selectedCourseId
    ? courses.find((c) => c._id === selectedCourseId)
    : null;

  const handleDeleteGroupWithRefresh = async (groupId: string) => {
    try {
      await handleDeleteGroup(groupId);

    } catch (error) {
      throw error;
    }
  };

  return (
    <>

      {addUserModalOpen && <AddUserModal />}
      {editUserModalOpen && <EditUserModal />}


      {addCourseModalOpen && <AddCourseModal />}


      {editCourseModalOpen && (
        <AddCourseModal
          isEditMode={true}
          editCourseId={selectedCourseId?.toString()}
        />
      )}


      {deleteCourseModalOpen && (
        <DeleteCourseModal
          isOpen={deleteCourseModalOpen}
          onClose={closeDeleteCourseModal}
          courseId={selectedCourseId}
          courseName={selectedCourse?.title}
        />
      )}


      {addGroupModalOpen && <AddGroupModal />}


      {editGroupModalOpen && selectedGroupForEdit && (
        <AddGroupModal
          isEditMode={true}
          editGroupId={selectedGroupForEdit.id}
        />
      )}


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


      {confirmDeleteGroupModalOpen && selectedGroupForDeletion && (
        <ConfirmDeleteGroupModal
          isOpen={confirmDeleteGroupModalOpen}
          onClose={closeConfirmDeleteGroupModal}
          groupId={selectedGroupForDeletion.id}
          groupName={selectedGroupForDeletion.name}
          onConfirmDelete={handleDeleteGroupWithRefresh}
        />
      )}


      {removeMemberModalOpen && selectedGroupForMemberRemoval && (
        <RemoveMemberModal
          isOpen={removeMemberModalOpen}
          onClose={closeRemoveMemberModal}
          groupId={selectedGroupForMemberRemoval.id}
          groupName={selectedGroupForMemberRemoval.name}
          onSuccess={() => {}}
        />
      )}


      {lessonsModalOpen && selectedGroupForLessons && (
        <LessonsModal
          groupId={selectedGroupForLessons.groupId}
          groupName={selectedGroupForLessons.groupName}
        />
      )}


      {addLessonModalOpen && <AddLessonModal />}


      {editLessonModalOpen && <EditLessonModal />}


      {deleteLessonModalOpen && <DeleteLessonModal />}


      {userActionsModalOpen && <UserActionsModal />}


      {deleteUserModalOpen && <DeleteUserModal />}


      {addCreditsModalOpen && <AddCreditsModal />}


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


      {editTeacherLinkModalOpen && <EditTeacherLinkModal />}
    </>
  );
};

export default AdminModalsContainer;
