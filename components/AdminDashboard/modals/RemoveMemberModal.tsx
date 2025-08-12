"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FaTimes, FaUserMinus, FaUser } from "react-icons/fa";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import styles from "./RemoveMemberModal.module.css";

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
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
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
        setError("لم يتم العثور على المجموعة");
      }
    } catch (error: any) {
      console.error("Error fetching group members:", error);
      setError("حدث خطأ أثناء جلب أعضاء المجموعة");
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
    if (!selectedMemberId) {
      setError("يرجى اختيار عضو للحذف");
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

      await removeGroupMember(groupId, selectedMemberId, token);

      // Refresh groups data
      await getGroups(token);

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }

      // Close modal
      onClose();
    } catch (error: any) {
      console.error("Error removing member:", error);
      setError(error.message || "حدث خطأ أثناء حذف العضو");
    } finally {
      setRemoving(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <FaUserMinus className={styles.titleIcon} />
            حذف عضو من المجموعة
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.groupInfo}>
            <p className={styles.groupName}>المجموعة: {groupName}</p>
          </div>

          {loading ? (
            <div className={styles.loadingContainer}>
              <p>جاري تحميل الأعضاء...</p>
            </div>
          ) : error ? (
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>{error}</p>
              <button
                onClick={fetchGroupMembers}
                className={styles.retryButton}
              >
                إعادة المحاولة
              </button>
            </div>
          ) : members.length === 0 ? (
            <div className={styles.emptyContainer}>
              <FaUser className={styles.emptyIcon} />
              <p>لا يوجد أعضاء في هذه المجموعة</p>
            </div>
          ) : (
            <div className={styles.membersContainer}>
              <p className={styles.instructionText}>
                اختر العضو الذي تريد حذفه من المجموعة:
              </p>

              <div className={styles.membersList}>
                {members.map((member) => (
                  <label
                    key={member._id}
                    className={`${styles.memberItem} ${
                      selectedMemberId === member._id ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="selectedMember"
                      value={member._id}
                      checked={selectedMemberId === member._id}
                      onChange={(e) => setSelectedMemberId(e.target.value)}
                      className={styles.radioInput}
                    />
                    <div className={styles.memberInfo}>
                      <span className={styles.memberName}>{member.name}</span>
                      <span className={styles.memberEmail}>{member.email}</span>
                      <span className={styles.memberId}>{member._id}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button
            onClick={onClose}
            className={styles.cancelButton}
            disabled={removing}
          >
            إلغاء
          </button>
          <button
            onClick={handleRemoveMember}
            className={styles.removeButton}
            disabled={!selectedMemberId || removing || members.length === 0}
          >
            {removing ? (
              <>
                <span className={styles.spinner}></span>
                جاري الحذف...
              </>
            ) : (
              <>
                <FaUserMinus />
                حذف العضو
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveMemberModal;
