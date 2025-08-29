import api from "@/utils/api";

export const completeLesson = (lessonId: string) =>
  api.post(`/api/lesson/${lessonId}/complete`, {});

export const getTeacherLessons = () =>
  api.get(`/api/teacher/my-lessons`).then((r) => {
    const d = (r as any).data;
    return Array.isArray(d?.data) ? d.data : Array.isArray(d) ? d : [];
  });

export const getUserLessons = () =>
  api.get(`/api/user/my-lessons`).then((r) => (r as any).data?.data ?? []);
