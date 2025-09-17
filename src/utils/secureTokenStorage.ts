// secureTokenStorage.ts - تحسين localStorage مع حماية إضافية
import CryptoJS from "crypto-js";

// مفتاح التشفير - يجب أن يكون في environment variables
const ENCRYPTION_KEY =
  process.env.NEXT_PUBLIC_STORAGE_KEY || "default-key-change-in-production";

export interface TokenData {
  token: string;
  timestamp: number;
  expiresAt: number;
}

/**
 * تشفير البيانات قبل التخزين
 */
const encryptData = (data: string): string => {
  try {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    return data; // fallback - لكن غير آمن
  }
};

/**
 * فك تشفير البيانات بعد القراءة
 */
const decryptData = (encryptedData: string): string => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    return "";
  }
};

/**
 * التحقق من صحة البيئة قبل التخزين
 */
const isSecureEnvironment = (): boolean => {
  if (typeof window === "undefined") return false;

  // التأكد من أننا في HTTPS في الإنتاج
  if (process.env.NODE_ENV === "production") {
    return window.location.protocol === "https:";
  }

  return true; // السماح بـ HTTP في التطوير
};

/**
 * تخزين آمن للتوكن مع التشفير
 */
export const setSecureToken = (
  token: string,
  expiresIn: number = 24 * 60 * 60 * 1000
): boolean => {
  if (!isSecureEnvironment()) {
    console.warn("Insecure environment detected - token not stored");
    return false;
  }

  try {
    const tokenData: TokenData = {
      token,
      timestamp: Date.now(),
      expiresAt: Date.now() + expiresIn,
    };

    const encryptedData = encryptData(JSON.stringify(tokenData));

    // استخدام sessionStorage إذا كان متاحاً (أكثر أماناً)
    const storage = window.sessionStorage || window.localStorage;
    storage.setItem("auth_data", encryptedData);

    // تعيين timer لحذف التوكن عند انتهاء الصلاحية
    setTimeout(() => {
      removeSecureToken();
    }, expiresIn);

    return true;
  } catch (error) {
    console.error("Failed to store token:", error);
    return false;
  }
};

/**
 * قراءة آمنة للتوكن مع التحقق من الصلاحية
 */
export const getSecureToken = (): string | null => {
  if (!isSecureEnvironment()) {
    return null;
  }

  try {
    const storage = window.sessionStorage || window.localStorage;
    const encryptedData = storage.getItem("auth_data");

    if (!encryptedData) {
      return null;
    }

    const decryptedData = decryptData(encryptedData);
    if (!decryptedData) {
      removeSecureToken(); // حذف البيانات التالفة
      return null;
    }

    const tokenData: TokenData = JSON.parse(decryptedData);

    // التحقق من انتهاء الصلاحية
    if (Date.now() > tokenData.expiresAt) {
      removeSecureToken();
      return null;
    }

    // التحقق من عمر التوكن (حماية إضافية)
    const tokenAge = Date.now() - tokenData.timestamp;
    const maxAge = 7 * 24 * 60 * 60 * 1000; // أسبوع كحد أقصى

    if (tokenAge > maxAge) {
      removeSecureToken();
      return null;
    }

    return tokenData.token;
  } catch (error) {
    console.error("Failed to retrieve token:", error);
    removeSecureToken(); // حذف البيانات التالفة
    return null;
  }
};

/**
 * حذف آمن للتوكن
 */
export const removeSecureToken = (): void => {
  try {
    if (typeof window !== "undefined") {
      window.sessionStorage?.removeItem("auth_data");
      window.localStorage?.removeItem("auth_data");
      // حذف التوكن القديم أيضاً
      window.localStorage?.removeItem("accessToken");
    }
  } catch (error) {
    console.error("Failed to remove token:", error);
  }
};

/**
 * التحقق من وجود توكن صالح
 */
export const hasValidToken = (): boolean => {
  return getSecureToken() !== null;
};

/**
 * تجديد توكن موجود (تحديث timestamp)
 */
export const refreshTokenTimestamp = (): boolean => {
  const currentToken = getSecureToken();
  if (currentToken) {
    return setSecureToken(currentToken);
  }
  return false;
};
