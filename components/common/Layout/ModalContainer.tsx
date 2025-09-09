import React, { useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import CompleteClassModal from "@/components/dashboard/teacher/CompleteClassModal";
import StudentAllDataComponent from "@/components/dashboard/teacher/StudentAllDataComponent";
import GroupCompleteClassModal from "@/components/dashboard/teacher/GroupCompleteClassModal";
import EditClassLinkModal from "@/components/dashboard/teacher/AddClassLinkModal";
import StudentListModal from "@/components/dashboard/teacher/StudentListModal";
import StudentReportsModal from "@/components/dashboard/teacher/StudentReportsModal";

const ModalContainer: React.FC = () => {
  const {
    // Modal states
    completeModalOpen,
    studentAllDataModalOpen,

    groupCompleteModalOpen,
    addClassLinkModalOpen,
    studentListModalOpen,
    studentReportsModalOpen,

    // Selected data
    selectedLesson,
    selectedLessonForStudents,
    selectedStudentForReports,
    studentAllData,

    // selectedGroupClass,
    selectedClassForLink,

    // Actions
    // saveClassCompletion,
    // saveGroupCompletion,
    saveClassLink,
    closeCompleteModal,
    closeStudentDataModal,

    closeGroupCompleteModal,
    closeAddClassLinkModal,
    closeStudentListModal,
    closeStudentReportsModal,
    openStudentReportsModal,
  } = useModal();

  // Group name edit removed

  const handleSaveClassLink = (link: string) => {
    if (selectedClassForLink) {
      saveClassLink(link, selectedClassForLink.id);
    }
  };

  useEffect(() => {
    if (completeModalOpen || groupCompleteModalOpen || addClassLinkModalOpen) {
      document.documentElement.style.overflowY = "hidden"; // Disable scrolling
    }
    return () => {
      document.documentElement.style.overflowY = "auto"; // Re-enable scrolling on unmount
    };
  }, [
    completeModalOpen,
    studentAllDataModalOpen,

    groupCompleteModalOpen,
    addClassLinkModalOpen,
  ]);

  return (
    <>
      {/* Complete Class Modal */}
      {completeModalOpen && selectedLesson && (
        <CompleteClassModal
          mode="single"
          lessonId={selectedLesson._id}
          scheduledAt={selectedLesson.scheduledAt}
          student={{
            id:
              Array.isArray(selectedLesson.groupId?.members) &&
              selectedLesson.groupId.members[0]?._id
                ? selectedLesson.groupId.members[0]?._id
                : selectedLesson.studentId || "",
            name:
              Array.isArray(selectedLesson.groupId?.members) &&
              selectedLesson.groupId.members[0]?.name
                ? selectedLesson.groupId.members[0]?.name
                : selectedLesson.studentName || "طالب",
          }}
          groupName={selectedLesson.groupId?.name}
          onClose={closeCompleteModal}
        />
      )}
      {/* Group Complete Class Modal */}
      {groupCompleteModalOpen && selectedLesson && (
        <GroupCompleteClassModal
          isOpen={groupCompleteModalOpen}
          lessonId={selectedLesson._id}
          onClose={closeGroupCompleteModal}
          onSuccess={() => {
            closeGroupCompleteModal();
            // يمكن إضافة منطق إضافي هنا مثل تحديث البيانات
          }}
        />
      )}
      {/* Postpone Class Modal removed */}
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
          classData={selectedClassForLink}
          classInfo={{
            ...selectedClassForLink,
            currentLink: selectedClassForLink.classLink, // Pass current link
          }}
          onSave={handleSaveClassLink}
          onSubmit={handleSaveClassLink}
          onClose={closeAddClassLinkModal}
        />
      )}

      {/* Student List Modal (for viewing lesson members) */}
      {studentListModalOpen && selectedLessonForStudents && (
        <StudentListModal
          isOpen={studentListModalOpen}
          onClose={closeStudentListModal}
          lesson={selectedLessonForStudents}
          onOpenStudentReports={(s) => openStudentReportsModal(s)}
        />
      )}

      {/* Student Reports Modal */}
      {studentReportsModalOpen && selectedStudentForReports && (
        <StudentReportsModal
          isOpen={studentReportsModalOpen}
          onClose={closeStudentReportsModal}
          student={selectedStudentForReports}
        />
      )}
    </>
  );
};

export default ModalContainer;
