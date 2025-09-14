import { Metadata } from "next";
import AdminSidebar from "@/src/components/dashboard/admin/components/AdminSidebar";
import { AdminModalProvider } from "@/src/contexts/AdminModalContext";
import AdminModalsContainer from "@/src/components/dashboard/admin/modals/AdminModalsContainer";
import styles from "@/src/styles/AdminDashboard.module.css";

export const metadata: Metadata = {
  title: "لوحة تحكم الإدارة - أكاديمية يقين",
  description:
    "لوحة تحكم الإدارة في أكاديمية يقين. إدارة شاملة للمستخدمين والكورسات والمحتوى التعليمي.",
  icons: {
    icon: "/img/favIcon.png",
  },
};

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
