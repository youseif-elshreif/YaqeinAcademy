import React, { useEffect } from "react";
import { useModal } from "@/src/contexts/ModalContext";
import CompleteClassModal from "@/src/components/dashboard/teacher/CompleteClassModal";
import StudentAllDataComponent from "@/src/components/dashboard/teacher/StudentAllDataComponent";
import GroupCompleteClassModal from "@/src/components/dashboard/teacher/GroupCompleteClassModal";
import EditClassLinkModal from "@/src/components/dashboard/teacher/AddClassLinkModal";
import StudentListModal from "@/src/components/dashboard/teacher/StudentListModal";
import StudentReportsModal from "@/src/components/dashboard/teacher/StudentReportsModal";

const ModalContainer: React.FC = () => {
  const {

    completeModalOpen,
    studentAllDataModalOpen,

    groupCompleteModalOpen,
    addClassLinkModalOpen,
    studentListModalOpen,
    studentReportsModalOpen,

    selectedLesson,
    selectedLessonForStudents,
    selectedStudentForReports,
    studentAllData,

    selectedClassForLink,

    saveClassLink,
    closeCompleteModal,
    closeStudentDataModal,

    closeGroupCompleteModal,
    closeAddClassLinkModal,
    closeStudentListModal,
    closeStudentReportsModal,
    openStudentReportsModal,
  } = useModal();

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

      {groupCompleteModalOpen && selectedLesson && (
        <GroupCompleteClassModal
          isOpen={groupCompleteModalOpen}
          lessonId={selectedLesson._id}
          onClose={closeGroupCompleteModal}
          onSuccess={() => {
            closeGroupCompleteModal();

          }}
        />
      )}


      {studentAllDataModalOpen && studentAllData && (
        <StudentAllDataComponent
          studentData={studentAllData}
          onClose={closeStudentDataModal}
        />
      )}


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
    </>
  );
};

export default ModalContainer;
