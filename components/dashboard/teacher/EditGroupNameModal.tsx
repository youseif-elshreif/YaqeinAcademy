import React, { useState } from "react";
import styles from "./EditGroupNameModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  FormField,
  ErrorDisplay,
} from "@/components/common/Modal";

interface GroupData {
  classId: number;
  currentGroupName: string;
}

interface EditGroupNameModalProps {
  groupData: GroupData;
  onSave: (newGroupName: string) => void;
  onClose: () => void;
}

const EditGroupNameModal: React.FC<EditGroupNameModalProps> = ({
  groupData,
  onSave,
  onClose,
}) => {
  const [groupName, setGroupName] = useState(groupData.currentGroupName);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setError("اسم الحلقة مطلوب");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      // TODO: Replace with actual API call when backend is ready
      console.log("=== UPDATE GROUP NAME API CALL ===");
      console.log("Class ID:", groupData.classId);
      console.log("Old Group Name:", groupData.currentGroupName);
      console.log("New Group Name:", groupName.trim());
      console.log("API Endpoint: PUT /api/classes/group-name");
      console.log("Request Body:", {
        classId: groupData.classId,
        groupName: groupName.trim(),
      });
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("✅ Group name updated successfully");
      onSave(groupName.trim());
    } catch (err) {
      setError("حدث خطأ أثناء حفظ اسم الحلقة");
      console.error("❌ Error updating group name:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  // Backdrop click handled by ModalContainer

  const actions = [
    {
      label: "إلغاء",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isSubmitting,
    },
    {
      label: isSubmitting ? "جاري الحفظ" : "حفظ",
      onClick: () => {},
      variant: "primary" as const,
      disabled: !groupName.trim() || isSubmitting,
      type: "submit" as const,
    },
  ];

  return (
    <ModalContainer isOpen={true} isClosing={isClosing} variant="add">
      <ModalHeader
        title="تعديل اسم الحلقة"
        onClose={handleClose}
        disabled={isSubmitting}
        variant="add"
      />
      <form onSubmit={handleSubmit}>
        <div className={styles.modalBody}>
          <FormField
            label="اسم الحلقة:"
            name="groupName"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
              if (error) setError("");
            }}
            placeholder="أدخل اسم الحلقة الجديد"
            required
            disabled={isSubmitting}
          />
          <ErrorDisplay message={error || undefined} />
        </div>
        <ModalActions actions={actions} alignment="right" />
      </form>
    </ModalContainer>
  );
};

export default EditGroupNameModal;
