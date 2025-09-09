import AdminSidebar from "@/src/components/dashboard/admin/components/AdminSidebar";
import { AdminModalProvider } from "@/src/contexts/AdminModalContext";
import AdminModalsContainer from "@/src/components/dashboard/admin/modals/AdminModalsContainer";
import styles from "@/src/styles/AdminDashboard.module.css";

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

