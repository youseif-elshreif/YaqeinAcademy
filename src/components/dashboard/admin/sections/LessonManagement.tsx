import React, { useState, useEffect } from "react";
import { FiCalendar, FiPlus } from "react-icons/fi";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import { useCoursesContext } from "@/src/contexts/CoursesContext";
import StatCard from "@/src/components/common/UI/StatCard";
import EnhancedLoader from "@/src/components/common/UI/EnhancedLoader";
import styles from "@/src/styles/AdminDashboard.module.css";
import CoursesGrid from "@/src/components/common/UI/CoursesGrid/CoursesGrid";
import Button from "@/src/components/common/Button";

const LessonManagement: React.FC = () => {
  const { openAddCourseModal } = useAdminModal();
  const { courses, getCourses } = useCoursesContext();
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        await getCourses();
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [getCourses]);

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>إدارة الدروس</h1>
        <Button
          variant="primary"
          icon={<FiPlus />}
          onClick={openAddCourseModal}
        >
          إضافة درس جديد
        </Button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          icon={FiCalendar}
          value={coursesData.length}
          label="عدد الدروس"
        />
      </div>

      {isLoading ? (
        <EnhancedLoader
          type="default"
          text="جاري تحميل الدروس..."
          size="large"
          color="primary"
        />
      ) : coursesData.length > 0 ? (
        <CoursesGrid courses={coursesData} isAdminView={true} />
      ) : (
        <div>
          <h3 style={{ textAlign: "center", color: "var(--text-light)" }}>
            لا توجد دروس متاحة
          </h3>
        </div>
      )}
    </div>
  );
};

export default LessonManagement;
