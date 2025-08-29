"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ModalContainer, ModalHeader } from "@/components/common/Modal";
import StatCard from "@/components/common/UI/StatCard";
import api from "@/utils/api";
// Reuse the same styles as teacher reports modal for consistency
import styles from "@/components/dashboard/teacher/StudentReportsModal.module.css";
import {
  FiCalendar,
  FiCheckCircle,
  FiStar,
  FiBookOpen,
  FiClock,
  FiFileText,
  FiTarget,
} from "react-icons/fi";

type StudentReport = {
  _id: string;
  lessonId?: { _id: string } | string;
  attended?: boolean;
  completeLesson?: boolean;
  doneHomework?: boolean;
  content?: string;
  notes?: string;
  rating?: number;
  newMemorized?: { new: string[]; old: string[] };
  wantedForNextLesson?: { new: string[]; old: string[] };
  createdAt?: string;
  updatedAt?: string;
};

export default function StudentMyReportsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<StudentReport[]>([]);

  const reportStats = useMemo(() => {
    const totalReports = reports.length;
    const attendedCount = reports.filter((r) => r.attended).length;
    const completedCount = reports.filter((r) => r.completeLesson).length;
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
      completedCount,
      homeworkCount,
      avgRating: isNaN(avgRating) ? 0 : avgRating,
    };
  }, [reports]);

  useEffect(() => {
    let cancelled = false;
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get("/api/user/my-reports");
        const arr = Array.isArray((data as any)?.data)
          ? (data as any).data
          : Array.isArray(data)
          ? (data as any)
          : [];
        if (!cancelled) setReports(arr);
      } catch (e) {
        console.error("Failed to load my reports", e);
        if (!cancelled) setError("فشل في جلب تقاريري");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (isOpen) fetchReports();
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 250);
  };

  return (
    <ModalContainer isOpen={isOpen} isClosing={isClosing} variant="default">
      <ModalHeader title="تقاريري" onClose={handleClose} variant="default" />
      <div className={styles.modalBody}>
        {loading ? (
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
            <p>لم يتم إنشاء أي تقارير لك بعد</p>
          </div>
        ) : (
          <>
            <div className={styles.statsSection}>
              <div className={styles.statsGrid}>
                <StatCard
                  icon={FiFileText}
                  value={reportStats.totalReports}
                  label="إجمالي التقارير"
                />
                <StatCard
                  icon={FiCheckCircle}
                  value={reportStats.attendedCount}
                  label="الحضور"
                />
                <StatCard
                  icon={FiBookOpen}
                  value={reportStats.homeworkCount}
                  label="الواجبات المكتملة"
                />
                <StatCard
                  icon={FiStar}
                  value={reportStats.avgRating.toFixed(1)}
                  label="متوسط التقييم"
                />
              </div>
            </div>

            <div className={styles.reportsSection}>
              <h3 className={styles.sectionHeading}>
                <FiCalendar className={styles.headingIcon} />
                تفاصيل التقارير
              </h3>

              <div className={styles.reportsList}>
                {reports
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt || 0).getTime() -
                      new Date(a.createdAt || 0).getTime()
                  )
                  .map((r) => {
                    const lessonId =
                      typeof r.lessonId === "string"
                        ? r.lessonId
                        : r.lessonId?._id || "-";
                    const created = r.createdAt
                      ? new Date(r.createdAt).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-";

                    return (
                      <div key={r._id} className={styles.reportCard}>
                        <div className={styles.reportHeader}>
                          <div className={styles.reportMeta}>
                            <span className={styles.lessonId}>
                              <FiCalendar className={styles.metaIcon} />
                              حصة رقم: {String(lessonId).slice(-6)}
                            </span>
                            <span className={styles.reportDate}>
                              <FiClock className={styles.metaIcon} />
                              {created}
                            </span>
                          </div>
                          {typeof r.rating === "number" && (
                            <div className={styles.ratingBadge}>
                              <FiStar className={styles.ratingIcon} />
                              {r.rating}/5
                            </div>
                          )}
                        </div>

                        <div className={styles.reportStatus}>
                          <div
                            className={`${styles.statusBadge} ${
                              r.attended
                                ? styles.statusSuccess
                                : styles.statusDanger
                            }`}
                          >
                            {r.attended ? "حضر" : "غائب"}
                          </div>
                          {typeof r.completeLesson === "boolean" && (
                            <div
                              className={`${styles.statusBadge} ${
                                r.completeLesson
                                  ? styles.statusSuccess
                                  : styles.statusWarning
                              }`}
                            >
                              {r.completeLesson ? "مكتملة" : "غير مكتملة"}
                            </div>
                          )}
                          {typeof r.doneHomework === "boolean" && (
                            <div
                              className={`${styles.statusBadge} ${
                                r.doneHomework
                                  ? styles.statusSuccess
                                  : styles.statusWarning
                              }`}
                            >
                              {r.doneHomework ? "واجب مكتمل" : "واجب غير مكتمل"}
                            </div>
                          )}
                        </div>

                        {(r.notes || r.content) && (
                          <div className={styles.reportContent}>
                            {r.notes && (
                              <div className={styles.contentSection}>
                                <h4 className={styles.contentTitle}>
                                  <FiFileText className={styles.contentIcon} />
                                  ملاحظات المعلم
                                </h4>
                                <div className={styles.contentText}>
                                  {r.notes}
                                </div>
                              </div>
                            )}
                            {r.content && r.content.trim() !== "" && (
                              <div className={styles.contentSection}>
                                <h4 className={styles.contentTitle}>
                                  <FiBookOpen className={styles.contentIcon} />
                                  المحتوى
                                </h4>
                                <div className={styles.contentText}>
                                  {r.content}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className={styles.memorizationSection}>
                          <div className={styles.memorizationGroup}>
                            <h4 className={styles.memorizationTitle}>
                              <FiTarget className={styles.memorizationIcon} />
                              الحفظ الجديد
                            </h4>
                            <div className={styles.chips}>
                              {(r.newMemorized?.new || []).length > 0 ? (
                                (r.newMemorized?.new || []).map((x, idx) => (
                                  <span
                                    className={`${styles.chip} ${styles.chipNew}`}
                                    key={`nn-${idx}`}
                                  >
                                    {x}
                                  </span>
                                ))
                              ) : (
                                <span className={styles.emptyChip}>
                                  لا يوجد
                                </span>
                              )}
                            </div>
                          </div>

                          <div className={styles.memorizationGroup}>
                            <h4 className={styles.memorizationTitle}>
                              <FiBookOpen className={styles.memorizationIcon} />
                              المراجعة (القديم)
                            </h4>
                            <div className={styles.chips}>
                              {(r.newMemorized?.old || []).length > 0 ? (
                                (r.newMemorized?.old || []).map((x, idx) => (
                                  <span
                                    className={`${styles.chip} ${styles.chipOld}`}
                                    key={`no-${idx}`}
                                  >
                                    {x}
                                  </span>
                                ))
                              ) : (
                                <span className={styles.emptyChip}>
                                  لا يوجد
                                </span>
                              )}
                            </div>
                          </div>

                          <div className={styles.memorizationGroup}>
                            <h4 className={styles.memorizationTitle}>
                              <FiTarget className={styles.memorizationIcon} />
                              المطلوب للحصة القادمة
                            </h4>
                            <div className={styles.chips}>
                              {(r.wantedForNextLesson?.new || []).length > 0 ? (
                                (r.wantedForNextLesson?.new || []).map(
                                  (x, idx) => (
                                    <span
                                      className={`${styles.chip} ${styles.chipNext}`}
                                      key={`wn-${idx}`}
                                    >
                                      {x}
                                    </span>
                                  )
                                )
                              ) : (
                                <span className={styles.emptyChip}>
                                  لا يوجد
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </ModalContainer>
  );
}
