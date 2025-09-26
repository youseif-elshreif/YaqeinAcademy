/**
 * تحويل الوقت من صيغة 24 ساعة إلى صيغة 12 ساعة مع ص/م
 * @param time24 الوقت بصيغة 24 ساعة (مثال: "14:30")
 * @returns الوقت بصيغة 12 ساعة مع ص/م (مثال: "2:30 م")
 */
export const convertTo12HourFormat = (time24: string): string => {
  if (!time24) return "";

  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);

  if (hour === 0) {
    return `12:${minute.toString().padStart(2, "0")} ص`;
  } else if (hour < 12) {
    return `${hour}:${minute.toString().padStart(2, "0")} ص`;
  } else if (hour === 12) {
    return `12:${minute.toString().padStart(2, "0")} م`;
  } else {
    return `${hour - 12}:${minute.toString().padStart(2, "0")} م`;
  }
};

/**
 * تحويل الوقت من صيغة 12 ساعة مع ص/م إلى صيغة 24 ساعة
 * @param time12 الوقت بصيغة 12 ساعة مع ص/م (مثال: "2:30 م")
 * @returns الوقت بصيغة 24 ساعة (مثال: "14:30")
 */
export const convertTo24HourFormat = (time12: string): string => {
  if (!time12) return "";

  const timeRegex = /^(\d{1,2}):(\d{2})\s*(ص|م)$/;
  const match = time12.match(timeRegex);

  if (!match) return time12; // Return original if doesn't match expected format

  const [, hourStr, minuteStr, period] = match;
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (period === "ص") {
    if (hour === 12) hour = 0;
  } else {
    if (hour !== 12) hour += 12;
  }

  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};
