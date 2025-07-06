import React, { useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import CompleteClassModal from "@/components/TeacherDashboard/CompleteClassModal";
import PostponeClassModal from "@/components/TeacherDashboard/PostponeClassModal";
import AddNicknameModal from "@/components/TeacherDashboard/AddNicknameModal";
import StudentAllDataComponent from "@/components/TeacherDashboard/StudentAllDataComponent";
import EditGroupNameModal from "@/components/TeacherDashboard/EditGroupNameModal";
import GroupCompleteClassModal from "@/components/TeacherDashboard/GroupCompleteClassModal";
import EditClassLinkModal from "@/components/TeacherDashboard/AddClassLinkModal";

const ModalContainer: React.FC = () => {
  const {
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

    // Actions
    saveClassCompletion,
    savePostpone,
    saveNickname,
    saveGroupName,
    saveGroupCompletion,
    saveClassLink,
    closeCompleteModal,
    closePostponeModal,
    closeNicknameModal,
    closeStudentDataModal,
    closeEditGroupNameModal,
    closeGroupCompleteModal,
    closeAddClassLinkModal,
  } = useModal();

  useEffect(() => {
    if (
      completeModalOpen ||
      postponeModalOpen ||
      nicknameModalOpen ||
      studentAllDataModalOpen ||
      editGroupNameModalOpen ||
      groupCompleteModalOpen ||
      addClassLinkModalOpen
    ) {
      document.documentElement.style.overflowY = "hidden"; // Disable scrolling
    }
    return () => {
      document.documentElement.style.overflowY = "auto"; // Re-enable scrolling on unmount
    };
  }, [
    completeModalOpen,
    postponeModalOpen,
    nicknameModalOpen,
    studentAllDataModalOpen,
    editGroupNameModalOpen,
    groupCompleteModalOpen,
  ]);

  return (
    <>
      {/* Complete Class Modal */}
      {completeModalOpen && selectedClass && (
        <CompleteClassModal
          classData={selectedClass}
          initialData={undefined} // No initial data for single student modal
          isGroup={false} // 🎯 وضوح إن ده single student
          onSave={saveClassCompletion}
          onClose={closeCompleteModal}
        />
      )}

      {/* Group Complete Class Modal */}
      {groupCompleteModalOpen && selectedGroupClass && (
        <GroupCompleteClassModal
          groupClassData={{
            id: selectedGroupClass.id,
            groupName: selectedGroupClass.groupName,
            students: selectedGroupClass.students.map((student: any) => ({
              id: student.studentId,
              name: student.studentName,
            })),
            date: selectedGroupClass.date,
            time: selectedGroupClass.time,
          }}
          onSave={saveGroupCompletion}
          onClose={closeGroupCompleteModal}
        />
      )}

      {/* Postpone Class Modal */}
      {postponeModalOpen && selectedClass && (
        <PostponeClassModal
          classData={selectedClass}
          onSave={savePostpone}
          onClose={closePostponeModal}
        />
      )}

      {/* Add Nickname Modal */}
      {nicknameModalOpen && selectedStudent && (
        <AddNicknameModal
          studentData={selectedStudent}
          onSave={saveNickname}
          onClose={closeNicknameModal}
        />
      )}

      {/* Student All Data Modal */}
      {studentAllDataModalOpen && studentAllData && (
        <StudentAllDataComponent
          studentData={studentAllData}
          onClose={closeStudentDataModal}
        />
      )}

      {/* Edit Group Name Modal */}
      {editGroupNameModalOpen && selectedGroupData && (
        <EditGroupNameModal
          groupData={selectedGroupData}
          onSave={saveGroupName}
          onClose={closeEditGroupNameModal}
        />
      )}

      {/* Edit Class Link Modal */}
      {addClassLinkModalOpen && selectedClassForLink && (
        <EditClassLinkModal
          isOpen={addClassLinkModalOpen}
          classInfo={{
            ...selectedClassForLink,
            currentLink: selectedClassForLink.classLink, // Pass current link
          }}
          onSubmit={saveClassLink}
          onClose={closeAddClassLinkModal}
        />
      )}
    </>
  );
};

export default ModalContainer;
