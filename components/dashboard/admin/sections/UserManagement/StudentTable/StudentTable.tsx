"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/components/dashboard/admin/styles.module.css";
import ClassTableRow from "./ClassTableRow";
import MobileClassCards from "./Mobile/MobileClassCards";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";

const StudentTable = () => {
  const { token } = useAuth();
  const { students, getStudents } = useAdminDashboardContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!token) return;

      try {
        setLoading(true);
        setError(null);
        await getStudents(token);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("فشل في جلب بيانات الطلاب");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token, getStudents]);

  if (loading) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>الطلاب</h2>
        </div>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>جاري تحميل بيانات الطلاب...</p>
        </div>
      </div>
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
  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>الطلاب</h2>
      </div>
      {/* Desktop Table View */}
      <div className={styles.tableWrapper}>
        <table className={styles.classTable}>
          <thead>
            <tr>
              <th className={styles.firstCell}>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>رقم الهاتف</th>
              <th>الرقم التعريفي</th>
              <th>العمر</th>
              <th>الدولة</th>
              <th>حفظ القرآن</th>
              <th>عدد الأجزاء</th>
              <th>تاريخ التسجيل</th>
              <th>حالة التحقق</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student: any) => (
              <ClassTableRow key={student._id} studentitem={student} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <MobileClassCards Students={students} />
    </div>
  );
};

export default StudentTable;
