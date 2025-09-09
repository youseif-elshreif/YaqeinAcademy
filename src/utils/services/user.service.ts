import api from "@/src/utils/api";

export const getProfile = () =>
  api.get(`/api/user/profile`).then((r) => r.data?.data ?? r.data);
export const updateProfile = (payload: any) =>
  api.put(`/api/user/profile`, payload).then((r) => r.data);
export const getUserStats = () =>
  api.get(`/api/user/user-stats`).then((r) => r.data?.data ?? r.data);
