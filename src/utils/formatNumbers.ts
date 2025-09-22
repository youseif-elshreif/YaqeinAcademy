/**
 * تحويل الأرقام إلى التنسيق العربي
 * @param value القيمة المراد تحويلها (رقم أو نص)
 * @returns النص المُنسق بالأرقام العربية
 */
export const formatToArabicNumbers = (value: string | number): string => {
  if (typeof value === "number") {
    return value.toLocaleString("ar-EG");
  }

  if (typeof value === "string") {
    // تحويل الأرقام الإنجليزية إلى عربية في النص
    const arabicNumbers = value.replace(/\d/g, (digit) => {
      const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
      return arabicDigits[parseInt(digit)];
    });
    return arabicNumbers;
  }

  return String(value);
};

/**
 * تحويل النص الذي يحتوي على أرقام إلى أرقام عربية
 * @param text النص المراد تحويله
 * @returns النص مع الأرقام العربية
 */
export const convertTextNumbersToArabic = (text: string): string => {
  return text.replace(/\d/g, (digit) => {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return arabicDigits[parseInt(digit)];
  });
};

/**
 * تنسيق الأرقام الكبيرة مع الفواصل والأرقام العربية
 * @param number الرقم المراد تنسيقه
 * @returns الرقم مُنسق بالعربية مع الفواصل
 */
export const formatLargeNumber = (number: number): string => {
  return number.toLocaleString("ar-EG");
};
