import { FiUsers } from "react-icons/fi";
import { useTeachersContext } from "@/src/contexts/TeachersContext";
import styles from "@/src/components/dashboard/admin/styles.module.css";
import SkeletonTable from "@/src/components/dashboard/admin/components/SkeletonTable";
import SkeletonCards from "@/src/components/dashboard/admin/components/SkeletonCards";
import MobileClassCards from "./Mobile/MobileClassCards";
import ClassTableRow from "./ClassTableRow";
import { Teacher } from "@/src/types";

const TeacherTable: React.FC<{ searchTerm?: string }> = ({
  searchTerm = "",
}) => {
  const { teachers, isLoading } = useTeachersContext();

  const shouldShowLoading = isLoading || !teachers;

  if (shouldShowLoading) {
    return (
      <>

        <div className={styles.desktopView}>
          <SkeletonTable rows={5} columns={7} title="المعلمين" />
        </div>


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
    ? teachers
    : teachers.filter((t: Teacher) => {
        const userInfo = typeof t.userId === "object" ? t.userId : null;
        const name = (userInfo?.name || "").toLowerCase();
        const email = (userInfo?.email || "").toLowerCase();
        const phone = (userInfo?.phone || "").toLowerCase();
        const link = (t.meetingLink || "").toLowerCase();
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


          <MobileClassCards teachers={filtered} />
        </>
      )}
    </div>
  );
};

export default TeacherTable;
