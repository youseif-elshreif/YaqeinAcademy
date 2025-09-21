import api from "@/src/utils/api";
import { StudentReportPayload } from "@/src/types";

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
