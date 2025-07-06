import Grid from "./Grid";
import Fil from "./Fil";
import { useMemo, useState } from "react";
import { coursesData } from "@/data/courses";

interface FilterState {
  teacherName: string;
  time: string;
  type: string;
  sort: string;
}

function HowFilt() {
  const [filter, setFilter] = useState<FilterState>({
    teacherName: "",
    time: "",
    type: "",
    sort: "newest",
  });

  function onfilterChange(newFilter: FilterState) {
    setFilter(newFilter);
  }

  const filteredCourses = useMemo(() => {
    let filtered = coursesData.filter((course) => {
      const matchesTeacher =
        !filter.teacherName || course.teacherName.includes(filter.teacherName);
      const matchesTime = !filter.time || course.duration.includes(filter.time);
      const matchesType = !filter.type || course.type === filter.type;
      return matchesTeacher && matchesTime && matchesType;
    });

    // Apply sorting
    if (filter.sort === "newest") {
      return filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filter.sort === "oldest") {
      return filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (filter.sort === "name") {
      return filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter.sort === "instructor") {
      return filtered.sort((a, b) =>
        a.teacherName.localeCompare(b.teacherName)
      );
    }

    return filtered;
  }, [filter]);

  return (
    <>
      <Fil onfilterChange={onfilterChange} />
      <Grid courses={filteredCourses} />
    </>
  );
}

export default HowFilt;
