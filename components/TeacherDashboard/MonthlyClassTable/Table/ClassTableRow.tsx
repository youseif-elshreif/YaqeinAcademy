import {
  FaTag,
  FaUsers,
  FaExternalLinkAlt,
  FaCopy,
  FaEdit,
} from "react-icons/fa";
import styles from "../MonthlyClassTable.module.css";
import { ClassData } from "../types";
import { formatDate, getStatusColor, getStatusText } from "../utils";
import { useModal } from "@/contexts/ModalContext";

interface ClassTableRowProps {
  classItem: ClassData;
}

const ClassTableRow = ({ classItem }: ClassTableRowProps) => {
  const {
    openCompleteModal,
    openPostponeModal,
    openNicknameModal,
    openStudentDataModal,
    openEditGroupNameModal,
    openAddClassLinkModal,
  } = useModal();

  // Function to copy class link to clipboard
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      // You can add a toast notification here
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
    <tr key={classItem.id} className={styles.tableRow}>
      <td className={styles.studentCell}>
        <div className={styles.studentInfo}>
          {classItem.students.length > 1 ? (
            // Group view with multiple students
            <>
              <div className={styles.groupContainer}>
                <div className={styles.groupBadge}>
                  <FaUsers />
                  <span>مجموعة</span>
                </div>
                <div className={styles.groupNameContainer}>
                  <span
                    className={`${styles.groupName} ${styles.clickableText} ${styles.primaryColor}`}
                  >
                    {classItem.groupName}
                    <span
                      className={`${styles.groupIndicator} ${styles.secondaryColor}`}
                    >
                      ({classItem.students.length} طلاب)
                    </span>
                  </span>
                </div>

                {/* Group members list - hidden by default, shown on hover */}
                <div className={styles.groupMembersTooltip}>
                  {classItem.students.map((student, index) => (
                    <span
                      key={student.studentId}
                      className={`${styles.groupMemberName} ${styles.clickableText} ${styles.primaryColor}`}
                      onClick={() => openStudentDataModal(student.studentId)}
                    >
                      {student.studentName}
                      {student.nickname && (
                        <span
                          className={`${styles.memberNickname} ${styles.lightColor}`}
                        >
                          ({student.nickname})
                        </span>
                      )}
                      {index < classItem.students.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className={`${styles.iconButton} ${styles.iconButtonSmall} ${styles.allTransition}`}
                onClick={() =>
                  openEditGroupNameModal({
                    classId: classItem.id,
                    currentGroupName: classItem.groupName,
                  })
                }
                title="تعديل اسم المجموعة"
              >
                <FaTag />
              </button>
            </>
          ) : (
            // Single student view
            <>
              <span
                className={`${styles.studentName} ${styles.clickableTextWithChildren} ${styles.darkColor}`}
                onClick={() => {
                  openStudentDataModal(classItem.students[0].studentId);
                }}
              >
                {classItem.students[0].studentName}
                {classItem.students[0].nickname && (
                  <span
                    className={`${styles.nickname} ${styles.clickableText} ${styles.lightColor}`}
                    onClick={() => {
                      openStudentDataModal(classItem.students[0].studentId);
                    }}
                  >
                    ({classItem.students[0].nickname})
                  </span>
                )}
              </span>
              <button
                className={`${styles.iconButton} ${styles.iconButtonMedium} ${styles.allTransition}`}
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
      </td>

      <td className={styles.dateTimeCell}>
        <div className={styles.dateTimeContent}>
          <span className={`${styles.dateText} ${styles.darkColor}`}>
            {formatDate(classItem.date)}
          </span>
          <span className={`${styles.timeText} ${styles.primaryColor}`}>
            {classItem.time}
          </span>
        </div>
      </td>

      <td className={styles.statusCell}>
        <span
          className={`${styles.statusBadge} ${getStatusColor(
            classItem.status
          )}`}
        >
          {getStatusText(classItem.status)}
        </span>
      </td>

      <td className={styles.linkCell}>
        <div className={styles.linkContainer}>
          <button
            className={`${styles.linkButton} ${styles.openLinkBtn}`}
            onClick={() => handleOpenLink(classItem.classLink!)}
            title="فتح رابط الحصة"
          >
            <FaExternalLinkAlt />
            <span>دخول الحصة</span>
          </button>
          <button
            className={`${styles.linkButton} ${styles.copyLinkBtn}`}
            onClick={() => handleCopyLink(classItem.classLink!)}
            title="نسخ رابط الحصة"
          >
            <FaCopy />
          </button>
          <button
            className={`${styles.linkButton} ${styles.addLinkBtn}`}
            onClick={() => handleEditLink(classItem)}
            title="تعديل رابط الحصة"
          >
            <FaEdit />
            <span>تعديل</span>
          </button>
        </div>
      </td>

      <td className={styles.rateCell}>
        {classItem.students.length > 1 ? (
          <span className={`${styles.groupRate} ${styles.primaryColor}`}>
            ⭐ {classItem.groupRate}/10
          </span>
        ) : classItem.students[0].rate ? (
          <span className={`${styles.rate} ${styles.primaryColor}`}>
            ⭐ {classItem.students[0].rate}/10
          </span>
        ) : (
          <span className={`${styles.lightColor}`}>-</span>
        )}
      </td>

      <td className={styles.actionsCell}>
        <div className={styles.actionButtons}>
          {(classItem.status === "pending" ||
            classItem.status === "postponed") && (
            <>
              <button
                className={`${styles.baseButton} ${styles.actionBtn} ${styles.completeBtn}`}
                onClick={() => openCompleteModal(classItem)}
              >
                إكمال الحصة
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
      </td>
      
    </tr>
  );
};

export default ClassTableRow;
