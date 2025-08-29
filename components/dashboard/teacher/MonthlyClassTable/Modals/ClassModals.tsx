import StudentAllDataComponent from "@/components/dashboard/teacher/StudentAllDataComponent";

interface ClassModalsProps {
  // Complete modal props
  completeModalOpen: boolean;
  selectedClass: {
    id: number;
    studentName: string;
    date: string;
    time: string;
  } | null;
  onSaveClassCompletion: (completionData: any) => void;
  onCloseCompleteModal: () => void;

  // Group complete modal props
  groupCompleteModalOpen: boolean;
  selectedGroupClass: any;
  onSaveGroupCompletion: (completionData: any[]) => void;
  onCloseGroupCompleteModal: () => void;

  // Postpone and Nickname modals removed from this aggregator

  // Student all data modal props
  studentAllDataModalOpen: boolean;
  studentAllData: any;
  onCloseStudentAllData: () => void;

  // Group name editing modal removed
}

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
