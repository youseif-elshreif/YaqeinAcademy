import CourseCard from "@/components/CourseCard/CourseCard";

interface Course {
  id: number;
  title: string;
  teacherName: string;
  startDate: string;
  duration: string;
  shortDescription: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

interface CourseProps {
  courses: Course[];
}

function Grid({ courses }: CourseProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          title={course.title}
          teacherName={course.teacherName}
          startDate={course.startDate}
          duration={course.duration}
          shortDescription={course.shortDescription}
          isFeatured={course.isFeatured}
          isNew={course.isNew}
        />
      ))}
    </div>
  );
}

export default Grid;
