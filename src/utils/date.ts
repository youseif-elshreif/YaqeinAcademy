// Helper function to get remaining dates in current month for a specific day (from today onwards)
export const getDatesForDayInCurrentMonth = (dayName: string): Date[] => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayDate = today.getDate();

  const dates: Date[] = [];

  for (let day = todayDate; day <= 31; day++) {
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
          subject: " ",
        });
      });
    }
  });

  schedule.sort(
    (a, b) =>
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  );

  return schedule;
};