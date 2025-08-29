import React, { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiCheck,
  FiX,
  FiEdit,
  FiEye,
  FiCalendar,
} from "react-icons/fi";
import StatCard from "@/components/common/UI/StatCard";
import EnhancedLoader from "@/components/common/UI/EnhancedLoader";
import api from "@/utils/api";
import styles from "@/styles/AdminDashboard.module.css";
import { Payment, PaymentHistory } from "@/utils/types";

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "paid" | "unpaid" | "partial"
  >("all");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedStudentHistory, setSelectedStudentHistory] = useState<
    PaymentHistory[]
  >([]);

  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    allowedLessons: "",
    paymentMethod: "cash" as "cash" | "bank_transfer" | "card",
    notes: "",
  });

  useEffect(() => {
    fetchPayments();
    fetchPaymentHistory();
  }, []);

  useEffect(() => {
    const filterPayments = () => {
      let filtered = payments;

      if (statusFilter !== "all") {
        filtered = filtered.filter(
          (payment) => payment.status === statusFilter
        );
      }

      setFilteredPayments(filtered);
    };

    filterPayments();
  }, [payments, statusFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      // Mock data for development
      const mockPayments: Payment[] = [
        {
          id: "1",
          studentId: "1",
          studentName: "أحمد محمد علي",
          amount: 500,
          status: "paid",
          allowedLessons: 8,
          usedLessons: 3,
          paymentDate: "2024-07-01T10:00:00Z",
          dueDate: "2024-07-31T23:59:59Z",
          paymentMethod: "bank_transfer",
          notes: "دفعة شهر يوليو",
        },
        {
          id: "2",
          studentId: "3",
          studentName: "محمد عبدالله",
          amount: 500,
          status: "unpaid",
          allowedLessons: 0,
          usedLessons: 0,
          dueDate: "2024-07-15T23:59:59Z",
        },
        {
          id: "3",
          studentId: "4",
          studentName: "سارة أحمد",
          amount: 500,
          status: "partial",
          allowedLessons: 4,
          usedLessons: 2,
          paymentDate: "2024-06-28T14:30:00Z",
          dueDate: "2024-07-28T23:59:59Z",
          paymentMethod: "cash",
          notes: "دفعة جزئية 250 جنية",
        },
      ];
      setPayments(mockPayments);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const response = await api.get("/admin/payments/history");
      setPaymentHistory(response.data);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      // Mock data
      const mockHistory: PaymentHistory[] = [
        {
          id: "1",
          studentId: "1",
          amount: 500,
          date: "2024-07-01T10:00:00Z",
          method: "تحويل بنكي",
          notes: "دفعة شهر يوليو",
        },
        {
          id: "2",
          studentId: "1",
          amount: 500,
          date: "2024-06-01T10:00:00Z",
          method: "نقداً",
          notes: "دفعة شهر يونيو",
        },
        {
          id: "3",
          studentId: "4",
          amount: 250,
          date: "2024-06-28T14:30:00Z",
          method: "نقداً",
          notes: "دفعة جزئية",
        },
      ];
      setPaymentHistory(mockHistory);
    }
  };

  const handlePaymentStatusUpdate = async (
    paymentId: string,
    newStatus: "paid" | "unpaid"
  ) => {
    try {
      await api.put(`/admin/payments/${paymentId}/status`, {
        status: newStatus,
      });
      setPayments(
        payments.map((payment) =>
          payment.id === paymentId ? { ...payment, status: newStatus } : payment
        )
      );
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("فشل في تحديث حالة الدفعة");
    }
  };

  const handleEditPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setPaymentForm({
      amount: payment.amount.toString(),
      allowedLessons: payment.allowedLessons.toString(),
      paymentMethod: payment.paymentMethod || "cash",
      notes: payment.notes || "",
    });
    setShowPaymentModal(true);
  };

  const handleViewHistory = (studentId: string) => {
    const studentHistory = paymentHistory.filter(
      (h) => h.studentId === studentId
    );
    setSelectedStudentHistory(studentHistory);
    setShowHistoryModal(true);
  };

  const handleSavePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPayment) return;

    try {
      const updateData = {
        amount: parseFloat(paymentForm.amount),
        allowedLessons: parseInt(paymentForm.allowedLessons),
        paymentMethod: paymentForm.paymentMethod,
        notes: paymentForm.notes,
        status: "paid" as const,
        paymentDate: new Date().toISOString(),
      };

      await api.put(`/admin/payments/${selectedPayment.id}`, updateData);

      setPayments(
        payments.map((payment) =>
          payment.id === selectedPayment.id
            ? { ...payment, ...updateData }
            : payment
        )
      );

      setShowPaymentModal(false);
      setSelectedPayment(null);
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("فشل في حفظ بيانات الدفعة");
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "مدفوع";
      case "unpaid":
        return "غير مدفوع";
      case "partial":
        return "دفعة جزئية";
      default:
        return status;
    }
  };

  const getTotalStats = () => {
    const totalAmount = payments.reduce(
      (sum, p) => sum + (p.status === "paid" ? p.amount : 0),
      0
    );
    const paidCount = payments.filter((p) => p.status === "paid").length;
    const unpaidCount = payments.filter((p) => p.status === "unpaid").length;
    const partialCount = payments.filter((p) => p.status === "partial").length;

    return { totalAmount, paidCount, unpaidCount, partialCount };
  };

  const stats = getTotalStats();

  if (loading) {
    return (
      <div className={styles.overviewContainer}>
        <EnhancedLoader
          type="default"
          text="جاري تحميل بيانات المدفوعات..."
          size="large"
          color="primary"
        />
      </div>
    );
  }

  return (
    <div className={styles.overviewContainer}>
      <h1 className={styles.pageTitle}>المدفوعات والوصول</h1>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <StatCard
          icon={FiDollarSign}
          value={`${stats.totalAmount.toLocaleString()} جنية`}
          label="إجمالي المدفوعات"
        />

        <StatCard icon={FiCheck} value={stats.paidCount} label="طلاب دفعوا" />

        <StatCard icon={FiX} value={stats.unpaidCount} label="طلاب لم يدفعوا" />

        <StatCard
          icon={FiCalendar}
          value={stats.partialCount}
          label="دفعات جزئية"
        />
      </div>

      {/* Filters */}
      <div className={styles.filtersContainer}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>تصفية حسب الحالة:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className={styles.filterSelect}
          >
            <option value="all">جميع الحالات</option>
            <option value="paid">مدفوع</option>
            <option value="unpaid">غير مدفوع</option>
            <option value="partial">دفعة جزئية</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>اسم الطالب</th>
              <th>المبلغ</th>
              <th>الحالة</th>
              <th>الدروس المسموحة</th>
              <th>الدروس المستخدمة</th>
              <th>تاريخ الاستحقاق</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td className={styles.cellName}>{payment.studentName}</td>
                <td>{payment.amount} جنية</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[
                        `status${
                          payment.status.charAt(0).toUpperCase() +
                          payment.status.slice(1)
                        }`
                      ]
                    }`}
                  >
                    {getStatusText(payment.status)}
                  </span>
                </td>
                <td>{payment.allowedLessons}</td>
                <td>
                  <span
                    className={
                      payment.usedLessons >= payment.allowedLessons
                        ? styles.textDanger
                        : ""
                    }
                  >
                    {payment.usedLessons}
                  </span>
                </td>
                <td className={styles.cellDate}>
                  {new Date(payment.dueDate).toLocaleDateString("ar-SA")}
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      onClick={() => handleEditPayment(payment)}
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                      title="تعديل الدفعة"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleViewHistory(payment.studentId)}
                      className={`${styles.actionBtn} ${styles.viewBtn}`}
                      title="عرض تاريخ المدفوعات"
                    >
                      <FiEye />
                    </button>
                    {payment.status === "unpaid" && (
                      <button
                        onClick={() =>
                          handlePaymentStatusUpdate(payment.id, "paid")
                        }
                        className={`${styles.actionBtn} ${styles.confirmBtn}`}
                        title="تأكيد الدفع"
                      >
                        <FiCheck />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                تعديل دفعة {selectedPayment.studentName}
              </h2>
              <button
                className={styles.closeBtn}
                onClick={() => setShowPaymentModal(false)}
              >
                <FiX />
              </button>
            </div>

            <div className={styles.modalBody}>
              <form onSubmit={handleSavePayment}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>المبلغ (جنية)</label>
                  <input
                    type="number"
                    value={paymentForm.amount}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, amount: e.target.value })
                    }
                    required
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    عدد الدروس المسموحة
                  </label>
                  <input
                    type="number"
                    value={paymentForm.allowedLessons}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        allowedLessons: e.target.value,
                      })
                    }
                    required
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>طريقة الدفع</label>
                  <select
                    value={paymentForm.paymentMethod}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        paymentMethod: e.target.value as any,
                      })
                    }
                    className={styles.formSelect}
                  >
                    <option value="cash">نقداً</option>
                    <option value="bank_transfer">تحويل بنكي</option>
                    <option value="card">بطاقة ائتمان</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ملاحظات</label>
                  <textarea
                    value={paymentForm.notes}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, notes: e.target.value })
                    }
                    rows={3}
                    className={styles.formTextarea}
                  />
                </div>

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className={`${styles.btn} ${styles.btnSecondary}`}
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                  >
                    حفظ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Payment History Modal */}
      {showHistoryModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>تاريخ المدفوعات</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setShowHistoryModal(false)}
              >
                <FiX />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>المبلغ</th>
                      <th>التاريخ</th>
                      <th>الطريقة</th>
                      <th>ملاحظات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudentHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.amount} جنية</td>
                        <td className={styles.cellDate}>
                          {new Date(payment.date).toLocaleDateString("ar-SA")}
                        </td>
                        <td>{payment.method}</td>
                        <td className={styles.cellNotes}>
                          {payment.notes || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.modalActions}>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
