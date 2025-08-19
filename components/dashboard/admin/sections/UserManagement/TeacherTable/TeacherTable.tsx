import { useState, useEffect } from "react";
import { FaExternalLinkAlt, FaCopy, FaEdit, FaCog } from "react-icons/fa";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminModal } from "@/contexts/AdminModalContext";
import styles from "@/components/dashboard/admin/styles.module.css";
import { CombinedTeacherData } from "@/utils/types";

const TeacherTable = () => {
  const { teachers, getTeachers } = useAdminDashboardContext();
  const { token } = useAuth();
  const { openUserActionsModal } = useAdminModal();
  const [loading, setLoading] = useState(false);
  const [combinedTeachers, setCombinedTeachers] = useState<
    CombinedTeacherData[]
  >([]);

  // Fetch teachers on component mount
  useEffect(() => {
    const fetchTeachers = async () => {
      if (token) {
        setLoading(true);
        try {
          await getTeachers(token);
        } catch (error) {
          console.error("Error fetching teachers:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTeachers();
  }, [token, getTeachers]);

  // Combine teacher and user data when teachers data is available
  useEffect(() => {
    if (teachers) {
      const combined = teachers.teachers
        .map((teacher) => {
          const userInfo = teachers.userTeahcer.find(
            (user) => user._id === teacher.userId
          );
          return {
            teacherInfo: teacher,
            userInfo: userInfo!,
          };
        })
        .filter((item) => item.userInfo); // Filter out items without user info

      setCombinedTeachers(combined);
    }
  }, [teachers]);

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

  // Function to handle actions modal
  const handleActionsClick = (teacher: CombinedTeacherData) => {
    openUserActionsModal({
      id: teacher.teacherInfo._id,
      name: teacher.userInfo.name,
      userType: "teacher",
      fullData: teacher,
    });
  };

  if (loading) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>المعلمين</h2>
        </div>
        <div style={{ padding: "20px", textAlign: "center" }}>
          جاري تحميل بيانات المعلمين...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>المعلمين ({combinedTeachers.length})</h2>
      </div>

      {combinedTeachers.length === 0 ? (
        <div style={{ padding: "20px", textAlign: "center" }}>
          لا يوجد معلمين مسجلين
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className={styles.tableWrapper}>
            <table className={styles.classTable}>
              <thead>
                <tr>
                  <th className={styles.firstCell}>الاسم</th>
                  <th>الإيميل</th>
                  <th>رقم الهاتف</th>
                  <th>التخصص</th>
                  <th>إجراءات الرابط</th>
                  <th>رصيد الحصص</th>
                  <th>التحقق</th>
                  <th>تاريخ التسجيل</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {combinedTeachers.map((teacher) => (
                  <tr key={teacher.teacherInfo._id}>
                    <td className={styles.firstCell}>
                      <div className={styles.teacherInfo}>
                        <span className={styles.teacherName}>
                          {teacher.userInfo.name}
                        </span>
                      </div>
                    </td>
                    <td>{teacher.userInfo.email}</td>
                    <td>{teacher.userInfo.phone}</td>
                    <td>
                      {teacher.teacherInfo.specialization.length > 0
                        ? teacher.teacherInfo.specialization.join(", ")
                        : "غير محدد"}
                    </td>
                    <td className={styles.linkCell}>
                      <div className={styles.linkContainer}>
                        <button
                          className={`${styles.linkButton} ${styles.openLinkBtn}`}
                          onClick={() =>
                            handleOpenLink(teacher.teacherInfo.meetingLink)
                          }
                          title="فتح رابط الحصة"
                        >
                          <FaExternalLinkAlt />
                          <span>دخول الحصة</span>
                        </button>
                        <button
                          className={`${styles.linkButton} ${styles.copyLinkBtn}`}
                          onClick={() =>
                            handleCopyLink(teacher.teacherInfo.meetingLink)
                          }
                          title="نسخ رابط الحصة"
                        >
                          <FaCopy />
                        </button>
                      </div>
                    </td>
                    <td>{teacher.teacherInfo.numberOflessonsCridets}</td>
                    <td>
                      <span
                        className={`${styles.verificationBadge} ${
                          teacher.userInfo.isVerified
                            ? styles.verified
                            : styles.unverified
                        }`}
                      >
                        {teacher.userInfo.isVerified ? "موثق" : "غير موثق"}
                      </span>
                    </td>
                    <td>
                      {new Date(
                        teacher.teacherInfo.createdAt
                      ).toLocaleDateString("ar-EG")}
                    </td>
                    <td>
                      <button
                        onClick={() => handleActionsClick(teacher)}
                        className={`${styles.linkButton} ${styles.openLinkBtn}`}
                        title="إجراءات المعلم"
                      >
                        <FaCog />
                        <span className={styles.iconButtonText}>الإجراءات</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className={styles.mobileCardsContainer}>
            {combinedTeachers.map((teacher) => (
              <div key={teacher.teacherInfo._id} className={styles.mobileCard}>
                <div className={styles.cardHeader}>
                  <h3>{teacher.userInfo.name}</h3>
                  <span
                    className={`${styles.verificationBadge} ${
                      teacher.userInfo.isVerified
                        ? styles.verified
                        : styles.unverified
                    }`}
                  >
                    {teacher.userInfo.isVerified ? "موثق" : "غير موثق"}
                  </span>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardRow}>
                    <span className={styles.label}>الإيميل:</span>
                    <span>{teacher.userInfo.email}</span>
                  </div>
                  <div className={styles.cardRow}>
                    <span className={styles.label}>الهاتف:</span>
                    <span>{teacher.userInfo.phone}</span>
                  </div>
                  <div className={styles.cardRow}>
                    <span className={styles.label}>التخصص:</span>
                    <span>
                      {teacher.teacherInfo.specialization.length > 0
                        ? teacher.teacherInfo.specialization.join(", ")
                        : "غير محدد"}
                    </span>
                  </div>
                  <div className={styles.cardRow}>
                    <span className={styles.label}>رصيد الحصص:</span>
                    <span>{teacher.teacherInfo.numberOflessonsCridets}</span>
                  </div>
                  <div className={styles.cardRow}>
                    <span className={styles.label}>تاريخ التسجيل:</span>
                    <span>
                      {new Date(
                        teacher.teacherInfo.createdAt
                      ).toLocaleDateString("ar-EG")}
                    </span>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <div className={styles.linkContainer}>
                    <button
                      className={`${styles.linkButton} ${styles.openLinkBtn}`}
                      onClick={() =>
                        handleOpenLink(teacher.teacherInfo.meetingLink)
                      }
                      title="فتح رابط الحصة"
                    >
                      <FaExternalLinkAlt />
                      <span>دخول الحصة</span>
                    </button>
                    <button
                      className={`${styles.linkButton} ${styles.copyLinkBtn}`}
                      onClick={() =>
                        handleCopyLink(teacher.teacherInfo.meetingLink)
                      }
                      title="نسخ رابط الحصة"
                    >
                      <FaCopy />
                    </button>
                  </div>
                  <div className={styles.actionButtons}>
                    <button
                      onClick={() => handleActionsClick(teacher)}
                      className={`${styles.linkButton} ${styles.openLinkBtn}`}
                      title="إجراءات المعلم"
                    >
                      <FaCog />
                      <span>الإجراءات</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherTable;
