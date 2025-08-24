import React, { useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import CompleteClassModal from "@/components/dashboard/teacher/CompleteClassModal";
import PostponeClassModal from "@/components/dashboard/teacher/PostponeClassModal";
import StudentAllDataComponent from "@/components/dashboard/teacher/StudentAllDataComponent";
import GroupCompleteClassModal from "@/components/dashboard/teacher/GroupCompleteClassModal";
import EditClassLinkModal from "@/components/dashboard/teacher/AddClassLinkModal";

const ModalContainer: React.FC = () => {
  const {
    // Modal states
    completeModalOpen,
    postponeModalOpen,
    studentAllDataModalOpen,

    groupCompleteModalOpen,
    addClassLinkModalOpen,

    // Selected data
    selectedClass,
    studentAllData,

    selectedGroupClass,
    selectedClassForLink,

    // Actions
    saveClassCompletion,
    saveClassPostpone,

    saveGroupCompletion,
    saveClassLink,
    closeCompleteModal,
    closePostponeModal,
    closeStudentDataModal,

    closeGroupCompleteModal,
    closeAddClassLinkModal,
  } = useModal();

  // Group name edit removed

  const handleSaveClassLink = (link: string) => {
    if (selectedClassForLink) {
      saveClassLink(link, selectedClassForLink.id);
    }
  };

  useEffect(() => {
    if (
      completeModalOpen ||
      postponeModalOpen ||
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
    studentAllDataModalOpen,

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
      {/* Student All Data Modal */}
      {studentAllDataModalOpen && studentAllData && (
        <StudentAllDataComponent
          studentData={studentAllData}
          onClose={closeStudentDataModal}
        />
      )}
      {/* Edit Group Name Modal removed */}
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
