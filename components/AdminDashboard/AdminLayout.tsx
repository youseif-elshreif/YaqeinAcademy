import React from "react";
import { FiUsers, FiCalendar, FiBarChart, FiHome } from "react-icons/fi";
import { HiOutlineViewList } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/AdminDashboard.module.css";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
}) => {
  const navigationItems = [
    { id: "overview", label: "نظرة عامة", icon: FiHome },
    { id: "users", label: "إدارة المستخدمين", icon: FiUsers },
    { id: "courses", label: "إدارة الدورات", icon: FiCalendar },
    { id: "financial", label: "النظرة المالية", icon: FiBarChart },
  ];

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <>
      <button
        className={`${styles.openBtn} ${sidebarOpen ? styles.open : ""}`}
        type="button"
        onClick={() => setSidebarOpen(true)}
      >
        <HiOutlineViewList className={styles.list} />
      </button>
      <div className={styles.layout}>
        <aside
          className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}
        >
          <div className={styles.inSidebar}>
            <div className={styles.sidebarHeader}>
              <button
                className={styles.closeBtn}
                type="button"
                onClick={() => setSidebarOpen(false)}
              >
                <FaTimes />
              </button>
              <h1 className={styles.sidebarTitle}>لوحة الإدارة</h1>
            </div>
            <nav>
              <ul className={styles.nav}>
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <li key={item.id} className={styles.navItem}>
                      <button
                        className={`${styles.navButton} ${
                          activeTab === item.id ? styles.active : ""
                        }`}
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                      >
                        <span>{item.label}</span>
                        <IconComponent className={styles.navIcon} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;
