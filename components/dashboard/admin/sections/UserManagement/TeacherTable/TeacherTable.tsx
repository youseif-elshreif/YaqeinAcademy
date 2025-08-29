import { useState, useEffect } from "react";
import { FiUsers } from "react-icons/fi";
import { useTeachersContext } from "@/contexts/TeachersContext";
import styles from "@/components/dashboard/admin/styles.module.css";
import SkeletonTable from "@/components/dashboard/admin/components/SkeletonTable";
import SkeletonCards from "@/components/dashboard/admin/components/SkeletonCards";
import MobileClassCards from "./Mobile/MobileClassCards";
import ClassTableRow from "./ClassTableRow";

const TeacherTable: React.FC<{ searchTerm?: string }> = ({
  searchTerm = "",
}) => {
  const { teachers, isLoading: loading } = useTeachersContext();
  const [combinedTeachers, setCombinedTeachers] = useState<any[]>([]);

  // Combine teacher and user data when teachers data is available
  useEffect(() => {
    if (teachers && teachers.teachers) {
      console.log(teachers.teachers);
      const combined = teachers.teachers;

      setCombinedTeachers(combined);
    } else {
      setCombinedTeachers([]);
    }
  }, [teachers]);

  if (loading) {
    return (
      <>
        {/* Desktop Skeleton */}
        <div className={styles.desktopView}>
          <SkeletonTable rows={5} columns={7} title="المعلمين" />
        </div>

        {/* Mobile Skeleton */}
        <div className={styles.mobileView}>
          <div className={styles.tableContainer}>
            <div className={styles.header}>
              <h2 className={styles.title}>المعلمين</h2>
            </div>
            <SkeletonCards cards={3} type="teacher" />
          </div>
        </div>
      </>
    );
  }

  const normalized = searchTerm.trim().toLowerCase();
  const filtered = !normalized
    ? combinedTeachers
    : combinedTeachers.filter((t: any) => {
        const name = (t.userId?.name || t.name || "").toLowerCase();
        const email = (t.userId?.email || t.email || "").toLowerCase();
        const phone = (t.userId?.phone || t.phone || "").toLowerCase();
        // Check different possible locations for meetingLink
        const link = (
          t.meetingLink ||
          t.teacherInfo?.meetingLink ||
          t.userId?.meetingLink ||
          ""
        ).toLowerCase();
        return (
          name.includes(normalized) ||
          email.includes(normalized) ||
          phone.includes(normalized) ||
          link.includes(normalized)
        );
      });

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>المعلمين</h2>
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--text-light)",
          }}
        >
          <FiUsers size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <h3>لا يوجد معلمين</h3>
          <p>لم يتم العثور على أي معلمين مسجلين حاليًا</p>
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
                  <th>رابط الحلقة</th>
                  <th>رصيد الحلقات</th>
                  <th>تاريخ التسجيل</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((teacher) => (
                  <ClassTableRow key={teacher._id} teacher={teacher} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <MobileClassCards teachers={filtered} />
        </>
      )}
    </div>
  );
};

export default TeacherTable;
