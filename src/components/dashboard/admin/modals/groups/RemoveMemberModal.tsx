"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FaUserMinus, FaUser } from "react-icons/fa";
import { useGroupsContext } from "@/src/contexts/GroupsContext";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  WarningPanel,
  ConfirmTextInput,
} from "@/src/components/common/Modal";
import Button from "@/src/components/common/Button";
import { Member, RemoveMemberModalProps } from "@/src/types/admin.types";

const RemoveMemberModal: React.FC<RemoveMemberModalProps> = ({
  isOpen,
  onClose,
  groupId,
  groupName,
  onSuccess,
}) => {
  const { removeGroupMember, getGroupById } = useGroupsContext();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [confirmText, setConfirmText] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const fetchGroupMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const groupData = await getGroupById(groupId);
      if (groupData) {
        setMembers(groupData?.group?.members || groupData?.members || []);
      } else {
        setError("لم يتم العثور على الحلقة");
      }
    } catch (error: unknown) {
      setError("خطأ في تحميل قائمة أعضاء الحلقة");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [getGroupById, groupId]);

  useEffect(() => {
    if (isOpen && groupId) {
      fetchGroupMembers();
    }
  }, [isOpen, groupId, fetchGroupMembers]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setConfirmText("");
      setSelectedMemberIds([]);
      setError("");
    }, 300);
  };

  const handleRemoveMember = async () => {
    if (selectedMemberIds.length === 0) {
      setError("يجب اختيار عضو واحد على الأقل");
      return;
    }

    if (confirmText.trim().toLowerCase() !== "حذف") {
      setError("يجب كتابة 'حذف' للتأكيد");
      return;
    }

    try {
      setRemoving(true);
      setError("");

      const removePromises = selectedMemberIds.map((memberId) =>
        removeGroupMember(groupId, memberId)
      );

      await Promise.all(removePromises);

      await getGroupById(groupId);

      if (onSuccess) {
        onSuccess();
      }

      handleClose();
    } catch (error: unknown) {
      const errorObj = error as any;
      setError(errorObj.message || "خطأ في حذف الأعضاء");
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

  if (!isOpen) return null;

  const isDeleteEnabled =
    selectedMemberIds.length > 0 &&
    confirmText.trim().toLowerCase() === "حذف" &&
    !removing;

  return (
    <ModalContainer
      isOpen={true}
      isClosing={isClosing}
      variant="delete"
      onClose={handleClose}
    >
      <ModalHeader
        title="حذف عضو من الحلقة"
        icon={<FaUserMinus />}
        onClose={handleClose}
        variant="delete"
        disabled={removing}
      />

      <div className={baseStyles.modalBody}>
        <WarningPanel
          title={`هل أنت متأكد من حذف ${
            selectedMemberIds.length > 1
              ? `${selectedMemberIds.length} أعضاء`
              : "هذا العضو"
          } من الحلقة؟`}
          text="لا يمكن التراجع عن هذا الإجراء. سيتم حذف العضو/الأعضاء نهائياً من الحلقة."
        />

        <div className={baseStyles.groupInfo}>
          <h4 className={baseStyles.groupName}>الحلقة: {groupName}</h4>
          <p className={baseStyles.groupId}>المعرف: {groupId}</p>
          {selectedMemberIds.length > 0 && (
            <div className={baseStyles.selectedMembersInfo}>
              <p className={baseStyles.warningText}>
                <strong>الأعضاء المحددون للحذف:</strong>
              </p>
              <ul className={baseStyles.selectedMembersList}>
                {selectedMemberIds.map((id) => {
                  const member = members.find((m) => m._id === id);
                  return member ? (
                    <li key={id} className={baseStyles.selectedMemberItem}>
                      {member.name} ({member.email})
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
        </div>

        {loading ? (
          <div className={baseStyles.loadingContainer}>
            <div className={baseStyles.spinner}></div>
            <p>جاري تحميل الأعضاء...</p>
          </div>
        ) : error ? (
          <div className={baseStyles.errorContainer}>
            <p className={baseStyles.errorMessage}>{error}</p>
            <Button onClick={fetchGroupMembers} variant="secondary">
              إعادة المحاولة
            </Button>
          </div>
        ) : members.length === 0 ? (
          <div className={baseStyles.emptyContainer}>
            <FaUser className={baseStyles.emptyIcon} />
            <p className={baseStyles.emptyText}>لا يوجد أعضاء في الحلقة</p>
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
                اختيار الكل ({selectedMemberIds.length} من {members.length})
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
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {selectedMemberIds.length > 0 && (
          <ConfirmTextInput
            label={
              <>
                اكتب كلمة &quot;<strong>حذف</strong>&quot; في الصندوق للتأكيد:
              </>
            }
            value={confirmText}
            onChange={setConfirmText}
            placeholder="حذف"
            disabled={removing}
          />
        )}

        <ModalActions
          actions={[
            {
              label: "إلغاء",
              onClick: handleClose,
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
              disabled: !isDeleteEnabled || members.length === 0,
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
