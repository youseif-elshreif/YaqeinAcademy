import React, { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiCheck,
  FiX,
  FiEdit,
  FiEye,
  FiCalendar,
} from "react-icons/fi";
import StatCard from "@/src/components/common/UI/StatCard";
import EnhancedLoader from "@/src/components/common/UI/EnhancedLoader";
import api from "@/src/utils/api";
import styles from "@/src/styles/AdminDashboard.module.css";
import { Payment, PaymentHistory } from "@/src/types";
import Button from "@/src/components/common/Button";

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

      const mockPayments: Payment[] = [
        {
          id: "1",
          studentId: "1",
          studentName: "???? ???? ???",
          amount: 500,
          status: "paid",
          allowedLessons: 8,
          usedLessons: 3,
          paymentDate: "2024-07-01T10:00:00Z",
          dueDate: "2024-07-31T23:59:59Z",
          paymentMethod: "bank_transfer",
          notes: "???? ??? ?????",
        },
        {
          id: "2",
          studentId: "3",
          studentName: "???? ???????",
          amount: 500,
          status: "unpaid",
          allowedLessons: 0,
          usedLessons: 0,
          dueDate: "2024-07-15T23:59:59Z",
        },
        {
          id: "3",
          studentId: "4",
          studentName: "???? ????",
          amount: 500,
          status: "partial",
          allowedLessons: 4,
          usedLessons: 2,
          paymentDate: "2024-06-28T14:30:00Z",
          dueDate: "2024-07-28T23:59:59Z",
          paymentMethod: "cash",
          notes: "???? ????? 250 ????",
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

      const mockHistory: PaymentHistory[] = [
        {
          id: "1",
          studentId: "1",
          amount: 500,
          date: "2024-07-01T10:00:00Z",
          method: "????? ????",
          notes: "???? ??? ?????",
        },
        {
          id: "2",
          studentId: "1",
          amount: 500,
          date: "2024-06-01T10:00:00Z",
          method: "?????",
          notes: "???? ??? ?????",
        },
        {
          id: "3",
          studentId: "4",
          amount: 250,
          date: "2024-06-28T14:30:00Z",
          method: "?????",
          notes: "???? ?????",
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
      alert("??? ?? ????? ???? ??????");
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
      alert("??? ?? ??? ?????? ??????");
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "?????";
      case "unpaid":
        return "??? ?????";
      case "partial":
        return "???? ?????";
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
          text="???? ????? ?????? ?????????..."
          size="large"
          color="primary"
        />
      </div>
    );
  }

  return (
    <div className={styles.overviewContainer}>
      <h1 className={styles.pageTitle}>????????? ???????</h1>


      <div className={styles.statsGrid}>
        <StatCard
          icon={FiDollarSign}
          value={`${stats.totalAmount.toLocaleString()} ????`}
          label="?????? ?????????"
        />

        <StatCard icon={FiCheck} value={stats.paidCount} label="???? ?????" />

        <StatCard icon={FiX} value={stats.unpaidCount} label="???? ?? ??????" />

        <StatCard
          icon={FiCalendar}
          value={stats.partialCount}
          label="????? ?????"
        />
      </div>


      <div className={styles.filtersContainer}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>????? ??? ??????:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className={styles.filterSelect}
          >
            <option value="all">???? ???????</option>
            <option value="paid">?????</option>
            <option value="unpaid">??? ?????</option>
            <option value="partial">???? ?????</option>
          </select>
        </div>
      </div>


      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>??? ??????</th>
              <th>??????</th>
              <th>??????</th>
              <th>?????? ????????</th>
              <th>?????? ?????????</th>
              <th>????? ?????????</th>
              <th>?????????</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td className={styles.cellName}>{payment.studentName}</td>
                <td>{payment.amount} ????</td>
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
                    <Button
                      onClick={() => handleEditPayment(payment)}
                      variant="primary"
                      size="small"
                      icon={<FiEdit />}
                      title="????? ??????"
                    >
                      ?????
                    </Button>
                    <Button
                      onClick={() => handleViewHistory(payment.studentId)}
                      variant="primary"
                      size="small"
                      icon={<FiEye />}
                      title="??? ????? ?????????"
                    >
                      ???????
                    </Button>
                    {payment.status === "unpaid" && (
                      <Button
                        onClick={() =>
                          handlePaymentStatusUpdate(payment.id, "paid")
                        }
                        variant="primary"
                        size="small"
                        icon={<FiCheck />}
                        title="????? ?????"
                      >
                        ?????
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {showPaymentModal && selectedPayment && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                ????? ???? {selectedPayment.studentName}
              </h2>
              <Button
                onClick={() => setShowPaymentModal(false)}
                variant="link"
                size="small"
                icon={<FiX />}
              >
                ?????
              </Button>
            </div>

            <div className={styles.modalBody}>
              <form onSubmit={handleSavePayment}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>?????? (????)</label>
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
                    ??? ?????? ????????
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
                  <label className={styles.formLabel}>????? ?????</label>
                  <select
                    value={paymentForm.paymentMethod}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        paymentMethod: e.target.value as
                          | "cash"
                          | "card"
                          | "bank_transfer",
                      })
                    }
                    className={styles.formSelect}
                  >
                    <option value="cash">?????</option>
                    <option value="bank_transfer">????? ????</option>
                    <option value="card">????? ??????</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>???????</label>
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
                  <Button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    variant="secondary"
                  >
                    ?????
                  </Button>
                  <Button type="submit" variant="primary">
                    ???
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


      {showHistoryModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>????? ?????????</h2>
              <Button
                onClick={() => setShowHistoryModal(false)}
                variant="link"
                size="small"
                icon={<FiX />}
              >
                ?????
              </Button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>??????</th>
                      <th>???????</th>
                      <th>???????</th>
                      <th>???????</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudentHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.amount} ????</td>
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
                <Button
                  onClick={() => setShowHistoryModal(false)}
                  variant="primary"
                >
                  ?????
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
