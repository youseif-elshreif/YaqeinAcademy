import {
  FaTag,
  FaUsers,
  FaExternalLinkAlt,
  FaCopy,
  FaEdit,
} from "react-icons/fa";
import styles from "../MonthlyClassTable.module.css";
import { ClassData } from "@/utils/types";
import { formatDate, getStatusColor, getStatusText } from "../utils";
import { useModal } from "@/contexts/ModalContext";

interface ClassCardProps {
  classItem: ClassData;
}

const ClassCard = ({ classItem }: ClassCardProps) => {
  const {
    openCompleteModal,
    openPostponeModal,
    openNicknameModal,
    openStudentDataModal,
    openEditGroupNameModal,
    openAddClassLinkModal,
  } = useModal();

  // Helper function to check if it's a group class
  const isGroupClass = classItem.students.length > 1;

  // Function to copy class link to clipboard
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      console.log("تم نسخ الرابط بنجاح");
    } catch (err) {
      console.error("فشل في نسخ الرابط:", err);
    }
  };

  // Function to open link in new tab
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // Function to handle editing a class link
  const handleEditLink = (classData: ClassData) => {
    openAddClassLinkModal(classData);
  };

  return (
    <div key={classItem.id} className={styles.classCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          {isGroupClass ? (
            // Group class display
            <div className={styles.groupContainer}>
              <h3 className={styles.cardStudentName}>
                {classItem.groupName}
                <span className={styles.groupIndicator}>
                  ({classItem.students.length} طلاب)
                </span>
              </h3>
              <button
                className={`${styles.iconButton} ${styles.iconButtonSmall}`}
                onClick={() =>
                  openEditGroupNameModal({
                    classId: classItem.id,
                    currentGroupName: classItem.groupName,
                  })
                }
                title="تعديل اسم الحلقة"
              >
                <FaTag />
              </button>
            </div>
          ) : (
            // Individual student display
            <>
              <h3
                className={`${styles.cardStudentName} ${styles.clickableText}`}
                onClick={() =>
                  openStudentDataModal(classItem.students[0].studentId)
                }
              >
                {classItem.students[0].studentName}
                {classItem.students[0].nickname && (
                  <span className={styles.nickname}>
                    ({classItem.students[0].nickname})
                  </span>
                )}
              </h3>
              <button
                className={`${styles.iconButton} ${styles.iconButtonSmall}`}
                onClick={() =>
                  openNicknameModal({
                    studentId: classItem.students[0].studentId,
                    studentName: classItem.students[0].studentName,
                    nickname: classItem.students[0].nickname,
                  })
                }
                title="إضافة لقب"
              >
                <FaTag />
              </button>
            </>
          )}
        </div>
        <span
          className={`${styles.statusBadge} ${getStatusColor(
            classItem.status
          )}`}
        >
          {getStatusText(classItem.status)}
        </span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>التاريخ:</span>
            <span className={styles.infoValue}>
              {formatDate(classItem.date)}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>الوقت:</span>
            <span className={styles.infoValue}>{classItem.time}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>التقييم:</span>
            <span className={styles.infoValue}>
              {isGroupClass
                ? // Group class rating
                  classItem.groupRate
                  ? `⭐ ${classItem.groupRate}/10`
                  : "-"
                : // Individual student rating
                classItem.students[0].rate
                ? `⭐ ${classItem.students[0].rate}/10`
                : "-"}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>رابط الحلقة:</span>
            <div className={styles.infoValue}>
              <div className={styles.cardLinkContainer}>
                <button
                  className={`${styles.linkButton} ${styles.openLinkBtn} ${styles.cardLinkBtn}`}
                  onClick={() => handleOpenLink(classItem.classLink!)}
                  title="فتح رابط الحلقة"
                >
                  <FaExternalLinkAlt />
                  <span>دخول الحلقة</span>
                </button>
                <button
                  className={`${styles.linkButton} ${styles.copyLinkBtn} ${styles.cardCopyBtn}`}
                  onClick={() => handleCopyLink(classItem.classLink!)}
                  title="نسخ رابط الحلقة"
                >
                  <FaCopy />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Group members list for group classes */}
        {isGroupClass && (
          <div className={styles.groupMembers}>
            <span className={styles.membersLabel}>أعضاء الحلقة:</span>
            <div className={styles.membersList}>
              {classItem.students.map((student, index) => (
                <span
                  key={student.studentId}
                  className={`${styles.memberName} ${styles.clickableText}`}
                  onClick={() => openStudentDataModal(student.studentId)}
                >
                  {student.studentName}
                  {student.nickname && (
                    <span className={styles.memberNickname}>
                      ({student.nickname})
                    </span>
                  )}
                  {index < classItem.students.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.cardActions}>
          {(classItem.status === "pending" ||
            classItem.status === "postponed") && (
            <>
              <button
                className={`${styles.baseButton} ${styles.actionBtn} ${styles.completeBtn}`}
                onClick={() => openCompleteModal(classItem)}
              >
                إكمال الحلقة
              </button>
              <button
                className={`${styles.baseButton} ${styles.actionBtn} ${styles.postponeBtn}`}
                onClick={() => openPostponeModal(classItem)}
              >
                {classItem.status === "postponed"
                  ? "تعديل/إلغاء"
                  : "تأجيل/إلغاء"}
              </button>
            </>
          )}
          {classItem.status === "completed" && (
            <button
              className={`${styles.baseButton} ${styles.actionBtn} ${styles.viewBtn}`}
              onClick={() => {
                /* Navigate to student record */
              }}
            >
              عرض التفاصيل
            </button>
          )}
          {classItem.status === "cancelled" && (
            <span className={styles.cancelledText}>تم الإلغاء</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
