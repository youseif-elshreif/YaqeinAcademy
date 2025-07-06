import React, { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiTrendingUp,
  FiCalendar,
  FiFilter,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "@/utils/api";
import styles from "@/styles/AdminDashboard.module.css";

interface TeacherPayment {
  teacherId: string;
  teacherName: string;
  totalPaid: number;
  monthlyPayments: MonthlyPayment[];
  lastPaymentDate?: string;
}

interface MonthlyPayment {
  month: string;
  amount: number;
}

interface StudentPayment {
  studentId: string;
  studentName: string;
  totalPaid: number;
  lastPaymentDate: string;
  status: "paid" | "unpaid" | "partial";
}

interface FinancialSummary {
  totalIncomeThisMonth: number;
  totalTeacherPayments: number;
  netProfitThisMonth: number;
  growthPercentage: number;
}

interface MonthlyIncome {
  month: string;
  studentPayments: number;
  teacherPayments: number;
  netProfit: number;
}

const FinancialOverview: React.FC = () => {
  const [teacherPayments, setTeacherPayments] = useState<TeacherPayment[]>([]);
  const [studentPayments, setStudentPayments] = useState<StudentPayment[]>([]);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>({
    totalIncomeThisMonth: 0,
    totalTeacherPayments: 0,
    netProfitThisMonth: 0,
    growthPercentage: 0,
  });
  const [monthlyIncome, setMonthlyIncome] = useState<MonthlyIncome[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [teacherFilter, setTeacherFilter] = useState<"all" | string>("all");

  useEffect(() => {
    fetchFinancialData();
  }, [selectedMonth]);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      const [
        summaryResponse,
        teacherResponse,
        studentResponse,
        incomeResponse,
      ] = await Promise.all([
        api.get(`/admin/financial/summary?month=${selectedMonth}`),
        api.get(`/admin/financial/teachers?month=${selectedMonth}`),
        api.get(`/admin/financial/students?month=${selectedMonth}`),
        api.get("/admin/financial/monthly-income"),
      ]);

      setFinancialSummary(summaryResponse.data);
      setTeacherPayments(teacherResponse.data);
      setStudentPayments(studentResponse.data);
      setMonthlyIncome(incomeResponse.data);
    } catch (error) {
      console.error("Error fetching financial data:", error);
      // Mock data for development
      const mockFinancialSummary: FinancialSummary = {
        totalIncomeThisMonth: 45000,
        totalTeacherPayments: 15000,
        netProfitThisMonth: 30000,
        growthPercentage: 18.4,
      };

      const mockTeacherPayments: TeacherPayment[] = [
        {
          teacherId: "1",
          teacherName: "فاطمة حسن",
          totalPaid: 5000,
          monthlyPayments: [
            { month: "يناير", amount: 4500 },
            { month: "فبراير", amount: 4800 },
            { month: "مارس", amount: 4200 },
            { month: "أبريل", amount: 5200 },
            { month: "مايو", amount: 5500 },
            { month: "يونيو", amount: 5000 },
          ],
          lastPaymentDate: "2024-07-01T10:00:00Z",
        },
        {
          teacherId: "2",
          teacherName: "محمد أحمد",
          totalPaid: 4500,
          monthlyPayments: [
            { month: "يناير", amount: 4000 },
            { month: "فبراير", amount: 4200 },
            { month: "مارس", amount: 3800 },
            { month: "أبريل", amount: 4600 },
            { month: "مايو", amount: 4800 },
            { month: "يونيو", amount: 4500 },
          ],
          lastPaymentDate: "2024-07-01T10:00:00Z",
        },
        {
          teacherId: "3",
          teacherName: "عائشة علي",
          totalPaid: 3500,
          monthlyPayments: [
            { month: "يناير", amount: 3000 },
            { month: "فبراير", amount: 3200 },
            { month: "مارس", amount: 2800 },
            { month: "أبريل", amount: 3400 },
            { month: "مايو", amount: 3600 },
            { month: "يونيو", amount: 3500 },
          ],
          lastPaymentDate: "2024-06-28T14:00:00Z",
        },
      ];

      const mockStudentPayments: StudentPayment[] = [
        {
          studentId: "1",
          studentName: "أحمد محمد علي",
          totalPaid: 1500,
          lastPaymentDate: "2024-07-01T10:00:00Z",
          status: "paid",
        },
        {
          studentId: "2",
          studentName: "سارة أحمد",
          totalPaid: 750,
          lastPaymentDate: "2024-06-28T14:30:00Z",
          status: "partial",
        },
        {
          studentId: "3",
          studentName: "محمد عبدالله",
          totalPaid: 0,
          lastPaymentDate: "",
          status: "unpaid",
        },
      ];

      const mockMonthlyIncome: MonthlyIncome[] = [
        {
          month: "يناير",
          studentPayments: 35000,
          teacherPayments: 11500,
          netProfit: 23500,
        },
        {
          month: "فبراير",
          studentPayments: 38000,
          teacherPayments: 12200,
          netProfit: 25800,
        },
        {
          month: "مارس",
          studentPayments: 32000,
          teacherPayments: 10800,
          netProfit: 21200,
        },
        {
          month: "أبريل",
          studentPayments: 42000,
          teacherPayments: 13200,
          netProfit: 28800,
        },
        {
          month: "مايو",
          studentPayments: 46000,
          teacherPayments: 13900,
          netProfit: 32100,
        },
        {
          month: "يونيو",
          studentPayments: 45000,
          teacherPayments: 15000,
          netProfit: 30000,
        },
      ];

      setFinancialSummary(mockFinancialSummary);
      setTeacherPayments(mockTeacherPayments);
      setStudentPayments(mockStudentPayments);
      setMonthlyIncome(mockMonthlyIncome);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredTeacherPayments = () => {
    if (teacherFilter === "all") {
      return teacherPayments;
    }
    return teacherPayments.filter((tp) => tp.teacherId === teacherFilter);
  };

  const getPaymentStatusData = () => {
    const paid = studentPayments.filter((sp) => sp.status === "paid").length;
    const unpaid = studentPayments.filter(
      (sp) => sp.status === "unpaid"
    ).length;
    const partial = studentPayments.filter(
      (sp) => sp.status === "partial"
    ).length;

    return [
      { name: "مدفوع", value: paid, color: "#38a169" },
      { name: "غير مدفوع", value: unpaid, color: "#e53e3e" },
      { name: "جزئي", value: partial, color: "#d69e2e" },
    ];
  };

  if (loading) {
    return (
      <div className={styles.overviewContainer}>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>جاري تحميل البيانات المالية...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overviewContainer}>
      <h1 className={styles.pageTitle}>النظرة المالية</h1>

      {/* Financial Summary Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.income}`}>
              <FiDollarSign />
            </div>
            <div className={`${styles.statChange} ${styles.positive}`}>
              <FiTrendingUp />
              {financialSummary.growthPercentage}%
            </div>
          </div>
          <h3 className={styles.statValue}>
            {financialSummary.totalIncomeThisMonth.toLocaleString()} ريال
          </h3>
          <p className={styles.statLabel}>إيرادات هذا الشهر</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.teachers}`}>
              <FiDollarSign />
            </div>
          </div>
          <h3 className={styles.statValue}>
            {financialSummary.totalTeacherPayments.toLocaleString()} ريال
          </h3>
          <p className={styles.statLabel}>مدفوعات المدرسين</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.students}`}>
              <FiTrendingUp />
            </div>
          </div>
          <h3 className={styles.statValue}>
            {financialSummary.netProfitThisMonth.toLocaleString()} ريال
          </h3>
          <p className={styles.statLabel}>صافي الربح</p>
        </div>
      </div>

      {/* Month Filter */}
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "24px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              الشهر:
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{
                padding: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              تصفية المدرسين:
            </label>
            <select
              value={teacherFilter}
              onChange={(e) => setTeacherFilter(e.target.value)}
              style={{
                padding: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              <option value="all">جميع المدرسين</option>
              {teacherPayments.map((teacher) => (
                <option key={teacher.teacherId} value={teacher.teacherId}>
                  {teacher.teacherName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsSection}>
        {/* Monthly Income Trend */}
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>اتجاه الإيرادات الشهرية</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyIncome}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} ريال`, ""]} />
              <Line
                type="monotone"
                dataKey="studentPayments"
                stroke="#667eea"
                strokeWidth={3}
                name="مدفوعات الطلاب"
              />
              <Line
                type="monotone"
                dataKey="teacherPayments"
                stroke="#e53e3e"
                strokeWidth={3}
                name="مدفوعات المدرسين"
              />
              <Line
                type="monotone"
                dataKey="netProfit"
                stroke="#38a169"
                strokeWidth={3}
                name="صافي الربح"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Status Distribution */}
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>توزيع حالة المدفوعات</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getPaymentStatusData()}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {getPaymentStatusData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} طالب`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "16px",
            }}
          >
            {getPaymentStatusData().map((entry, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: entry.color,
                    borderRadius: "50%",
                  }}
                ></div>
                <span style={{ fontSize: "14px" }}>
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teacher Payments Comparison */}
      <div className={styles.chartCard} style={{ marginBottom: "24px" }}>
        <h2 className={styles.chartTitle}>مقارنة مدفوعات المدرسين</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getFilteredTeacherPayments()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="teacherName" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} ريال`, "المدفوع"]} />
            <Bar dataKey="totalPaid" fill="#667eea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Teacher Payments Table */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            padding: "24px 24px 0",
            margin: 0,
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1a202c",
            textAlign: "right",
          }}
        >
          تفاصيل مدفوعات المدرسين
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f7fafc" }}>
            <tr>
              <th
                style={{
                  padding: "16px",
                  textAlign: "right",
                  fontWeight: "600",
                  color: "#1a202c",
                }}
              >
                اسم المدرس
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "right",
                  fontWeight: "600",
                  color: "#1a202c",
                }}
              >
                المدفوع هذا الشهر
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "right",
                  fontWeight: "600",
                  color: "#1a202c",
                }}
              >
                تاريخ آخر دفعة
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#1a202c",
                }}
              >
                الحالة
              </th>
            </tr>
          </thead>
          <tbody>
            {getFilteredTeacherPayments().map((teacher) => (
              <tr
                key={teacher.teacherId}
                style={{ borderBottom: "1px solid #e2e8f0" }}
              >
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "600",
                    color: "#1a202c",
                  }}
                >
                  {teacher.teacherName}
                </td>
                <td style={{ padding: "16px", color: "#4a5568" }}>
                  {teacher.totalPaid.toLocaleString()} ريال
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#718096",
                    fontSize: "14px",
                  }}
                >
                  {teacher.lastPaymentDate
                    ? new Date(teacher.lastPaymentDate).toLocaleDateString(
                        "ar-SA"
                      )
                    : "لم يتم الدفع بعد"}
                </td>
                <td style={{ padding: "16px", textAlign: "center" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "16px",
                      fontSize: "12px",
                      fontWeight: "600",
                      backgroundColor: teacher.lastPaymentDate
                        ? "#f0fff4"
                        : "#fed7d7",
                      color: teacher.lastPaymentDate ? "#38a169" : "#e53e3e",
                    }}
                  >
                    {teacher.lastPaymentDate ? "مدفوع" : "معلق"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Payments Summary */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h2
          style={{
            padding: "24px 24px 0",
            margin: 0,
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1a202c",
            textAlign: "right",
          }}
        >
          ملخص مدفوعات الطلاب
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f7fafc" }}>
            <tr>
              <th
                style={{
                  padding: "16px",
                  textAlign: "right",
                  fontWeight: "600",
                  color: "#1a202c",
                }}
              >
                اسم الطالب
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "right",
                  fontWeight: "600",
                  color: "#1a202c",
                }}
              >
                المبلغ المدفوع
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "right",
                  fontWeight: "600",
                  color: "#1a202c",
                }}
              >
                تاريخ آخر دفعة
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#1a202c",
                }}
              >
                الحالة
              </th>
            </tr>
          </thead>
          <tbody>
            {studentPayments.map((student) => {
              const getStatusColor = (status: string) => {
                switch (status) {
                  case "paid":
                    return { bg: "#f0fff4", color: "#38a169" };
                  case "unpaid":
                    return { bg: "#fed7d7", color: "#e53e3e" };
                  case "partial":
                    return { bg: "#fefcbf", color: "#d69e2e" };
                  default:
                    return { bg: "#f7fafc", color: "#4a5568" };
                }
              };

              const getStatusText = (status: string) => {
                switch (status) {
                  case "paid":
                    return "مدفوع";
                  case "unpaid":
                    return "غير مدفوع";
                  case "partial":
                    return "جزئي";
                  default:
                    return status;
                }
              };

              const statusStyle = getStatusColor(student.status);

              return (
                <tr
                  key={student.studentId}
                  style={{ borderBottom: "1px solid #e2e8f0" }}
                >
                  <td
                    style={{
                      padding: "16px",
                      fontWeight: "600",
                      color: "#1a202c",
                    }}
                  >
                    {student.studentName}
                  </td>
                  <td style={{ padding: "16px", color: "#4a5568" }}>
                    {student.totalPaid.toLocaleString()} ريال
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      color: "#718096",
                      fontSize: "14px",
                    }}
                  >
                    {student.lastPaymentDate
                      ? new Date(student.lastPaymentDate).toLocaleDateString(
                          "ar-SA"
                        )
                      : "لا يوجد دفعات"}
                  </td>
                  <td style={{ padding: "16px", textAlign: "center" }}>
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "16px",
                        fontSize: "12px",
                        fontWeight: "600",
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                      }}
                    >
                      {getStatusText(student.status)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialOverview;
