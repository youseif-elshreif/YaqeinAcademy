"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/TeacherDashboard.module.css";
import TeacherSummaryCards from "@/components/dashboard/teacher/TeacherSummaryCards";
import MonthlyClassTable from "@/components/dashboard/teacher/MonthlyClassTable/index";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import ProfileSettings from "@/components/dashboard/student/ProfileSettings";
import { ModalProvider } from "@/contexts/ModalContext";
import ModalContainer from "@/components/common/Layout/ModalContainer";
// Use raw lessons shape from API; no local remapping
import { useAuth } from "@/contexts/AuthContext";
import { withTeacherProtection } from "@/components/auth/withRoleProtection";
import {
  TeacherDashboardProvider,
  useTeacherDashboard,
} from "@/contexts/TeacherDashboardContext";

const TeacherDashboardContent = () => {
  const { user } = useAuth();
  const { getMyLessons } = useTeacherDashboard();
  const [classes, setClasses] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("monthly-classes");
  const [loading, setLoading] = useState(true);

  // No local remapping; consume lessons as returned from API

  useEffect(() => {
    let mounted = true;
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        const lessons = await getMyLessons(token);
        console.log("Fetched lessons:", lessons); 
        if (!mounted) return;
        // Sort by scheduledAt ascending
        const sorted = (lessons || []).slice().sort((a: any, b: any) => {
          const da = new Date(a?.scheduledAt || 0).getTime();
          const db = new Date(b?.scheduledAt || 0).getTime();
          return da - db;
        });
        setClasses(sorted);
      } catch (e) {
        console.error(e);
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

  // Mock data for teacher dashboard
  const [treacherData] = useState({
    id: user?.id || "",
    name: user?.name || "",
    avatar: user?.avatar || "/avatar.png",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Removed mock schedules; using API data instead
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
        return <MonthlyClassTable initialClasses={classes} loading={loading} />;
      case "edit-profile":
        return <ProfileSettings studentData={treacherData} />;
      default:
        return <MonthlyClassTable initialClasses={classes} loading={loading} />;
    }
  };
  //#endregion of table data

  return (
    <ModalProvider classes={classes} onClassesUpdate={setClasses}>
      <Head>
        <title>لوحة تحكم المعلم</title>
        <meta
          name="description"
          content="لوحة تحكم المعلم لإدارة الحلقات والطلاب"
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

const TeacherDashboard = () => (
  <TeacherDashboardProvider>
    <TeacherDashboardContent />
  </TeacherDashboardProvider>
);

export default withTeacherProtection(TeacherDashboard);
