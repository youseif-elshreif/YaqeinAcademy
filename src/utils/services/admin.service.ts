import api from "@/src/utils/api";

export const createTeacher = (payload: any) =>
  api.post(`/api/teacher`, payload).then((r) => r.data);
export const getTeachers = () => api.get(`/api/teacher`).then((r) => r.data);
export const updateTeacher = (teacherId: string, data: any) =>
  api.put(`/api/teacher/${teacherId}`, data).then((r) => r.data);
export const updateTeacherMeetingLink = (
  teacherId: string,
  meetingLink: string
) => api.put(`/api/teacher/${teacherId}`, { meetingLink }).then((r) => r.data);
export const deleteTeacher = (teacherId: string) =>
  api.delete(`/api/teacher/${teacherId}`).then((r) => r.data);

export const createStudent = (payload: any) =>
  api
    .post(`/api/admin/members`, { role: "student", ...payload })
    .then((r) => r.data);
export const updateMember = (memberId: string, data: any) =>
  api.put(`/api/admin/members/${memberId}`, data).then((r) => r.data);
export const deleteMember = (memberId: string) =>
  api.delete(`/api/admin/member/${memberId}`).then((r) => r.data);

export const getStudents = () =>
  api.get(`/api/admin/students`).then((r) => r.data ?? []);

export const createAdmin = (payload: any) =>
  api.post(`/api/admin`, payload).then((r) => r.data);
export const getAdmins = () =>
  api.get(`/api/admin/admins`).then((r) => r.data ?? []);

export const addCreditsToStudent = (userId: string, privateAmount: number) =>
  api
    .patch(`/api/admin/credits`, {
      userId: userId,
      privateAmount,
      publicAmount: 0,
    })
    .then((r) => r.data);

export const getGroups = () => api.get(`/api/group`).then((r) => r.data);
export const getGroupById = (groupId: string) =>
  api.get(`/api/group/${groupId}`).then((r) => r.data);
export const createGroup = (payload: any) =>
  api.post(`/api/group`, payload).then((r) => r.data);
export const updateGroup = (groupId: string, payload: any) =>
  api.put(`/api/group/${groupId}`, payload).then((r) => r.data);
export const deleteGroup = (groupId: string) =>
  api.delete(`/api/group/${groupId}`).then((r) => r.data);

export const addGroupMember = (groupId: string, memberId: string) =>
  api.post(`/api/group/${groupId}/members`, { memberId }).then((r) => r.data);
export const removeGroupMember = (groupId: string, memberId: string) =>
  api
    .delete(`/api/group/${groupId}/members`, { data: { memberId } })
    .then((r) => r.data);

export const addLessonToGroup = (
  groupId: string,
  data: { scheduledAt: string; subject?: string; meetingLink: string }
) => api.post(`/api/lesson/group/${groupId}`, data).then((r) => r.data);
export const updateLesson = (lessonId: string, data: any) =>
  api.put(`/api/lesson/${lessonId}`, data).then((r) => r.data);
export const deleteLesson = (lessonId: string) =>
  api.delete(`/api/lesson/${lessonId}`).then((r) => r.data);

export const getCourses = () => api.get(`/api/course`).then((r) => r.data);
export const getCourseById = (courseId: string) =>
  api.get(`/api/course/${courseId}`).then((r) => r.data);
export const createCourse = (payload: any) =>
  api.post(`/api/course`, payload).then((r) => r.data);
export const updateCourse = (courseId: string, payload: any) =>
  api.put(`/api/course/${courseId}`, payload).then((r) => r.data);
export const deleteCourse = (courseId: string) =>
  api.delete(`/api/course/${courseId}`).then((r) => r.data);

export const getContactInfo = () =>
  api.get(`/api/admin/contact`).then((r) => r.data);
export const updateContactInfo = (payload: any) =>
  api.put(`/api/admin/contact`, payload).then((r) => r.data);
