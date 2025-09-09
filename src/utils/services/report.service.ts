import api from "@/src/utils/api";

export type StudentReportPayload = {
  studentId: string;
  attended: boolean;
  wantedForNextLesson?: { new: string[]; old: string[] };
  newMemorized?: { new: string[]; old: string[] };
  notes?: string;
  rating?: number; 
  content?: string; 
};

export const postLessonReport = (
  lessonId: string,
  payload: StudentReportPayload
) => {
  return api.post(`/api/report/lesson/${lessonId}`, {
    ...payload,
    content: payload.content ?? " ",
  });
};

export const getStudentReports = (studentId: string) =>
  api.get(`/api/report/student/${studentId}`).then((r) => r.data);

export const getMyReports = () =>
  api.get(`/api/user/my-reports`).then((r) => r.data);
