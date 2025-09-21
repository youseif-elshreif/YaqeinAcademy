"use client";
import React, { useMemo, useState, useEffect } from "react";
import { ModalContainer, ModalHeader } from "@/src/components/common/Modal";
import { useGroupsContext } from "@/src/contexts/GroupsContext";
import styles from "./StudentListModal.module.css";
import { StudentListModalProps } from "@/src/types";

const StudentListModal: React.FC<StudentListModalProps> = ({
  isOpen,
  onClose,
  lesson,
  onOpenStudentReports,
}) => {
  const { getGroupById } = useGroupsContext();
  const [isClosing, setIsClosing] = useState(false);
  const [groupData, setGroupData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // جلب بيانات الجروب الحقيقية
  useEffect(() => {
    const fetchGroupData = async () => {
      if (!isOpen || !lesson?.groupId) return;

      // Type guard to check if groupId is an object with _id
      const groupId = lesson.groupId;
      if (typeof groupId === "string" || !("_id" in groupId) || !groupId._id)
        return;

      try {
        setLoading(true);
        const data = await getGroupById(groupId._id);
        setGroupData(data);
      } catch (error) {
        // في حالة الخطأ، استخدم البيانات الموجودة
        setGroupData(groupId);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [isOpen, lesson?.groupId, getGroupById]);

  const members = useMemo(() => {
    const data = groupData || lesson?.groupId || groupData?.groupId;

    return data?.members.length ? data.members : data?.allMembers;
  }, [groupData, lesson]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 250);
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      isClosing={isClosing}
      variant="default"
      onClose={handleClose}
    >
      <ModalHeader
        title={`طلاب الحلقة: ${
          groupData?.group?.name ||
          (typeof lesson?.groupId === "object" && lesson?.groupId?.name) ||
          "-"
        }`}
        onClose={handleClose}
        variant="default"
      />
      <div className={styles.modalBody}>
        {loading ? (
          <div className={styles.loading}>جاري تحميل بيانات الطلاب...</div>
        ) : members.length === 0 ? (
          <div className={styles.empty}>لا يوجد طلاب</div>
        ) : (
          <ul className={styles.studentList}>
            {members.map((m: any) => (
              <li
                key={m?._id}
                className={styles.studentItem}
                style={{ marginTop: "0.5rem" }}
              >
                <div className={styles.studentName}>
                  {typeof m === "string"
                    ? m
                    : m?.name || m?.username || "طالب غير محدد"}
                </div>
                <button
                  className={styles.viewBtn}
                  onClick={() => {
                    if (onOpenStudentReports) {
                      onOpenStudentReports({
                        id: typeof m === "string" ? "" : m?._id || m?.id || "",
                        name:
                          typeof m === "string"
                            ? m
                            : m?.name || m?.username || "طالب غير محدد",
                      });
                    }
                  }}
                >
                  عرض تقارير الطالب
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ModalContainer>
  );
};

export default StudentListModal;
