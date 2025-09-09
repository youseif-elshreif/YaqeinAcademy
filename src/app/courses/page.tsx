"use client";

import Head from "next/head";
import HeroSection from "@/src/components/common/HeroSection/HeroSection";
import CoursesGrid from "@/src/components/common/UI/CoursesGrid/CoursesGrid";
import { useEffect, useState } from "react";
import api, { API_BASE_URL } from "@/src/utils/api";

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
      : "??? ????",
    duration: course.duration || "??? ????", // Add duration field
    shortDescription:
      course.description.length > 100
        ? course.description.slice(0, 100) + "..."
        : course.description,
    telegramLink: course.telegramLink,
  }));

  return (
    <>
      <Head>
        <title>???? ??????? - ???????? ????</title>
        <meta
          name="description"
          content="?????? ???? ?????? ?? ??????? ???????? ?? ?????? ??????? ?? ???????? ????. ????? ?? ???????? ??????? ?????? ??????? ??????? ???????."
        />
        <meta
          name="keywords"
          content="????? ?????, ????? ??????, ???? ??????, ????? ????????, ???????, ?????? ???????, ????? ??????"
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
                ???? ????? ???????...
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
            <h3>?? ???? ????? ?? ????? ??????</h3>
            <p>????? ??????? ?????? ?? ??? ????</p>
          </div>
        )}
      </main>
    </>
  );
};

export default CoursesPage;
