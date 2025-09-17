// secureCookieAuth.ts - HttpOnly Cookie Implementation (يتطلب backend changes)
import { NextApiResponse } from "next";

// هذا الحل يحتاج تعديل في الـ backend
// لأن httpOnly cookies لا يمكن الوصول إليها من JavaScript

export const setSecureTokenCookie = (
  res: NextApiResponse,
  token: string,
  options: {
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "strict" | "lax" | "none";
  } = {}
) => {
  const {
    maxAge = 24 * 60 * 60 * 1000, // 24 hours
    secure = process.env.NODE_ENV === "production",
    httpOnly = true,
    sameSite = "strict",
  } = options;

  res.setHeader(
    "Set-Cookie",
    `accessToken=${token}; Path=/; Max-Age=${maxAge}; ${
      secure ? "Secure;" : ""
    } ${httpOnly ? "HttpOnly;" : ""} SameSite=${sameSite}`
  );
};

export const clearTokenCookie = (res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    "accessToken=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=strict"
  );
};
