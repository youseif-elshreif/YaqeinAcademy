"use client";

import { useAdminModal } from "@/src/contexts/AdminModalContext";
import CourseCard from "./CourseCard";
import { AdminCourseCardProps } from "@/src/types";

const AdminCourseCard = ({ id, ...props }: AdminCourseCardProps) => {
  const { openEditCourseModal, openDeleteCourseModal } = useAdminModal();

  const handleEdit = () => {
    openEditCourseModal(id);
  };

  const handleDelete = () => {
    openDeleteCourseModal(id);
  };

  return (
    <CourseCard
      id={id}
      {...props}
      onEdit={handleEdit}
      onDelete={handleDelete}
      isAdminView={true}
    />
  );
};

export default AdminCourseCard;
