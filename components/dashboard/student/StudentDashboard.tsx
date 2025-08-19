// components/StudentDashboard/StudentDashboard.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
// import ScheduleTable from "./ScheduleTable";
import ProfileSettings from "@/components/dashboard/student/ProfileSettings";
import NextSessionTasks from "@/components/dashboard/student/NextSessionTasks";
import StudentSummaryCards from "@/components/dashboard/student/StudentSummaryCards";
import styles from "@/styles/StudentDashboard.module.css";
import Head from "next/head";
import { useAuth } from "@/contexts/AuthContext";
import { useStudentDashboard } from "@/contexts/StudentDashboardContext";
import { FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import { Lessons } from "./Lessons";

function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("next-session");
  const { getUserStats, userStats } = useStudentDashboard();

  // Fetch student stats when the component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        await getUserStats();
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
      }
    };
    fetchStats();
  }, [getUserStats]);

  // Debug logging
  useEffect(() => {
    if (userStats) {
      console.log("Current userStats:", userStats);
    }
  }, [userStats]);

  // Prepare student data from auth context and user stats
  const studentData = {
    id: user?.id || "",
    name: user?.name || "الطالب",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    age: user?.age || 0,
    quranMemorized: user?.quranMemorized || "لا يوجد",
    numOfPartsofQuran: user?.numOfPartsofQuran || 0,
    isVerified: user?.isVerified || false,
    createdAt: user?.createdAt || "",
    avatar: user?.avatar || "/avatar.png",

    enrollmentDate: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString("ar-EG")
      : "غير محدد",
    completedSessions: userStats?.completedLessons || 0,
    remainingSessions: userStats?.missedLessons || 0,
    attendedLessons: userStats?.attendedLessons || 0,
    PrivitelessonCredits: userStats?.PrivitelessonCredits || 0,
  };
  console.log("fd" + userStats?.GroupUsualDate?.firstDay);
  // Extract group information from userStats safely
  const groupUsualDate = userStats?.GroupUsualDate;
  const groupMeetingLink = userStats?.GroupMeetingLink
    ? String(userStats.GroupMeetingLink)
    : "";
  const groupName = userStats?.GroupName ? String(userStats.GroupName) : "";

  // Extract days and times from usualDate object
  const days = groupUsualDate
    ? [
        groupUsualDate.firstDay,
        groupUsualDate.secondDay,
        groupUsualDate.thirdDay,
      ].filter(Boolean)
    : [];

  const times = groupUsualDate
    ? [
        groupUsualDate.firstDayTime,
        groupUsualDate.secondDayTime,
        groupUsualDate.thirdDayTime,
      ].filter(Boolean)
    : [];

  // Tabs configuration
  const tabs = [
    // { id: "schedule", label: "الجدول الأسبوعي" },
    { id: "next-session", label: "متطلب الحصة القادمة" },
    { id: "lessons", label: "الحصص" },
    { id: "profile", label: "الملف الشخصي" },
  ];

  // Function to open link in new tab
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      console.log("تم نسخ الرابط بنجاح");
    } catch (err) {
      console.error("فشل في نسخ الرابط:", err);
    }
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "next-session":
        return <NextSessionTasks />;
      case "lessons":
        return <Lessons />;
      case "profile":
        return <ProfileSettings studentData={studentData} />;
      default:
        return <NextSessionTasks />;
    }
  };

  return (
    <>
      {/* Page Head */}
      <Head>
        <title>لوحة تحكم الطالب</title>
        <meta name="description" content="تابع تقدمك الأكاديمي وإدارة دراستك" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="keywords"
          content="طالب, لوحة تحكم, دراسة, جدول, دورات, مهام"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.dashboardContainer}>
          {/* Page Header */}
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>لوحة تحكم الطالب</h1>
            <p className={styles.pageSubtitle}>
              تابع تقدمك الأكاديمي وإدارة دراستك
            </p>
          </header>

          {/* Student Info Section */}
          <div className={styles.studentHeader}>
            <div className={styles.studentInfoContainer}>
              <Image
                src={studentData.avatar}
                alt="صورة الطالب"
                className={styles.studentAvatar}
                width={80}
                height={80}
                priority
              />
              <div className={styles.studentInfo}>
                <h2 className={styles.studentName}>{studentData.name}</h2>
              </div>
            </div>
          </div>
          <div className={styles.studentHeader}>
            {userStats && groupMeetingLink ? (
              <div className={styles.dateContent}>
                <div className={styles.groupTimes}>
                  {days.map((day, index) => (
                    <div key={index} className={styles.dateContent}>
                      <span className={styles.dateText}>
                        {day || "تاريخ غير متاح"}
                      </span>
                      <span className={styles.timeText}>
                        {times[index] || "الوقت غير متاح"}
                      </span>
                    </div>
                  ))}
                  {days.length === 0 && (
                    <div className={styles.dateContent}>
                      <span className={styles.dateText}>
                        {groupName || "حلقة غير محددة"}
                      </span>
                      <span className={styles.timeText}>الوقت غير متاح</span>
                    </div>
                  )}
                </div>
                <div className={styles.whatDone}>
                  <span className={styles.linkText}>رابط الحصة</span>
                  <div className={styles.linkContainer}>
                    {" "}
                    <button
                      className={`${styles.linkButton} ${styles.openLinkBtn}`}
                      onClick={() => handleOpenLink(groupMeetingLink || "")}
                      title="فتح رابط الحصة"
                    >
                      <FaExternalLinkAlt />
                      <span>دخول الحصة</span>
                    </button>
                    <button
                      className={`${styles.linkButton} ${styles.copyLinkBtn}`}
                      onClick={() => handleCopyLink(groupMeetingLink || "")}
                      title="نسخ رابط الحصة"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.dateContent}>
                <p className={styles.studentName}>
                  لا توجد حلقة حتى الأن برجاء التواصل مع الإدارة
                </p>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <StudentSummaryCards studentData={studentData} />

          {/* Tabs Navigation */}
          <DashboardTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab Content */}
          <div className={styles.tabContent}>{renderTabContent()}</div>
        </div>
      </main>
    </>
  );
}

export default StudentDashboard;
