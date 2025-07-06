import { useState, useEffect } from "react";
import styles from "./ScheduleTable.module.css";
import {
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaExternalLinkAlt,
  FaCopy,
} from "react-icons/fa";

const ScheduleTable = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to copy class link to clipboard
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      console.log("تم نسخ الرابط بنجاح");
    } catch (err) {
      console.error("فشل في نسخ الرابط:", err);
    }
  };

  // Function to open link in new tab
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // Mock data for schedule
  const scheduleData = [
    {
      id: 1,
      date: "2025-01-15",
      time: "10:00 ص",
      attended: true,
      isPast: true,
      classLink: "https://zoom.us/j/1234567890?pwd=mjmwt-alfjr-20250115-1000s", // Past class with link
      newMemorization: [
        {
          id: 1,
          content: "سورة الكهف من الآية 1 إلى الآية 20",
          notes: "التركيز على التجويد وأحكام النون الساكنة والتنوين",
        },
        {
          id: 2,
          content: "حفظ الآيات الجديدة مع فهم المعاني",
          notes: "مراجعة التفسير الميسر للآيات المطلوبة",
        },
      ],
      review: [
        {
          id: 1,
          content: "مراجعة سورة البقرة من الآية 250 إلى الآية 286",
          notes: "التأكد من الحفظ المتقن والتجويد الصحيح",
        },
        {
          id: 2,
          content: "مراجعة سورة آل عمران من الآية 100 إلى الآية 120",
          notes: "هذه الآيات تحتاج إعادة حفظ حسب التقييم السابق",
        },
      ],
      rate: "",
      notes: "",
    },
    {
      id: 2,
      date: "2025-01-17",
      time: "11:00 ص",
      attended: true,
      isPast: true,
      classLink:
        "https://teams.microsoft.com/l/meetup-join/19%3astudent-class-20250117%40thread.tacv2/", // Past class with link
      newMemorization: [
        {
          id: 1,
          content: "سورة الكهف من الآية 1 إلى الآية 20",
          notes: "التركيز على التجويد وأحكام النون الساكنة والتنوين",
        },
        {
          id: 2,
          content: "حفظ الآيات الجديدة مع فهم المعاني",
          notes: "مراجعة التفسير الميسر للآيات المطلوبة",
        },
      ],
      review: [
        {
          id: 1,
          content: "مراجعة سورة البقرة من الآية 250 إلى الآية 286",
          notes: "التأكد من الحفظ المتقن والتجويد الصحيح",
        },
        {
          id: 2,
          content: "مراجعة سورة آل عمران من الآية 100 إلى الآية 120",
          notes: "هذه الآيات تحتاج إعادة حفظ حسب التقييم السابق",
        },
      ],
      rate: "",
      notes: "",
    },
    {
      id: 3,
      date: "2025-01-20",
      time: "09:00 ص",
      attended: false,
      isPast: false,
      classLink:
        "https://zoom.us/j/9876543210?pwd=student-future-class-20250120", // Future class with link
      whatIdDone: [],
      rate: "",
      notes: "",
    },
    {
      id: 4,
      date: "2025-01-22",
      time: "10:30 ص",
      attended: false,
      isPast: false,
      classLink: "https://meet.jit.si/YaqeenAcademy-mjmwt-nhy-alsbow", // Future class with link
      whatIdDone: [],
      rate: "",
      notes: "",
    },
    {
      id: 5,
      date: "2025-01-25",
      time: "11:00 ص",
      attended: false,
      isPast: false,
      whatIdDone: [],
      rate: "",
      notes: "",
    },
  ];

  const formatDate = (dateString: string): string => {
    if (!isClient) {
      // Return a simple format for server-side rendering
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    // Client-side formatting with proper locale
    const date = new Date(dateString);
    try {
      return date.toLocaleDateString("ar", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        calendar: "gregory",
      });
    } catch (error) {
      // Fallback to simple format if locale formatting fails
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  const getStatusIcon = (status: boolean) => {
    return status ? <FaCheck /> : <FaTimes />;
  };

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>مواعيد الحصص</h2>
        <p className={styles.subtitle}>جدول مواعيد الحصص القادمة والسابقة</p>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.scheduleTable}>
          <thead>
            <tr>
              <th>التاريخ والوقت</th>
              <th>رابط الحصة</th>
              <th>تم الحضور</th>
              <th>ما تم</th>
              <th>التقييم</th>
              <th>ملاحظات</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((session) => (
              <tr
                key={session.id}
                className={`${styles.tableRow} ${
                  session.isPast ? styles.pastSession : styles.upcomingSession
                }`}
              >
                <td className={styles.dateCell}>
                  <div className={styles.dateContent}>
                    <span className={styles.dateText}>
                      {formatDate(session.date)}
                    </span>
                    <span className={styles.timeText}>{session.time}</span>
                  </div>
                </td>

                <td className={styles.linkCell}>
                  <div className={styles.linkContainer}>
                    <button
                      className={`${styles.linkButton} ${styles.openLinkBtn}`}
                      onClick={() => handleOpenLink(session.classLink!)}
                      title="فتح رابط الحصة"
                    >
                      <FaExternalLinkAlt />
                      <span>دخول الحصة</span>
                    </button>
                    <button
                      className={`${styles.linkButton} ${styles.copyLinkBtn}`}
                      onClick={() => handleCopyLink(session.classLink!)}
                      title="نسخ رابط الحصة"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </td>

                <td className={styles.statusCell}>
                  <div>
                    <span className={styles.statusIcon}>
                      {getStatusIcon(session.attended)}
                    </span>
                    <span className={styles.statusText}>
                      {session.attended ? "حضر" : "لم يحضر"}
                    </span>
                  </div>
                </td>
                <td className={styles.bigCell}>
                  <ul className={`${styles.statusText} ${styles.customUl}`}>
                    {session.newMemorization &&
                    session.newMemorization.length > 0 ? (
                      <>
                        {/* جديد */}
                        <span
                          style={{
                            display: "block",
                            textAlign: "start",
                            margin: "5px 0",
                          }}
                        >
                          جديد :
                        </span>
                        {session.newMemorization.map((e, index) => (
                          <li key={`new-${index}`}>{e.content}</li>
                        ))}

                        {/* مراجعة */}
                        <span
                          style={{
                            display: "block",
                            textAlign: "start",
                            margin: "10px 0 5px 0",
                          }}
                        >
                          مراجعة :
                        </span>
                        {session.newMemorization.map((e, index) => (
                          <li key={`rev-${index}`}>{e.content}</li>
                        ))}
                      </>
                    ) : (
                      <li>لم يتم شيئ حتى الآن</li>
                    )}
                  </ul>
                </td>
                <td className={styles.statusCell}>
                  <span className={styles.statusText}>
                    {session.rate ? session.rate : "لم يتم التقييم بعد"}
                  </span>
                </td>
                <td className={styles.bigCell}>
                  <span className={styles.statusText}>
                    {session.notes ? session.notes : "إلي الان لا توجد ملاحظات"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <div className={styles.mobileCardsContainer}>
        {scheduleData.map((session) => (
          <div
            key={session.id}
            className={`${styles.sessionCard} ${
              session.isPast
                ? styles.pastSessionCard
                : styles.upcomingSessionCard
            }`}
          >
            <div className={styles.cardDate}>
              <FaCalendarAlt /> {formatDate(session.date)}
            </div>
            <div className={styles.cardDate}>
              <FaClock /> {session.time}
            </div>

            <div className={styles.cardStatus}>
              <div className={styles.statusItem}>
                <span>الحضور:</span>
                <span className={styles.statusValue}>
                  {getStatusIcon(session.attended)}{" "}
                  {session.attended ? "حضر" : "لم يحضر"}
                </span>
              </div>
              <div className={styles.statusItem}>
                <span>التقييم:</span>
                <span className={styles.statusValue}>
                  {session.rate ? session.rate : "لم يتم التقييم بعد"}
                </span>
              </div>

              <div className={styles.statusItem}>
                <span>الملاحظات:</span>
                <span className={styles.statusValue}>
                  {session.notes ? session.notes : "إلي الان لا توجد ملاحظات"}
                </span>
              </div>
            </div>
            <div className={styles.statusItem}>
              {session.newMemorization && session.newMemorization.length > 0 ? (
                <div style={{ width: "100%" }}>
                  {/* جديد */}
                  <div className={styles.whatDone}>
                    <span
                      style={{
                        display: "block",
                        textAlign: "start",
                        margin: "5px 0",
                      }}
                    >
                      جديد :
                    </span>
                    <div>
                      {session.newMemorization.map((e, index) => (
                        <span style={{ display: "block" }} key={`new-${index}`}>
                          {e.content}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* مراجعة */}
                  <div className={styles.whatDone}>
                    <span
                      style={{
                        display: "block",
                        textAlign: "start",
                        margin: "10px 0 5px 0",
                      }}
                    >
                      مراجعة :
                    </span>
                    <div>
                      {session.newMemorization.map((e, index) => (
                        <span style={{ display: "block" }} key={`rev-${index}`}>
                          {e.content}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTable;
