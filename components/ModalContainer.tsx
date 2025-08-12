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
    saveClassPostpone,
    saveStudentNickname,
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

  // Wrapper functions to handle signature mismatches
  const handleSaveNickname = (nickname: string) => {
    if (selectedStudent) {
      saveStudentNickname(nickname, selectedStudent.studentId);
    }
  };

  const handleSaveGroupName = (newGroupName: string) => {
    if (selectedGroupData) {
      saveGroupName(newGroupName, selectedGroupData.classId);
    }
  };

  const handleSaveClassLink = (link: string) => {
    if (selectedClassForLink) {
      saveClassLink(link, selectedClassForLink.id);
    }
  };

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
    addClassLinkModalOpen,
  ]);

  return (
    <>
      {/* Complete Class Modal */}
      {completeModalOpen && selectedClass && (
        <CompleteClassModal
          classData={{
            id: selectedClass.id,
            studentName: selectedClass.students?.[0]?.studentName || "Student",
            date: selectedClass.date,
            time: selectedClass.time,
          }}
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
          classData={{
            id: selectedClass.id,
            studentName: selectedClass.students?.[0]?.studentName || "Student",
            date: selectedClass.date,
            time: selectedClass.time,
          }}
          onSave={saveClassPostpone}
          onClose={closePostponeModal}
        />
      )}
      {/* Add Nickname Modal */}
      {nicknameModalOpen && selectedStudent && selectedStudent.studentName && (
        <AddNicknameModal
          studentData={{
            studentId: selectedStudent.studentId,
            studentName: selectedStudent.studentName,
            nickname: selectedStudent.nickname || "",
          }}
          onSave={handleSaveNickname}
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
          onSave={handleSaveGroupName}
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
          onSubmit={handleSaveClassLink}
          onClose={closeAddClassLinkModal}
        />
      )}
    </>
  );
};

export default ModalContainer;
