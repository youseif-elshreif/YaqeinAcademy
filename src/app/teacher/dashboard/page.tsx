"use client";

import { useState, useEffect } from "react";
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
import EnhancedLoader from "@/src/components/common/UI/EnhancedLoader";

const TeacherDashboardContent = () => {
  const { user } = useAuth();
  const { isInitialLoading, teacherLessons } = useTeacherDashboard();
  const [classes, setClasses] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("monthly-classes");
  const [loading, setLoading] = useState(true);

  const [treacherData] = useState({
    id: user?._id || "",
    name: user?.name || "",
    avatar: user?.avatar || "/avatar.png",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    // ترتيب الدروس حسب التاريخ عند تحديث البيانات من context
    if (teacherLessons && teacherLessons.length > 0) {
      const sorted = teacherLessons.slice().sort((a: any, b: any) => {
        const da = new Date(a?.scheduledAt || 0).getTime();
        const db = new Date(b?.scheduledAt || 0).getTime();
        return da - db;
      });
      setClasses(sorted);
    }
    setLoading(false);
  }, [teacherLessons]);

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

  // إظهار الـ loader أثناء التحميل الأولي
  if (isInitialLoading) {
    return (
      <EnhancedLoader
        type="overlay"
        text="جاري تحميل لوحة التحكم..."
        size="large"
        color="white"
      />
    );
  }

  return (
    <ModalProvider classes={classes} onClassesUpdate={setClasses}>
      <main className={styles.main}>
        <div className={`${styles.mainCont} container`}>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>لوحة تحكم المعلم</h1>
          </div>

          {/* Summary Cards */}
          <TeacherSummaryCards classes={classes} money={user?.money || 0} />

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
