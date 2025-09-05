"use client";

import Head from "next/head";
import HeroSection from "@/components/common/HeroSection/HeroSection";
import CoursesGrid from "@/components/common/UI/CoursesGrid/CoursesGrid";
import { useEffect, useState } from "react";
import api, { API_BASE_URL } from "@/utils/api";

const CoursesPage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses on component mount (public API call)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        // Try to fetch from API (without authentication for public access)
        const response = await api.get(`${API_BASE_URL}/api/course`);
        setCourses(response.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Fallback to empty array if API fails
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Transform courses data to match CoursesGrid interface
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
      <Head>
        <title>تصفح دوراتنا - أكاديمية يقين</title>
        <meta
          name="description"
          content="استكشف حلقة متنوعة من الدورات المتخصصة في العلوم الشرعية في أكاديمية يقين. دورات في التفسير، الحديث، الفقه، العقيدة والسيرة النبوية."
        />
        <meta
          name="keywords"
          content="دورات شرعية, تفسير القرآن, علوم الحديث, الفقه الإسلامي, العقيدة, السيرة النبوية, تعليم إسلامي"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HeroSection />
        {isLoading ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "16px",
                  color: "var(--text-light)",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid #e3f2fd",
                    borderTop: "2px solid #2196f3",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
                جاري تحميل الدورات...
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
          <div
            style={{
              textAlign: "center",
              padding: "3rem 0",
              color: "var(--text-light)",
            }}
          >
            <h3>لا يوجد دورات في الوقت الحالي</h3>
            <p>ستتاح الدورات قريباً إن شاء الله</p>
          </div>
        )}
      </main>
    </>
  );
};

export default CoursesPage;
