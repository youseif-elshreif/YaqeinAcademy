import StudentAllDataComponent from "@/components/dashboard/teacher/StudentAllDataComponent";
import { ClassModalsProps } from "@/types";

const ClassModals = ({
  // keep only postpone/nickname/student data props here; completion modals use context now
  studentAllDataModalOpen,
  studentAllData,
  onCloseStudentAllData,
}: ClassModalsProps) => {
  return (
    <>
      {/* Complete modals are now handled in ModalContainer.tsx */}

      {/* Student All Data Modal */}
      {studentAllDataModalOpen && studentAllData && (
        <StudentAllDataComponent
          studentData={studentAllData}
          onClose={onCloseStudentAllData}
        />
      )}

      {/* Edit Group Name Modal removed */}
    </>
  );
};

export default ClassModals;


