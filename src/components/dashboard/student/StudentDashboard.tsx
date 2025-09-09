// components/StudentDashboard/StudentDashboard.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardTabs from "@/src/components/dashboard/student/DashboardTabs";
// import ScheduleTable from "./ScheduleTable";
import ProfileSettings from "@/src/components/dashboard/student/ProfileSettings";
import NextSessionTasks from "@/src/components/dashboard/student/NextSessionTasks";
import StudentSummaryCards from "@/src/components/dashboard/student/StudentSummaryCards";
import styles from "@/src/styles/StudentDashboard.module.css";
import Head from "next/head";
import { useAuth } from "@/src/contexts/AuthContext";
import { useStudentDashboard } from "@/src/contexts/StudentDashboardContext";
import { Lessons } from "./Lessons";
import StudentMyReportsModal from "./StudentMyReportsModal";
import MeetingLinkActions from "@/src/components/common/MeetingLinkActions";
import Button from "@/src/components/common/Button";

function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("next-session");
  const { getUserStats, userStats } = useStudentDashboard();
  const [myReportsOpen, setMyReportsOpen] = useState(false);

  // Fetch student stats when the component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        await getUserStats();
      } catch (error) {}
    };
    fetchStats();
  }, [getUserStats]);

  // Debug logging
  useEffect(() => {
    if (userStats) {
    }
  }, [userStats]);

  // Prepare student data from auth context and user stats
  const studentData = {
    id: user?._id || "",
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
  }; // Extract group information from userStats safely
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

  // Tabs configuration - filter based on available credits
  const tabs = [
    // Only show lesson-related tabs if student has credits
    ...((userStats?.PrivitelessonCredits || 0) > 0
      ? [
          { id: "next-session", label: "متطلب الحلقة القادمة" },
          { id: "lessons", label: "الحلقات" },
        ]
      : []),
    { id: "profile", label: "الملف الشخصي" },
  ];

  // Set default active tab based on available credits
  useEffect(() => {
    if ((userStats?.PrivitelessonCredits || 0) === 0) {
      setActiveTab("profile");
    }
  }, [userStats?.PrivitelessonCredits]);

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
            <div style={{ marginTop: 8, textAlign: "end" }}>
              <Button
                onClick={() => setMyReportsOpen(true)}
                variant="primary"
                size="small"
              >
                عرض تقاريري
              </Button>
            </div>
          </div>

          {/* Show schedule section only if student has credits */}
          {(userStats?.PrivitelessonCredits || 0) > 0 ? (
            <div className={styles.studentHeader}>
              <div className={styles.studentInfoContainer}>
                <div className={styles.studentInfo}>
                  <h2
                    className={styles.studentName}
                    style={{ marginBottom: "10px" }}
                  >
                    الميعاد المعتاد للحصة
                  </h2>{" "}
                  {userStats && (
                    <div className={styles.groupTimes}>
                      {days.length > 0 ? (
                        days.map((day, index) => (
                          <div key={index} className={styles.dateContent}>
                            <span className={styles.dateText}>{day}</span>
                            <span className={styles.timeText}>
                              {times[index] || "—"}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className={styles.dateContent}>
                          <span className={styles.dateText}>
                            {groupName || "حلقة غير محددة"}
                          </span>
                          <span className={styles.timeText}>—</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                {userStats && groupMeetingLink ? (
                  <div className={styles.whatDone}>
                    <span className={styles.linkText}>رابط الحلقة</span>
                    <MeetingLinkActions
                      meetingLink={groupMeetingLink}
                      styles={styles}
                    />
                  </div>
                ) : (
                  <p className={styles.studentName}>
                    لا توجد حلقة حتى الأن برجاء التواصل مع الإدارة
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.studentHeader}>
              <div className={styles.studentInfoContainer}>
                <div className={styles.studentInfo}>
                  <h2
                    className={styles.studentName}
                    style={{
                      marginBottom: "10px",
                      color: "var(--warning-color)",
                    }}
                  >
                    ⚠️ عذراً، لا توجد حلقات مستحقة حالياً
                  </h2>
                  <p className={styles.pageSubtitle}>
                    يرجى التواصل مع الإدارة لتفعيل الحلقات
                  </p>
                </div>
              </div>
            </div>
          )}

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
          <StudentMyReportsModal
            isOpen={myReportsOpen}
            onClose={() => setMyReportsOpen(false)}
          />
        </div>
      </main>
    </>
  );
}

export default StudentDashboard;
