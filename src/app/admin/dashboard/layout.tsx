import AdminSidebar from "@/components/AdminDashboard/AdminSidebar";
import { AdminDashboardProvider } from "@/contexts/AdminDashboardContext";
import { AdminModalProvider } from "@/contexts/AdminModalContext";
import AdminModalsContainer from "@/components/AdminDashboard/modals/AdminModalsContainer";
import styles from "@/styles/AdminDashboard.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminDashboardProvider>
      <AdminModalProvider>
        <main className={styles.layout}>
          <AdminSidebar />
          <div className={styles.main}>{children}</div>
        </main>
        <AdminModalsContainer />
      </AdminModalProvider>
    </AdminDashboardProvider>
  );
}
// export default withAdminProtection(DashboardLayout);
