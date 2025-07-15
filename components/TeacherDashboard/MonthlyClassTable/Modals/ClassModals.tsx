import CompleteClassModal from "../../CompleteClassModal";
import PostponeClassModal from "../../PostponeClassModal";
import AddNicknameModal from "../../AddNicknameModal";
import StudentAllDataComponent from "../../StudentAllDataComponent";
import EditGroupNameModal from "../../EditGroupNameModal";
import GroupCompleteClassModal from "../../GroupCompleteClassModal";

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

  // Postpone modal props
  postponeModalOpen: boolean;
  onSavePostpone: (postponeData: any) => void;
  onClosePostponeModal: () => void;

  // Nickname modal props
  nicknameModalOpen: boolean;
  selectedStudent: {
    studentId: number;
    studentName: string;
    nickname: string;
  } | null;
  onSaveNickname: (nickname: string) => void;
  onCloseNicknameModal: () => void;

  // Student all data modal props
  studentAllDataModalOpen: boolean;
  studentAllData: any;
  onCloseStudentAllData: () => void;

  // Group name editing modal props
  editGroupNameModalOpen: boolean;
  selectedGroupData: {
    classId: number;
    currentGroupName: string;
  } | null;
  onSaveGroupName: (newGroupName: string) => void;
  onCloseEditGroupNameModal: () => void;
}

const ClassModals = ({
  completeModalOpen,
  selectedClass,
  onSaveClassCompletion,
  onCloseCompleteModal,
  groupCompleteModalOpen,
  selectedGroupClass,
  onSaveGroupCompletion,
  onCloseGroupCompleteModal,
  postponeModalOpen,
  onSavePostpone,
  onClosePostponeModal,
  nicknameModalOpen,
  selectedStudent,
  onSaveNickname,
  onCloseNicknameModal,
  studentAllDataModalOpen,
  studentAllData,
  onCloseStudentAllData,
  editGroupNameModalOpen,
  selectedGroupData,
  onSaveGroupName,
  onCloseEditGroupNameModal,
}: ClassModalsProps) => {
  return (
    <>
      {/* Complete Class Modal */}
      {completeModalOpen && selectedClass && (
        <CompleteClassModal
          classData={selectedClass}
          onSave={onSaveClassCompletion}
          onClose={onCloseCompleteModal}
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
          onSave={onSaveGroupCompletion}
          onClose={onCloseGroupCompleteModal}
        />
      )}

      {/* Postpone Class Modal */}
      {postponeModalOpen && selectedClass && (
        <PostponeClassModal
          classData={selectedClass}
          onSave={onSavePostpone}
          onClose={onClosePostponeModal}
        />
      )}

      {/* Add Nickname Modal */}
      {nicknameModalOpen && selectedStudent && (
        <AddNicknameModal
          studentData={selectedStudent}
          onSave={onSaveNickname}
          onClose={onCloseNicknameModal}
        />
      )}

      {/* Student All Data Modal */}
      {studentAllDataModalOpen && studentAllData && (
        <StudentAllDataComponent
          studentData={studentAllData}
          onClose={onCloseStudentAllData}
        />
      )}

      {/* Edit Group Name Modal */}
      {editGroupNameModalOpen && selectedGroupData && (
        <EditGroupNameModal
          groupData={selectedGroupData}
          onSave={onSaveGroupName}
          onClose={onCloseEditGroupNameModal}
        />
      )}
    </>
  );
};

export default ClassModals;
