"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ModalContainer, ModalHeader } from "@/components/common/Modal";
import { useReportContext } from "@/contexts/ReportContext";
import {
  ReportsFilter,
  ReportsStats,
  ReportsList,
} from "@/components/dashboard/shared/ReportsModal";
import styles from "@/components/dashboard/shared/ReportsModal/ReportsModal.module.css";
import { FiClock, FiFileText } from "react-icons/fi";
import { UnifiedReportsModalProps } from "@/types";

interface ExtendedUnifiedReportsModalProps extends UnifiedReportsModalProps {
  student?: { id: string; name?: string }; // إذا موجود يبقى للمعلم، إذا مش موجود يبقى للطالب
}

const UnifiedReportsModal: React.FC<ExtendedUnifiedReportsModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isCurrentMonthActive, setIsCurrentMonthActive] = useState(true);

  const {
    studentReports,
    myReports,
    isLoading,
    error,
    getStudentReports,
    getMyReports,
  } = useReportContext();

  // تحديد إذا كان المودال للمعلم (student موجود) أو للطالب (student مش موجود)
  const isTeacherView = !!student;
  const reports = isTeacherView ? studentReports : myReports;
  const modalTitle = isTeacherView
    ? `تقارير الطالب: ${student?.name || "-"}`
    : "تقاريري";

  const reportStats = useMemo(() => {
    const totalReports = reports.length;
    const attendedCount = reports.filter((r) => r.attended).length;
    const homeworkCount = reports.filter((r) => r.doneHomework).length;
    const avgRating =
      reports.length > 0
        ? reports
            .filter((r) => typeof r.rating === "number")
            .reduce((sum, r) => sum + (r.rating || 0), 0) /
          reports.filter((r) => typeof r.rating === "number").length
        : 0;

    return {
      totalReports,
      attendedCount,
      homeworkCount,
      avgRating: isNaN(avgRating) ? 0 : avgRating,
    };
  }, [reports]);

  const filteredReports = useMemo(() => {
    let filtered = reports;

    // فلتر حسب الشهر
    if (selectedMonth) {
      filtered = filtered.filter((report) => {
        if (!report.createdAt) return false;
        const reportMonth = new Date(report.createdAt).getMonth() + 1;
        return reportMonth.toString() === selectedMonth;
      });
    }

    // فلتر حسب السنة
    if (selectedYear) {
      filtered = filtered.filter((report) => {
        if (!report.createdAt) return false;
        const reportYear = new Date(report.createdAt).getFullYear();
        return reportYear.toString() === selectedYear;
      });
    }

    return filtered;
  }, [reports, selectedMonth, selectedYear]);

  useEffect(() => {
    if (isOpen) {
      if (isTeacherView && student?.id) {
        getStudentReports(student.id);
      } else if (!isTeacherView) {
        getMyReports();
      }
    }
  }, [isOpen, isTeacherView, student?.id, getStudentReports, getMyReports]);

  // تطبيق فلتر "هذا الشهر" تلقائياً عند فتح المودال
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      setSelectedMonth((now.getMonth() + 1).toString());
      setSelectedYear(now.getFullYear().toString());
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 250);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    // إذا غير المستخدم الشهر يدوياً، ألغي فلتر "هذا الشهر"
    setIsCurrentMonthActive(false);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    // إذا غير المستخدم السنة يدوياً، ألغي فلتر "هذا الشهر"
    setIsCurrentMonthActive(false);
  };

  const handleClearFilter = () => {
    setSelectedMonth("");
    setSelectedYear("");
    setIsCurrentMonthActive(false);
  };

  const handleShowCurrentMonth = () => {
    const now = new Date();
    setSelectedMonth((now.getMonth() + 1).toString());
    setSelectedYear(now.getFullYear().toString());
    setIsCurrentMonthActive(true);
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      isClosing={isClosing}
      variant="default"
      onClose={handleClose}
    >
      <ModalHeader title={modalTitle} onClose={handleClose} variant="default" />
      <div className={styles.modalBody}>
        {isLoading ? (
          <div className={styles.empty}>
            <FiClock className={styles.emptyIcon} />
            <h3>جاري تحميل التقارير...</h3>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <h3>{error}</h3>
          </div>
        ) : reports.length === 0 ? (
          <div className={styles.empty}>
            <FiFileText className={styles.emptyIcon} />
            <h3>لا توجد تقارير</h3>
            <p>
              {isTeacherView
                ? "لم يتم إنشاء أي تقارير لهذا الطالب بعد"
                : "لم يتم إنشاء أي تقارير لك بعد"}
            </p>
          </div>
        ) : (
          <>
            <ReportsFilter
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
              onClearFilter={handleClearFilter}
              onShowCurrentMonth={handleShowCurrentMonth}
              filteredCount={filteredReports.length}
              totalCount={reports.length}
              isCurrentMonthActive={isCurrentMonthActive}
            />

            <ReportsStats
              totalReports={reportStats.totalReports}
              attendedCount={reportStats.attendedCount}
              homeworkCount={reportStats.homeworkCount}
              avgRating={reportStats.avgRating}
            />

            <ReportsList
              reports={filteredReports}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              showLessonId={!isTeacherView} // نعرض lesson ID للطالب فقط
            />
          </>
        )}
      </div>
    </ModalContainer>
  );
};

export default UnifiedReportsModal;
