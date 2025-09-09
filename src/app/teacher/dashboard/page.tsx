"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/src/styles/TeacherDashboard.module.css";
import TeacherSummaryCards from "@/src/components/dashboard/teacher/TeacherSummaryCards";
import MonthlyClassTable from "@/src/components/dashboard/teacher/MonthlyClassTable/index";
import DashboardTabs from "@/src/components/dashboard/student/DashboardTabs";
import ProfileSettings from "@/src/components/dashboard/student/ProfileSettings";
import { ModalProvider } from "@/src/contexts/ModalContext";
import ModalContainer from "@/src/components/common/Layout/ModalContainer";
import { useAuth } from "@/src/contexts/AuthContext";
import { withTeacherProtection } from "@/src/components/auth/withRoleProtection";
import {
  TeacherDashboardProvider,
  useTeacherDashboard,
} from "@/src/contexts/TeacherDashboardContext";

const TeacherDashboardContent = () => {
  const { user } = useAuth();
  const { getMyLessons } = useTeacherDashboard();
  const [classes, setClasses] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("monthly-classes");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        const lessons = await getMyLessons();
        if (!mounted) return;

        const sorted =
          lessons && lessons.length > 0
            ? lessons.slice().sort((a: any, b: any) => {
                const da = new Date(a?.scheduledAt || 0).getTime();
                const db = new Date(b?.scheduledAt || 0).getTime();
                return da - db;
              })
            : [];
        setClasses(sorted);
      } catch {
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    fetchLessons();
    return () => {
      mounted = false;
    };
  }, [getMyLessons]);

  const [treacherData] = useState({
    id: user?._id || "",
    name: user?.name || "",
    avatar: user?.avatar || "/avatar.png",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const tabs = [
    {
      id: "monthly-classes",
      label: "جدول الحصص",
    },
    { id: "edit-profile", label: "تعديل البيانات الشخصية" },
  ];

  const handleselectedtab = (tabId: string) => {
    setActiveTab(tabId);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "monthly-classes":
        return <MonthlyClassTable initialClasses={classes} loading={loading} />;
      case "edit-profile":
        return <ProfileSettings studentData={treacherData} />;
      default:
        return <MonthlyClassTable initialClasses={classes} loading={loading} />;
    }
  };

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
          content="معلم, لوحة تحكم, حصص, طلاب, تعليم, أكاديمية"
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

const TeacherDashboard = () => (
  <TeacherDashboardProvider>
    <TeacherDashboardContent />
  </TeacherDashboardProvider>
);

export default withTeacherProtection(TeacherDashboard);
