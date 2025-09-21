"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ModalContainer, ModalHeader } from "@/src/components/common/Modal";
import { useReportContext } from "@/src/contexts/ReportContext";
import {
  ReportsFilter,
  ReportsStats,
  ReportsList,
} from "@/src/components/dashboard/shared/ReportsModal";
import styles from "@/src/components/dashboard/shared/ReportsModal/ReportsModal.module.css";
import { FiClock, FiFileText } from "react-icons/fi";
import { UnifiedReportsModalProps } from "@/src/types";

interface ExtendedUnifiedReportsModalProps extends UnifiedReportsModalProps {
  student?: { id: string; name?: string };
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

    if (selectedMonth) {
      filtered = filtered.filter((report) => {
        if (!report.createdAt) return false;
        const reportMonth = new Date(report.createdAt).getMonth() + 1;
        return reportMonth.toString() === selectedMonth;
      });
    }

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

    setIsCurrentMonthActive(false);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);

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
            <h3>جاري التحميل...</h3>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <h3>{error}</h3>
          </div>
        ) : reports.length === 0 ? (
          (() => {
            return (
              <div className={styles.empty}>
                <FiFileText className={styles.emptyIcon} />
                <h3>لا توجد تقارير</h3>
                <p>لا توجد تقارير لعرضها في الوقت الحالي.</p>
              </div>
            );
          })()
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
              showLessonId={!isTeacherView}
            />
          </>
        )}
      </div>
    </ModalContainer>
  );
};

export default UnifiedReportsModal;
