"use client";
import React, { useState } from "react";
import {
  FiPlus,
  FiDownload,
  FiMessageSquare,
  FiClock,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { useTestimonials } from "@/src/contexts/AppProviders";
import TestimonialsList from "@/src/components/dashboard/TestimonialsList";
import StatCard from "@/src/components/common/UI/StatCard";
import Button from "@/src/components/common/Button";
import DashboardTabs from "@/src/components/dashboard/student/DashboardTabs";
import SearchFilter from "@/src/components/common/UI/SearchFilter";
import AddTestimonialModal from "@/src/components/common/Modals/AddTestimonialModal";
import styles from "@/src/styles/AdminDashboard.module.css";
import userStyles from "@/src/components/dashboard/admin/styles.module.css";

const TestimonialsManagement: React.FC = () => {
  const {
    testimonials,
    loading,
    error,
    createTestimonial,
    approveTestimonial,
    rejectTestimonial,
    deleteTestimonial,
    getPendingTestimonials,
  } = useTestimonials();

  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleExportTestimonials = () => {
    alert("تصدير الآراء غير متاح في هذا الوضع التجريبي.");
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await approveTestimonial(id);
    } catch (error) {
      console.error("Error approving testimonial:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    try {
      await rejectTestimonial(id);
    } catch (error) {
      console.error("Error rejecting testimonial:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الرأي؟")) {
      setActionLoading(id);
      try {
        await deleteTestimonial(id);
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      } finally {
        setActionLoading(null);
      }
    }
  };

  const handleCreateTestimonial = async (data: {
    name: string;
    content: string;
  }) => {
    try {
      await createTestimonial(data);
      // Modal will close automatically on success
    } catch (error) {
      console.error("Error creating testimonial:", error);
      throw error; // Re-throw to let modal handle it
    }
  };

  const getFilteredTestimonials = () => {
    let filtered = testimonials;

    switch (activeTab) {
      case "pending":
        filtered = testimonials.filter((t) => t.status === "pending");
        break;
      case "approved":
        filtered = testimonials.filter((t) => t.status === "approved");
        break;
      case "rejected":
        filtered = testimonials.filter((t) => t.status === "rejected");
        break;
      default:
        filtered = testimonials;
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const pendingCount = getPendingTestimonials().length;
  const approvedCount = testimonials.filter(
    (t) => t.status === "approved"
  ).length;
  const rejectedCount = testimonials.filter(
    (t) => t.status === "rejected"
  ).length;

  const tabs = [
    {
      id: "all",
      label: `جميع الآراء (${testimonials.length})`,
    },
    {
      id: "pending",
      label: `في الانتظار ${pendingCount > 0 ? `(${pendingCount})` : ""}`,
    },
    {
      id: "approved",
      label: `موافق عليها (${approvedCount})`,
    },
    {
      id: "rejected",
      label: `مرفوضة (${rejectedCount})`,
    },
  ];

  return (
    <div className={styles.overviewContainer}>
      {/* Header Section */}
      <div className={userStyles.headerRow}>
        <h1 className={styles.pageTitle}>إدارة آراء الطلاب</h1>
        <div className={userStyles.headerActions}>
          <Button
            variant="secondary"
            icon={<FiDownload />}
            onClick={handleExportTestimonials}
          >
            تصدير الآراء
          </Button>
          <Button
            variant="primary"
            icon={<FiPlus />}
            onClick={() => setIsAddModalOpen(true)}
          >
            إضافة رأي جديد
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard
          icon={FiMessageSquare}
          value={testimonials.length}
          label="إجمالي الآراء"
        />
        <StatCard icon={FiClock} value={pendingCount} label="في الانتظار" />
        <StatCard icon={FiCheck} value={approvedCount} label="موافق عليها" />
        <StatCard icon={FiX} value={rejectedCount} label="مرفوضة" />
      </div>

      {/* Error Display */}
      {error && (
        <div className={styles.errorAlert}>
          <p>{error}</p>
        </div>
      )}

      {/* Search Filter */}
      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <SearchFilter
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="البحث بالاسم أو محتوى الرأي..."
            wrapperClassName={userStyles.filterInputWrapper}
            inputClassName={userStyles.formInput}
            iconClassName={userStyles.filterIcon}
          />
        </div>
      </div>

      {/* Tabs */}
      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as any)}
      />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.listSection}>
          {loading && !actionLoading ? (
            <div className={styles.loading}>
              <p>جاري التحميل...</p>
            </div>
          ) : (
            <TestimonialsList
              testimonials={getFilteredTestimonials()}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* Add Testimonial Modal */}
      <AddTestimonialModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateTestimonial}
        isLoading={loading}
      />
    </div>
  );
};

export default TestimonialsManagement;
