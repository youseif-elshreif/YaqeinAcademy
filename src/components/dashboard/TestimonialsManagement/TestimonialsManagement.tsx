"use client";
import React, { useState, useEffect } from "react";
import { FiMessageSquare, FiClock, FiCheck, FiFilter } from "react-icons/fi";
import { useTestimonialsContext } from "@/src/contexts/AppProviders";
import TestimonialsList from "@/src/components/dashboard/TestimonialsList";
import StatCard from "@/src/components/common/UI/StatCard";
import SearchFilter from "@/src/components/common/UI/SearchFilter";
import ConfirmDeleteTestimonialModal from "@/src/components/common/Modals/ConfirmDeleteTestimonialModal";
import TestimonialsSkeleton from "./TestimonialsSkeleton";
import styles from "@/src/styles/AdminDashboard.module.css";
import userStyles from "@/src/components/dashboard/admin/styles.module.css";

const TestimonialsManagement: React.FC = () => {
  const {
    getAllTestimonials,
    approveTestimonial,
    rejectTestimonial,
    deleteTestimonial,
    isLoading,
    error,
  } = useTestimonialsContext();

  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<any>(null);

  // Filter states
  const [showOnlyPending, setShowOnlyPending] = useState(false);
  const [dateFilter, setDateFilter] = useState("");

  // Load testimonials
  const loadTestimonials = async () => {
    try {
      const response = await getAllTestimonials();
      setTestimonials(response.reviews || []);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setInitialLoading(true);
        const response = await getAllTestimonials();
        setTestimonials(response.reviews || []);
      } catch (error) {
        throw error;
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialData();
  }, [getAllTestimonials]);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await approveTestimonial(id);
      await loadTestimonials(); // Refresh data
    } catch (error) {
      throw error;
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    try {
      await rejectTestimonial(id);
      await loadTestimonials(); // Refresh data
    } catch (error) {
      throw error;
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    // Find the testimonial to show in modal
    const testimonial = testimonials.find((t) => t._id === id);
    if (testimonial) {
      setTestimonialToDelete(testimonial);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    setActionLoading(id);
    try {
      await deleteTestimonial(id);
      await loadTestimonials(); // Refresh data
      setIsDeleteModalOpen(false);
      setTestimonialToDelete(null);
    } catch (error) {
      throw error;
    } finally {
      setActionLoading(null);
    }
  };

  // Filter testimonials based on filters
  const getFilteredTestimonials = () => {
    let filtered = testimonials;

    // Filter by adminAccepted
    if (showOnlyPending) {
      filtered = filtered.filter((t) => !t.adminAccepted);
    }

    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter((t) => {
        const testimonialDate = new Date(t.createdAt);
        return testimonialDate.toDateString() === filterDate.toDateString();
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.txt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTestimonials = getFilteredTestimonials();
  const pendingCount = testimonials.filter((t) => !t.adminAccepted).length;
  const approvedCount = testimonials.filter((t) => t.adminAccepted).length;

  // Show skeleton during initial loading
  if (initialLoading) {
    return <TestimonialsSkeleton />;
  }

  return (
    <div className={styles.overviewContainer}>
      {/* Header Section */}
      <div className={userStyles.headerRow}>
        <h1 className={styles.pageTitle}>إدارة آراء الطلاب</h1>
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
        <StatCard
          icon={FiFilter}
          value={filteredTestimonials.length}
          label="النتائج المفلترة"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className={styles.errorAlert}>
          <p>{error}</p>
        </div>
      )}

      {/* Filters */}
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

          <div className={userStyles.filterRow}>
            <label className={userStyles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showOnlyPending}
                onChange={(e) => setShowOnlyPending(e.target.checked)}
                className={userStyles.checkbox}
              />
              عرض المعلقة فقط
            </label>

            <div className={userStyles.filterGroup}>
              <label htmlFor="dateFilter" className={userStyles.label}>
                فلترة بالتاريخ:
              </label>
              <input
                type="date"
                id="dateFilter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={userStyles.formInput}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.listSection}>
          {isLoading && !actionLoading ? (
            <div className={styles.loading}>
              <p>جاري التحميل...</p>
            </div>
          ) : (
            <TestimonialsList
              testimonials={filteredTestimonials}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {testimonialToDelete && (
        <ConfirmDeleteTestimonialModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setTestimonialToDelete(null);
          }}
          testimonialId={testimonialToDelete._id}
          testimonialName={testimonialToDelete.name}
          testimonialText={testimonialToDelete.txt}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default TestimonialsManagement;
