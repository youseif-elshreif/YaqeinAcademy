import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
const Navbar = () => {
  const { logout, user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Define menu items based on authentication status
  const getMenuItems = () => {
    const baseItems = [
      { label: "الرئيسية", href: "/" },
      { label: "دوراتنا", href: "/courses" },
    ];

    if (isAuthenticated) {
      // Items for authenticated users
      if (user?.role === "student") {
        return [
          ...baseItems,
          { label: "لوحة الطالب", href: "/student/dashboard" },
        ];
      } else if (user?.role === "teacher") {
        return [
          ...baseItems,
          { label: "لوحة المعلم", href: "/teacher/dashboard" },
        ];
      } else if (user?.role === "admin") {
        return [
          ...baseItems,
          { label: "لوحة الإدارة", href: "/admin/dashboard" },
        ];
      } else {
        // Default for authenticated users without specific role
        return baseItems;
      }
    } else {
      // Items for non-authenticated users
      return [
        ...baseItems,
        { label: "تسجيل الدخول", href: "/login" },
        { label: "تسجيل حساب", href: "/register" },
        { label: "لوحة الإدارة", href: "/admin/dashboard" },
      ];
    }
  };

  const menuItems = getMenuItems();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbar = document.querySelector(`.${styles.navbar}`);
      if (navbar && !navbar.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveRoute = (href: string) => {
    if (!isMounted) return false;
    return router.pathname === href;
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    closeMenu();
  };

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.navContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link href="/">
              <img
                src="/img/logo/logo.webp"
                alt="أكاديمية يقين للعلوم الشرعية"
                className={styles.logoImage}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className={`${styles.navMenu} mobile-hidden`}>
            {menuItems.map((item, index) => (
              <li key={index} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${
                    isActiveRoute(item.href) ? styles.active : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Logout button for authenticated users */}
            {isAuthenticated && (
              <li className={styles.navItem}>
                <button
                  onClick={handleLogout}
                  className={`${styles.navLink} ${styles.logoutButton}`}
                >
                  تسجيل الخروج
                </button>
              </li>
            )}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className={`${styles.menuToggle} desktop-hidden`}
            onClick={toggleMenu}
            aria-label="قائمة التنقل"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`${styles.hamburger} ${
                isMenuOpen ? styles.hamburgerActive : ""
              }`}
            ></span>
            <span
              className={`${styles.hamburger} ${
                isMenuOpen ? styles.hamburgerActive : ""
              }`}
            ></span>
            <span
              className={`${styles.hamburger} ${
                isMenuOpen ? styles.hamburgerActive : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className={styles.mobileOverlay} onClick={closeMenu}></div>
        )}

        {/* Mobile Menu */}
        <div
          className={`${styles.mobileMenu} ${
            isMenuOpen ? styles.mobileMenuOpen : ""
          } desktop-hidden`}
        >
          <div className={styles.mobileMenuHeader}>
            <h3>القائمة</h3>
            <button
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="إغلاق القائمة"
            >
              <FaTimes />
            </button>
          </div>

          <ul className={styles.mobileNavList}>
            {menuItems.map((item, index) => (
              <li key={index} className={styles.mobileNavItem}>
                <Link
                  href={item.href}
                  className={`${styles.mobileNavLink} ${
                    isActiveRoute(item.href) ? styles.active : ""
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Logout button in mobile menu */}
            {isAuthenticated && (
              <li className={styles.mobileNavItem}>
                <button
                  onClick={handleLogout}
                  className={`${styles.mobileNavLink} ${styles.logoutButton}`}
                >
                  تسجيل الخروج
                </button>
              </li>
            )}
          </ul>

          {/* Mobile Menu Footer */}
          <div className={styles.mobileMenuFooter}>
            <img
              src="/img/logo/logo.webp"
              alt="أكاديمية يقين للعلوم الشرعية"
              className={styles.logoImage}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
