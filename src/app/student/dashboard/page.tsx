"use client";

import { useState } from "react";
import DashboardTabs from "@/components/StudentDashboard/DashboardTabs";
import EnrolledCoursesList from "@/components/StudentDashboard/EnrolledCoursesList";
import ScheduleTable from "@/components/StudentDashboard/ScheduleTable";
import ProfileSettings from "@/components/StudentDashboard/ProfileSettings";
import NextSessionTasks from "@/components/StudentDashboard/NextSessionTasks";
import StudentSummaryCards from "@/components/StudentDashboard/StudentSummaryCards";
import styles from "@/styles/StudentDashboard.module.css";
import Head from "next/head";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { withStudentProtection } from "@/components/auth/withRoleProtection";

function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("schedule");

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
    enrolledCourses: 0,
    completedSessions: 0,
    remainingSessions: 0,
    attendanceRate: 0,
  };

  // Tabs configuration
  const tabs = [
    { id: "schedule", label: "الجدول الأسبوعي" },
    { id: "next-session", label: "متطلب الحصة القادمة" },
    { id: "courses", label: "الدورات المسجلة" },
    { id: "profile", label: "الملف الشخصي" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "schedule":
        return <ScheduleTable />;
      case "next-session":
        return <NextSessionTasks />;
      case "courses":
        return <EnrolledCoursesList />;
      case "profile":
        return <ProfileSettings studentData={studentData} />;
      default:
        return <ScheduleTable />;
    }
  };

  return (
    <>
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
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>لوحة تحكم الطالب</h1>
            <p className={styles.pageSubtitle}>
              تابع تقدمك الأكاديمي وإدارة دراستك
            </p>
          </header>

          <div className={styles.studentHeader}>
            <div className={styles.studentInfoContainer}>
              <Image
                src={studentData.avatar}
                alt="صورة الطالب"
                className={styles.studentAvatar}
              />
              <div className={styles.studentInfo}>
                <h2 className={styles.studentName}>{studentData.name}</h2>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <StudentSummaryCards studentData={studentData} />

          <DashboardTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className={styles.tabContent}>{renderTabContent()}</div>
        </div>
      </main>
    </>
  );
}

// export default withStudentProtection(StudentDashboard);
export default StudentDashboard;
