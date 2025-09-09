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
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("?? ???? ??? ??????");
        return;
      }

      const groupData = await getGroupById(token, groupId);
      if (groupData) {
        setMembers(groupData.group.members);
      } else {
        setError("?? ??? ?????? ??? ??????");
      }
    } catch (error: unknown) {
      setError("??? ??? ????? ??? ????? ??????");
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
      setError("???? ?????? ??? ?? ???? ?????");
      return;
    }

    if (confirmText.trim().toLowerCase() !== "???") {
      setError("???? ????? '???' ???????");
      return;
    }

    try {
      setRemoving(true);
      setError("");
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("?? ???? ??? ??????");
        return;
      }

      const removePromises = selectedMemberIds.map((memberId) =>
        removeGroupMember(groupId, memberId, token)
      );

      await Promise.all(removePromises);

      await getGroupById(token, groupId);

      if (onSuccess) {
        onSuccess();
      }

      handleClose();
    } catch (error: unknown) {
      const errorObj = error as any;
      setError(errorObj.message || "??? ??? ????? ??? ???????");
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
    confirmText.trim().toLowerCase() === "???" &&
    !removing;

  return (
    <ModalContainer
      isOpen={true}
      isClosing={isClosing}
      variant="delete"
      onClose={handleClose}
    >
      <ModalHeader
        title="??? ??? ?? ??????"
        icon={<FaUserMinus />}
        onClose={handleClose}
        variant="delete"
        disabled={removing}
      />

      <div className={baseStyles.modalBody}>
        <WarningPanel
          title={`?? ??? ????? ?? ??? ${
            selectedMemberIds.length > 1
              ? `${selectedMemberIds.length} ?????`
              : "??? ?????"
          } ?? ???????`}
          text="?? ???? ??????? ?? ??? ???????. ???? ????? ?????/??????? ??????? ?? ??????."
        />

        <div className={baseStyles.groupInfo}>
          <h4 className={baseStyles.groupName}>??????: {groupName}</h4>
          <p className={baseStyles.groupId}>??????: {groupId}</p>
          {selectedMemberIds.length > 0 && (
            <div className={baseStyles.selectedMembersInfo}>
              <p className={baseStyles.warningText}>
                <strong>??????? ????????? ?????:</strong>
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
            <p>???? ????? ???????...</p>
          </div>
        ) : error ? (
          <div className={baseStyles.errorContainer}>
            <p className={baseStyles.errorMessage}>{error}</p>
            <Button onClick={fetchGroupMembers} variant="secondary">
              ????? ????????
            </Button>
          </div>
        ) : members.length === 0 ? (
          <div className={baseStyles.emptyContainer}>
            <FaUser className={baseStyles.emptyIcon} />
            <p className={baseStyles.emptyText}>?? ???? ????? ?? ??? ??????</p>
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
                ????? ???? ({selectedMemberIds.length} ?? {members.length})
              </label>
            </div>

            <p className={baseStyles.instructionText}>
              ???? ??????? ????? ???? ????? ?? ??????:
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
                ?????? ???? &quot;<strong>???</strong>&quot; ?? ?????? ?????:
              </>
            }
            value={confirmText}
            onChange={setConfirmText}
            placeholder="???"
            disabled={removing}
          />
        )}

        <ModalActions
          actions={[
            {
              label: "?????",
              onClick: handleClose,
              variant: "secondary" as const,
              disabled: removing,
            },
            {
              label: removing
                ? "???? ?????..."
                : selectedMemberIds.length > 1
                ? `??? ${selectedMemberIds.length} ?????`
                : "??? ?????",
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
