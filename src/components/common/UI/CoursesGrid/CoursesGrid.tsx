import CourseCard from "@/src/components/common/UI/CourseCard/CourseCard";
import AdminCourseCard from "@/src/components/common/UI/CourseCard/AdminCourseCard";
import styles from "./CoursesGrid.module.css";
import { CoursesGridProps } from "@/src/types";

const CoursesGrid = ({
  courses,
  showBtn,
  isContainer,
  isAdminView,
}: CoursesGridProps) => {
  return (
    <section className={styles.coursesSection}>
      <div className={`${isContainer && "container"} ${styles.grid}`}>
        {courses.map((course) =>
          isAdminView ? (
            <AdminCourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              startDate={course.startDate}
              duration={course.duration}
              shortDescription={course.shortDescription}
              showBtn={showBtn}
            />
          ) : (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              startDate={course.startDate}
              shortDescription={course.shortDescription}
              showBtn={showBtn}
              isAdminView={false}
              telegramLink={course.telegramLink}
              duration={course.duration}
            />
          )
        )}
      </div>
    </section>
  );
};

export default CoursesGrid;
