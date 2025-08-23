import React, { useState, useEffect } from "react";
import { FiCalendar, FiPlus } from "react-icons/fi";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { useAdminDashboardContext } from "@/contexts/AdminDashboardContext";
import StatCard from "@/components/common/UI/StatCard";
import styles from "@/styles/AdminDashboard.module.css";
import CoursesGrid from "@/components/common/UI/CoursesGrid/CoursesGrid";

const LessonManagement: React.FC = () => {
  const { openAddCourseModal } = useAdminModal();
  const { courses, getCourses } = useAdminDashboardContext();
  const [isLoading, setIsLoading] = useState(false);

  // Transform API data to match CoursesGrid interface
  const transformCourseData = (apiCourses: any[]) => {
    return apiCourses.map((course) => ({
      id: course._id, // Use _id from API response
      title: course.title,
      startDate: course.startAt
        ? new Date(course.startAt).toLocaleDateString("ar-EG")
        : "غير محدد",
      shortDescription:
        course.description.length > 100
          ? course.description.slice(0, 100) + "..."
          : course.description,
      telegramLink: course.telegramLink,
    }));
  };

  const coursesData = transformCourseData(courses || []);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log(true);
        setIsLoading(true);
        const token = localStorage.getItem("accessToken");
        if (token) {
          await getCourses(token);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [getCourses]);

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>إدارة الدورات</h1>
        <button
          onClick={openAddCourseModal}
          className={`${styles.btn} ${styles.btnPrimary} ${styles.btnWithIcon}`}
        >
          <FiPlus />
          إنشاء دورة جديدة
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <StatCard
          icon={FiCalendar}
          value={coursesData.length}
          label="عدد الدورات"
        />
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>جاري تحميل الدورات...</p>
        </div>
      ) : coursesData.length > 0 ? (
        <CoursesGrid courses={coursesData} isAdminView={true} />
      ) : (
        <div>
          <h3 style={{ textAlign: "center", color: "var(--text-light)" }}>
            لا توجد دورات
          </h3>
        </div>
      )}
    </div>
  );
};

export default LessonManagement;
