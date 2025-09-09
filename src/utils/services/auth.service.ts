import api from "@/src/utils/api";

// Profile operations
export const getUserProfile = () =>
  api.get(`/api/user/profile`).then((r) => r.data);

export const updateUserProfile = (data: any) =>
  api.put(`/api/user/profile`, data).then((r) => r.data);

// Authentication operations
export const login = (email: string, password: string) =>
  api.post(`/api/auth/login`, { email, password }).then((r) => r.data);

export const register = (regData: any) =>
  api.post(`/api/auth/register`, regData).then((r) => r.data);

export const verifyEmail = (token: string) =>
  api.post(`/api/auth/verify-email`, { token }).then((r) => r.data);

export const requestPasswordReset = (email: string) =>
  api.post(`/api/auth/request-password-reset`, { email }).then((r) => r.data);

export const logout = () =>
  api.post(`/api/auth/logout`, {}).then((r) => r.data);
