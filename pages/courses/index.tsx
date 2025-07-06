import { useState, useMemo } from "react";
import Head from "next/head";
import HeroSection from "../../components/HeroSection/HeroSection";
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import CoursesGrid from "../../components/CoursesGrid/CoursesGrid";
import PaginationControls from "../../components/PaginationControls/PaginationControls";
import { coursesData } from "../../data/courses";

interface FilterState {
  instructor: string;
  duration: string;
  type: string;
  sortBy: string;
}

const CoursesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    instructor: "",
    duration: "",
    type: "",
    sortBy: "newest",
  });

  const coursesPerPage = 6;

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = coursesData.filter((course) => {
      const instructorMatch =
        !filters.instructor || course.teacherName.includes(filters.instructor);
      const durationMatch =
        !filters.duration || course.duration.includes(filters.duration);
      const typeMatch = !filters.type || course.type === filters.type;

      return instructorMatch && durationMatch && typeMatch;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "name":
          return a.title.localeCompare(b.title, "ar");
        case "instructor":
          return a.teacherName.localeCompare(b.teacherName, "ar");
        case "newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return filtered;
  }, [filters]);

  // Pagination logic
  const totalPages = Math.ceil(
    filteredAndSortedCourses.length / coursesPerPage
  );
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredAndSortedCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  // Reset pagination when filters change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>تصفح دوراتنا - أكاديمية يقين</title>
        <meta
          name="description"
          content="استكشف مجموعة متنوعة من الدورات المتخصصة في العلوم الشرعية في أكاديمية يقين. دورات في التفسير، الحديث، الفقه، العقيدة والسيرة النبوية."
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

        {currentCourses.length > 0 ? (
          <>
            <FiltersBar onFilterChange={handleFilterChange} />
            <CoursesGrid courses={currentCourses} showBtn={true} />

            {totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 0",
              color: "var(--text-light)",
            }}
          >
            <h3>لا توجد دورات تطابق المعايير المحددة</h3>
            <p>جرب تغيير الفلاتر للعثور على دورات أخرى</p>
          </div>
        )}
      </main>
    </>
  );
};

export default CoursesPage;
