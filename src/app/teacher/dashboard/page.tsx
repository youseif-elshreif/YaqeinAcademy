"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/TeacherDashboard.module.css";
import TeacherSummaryCards from "@/components/dashboard/teacher/TeacherSummaryCards";
import MonthlyClassTable from "@/components/dashboard/teacher/MonthlyClassTable";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import ProfileSettings from "@/components/dashboard/student/ProfileSettings";
import { ModalProvider } from "@/contexts/ModalContext";
import ModalContainer from "@/components/common/Layout/ModalContainer";
import { ClassData } from "@/utils/types";
import { useAuth } from "@/contexts/AuthContext";
import { withTeacherProtection } from "@/components/auth/withRoleProtection";

// /**
//  * Utility function to get all dates in a specific month/year that fall on a given Arabic day
//  * @param arabicDay - Arabic day name (e.g., "الاثنين", "الأربعاء", etc.)
//  * @param month - Month (1-12)
//  * @param year - Year (e.g., 2025)
//  * @returns Array of dates in "YYYY-MM-DD" format
//  */

const getDatesByArabicDay = (
  arabicDay: string,
  month: number,
  year: number
): string[] => {
  const arabicDays = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  const targetDayIndex = arabicDays.indexOf(arabicDay);

  if (targetDayIndex === -1) {
    throw new Error(
      `Invalid Arabic day name: ${arabicDay}. Valid days are: ${arabicDays.join(
        ", "
      )}`
    );
  }

  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Month must be between 1 and 12.`);
  }

  const dates: string[] = [];

  // Get the number of days in the specified month
  const daysInMonth = new Date(year, month, 0).getDate();

  // Check each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month - 1, day); // month - 1 because Date constructor uses 0-based months

    // Check if this date falls on the target day
    if (currentDate.getDay() === targetDayIndex) {
      // Format as YYYY-MM-DD
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      dates.push(formattedDate);
    }
  }

  return dates;
};

// /**
//  * Helper function to get Arabic day name from a date string
//  * @param dateString - Date in "YYYY-MM-DD" format
//  * @returns Arabic day name
//  */

const getArabicDayFromDate = (dateString: string): string => {
  const arabicDays = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const date = new Date(dateString);
  return arabicDays[date.getDay()];
};

// /**
//  * Generate a class meeting link based on group name and date
//  * @param groupName - Name of the group
//  * @param date - Date of the class
//  * @param time - Time of the class
//  * @returns Meeting link URL
//  */
const generateClassLink = (
  groupName: string,
  date: string,
  time: string
): string => {
  // Generate a unique meeting ID based on group name, date, and time
  const groupId = groupName.replace(/\s+/g, "-").toLowerCase();
  const dateFormatted = date.replace(/-/g, "");
  const timeFormatted = time.replace(/[:\s]/g, "").toLowerCase();

  // Create a hash-like ID for more realistic links
  const hashBase = `${groupId}-${dateFormatted}-${timeFormatted}`;
  const meetingId = hashBase.replace(/[^\w-]/g, "").substring(0, 15);

  // Simulate different meeting platforms with more realistic URLs
  const platforms = [
    `https://zoom.us/j/${
      Math.floor(Math.random() * 9000000000) + 1000000000
    }?pwd=${meetingId}`,
    `https://meet.google.com/${meetingId}-${Math.random()
      .toString(36)
      .substring(2, 8)}`,
    `https://teams.microsoft.com/l/meetup-join/19%3a${meetingId}%40thread.tacv2/`,
    `https://us02web.zoom.us/j/${
      Math.floor(Math.random() * 9000000000) + 1000000000
    }`,
    `https://meet.jit.si/YaqeenAcademy-${meetingId}`,
  ];

  // Return a random platform link
  return platforms[Math.floor(Math.random() * platforms.length)];
};

// /**
//  * Generate monthly classes based on group schedule
//  * @param groupSchedules - Array of group schedules with days and times
//  * @param month - Month (1-12)
//  * @param year - Year (e.g., 2025)
//  * @returns Array of ClassData for the entire month
//  */
const generateMonthlyClasses = (
  groupSchedules: any[],
  month: number,
  year: number
): ClassData[] => {
  const allClasses: ClassData[] = [];
  let classId = 1;

  groupSchedules.forEach((schedule) => {
    // Handle multiple days and times for each group
    schedule.schedule.forEach((daySchedule: any) => {
      const dates = getDatesByArabicDay(daySchedule.dayName, month, year);

      dates.forEach((date) => {
        allClasses.push({
          id: classId++,
          date: date,
          time: daySchedule.time,
          status: "pending", // Default status for future classes
          groupName: schedule.groupName,
          groupRate: 0,
          groupNotes: "",
          classLink: generateClassLink(
            schedule.groupName,
            date,
            daySchedule.time
          ), // Auto-generate link for each class
          students: schedule.students,
        });
      });
    });
  });

  // Sort by date and time
  allClasses.sort((a, b) => {
    const dateComparison =
      new Date(a.date).getTime() - new Date(b.date).getTime();
    if (dateComparison === 0) {
      // If same date, sort by time
      return a.time.localeCompare(b.time);
    }
    return dateComparison;
  });

  return allClasses;
};

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [activeTab, setActiveTab] = useState("monthly-classes");

  // Get current date
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1); // getMonth() returns 0-11, so add 1
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // Function to update classes when month/year changes
  const updateMonthlyClasses = (month: number, year: number) => {
    const monthlyClasses = generateMonthlyClasses(groupSchedules, month, year);
    setClasses(monthlyClasses);
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  // Function to navigate to specific month/year (useful for adding month/year selector later)
  const navigateToMonth = (month: number, year: number) => {
    updateMonthlyClasses(month, year);
  };

  // Function to navigate to next month
  const goToNextMonth = () => {
    let nextMonth = currentMonth + 1;
    let nextYear = currentYear;

    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }

    updateMonthlyClasses(nextMonth, nextYear);
  };

  // Function to navigate to previous month
  const goToPreviousMonth = () => {
    let prevMonth = currentMonth - 1;
    let prevYear = currentYear;

    if (prevMonth < 1) {
      prevMonth = 12;
      prevYear -= 1;
    }

    updateMonthlyClasses(prevMonth, prevYear);
  };

  // Function to go back to current month
  const goToCurrentMonth = () => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    updateMonthlyClasses(currentMonth, currentYear);
  };

  useEffect(() => {
    // Generate classes for current month and year automatically
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11, so add 1
    const currentYear = now.getFullYear();
    updateMonthlyClasses(currentMonth, currentYear);
  }, []);

  // Mock data for teacher dashboard
  const [treacherData, setTeacherData] = useState({
    id: user?.id || "",
    name: user?.name || "",
    avatar: user?.avatar || "/avatar.png",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const groupSchedules = [
    {
      groupName: "حلقة الفجر",
      schedule: [
        { dayName: "الاثنين", time: "06:00 ص" }, // Monday
        { dayName: "الأربعاء", time: "06:00 ص" }, // Wednesday
      ],
      students: [
        {
          studentId: 1,
          studentName: "أحمد محمد",
          nickname: "أحمدي",
          rate: 0,
          completed: null,
          notes: "",
          nextPrep: null,
        },
        {
          studentId: 2,
          studentName: "عبد الله حسن",
          nickname: "عبودي",
          rate: 0,
          completed: null,
          notes: "",
          nextPrep: null,
        },
      ],
    },
    {
      groupName: "حلقة الضحى",
      schedule: [
        { dayName: "الاثنين", time: "10:00 ص" }, // Monday
        { dayName: "الخميس", time: "10:30 ص" }, // Thursday - different time
      ],
      students: [
        {
          studentId: 3,
          studentName: "فاطمة علي",
          nickname: "فطوم",
          rate: 0,
          completed: null,
          notes: "",
          nextPrep: null,
        },
        {
          studentId: 4,
          studentName: "عائشة أحمد",
          nickname: "عوشة",
          rate: 0,
          completed: null,
          notes: "",
          nextPrep: null,
        },
        {
          studentId: 5,
          studentName: "محمد عبد الرحمن",
          nickname: "",
          rate: 0,
          completed: null,
          notes: "",
          nextPrep: null,
        },
      ],
    },
    {
      groupName: "حلقة الأسبوع",
      schedule: [
        { dayName: "الأحد", time: "03:00 م" }, // Sunday
        { dayName: "الثلاثاء", time: "03:30 م" }, // Tuesday
        { dayName: "الخميس", time: "04:00 م" }, // Thursday
      ],
      students: [
        {
          studentId: 6,
          studentName: "سارة أحمد",
          nickname: "سوسو",
          rate: 0,
          completed: null,
          notes: "",
          nextPrep: null,
        },
        {
          studentId: 7,
          studentName: "يوسف محمد",
          nickname: "يويو",
          rate: 0,
          completed: null,
          notes: "",
          nextPrep: null,
        },
      ],
    },
    {
      groupName: "حلقة نهاية الأسبوع",
      schedule: [
        { dayName: "الجمعة", time: "07:00 م" }, // Friday
        { dayName: "السبت", time: "09:00 ص" }, // Saturday - different time
      ],
      students: [
        {
          studentId: 8,
          studentName: "زينب علي",
          nickname: "زيزو",
          rate: 0,
          completed: null,
          notes: "",
          nextPrep: null,
        },
        {
          studentId: 9,
          studentName: "حسام الدين",
          nickname: "حسومة",
          rate: 0,
          completed: null,
          notes: "",
          nextPrep: null,
        },
        {
          studentId: 10,
          studentName: "مريم محمود",
          nickname: "",
          rate: 0,
          completed: null,
          notes: "",
          nextPrep: null,
        },
      ],
    },
    {
      groupName: "حلقة يوم واحد",
      schedule: [
        { dayName: "السبت", time: "11:00 ص" }, // Saturday only
      ],
      students: [
        {
          studentId: 11,
          studentName: "خالد أحمد",
          nickname: "خلود",
          rate: 0,
          completed: null,
          notes: "",
          nextPrep: null,
        },
      ],
    },
  ];
  //#region of table data

  const tabs = [
    {
      id: "monthly-classes",
      label: "حصص شهرية",
    },
    { id: "edit-profile", label: "تعديل الملف الشخصي" },
  ];

  const handleselectedtab = (tabId: string) => {
    setActiveTab(tabId);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "monthly-classes":
        return <MonthlyClassTable initialClasses={classes} />;
      case "edit-profile":
        return <ProfileSettings studentData={treacherData} />;
      default:
        return <MonthlyClassTable initialClasses={classes} />;
    }
  };
  //#endregion of table data

  return (
    <ModalProvider classes={classes} onClassesUpdate={setClasses}>
      <Head>
        <title>لوحة تحكم المعلم</title>
        <meta
          name="description"
          content="لوحة تحكم المعلم لإدارة الحصص والطلاب"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="معلم, لوحة تحكم, حصص, طلاب, إدارة, تجويد"
        />
      </Head>

      <main className={styles.main}>
        <div className={`${styles.mainCont} container`}>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>لوحة تحكم المعلم</h1>
            <p className={styles.welcomeText}>
              أهلاً وسهلاً {treacherData.name}
            </p>
          </div>

          {/* Summary Cards */}
          <TeacherSummaryCards classes={classes} />

          <DashboardTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleselectedtab}
          />

          {/* Tab Content */}
          <div className={styles.tabContent}>{getTabContent()}</div>
        </div>
      </main>

      <ModalContainer />
    </ModalProvider>
  );
};

// export default withTeacherProtection(TeacherDashboard);
export default TeacherDashboard;
