// Helper function to get all dates in current month for a specific day
export const getDatesForDayInCurrentMonth = (dayName: string): Date[] => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const dates: Date[] = [];

  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month, day);
    if (date.getMonth() !== month) break;

    const weekday = date.toLocaleDateString("ar", {
      weekday: "long",
      calendar: "gregory",
    });

    if (weekday === dayName) {
      dates.push(date);
    }
  }

  return dates;
};

// Helper function to create lesson schedule with ISO dates
export const createLessonSchedule = (
  weekdays: string[],
  times: string[],
  meetingLink: string
): { scheduledAt: string; meetingLink: string; subject: string }[] => {
  const schedule: {
    scheduledAt: string;
    meetingLink: string;
    subject: string;
  }[] = [];

  weekdays.forEach((weekday, index) => {
    if (weekday && times[index]) {
      const dates = getDatesForDayInCurrentMonth(weekday);

      dates.forEach((date) => {
        // Parse time (e.g., "10:00" -> hours: 10, minutes: 0)
        const [hours, minutes] = times[index].split(":").map(Number);

        // Set the time on the date
        const dateWithTime = new Date(date);
        dateWithTime.setHours(hours, minutes, 0, 0);

        schedule.push({
          scheduledAt: dateWithTime.toISOString(),
          meetingLink: meetingLink,
          subject: " ", // Always empty as requested
        });
      });
    }
  });

  // Sort by date
  schedule.sort(
    (a, b) =>
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  );

  return schedule;
};

// export const generateSessionDates = (
//   days: (string | undefined)[],
//   count: number
// ): string[] => {
//   const allDates: Date[] = [];

//   days.forEach((day) => {
//     if (day) {
//       const dates = getDatesForDayInCurrentMonth(day);
//       allDates.push(...dates);
//     }
//   });

//   allDates.sort((a, b) => a.getTime() - b.getTime());

//   return allDates.slice(0, count).map((date) =>
//     date.toLocaleDateString("ar", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       calendar: "gregory",
//     })
//   );
// };

export const getNextSessionDate = (
  days: (string | undefined)[],
  times: (string | undefined)[]
): { date: string; time: string | undefined } | null => {
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const weekday = date.toLocaleDateString("ar", {
      weekday: "long",
      calendar: "gregory",
    });

    if (days.includes(weekday)) {
      let time: string | undefined = "غير محدد";
      if (weekday === days[0]) {
        time = times[0];
      } else if (weekday === days[1]) {
        time = times[1];
      } else {
        time = times[2];
      }

      return {
        date: date.toLocaleDateString("ar", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          calendar: "gregory",
        }),
        time: time,
      };
    }
  }

  return null;
};

// export function getSessionTimes(
//   times: (string | undefined)[],
//   scheduleData: any[]
// ): (string | undefined)[] {
//   const timesArray: (string | undefined)[] = [];

//   for (let index = 0; index < scheduleData.length; index++) {
//     const timeIndex = index % times.length;
//     timesArray.push(times[timeIndex]);
//   }

//   return timesArray;
// }
