import CourseCard from "../CourseCard/CourseCard";
import styles from "./CoursesGrid.module.css";

interface Course {
  id: number;
  title: string;
  teacherName: string;
  startDate: string;
  duration: string;
  shortDescription: string;
}

interface CoursesGridProps {
  courses: Course[];
  showBtn?: boolean;
  isContainer?: boolean;
}

const CoursesGrid = ({ courses, showBtn, isContainer }: CoursesGridProps) => {
  return (
    <section className={styles.coursesSection}>
      <div className={`${isContainer && "container"} ${styles.grid}`}>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            teacherName={course.teacherName}
            startDate={course.startDate}
            duration={course.duration}
            shortDescription={course.shortDescription}
            showBtn={showBtn}
          />
        ))}
      </div>
    </section>
  );
};

export default CoursesGrid;
