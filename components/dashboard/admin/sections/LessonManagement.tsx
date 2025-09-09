import React, { useState, useEffect } from "react";
import { FiCalendar, FiPlus } from "react-icons/fi";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { useCoursesContext } from "@/contexts/CoursesContext";
import StatCard from "@/components/common/UI/StatCard";
import EnhancedLoader from "@/components/common/UI/EnhancedLoader";
import styles from "@/styles/AdminDashboard.module.css";
import CoursesGrid from "@/components/common/UI/CoursesGrid/CoursesGrid";
import Button from "@/components/common/Button";

const LessonManagement: React.FC = () => {
  const { openAddCourseModal } = useAdminModal();
  const { courses, getCourses } = useCoursesContext();
  const [isLoading, setIsLoading] = useState(false);

  // Transform API data to match CoursesGrid interface
  const transformCourseData = (apiCourses: unknown[]) => {
    return apiCourses.map((course: any) => ({
      id: course._id, // Use _id from API response
      title: course.title,
      startDate: course.startAt
        ? new Date(course.startAt).toLocaleDateString("ar-EG")
        : "غير محدد",
      duration: course.duration || "غير محدد", // Add duration field
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
      try {setIsLoading(true);
        const token = localStorage.getItem("accessToken");
        if (token) {
          await getCourses(token);
        }
      } catch (error) {} finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [getCourses]);

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>إدارة الدورات</h1>
        <Button
          variant="primary"
          icon={<FiPlus />}
          onClick={openAddCourseModal}
        >
          إنشاء دورة جديدة
        </Button>
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
        <EnhancedLoader
          type="default"
          text="جاري تحميل الدورات..."
          size="large"
          color="primary"
        />
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

