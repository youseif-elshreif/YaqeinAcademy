"use client";
import React from "react";
import { FiUsers, FiCalendar, FiMail, FiMessageSquare } from "react-icons/fi";
import { HiOutlineViewList } from "react-icons/hi";
import { FaTimes, FaUserFriends } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "@/src/styles/AdminDashboard.module.css";

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navigationItems = [
    {
      id: "users",
      label: "إدارة المستخدمين",
      icon: FiUsers,
      path: "/admin/dashboard/userManagement",
    },
    {
      id: "groups",
      label: "إدارة الحلقات",
      icon: FaUserFriends,
      path: "/admin/dashboard/groupManagement",
    },
    {
      id: "courses",
      label: "إدارة الدورات",
      icon: FiCalendar,
      path: "/admin/dashboard/courses",
    },
    {
      id: "testimonials",
      label: "إدارة آراء الطلاب",
      icon: FiMessageSquare,
      path: "/admin/dashboard/testimonials",
    },
    {
      id: "contact",
      label: "معلومات التواصل",
      icon: FiMail,
      path: "/admin/dashboard/contact",
    },
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
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
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
                const isActive = pathname === item.path;
                return (
                  <li key={item.id} className={styles.navItem}>
                    <Link
                      href={item.path}
                      className={`${styles.navButton} ${
                        isActive ? styles.active : ""
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span>{item.label}</span>
                      <IconComponent className={styles.navIcon} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
