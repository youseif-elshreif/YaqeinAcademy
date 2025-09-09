import StudentAllDataComponent from "@/src/components/dashboard/teacher/StudentAllDataComponent";
import { ClassModalsProps } from "@/src/types";

const ClassModals = ({

  studentAllDataModalOpen,
  studentAllData,
  onCloseStudentAllData,
}: ClassModalsProps) => {
  return (
    <>



      {studentAllDataModalOpen && studentAllData && (
        <StudentAllDataComponent
          studentData={studentAllData}
          onClose={onCloseStudentAllData}
        />
      )}


    </>
  );
};

export default ClassModals;
