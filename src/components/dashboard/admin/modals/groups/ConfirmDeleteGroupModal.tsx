"use client";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import baseStyles from "../../../../../styles/BaseModal.module.css";
import {
  ModalContainer,
  ModalHeader,
  ModalActions,
  WarningPanel,
  ConfirmTextInput,
} from "@/src/components/common/Modal";
import { ConfirmDeleteGroupModalProps } from "@/src/types/admin.types";

const ConfirmDeleteGroupModal: React.FC<ConfirmDeleteGroupModalProps> = ({
  isOpen,
  onClose,
  groupId,
  groupName,
  onConfirmDelete,
}) => {
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setConfirmText("");
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleConfirmDelete = async () => {
    if (confirmText.trim().toLowerCase() !== "???") {
      return;
    }

    setIsLoading(true);
    try {
      await onConfirmDelete(groupId);
      setConfirmText("");
      handleClose();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const isDeleteEnabled =
    confirmText.trim().toLowerCase() === "???" && !isLoading;

  const actions = [
    {
      label: "?????",
      onClick: handleClose,
      variant: "secondary" as const,
      disabled: isLoading,
    },
    {
      label: isLoading ? "???? ?????..." : "??? ??????",
      onClick: handleConfirmDelete,
      variant: "danger" as const,
      disabled: !isDeleteEnabled,
      icon: <FaTrash />,
    },
  ];

  return (
    <ModalContainer
      isOpen={true}
      isClosing={isClosing}
      variant="delete"
      onClose={handleClose}
    >
      <ModalHeader
        title="????? ??? ??????"
        icon={<FaTrash />}
        onClose={handleClose}
        disabled={isLoading}
        variant="delete"
      />
      <div className={baseStyles.modalBody}>
        <WarningPanel
          title="?? ??? ????? ?? ??? ??? ???????"
          text="?? ???? ??????? ?? ??? ???????"
        />

        <div className={baseStyles.groupInfo}>
          <h4 className={baseStyles.groupName}>&ldquo;{groupName}&rdquo;</h4>
          <p className={baseStyles.groupId}>??????: {groupId}</p>
          <p className={baseStyles.warningText}>
            ???? ??? ???? ???????? ???????? ???????? ???? ??????
          </p>
        </div>

        <ConfirmTextInput
          label={
            <>
              ?????? ???? &quot;<strong>???</strong>&quot; ?? ?????? ?????:
            </>
          }
          value={confirmText}
          onChange={setConfirmText}
          disabled={isLoading}
        />

        <ModalActions actions={actions} alignment="right" />
      </div>
    </ModalContainer>
  );
};

export default ConfirmDeleteGroupModal;
