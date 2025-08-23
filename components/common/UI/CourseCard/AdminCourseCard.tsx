"use client";

import { useAdminModal } from "@/contexts/AdminModalContext";
import CourseCard from "./CourseCard";

interface AdminCourseCardProps {
  id: string;
  title: string;
  startDate: string;
  shortDescription: string;
  showBtn?: boolean;
}

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
