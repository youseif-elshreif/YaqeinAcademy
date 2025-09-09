

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardTabs from "@/src/components/dashboard/student/DashboardTabs";

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
import AddTestimonialModal from "@/src/components/common/Modals/AddTestimonialModal";

function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("next-session");
  const { getUserStats, userStats } = useStudentDashboard();
  const [myReportsOpen, setMyReportsOpen] = useState(false);
  const [addTestimonialOpen, setAddTestimonialOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await getUserStats();
      } catch (error) {}
    };
    fetchStats();
  }, [getUserStats]);

  useEffect(() => {
    if (userStats) {
    }
  }, [userStats]);

  const studentData = {
    id: user?._id || "",
    name: user?.name || "??????",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    age: user?.age || 0,
    quranMemorized: user?.quranMemorized || "?? ????",
    numOfPartsofQuran: user?.numOfPartsofQuran || 0,
    isVerified: user?.isVerified || false,
    createdAt: user?.createdAt || "",
    avatar: user?.avatar || "/avatar.png",

    enrollmentDate: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString("ar-EG")
      : "??? ????",
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

  // Handle testimonial submission
  const handleTestimonialSubmit = async (formData: any) => {
    try {
      console.log("Testimonial submitted:", formData);
      // Here you would typically send the data to your API
      setAddTestimonialOpen(false);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    }
  };

  const tabs = [

    ...((userStats?.PrivitelessonCredits || 0) > 0
      ? [
          { id: "next-session", label: "????? ?????? ???????" },
          { id: "lessons", label: "???????" },
        ]
      : []),
    { id: "profile", label: "????? ??????" },
  ];

  useEffect(() => {
    if ((userStats?.PrivitelessonCredits || 0) === 0) {
      setActiveTab("profile");
    }
  }, [userStats?.PrivitelessonCredits]);

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
        <title>???? ???? ??????</title>
        <meta name="description" content="???? ????? ????????? ?????? ??????" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="keywords"
          content="????, ???? ????, ?????, ????, ?????, ????"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.dashboardContainer}>
          {/* Page Header */}
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>???? ???? ??????</h1>
            <p className={styles.pageSubtitle}>
              ???? ????? ????????? ?????? ??????
            </p>
          </header>

          {/* Student Info Section */}
          <div className={styles.studentHeader}>
            <div className={styles.studentInfoContainer}>
              <Image
                src={studentData.avatar}
                alt="???? ??????"
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
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <Button
                  onClick={() => setAddTestimonialOpen(true)}
                  variant="secondary"
                  size="small"
                >
                  شاركنا رأيك
                </Button>
                <Button
                  onClick={() => setMyReportsOpen(true)}
                  variant="primary"
                  size="small"
                >
                  تقاريري
                </Button>
              </div>
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
                    ??????? ??????? ?????
                  </h2>{" "}
                  {userStats && (
                    <div className={styles.groupTimes}>
                      {days.length > 0 ? (
                        days.map((day, index) => (
                          <div key={index} className={styles.dateContent}>
                            <span className={styles.dateText}>{day}</span>
                            <span className={styles.timeText}>
                              {times[index] || "�"}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className={styles.dateContent}>
                          <span className={styles.dateText}>
                            {groupName || "???? ??? ?????"}
                          </span>
                          <span className={styles.timeText}>�</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                {userStats && groupMeetingLink ? (
                  <div className={styles.whatDone}>
                    <span className={styles.linkText}>???? ??????</span>
                    <MeetingLinkActions
                      meetingLink={groupMeetingLink}
                      styles={styles}
                    />
                  </div>
                ) : (
                  <p className={styles.studentName}>
                    ?? ???? ???? ??? ???? ????? ??????? ?? ???????
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
                    ?? ?????? ?? ???? ????? ?????? ??????
                  </h2>
                  <p className={styles.pageSubtitle}>
                    ???? ??????? ?? ??????? ?????? ???????
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
          <AddTestimonialModal
            isOpen={addTestimonialOpen}
            onClose={() => setAddTestimonialOpen(false)}
            onSubmit={handleTestimonialSubmit}
          />
        </div>
      </main>
    </>
  );
}

export default StudentDashboard;

