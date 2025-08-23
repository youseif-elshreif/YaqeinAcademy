"use client";
import { useEffect, useState } from "react";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/components/dashboard/admin/styles.module.css";
import SkeletonTable from "@/components/dashboard/admin/components/SkeletonTable";
import SkeletonCards from "@/components/dashboard/admin/components/SkeletonCards";
import { FiUsers } from "react-icons/fi";
import { useAdminModal } from "@/contexts/AdminModalContext";

const AdminsTable = () => {
  const { token } = useAuth();
  const { admins = [], getAdmins } = useAdminDashboardContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      if (!token || !getAdmins) return;
      try {
        setLoading(true);
        setError(null);
        await getAdmins(token);
      } catch (err) {
        console.error("Error fetching admins:", err);
        setError("فشل في جلب بيانات الإداريين");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, [token, getAdmins]);

  const { openUserActionsModal } = useAdminModal();

  if (loading) {
    return (
      <>
        <div className={styles.desktopView}>
          <SkeletonTable rows={5} columns={6} title="الإداريين" />
        </div>
        <div className={styles.mobileView}>
          <div className={styles.tableContainer}>
            <div className={styles.header}>
              <h2 className={styles.title}>الإداريين</h2>
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
          <h2 className={styles.title}>الإداريين</h2>
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
        <h2 className={styles.title}>الإداريين</h2>
      </div>

      {admins.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--text-light)",
          }}
        >
          <FiUsers size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <h3>لا يوجد إداريين</h3>
          <p>لم يتم العثور على أي إداريين مسجلين حاليًا</p>
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
                  <th>الدولة</th>
                  <th>تاريخ الإنشاء</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin: any) => (
                  <tr key={admin._id || admin.id} className={styles.tableRow}>
                    <td className={`${styles.studentCell} ${styles.firstCell}`}>
                      <div className={styles.teacherInfo}>
                        <span className={styles.teacherName}>{admin.name}</span>
                      </div>
                    </td>
                    <td>{admin.email}</td>
                    <td>{admin.phone}</td>
                    <td>{admin.country || "-"}</td>
                    <td>
                      {admin.createdAt
                        ? new Date(admin.createdAt).toLocaleDateString("ar-EG")
                        : "-"}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          openUserActionsModal({
                            id: admin._id || admin.id,
                            name: admin.name,
                            userType: "admin" as any,
                            fullData: admin,
                          })
                        }
                        className={`${styles.linkButton} ${styles.openLinkBtn}`}
                        title="إجراءات المسؤول"
                      >
                        <span className={styles.iconButtonText}>الإجراءات</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminsTable;
