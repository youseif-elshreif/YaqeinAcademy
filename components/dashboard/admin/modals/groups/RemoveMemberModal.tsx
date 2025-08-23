"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FaUserMinus, FaUser } from "react-icons/fa";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
} from "@/components/common/Modal";

interface Member {
  _id: string;
  name: string;
  email: string;
}

interface RemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  groupName: string;
  onSuccess?: () => void;
}

const RemoveMemberModal: React.FC<RemoveMemberModalProps> = ({
  isOpen,
  onClose,
  groupId,
  groupName,
  onSuccess,
}) => {
  const { removeGroupMember, getGroups } = useAdminDashboardContext();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const fetchGroupMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("لا يوجد رمز مصادقة");
        return;
      }

      const groupsData = await getGroups(token);
      const targetGroup = groupsData.find((group) => group._id === groupId);

      if (targetGroup) {
        setMembers(targetGroup.members);
      } else {
        setError("لم يتم العثور على الحلقة");
      }
    } catch (error: any) {
      console.error("Error fetching group members:", error);
      setError("حدث خطأ أثناء جلب أعضاء الحلقة");
    } finally {
      setLoading(false);
    }
  }, [getGroups, groupId]);

  useEffect(() => {
    if (isOpen && groupId) {
      fetchGroupMembers();
    }
  }, [isOpen, groupId, fetchGroupMembers]);

  const handleRemoveMember = async () => {
    if (selectedMemberIds.length === 0) {
      setError("يرجى اختيار عضو أو أكثر للحذف");
      return;
    }

    try {
      setRemoving(true);
      setError("");
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("لا يوجد رمز مصادقة");
        return;
      }

      // Remove members one by one
      const removePromises = selectedMemberIds.map((memberId) =>
        removeGroupMember(groupId, memberId, token)
      );

      await Promise.all(removePromises);

      // Refresh groups data
      await getGroups(token);

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }

      // Close modal
      onClose();
    } catch (error: any) {
      console.error("Error removing members:", error);
      setError(error.message || "حدث خطأ أثناء حذف الأعضاء");
    } finally {
      setRemoving(false);
    }
  };

  const handleMemberToggle = (memberId: string) => {
    setSelectedMemberIds((prev) => {
      if (prev.includes(memberId)) {
        return prev.filter((id) => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedMemberIds.length === members.length) {
      setSelectedMemberIds([]);
    } else {
      setSelectedMemberIds(members.map((member) => member._id));
    }
  };

  // Backdrop click handled by ModalContainer

  if (!isOpen) return null;

  return (
    <ModalContainer isOpen={true} variant="delete">
      <ModalHeader
        title="حذف عضو من الحلقة"
        icon={<FaUserMinus />}
        onClose={onClose}
        variant="delete"
      />

      <div className={baseStyles.modalBody}>
        <div className={baseStyles.groupInfo}>
          <h4 className={baseStyles.groupName}>الحلقة: {groupName}</h4>
          <p className={baseStyles.groupId}>المعرف: {groupId}</p>
        </div>

        {loading ? (
          <div className={baseStyles.loadingContainer}>
            <div className={baseStyles.spinner}></div>
            <p>جاري تحميل الأعضاء...</p>
          </div>
        ) : error ? (
          <div className={baseStyles.errorContainer}>
            <p className={baseStyles.errorMessage}>{error}</p>
            <button
              onClick={fetchGroupMembers}
              className={baseStyles.secondaryButton}
            >
              إعادة المحاولة
            </button>
          </div>
        ) : members.length === 0 ? (
          <div className={baseStyles.emptyContainer}>
            <FaUser className={baseStyles.emptyIcon} />
            <p className={baseStyles.emptyText}>لا يوجد أعضاء في هذه الحلقة</p>
          </div>
        ) : (
          <div className={baseStyles.membersContainer}>
            <div className={baseStyles.selectAllContainer}>
              <label className={baseStyles.selectAllLabel}>
                <input
                  type="checkbox"
                  checked={
                    selectedMemberIds.length === members.length &&
                    members.length > 0
                  }
                  onChange={handleSelectAll}
                  className={baseStyles.checkboxInput}
                />
                تحديد الكل ({selectedMemberIds.length} من {members.length})
              </label>
            </div>

            <p className={baseStyles.instructionText}>
              اختر الأعضاء الذين تريد حذفهم من الحلقة:
            </p>

            <div className={baseStyles.formGrid}>
              {members.map((member) => (
                <label
                  key={member._id}
                  className={`${baseStyles.memberItem} ${
                    selectedMemberIds.includes(member._id)
                      ? baseStyles.selected
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedMemberIds.includes(member._id)}
                    onChange={() => handleMemberToggle(member._id)}
                    className={baseStyles.checkboxInput}
                  />
                  <div className={baseStyles.memberInfo}>
                    <span className={baseStyles.memberName}>{member.name}</span>
                    <span className={baseStyles.memberEmail}>
                      {member.email}
                    </span>
                    <span className={baseStyles.memberId}>
                      المعرف: {member._id}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        <ModalActions
          actions={[
            {
              label: "إلغاء",
              onClick: onClose,
              variant: "secondary" as const,
              disabled: removing,
            },
            {
              label: removing
                ? "جاري الحذف..."
                : selectedMemberIds.length > 1
                ? `حذف ${selectedMemberIds.length} أعضاء`
                : "حذف العضو",
              onClick: handleRemoveMember,
              variant: "danger" as const,
              disabled:
                selectedMemberIds.length === 0 ||
                removing ||
                members.length === 0,
              icon: <FaUserMinus />,
            },
          ]}
          alignment="right"
        />
      </div>
    </ModalContainer>
  );
};

export default RemoveMemberModal;
