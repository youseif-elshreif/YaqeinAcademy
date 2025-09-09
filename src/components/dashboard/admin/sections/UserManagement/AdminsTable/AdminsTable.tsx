"use client";
import { useAdminStatsContext } from "@/src/contexts/AdminStatsContext";
import styles from "@/src/components/dashboard/admin/styles.module.css";
import SkeletonTable from "@/src/components/dashboard/admin/components/SkeletonTable";
import SkeletonCards from "@/src/components/dashboard/admin/components/SkeletonCards";
import { FiUsers } from "react-icons/fi";
import MobileAdminCards from "./Mobile/MobileAdminCards";
import Button from "@/src/components/common/Button";
import { AdminUser } from "@/src/types";
import ClassTableRow from "./ClassTableRow";

const AdminsTable: React.FC<{ searchTerm?: string }> = ({
  searchTerm = "",
}) => {
  const { admins = [], isLoading, error } = useAdminStatsContext();

  const shouldShowLoading = isLoading || (admins.length === 0 && !error);

  if (shouldShowLoading) {
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
          <Button
            onClick={() => window.location.reload()}
            variant="danger"
            size="medium"
          >
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  const normalized = searchTerm.trim().toLowerCase();
  const filtered = !normalized
    ? admins
    : admins.filter((a: AdminUser) => {
        const name = (a.name || "").toLowerCase();
        const email = (a.email || "").toLowerCase();
        const role = (a.role || "").toLowerCase();
        return (
          name.includes(normalized) ||
          email.includes(normalized) ||
          role.includes(normalized)
        );
      });

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>الإداريين</h2>
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
          <h3>لا يوجد إداريين</h3>
          <p>لم يتم العثور على أي إداريين مسجلين حاليًا</p>
        </div>
      ) : (
        <>

          <div className={styles.desktopView}>
            <div className={styles.tableWrapper}>
              <table className={styles.classTable}>
                <thead>
                  <tr>
                    <th className={styles.firstCell}>الاسم</th>
                    <th>البريد الإلكتروني</th>
                    <th>رقم الهاتف</th>
                    <th>تاريخ الإنشاء</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((admin: AdminUser) => (
                    <ClassTableRow key={admin._id} admin={admin} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>


          <div className={styles.mobileView}>
            <MobileAdminCards admins={filtered} />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminsTable;
