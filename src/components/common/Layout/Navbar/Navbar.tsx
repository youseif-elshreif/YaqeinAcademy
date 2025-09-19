"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "@/src/contexts/AuthContext";

const Navbar = () => {
  const { logout, user, isAuthenticated, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const getMenuItems = () => {
    const baseItems = [
      { label: "الرئيسية", href: "/" },
      { label: "دوراتنا", href: "/courses" },
    ];

    if (isAuthenticated) {
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
        return baseItems;
      }
    } else {
      return [
        ...baseItems,
        { label: "تسجيل الدخول", href: "/login" },
        { label: "تسجيل حساب", href: "/register" },
      ];
    }
  };

  const menuItems = getMenuItems();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbar = document.querySelector(`.${styles.navbar}`);
      if (navbar && !navbar.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveRoute = (href: string) => {
    if (!isMounted) return false;

    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };
  const handleLogout = () => {
    logout();
    router.push("/");
    closeMenu();
  };

  if (isLoading) {
    return (
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <Link href="/">
                {isMounted ? (
                  <Image
                    src="/img/logo/logo.webp"
                    alt="أكاديمية يقين للعلوم الشرعية"
                    className={styles.logoImage}
                    width={60}
                    height={60}
                    priority
                  />
                ) : (
                  <div
                    className={styles.logoImage}
                    style={{ width: 60, height: 60 }}
                  />
                )}
              </Link>
            </div>
            <div className={styles.authLoader}>
              <div className={styles.loadingSpinner}></div>
              <span>جاري التحميل...</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <Link href="/">
              <Image
                src="/img/logo/logo.webp"
                alt="أكاديمية يقين للعلوم الشرعية"
                className={styles.logoImage}
                width={60}
                height={60}
                priority
              />
            </Link>

            {isAuthenticated && user?.name && (
              <li className={`${styles.navItem} ${styles.greetingItem}`}>
                <span
                  className={styles.greetingText}
                  style={{ marginRight: "1rem" }}
                >
                  أهلاً بك يا{" "}
                  <strong className={styles.greetingName}>{user.name}</strong>
                </span>
              </li>
            )}
          </div>

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

          <button
            className={`${styles.menuToggle} desktop-hidden`}
            onClick={toggleMenu}
            aria-label="قائمة التنقل"
            aria-expanded={isMenuOpen}
          >
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className={`${styles.hamburger} ${
                  isMenuOpen ? styles.hamburgerActive : ""
                }`}
              />
            ))}
          </button>
        </div>

        {isMenuOpen && (
          <div className={styles.mobileOverlay} onClick={closeMenu}></div>
        )}

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

          {isAuthenticated && user?.name && (
            <div className={styles.userInfo}>
              <p>
                أهلاً بك يا{" "}
                <strong className={styles.greetingName}>{user.name}</strong>
              </p>
            </div>
          )}

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

            {isAuthenticated && (
              <li className={styles.mobileNavItem}>
                <button
                  onClick={handleLogout}
                  className={`${styles.logoutButton}`}
                >
                  تسجيل الخروج
                </button>
              </li>
            )}
          </ul>

          <div className={styles.mobileMenuFooter}>
            <Image
              src="/img/logo/logo.webp"
              alt="أكاديمية يقين للعلوم الشرعية"
              className={styles.logoImage}
              width={60}
              height={60}
              priority
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
