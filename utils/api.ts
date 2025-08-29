import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { RefreshTokenResponse } from "@/utils/types";

// Keep this as the base URL for the entire API
export const API_BASE_URL = "http://localhost:3001";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

// Log network requests for debugging purposes
const logRequest = (config: InternalAxiosRequestConfig) => {
  console.log(`REQUEST: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
};

// Add auth header to requests if token exists
const addAuthHeader = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    if (!config.headers) {
      config.headers = new axios.AxiosHeaders();
    }
    config.headers.Authorization = `Bearer ${token}`;
    console.log(
      `Authorization header set: Bearer ${token.substring(0, 15)}...`
    );
  } else {
    console.warn("No access token found in localStorage");
  }
  return config;
};

// Request interceptors
api.interceptors.request.use(logRequest);
api.interceptors.request.use(addAuthHeader);

// Response interceptors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`RESPONSE: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only attempt to refresh the token if we get a 401 and haven't tried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/api/auth/refresh-token" // ✅ تحديث المسار
    ) {
      console.log("Token expired, attempting refresh...");

      if (isRefreshing) {
        try {
          // Wait for the current refresh to complete
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // ✅ استخدام axios instance بدلاً من axios منفصل
        const { data } = await api.post<RefreshTokenResponse>(
          `/api/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: {
              // ✅ إزالة Authorization header للـ refresh request
              Authorization: undefined,
            },
          }
        );

        const newToken = data.accessToken;
        console.log("Token refreshed successfully");

        // Update stored token
        localStorage.setItem("accessToken", newToken);

        // Process queue with new token
        processQueue(null, newToken);

        // Return original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        processQueue(refreshError as AxiosError);

        // ✅ تنظيف شامل للحالة
        localStorage.removeItem("accessToken");

        // ✅ إعادة توجيه لصفحة تسجيل الدخول إذا كنا في البراوزر
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
