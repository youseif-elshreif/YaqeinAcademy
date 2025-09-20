"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardTabs from "@/src/components/dashboard/student/DashboardTabs";

import ProfileSettings from "@/src/components/dashboard/student/ProfileSettings";
import NextSessionTasks from "@/src/components/dashboard/student/NextSessionTasks";
import StudentSummaryCards from "@/src/components/dashboard/student/StudentSummaryCards";
import styles from "@/src/styles/StudentDashboard.module.css";
import { useAuth } from "@/src/contexts/AuthContext";
import { useStudentDashboard } from "@/src/contexts/StudentDashboardContext";
import { useTestimonialsContext } from "@/src/contexts/AppProviders";
import { TestimonialFormData } from "@/src/types";
import { Lessons } from "./Lessons";
import StudentMyReportsModal from "./StudentMyReportsModal";
import MeetingLinkActions from "@/src/components/common/MeetingLinkActions";
import Button from "@/src/components/common/Button";
import AddTestimonialModal from "@/src/components/common/Modals/AddTestimonialModal";
import EnhancedLoader from "@/src/components/common/UI/EnhancedLoader";
import ErrorDisplay from "@/src/components/common/Modal/ErrorDisplay";

function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("next-session");
  const { userStats, isInitialLoading } = useStudentDashboard();
  const { createTestimonial, isLoading: testimonialLoading } =
    useTestimonialsContext();
  const [myReportsOpen, setMyReportsOpen] = useState(false);
  const [addTestimonialOpen, setAddTestimonialOpen] = useState(false);
  const [testimonialError, setTestimonialError] = useState<string>("");

  const studentData = {
    _id: user?._id || "",
    id: user?._id || "",
    name: user?.name || "غير محدد",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    age: user?.age || 0,
    quranMemorized: user?.quranMemorized || "غير محدد",
    numOfPartsofQuran: user?.numOfPartsofQuran || 0,
    isVerified: user?.isVerified || false,
    createdAt: user?.createdAt || "",
    avatar: user?.avatar || "/avatar.png",

    enrollmentDate: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString("ar-EG")
      : "غير محدد",
    completedSessions: userStats?.attendedLessons || 0,
    missedLessons: userStats?.missedLessons || 0,
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
        groupUsualDate.fourthDay,
        groupUsualDate.fifthDay,
        groupUsualDate.sixthDay,
        groupUsualDate.seventhDay,
      ].filter(Boolean)
    : [];

  const times = groupUsualDate
    ? [
        groupUsualDate.firstDayTime,
        groupUsualDate.secondDayTime,
        groupUsualDate.thirdDayTime,
        groupUsualDate.fourthDayTime,
        groupUsualDate.fifthDayTime,
        groupUsualDate.sixthDayTime,
        groupUsualDate.seventhDayTime,
      ].filter(Boolean)
    : [];

  // Handle testimonial submission
  const handleTestimonialSubmit = async (formData: TestimonialFormData) => {
    try {
      setTestimonialError(""); // Clear previous errors
      await createTestimonial(formData);
      setAddTestimonialOpen(false);
    } catch (error) {
      // Set user-friendly error message
      const errorObj = error as any;
      const errorMessage =
        errorObj?.response?.data?.message ||
        errorObj?.message ||
        "حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.";
      setTestimonialError(errorMessage);
    }
  };

  const tabs = [
    ...((userStats?.PrivitelessonCredits || 0) > 0
      ? [
          { id: "next-session", label: "الجلسة القادمة والمهام" },
          { id: "lessons", label: "الحلقات" },
        ]
      : []),
    { id: "profile", label: "البيانات الشخصية" },
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
    <>
      <main className={styles.main}>
        <div className={styles.dashboardContainer}>
          {/* Page Header */}
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>لوحة تحكم الطالب</h1>
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
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "flex-end",
                }}
              >
                {userStats?.PrivitelessonCredits > 0 ? (
                  <Button
                    onClick={() => setAddTestimonialOpen(true)}
                    variant="secondary"
                    size="small"
                  >
                    شاركنا رأيك
                  </Button>
                ) : null}
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
            <div className={styles.scheduleSection}>
              {/* Group Info Card */}
              <div className={styles.groupInfoCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>معلومات الحلقة</h3>
                </div>

                <div
                  className={styles.groupNameBadge}
                  style={{ justifyContent: "space-between" }}
                >
                  <div
                    className={styles.groupNameBadge}
                    style={{ margin: 0, border: "none" }}
                  >
                    {" "}
                    <span className={styles.badgeLabel}>المجموعة</span>
                    <span className={styles.badgeValue}>
                      {groupName || "لا يوجد اسم حلقة"}
                    </span>
                  </div>
                  {/* Meeting Link Card */}
                  <div
                    className={styles.groupNameBadge}
                    style={{ margin: 0, border: "none" }}
                  >
                    <div>
                      <h3 className={styles.badgeLabel}>رابط الحلقة</h3>
                    </div>

                    <div className={styles.meetingContent}>
                      {userStats && groupMeetingLink ? (
                        <MeetingLinkActions
                          meetingLink={groupMeetingLink}
                          styles={styles}
                        />
                      ) : (
                        <div className={styles.noLinkMessage}>
                          <p className={styles.noLinkText}>
                            لا يوجد رابط للحلقة متاح حالياً
                          </p>
                          <span className={styles.noLinkSubtext}>
                            تواصل مع إدارة الأكاديمية
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {userStats && days.length > 0 && (
                  <div className={styles.scheduleGrid}>
                    <div className={styles.scheduleHeader}>
                      <span>مواعيد الحلقة</span>
                    </div>

                    <div className={styles.timeSlots}>
                      {days.map((day, index) => (
                        <div key={index} className={styles.timeSlot}>
                          <div className={styles.dayName}>{day}</div>
                          <div className={styles.timeValue}>
                            {times[index] || "غير محدد"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.noCreditsSection}>
              <div className={styles.noCreditsCard}>
                <h2 className={styles.noCreditsTitle}>
                  لا توجد حلقات متاحة حالياً
                </h2>
                <p className={styles.noCreditsText}>
                  تواصل مع الإدارة أو قم بالتسجيل في الدورات المتاحة
                </p>
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

          {/* Error Display for Testimonial */}
          {testimonialError && (
            <div style={{ margin: "1rem 0" }}>
              <ErrorDisplay message={testimonialError} />
            </div>
          )}

          <StudentMyReportsModal
            isOpen={myReportsOpen}
            onClose={() => setMyReportsOpen(false)}
          />
          <AddTestimonialModal
            isOpen={addTestimonialOpen}
            onClose={() => {
              setAddTestimonialOpen(false);
              setTestimonialError(""); // Clear error when closing modal
            }}
            onSubmit={handleTestimonialSubmit}
            isLoading={testimonialLoading}
          />
        </div>
      </main>
    </>
  );
}

export default StudentDashboard;
