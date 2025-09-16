"use client";

import HeroSection from "@/src/components/common/HeroSection/HeroSection";
import CoursesGrid from "@/src/components/common/UI/CoursesGrid/CoursesGrid";
import { useEffect, useState } from "react";
import api, { API_BASE_URL } from "@/src/utils/api";
import styles from "./page.module.css";

const CoursesPage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);

        const response = await api.get(`${API_BASE_URL}/api/course`);
        setCourses(response.data || []);
      } catch {
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const transformedCourses = courses.map((course) => ({
    id: course._id,
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

  return (
    <>
      <main className={styles.main}>
        <HeroSection />
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingContent}>
              <div className={styles.loadingText}>
                <div className={styles.spinner}></div>
                يتم تحميل الدورات...
              </div>
            </div>
          </div>
        ) : transformedCourses.length > 0 ? (
          <>
            <CoursesGrid
              courses={transformedCourses}
              showBtn={true}
              isContainer={true}
            />
          </>
        ) : (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>لا توجد دورات في الوقت الحالي</h3>
            <p className={styles.emptyDescription}>
              تحقق مرة أخرى أو تواصل مع الإدارة
            </p>
          </div>
        )}
      </main>
    </>
  );
};

export default CoursesPage;
