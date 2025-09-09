"use client";
import { FiUsers } from "react-icons/fi";
import styles from "@/src/components/dashboard/admin/styles.module.css";
import ClassTableRow from "./ClassTableRow";
import MobileClassCards from "./Mobile/MobileClassCards";
import { useStudentsContext } from "@/src/contexts/StudentsContext";
import SkeletonTable from "@/src/components/dashboard/admin/components/SkeletonTable";
import SkeletonCards from "@/src/components/dashboard/admin/components/SkeletonCards";
import { User } from "@/src/types";

const StudentTable: React.FC<{ searchTerm?: string }> = ({
  searchTerm = "",
}) => {
  const { students, isLoading, error } = useStudentsContext();

  const shouldShowLoading = isLoading || (students.length === 0 && !error);

  if (shouldShowLoading) {
    return (
      <>

        <div className={styles.desktopView}>
          <SkeletonTable rows={5} columns={10} title="الطلاب" />
        </div>


        <div className={styles.mobileView}>
          <div className={styles.tableContainer}>
            <div className={styles.header}>
              <h2 className={styles.title}>الطلاب</h2>
            </div>
            <SkeletonCards cards={3} type="student" />
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>الطلاب</h2>
        </div>
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }
  const normalized = searchTerm.trim().toLowerCase();
  const filtered = !normalized
    ? students
    : students.filter((s: User) => {
        const name = (s.name || "").toLowerCase();
        const email = (s.email || "").toLowerCase();
        const phone = (s.phone || "").toLowerCase();
        const country = "".toLowerCase(); // country not available in User type
        return (
          name.includes(normalized) ||
          email.includes(normalized) ||
          phone.includes(normalized) ||
          country.includes(normalized)
        );
      });

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>الطلاب</h2>
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
          <h3>لا يوجد طلاب</h3>
          <p>لم يتم العثور على أي طلاب مسجلين حاليًا</p>
        </div>
      ) : (
        <>

          <div className={styles.tableWrapper}>
            <table className={styles.classTable}>
              <thead>
                <tr>
                  <th className={styles.firstCell}>الاسم</th>
                  <th>البريد الإلكتروني</th>
                  <th>رقم الهاتف</th>
                  <th>عدد الحلقات المستحقة</th>
                  <th>العمر</th>
                  <th>الدولة</th>
                  <th>حفظ القرآن</th>
                  <th>عدد الأجزاء</th>
                  <th>تاريخ التسجيل</th>
                  <th>التقارير</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student: User) => (
                  <ClassTableRow key={student._id} studentitem={student} />
                ))}
              </tbody>
            </table>
          </div>


          <MobileClassCards Students={filtered} />
        </>
      )}
    </div>
  );
};

export default StudentTable;
