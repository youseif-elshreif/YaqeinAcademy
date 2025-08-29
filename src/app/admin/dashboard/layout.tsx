import AdminSidebar from "@/components/dashboard/admin/components/AdminSidebar";
import { AdminModalProvider } from "@/contexts/AdminModalContext";
import AdminModalsContainer from "@/components/dashboard/admin/modals/AdminModalsContainer";
import styles from "@/styles/AdminDashboard.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminModalProvider>
      <main className={styles.layout}>
        <AdminSidebar />
        <div className={styles.main}>{children}</div>
      </main>
      <AdminModalsContainer />
    </AdminModalProvider>
  );
}
// export default withAdminProtection(DashboardLayout);
