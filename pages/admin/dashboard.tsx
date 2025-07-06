import React, { useState, useEffect } from "react";
import { withAdminProtection } from "@/components/auth";
import AdminLayout from "@/components/AdminDashboard/AdminLayout";
import DashboardOverview from "@/components/AdminDashboard/DashboardOverview";
import UserManagement from "@/components/AdminDashboard/UserManagement";
import PaymentManagement from "@/components/AdminDashboard/PaymentManagement";
import FinancialOverview from "@/components/AdminDashboard/FinancialOverview";
import GroupManagement from "@/components/AdminDashboard/GroupManagement";
import LessonManagement from "@/components/AdminDashboard/LessonManagement";
import styles from "@/styles/AdminDashboard.module.css";
import { ModalProvider } from "@/contexts/ModalContext";
import ModalContainer from "@/components/ModalContainer";

interface Students {
  id: string;
  name: string;
  payedClasses: number;
  nextPaymentDate: string;
  amountPaid: number;
  remainingClasses: number;
  postponedClasses: number;
  canceledClasses: number;
  absentClasses: number;
  attendedClasses: number;
  rate: number;
  phoneNumber: string;
  groupName: string;
}

const AdminDashboard: React.FC = () => {
  const [studentData, setStudentData] = useState<Students[]>([
    {
      id: "1",
      name: "أحمد محمد",
      payedClasses: 10,
      nextPaymentDate: "2025-07-15",
      amountPaid: 1000,
      remainingClasses: 4,
      postponedClasses: 2,
      canceledClasses: 1,
      absentClasses: 3,
      attendedClasses: 6,
      rate: 10,
      phoneNumber: "01012345678",
      groupName: "مجموعة 1",
    },
    {
      id: "2",
      name: "سارة علي",
      payedClasses: 8,
      nextPaymentDate: "2025-07-20",
      amountPaid: 800,
      remainingClasses: 6,
      postponedClasses: 1,
      canceledClasses: 0,
      absentClasses: 1,
      attendedClasses: 7,
      rate: 8,
      phoneNumber: "01098765432",
      groupName: "مجموعة 2",
    },
    {
      id: "3",
      name: "خالد سمير",
      payedClasses: 12,
      nextPaymentDate: "2025-07-18",
      amountPaid: 1200,
      remainingClasses: 9,
      postponedClasses: 0,
      canceledClasses: 1,
      absentClasses: 2,
      attendedClasses: 3,
      rate: 6,
      phoneNumber: "01122334455",
      groupName: "مجموعة 1",
    },
    {
      id: "4",
      name: "منى أحمد",
      payedClasses: 6,
      nextPaymentDate: "2025-07-22",
      amountPaid: 600,
      remainingClasses: 2,
      postponedClasses: 2,
      canceledClasses: 0,
      absentClasses: 2,
      attendedClasses: 4,
      rate: 8,
      phoneNumber: "01233445566",
      groupName: "مجموعة 3",
    },
    {
      id: "5",
      name: "محمد سعيد",
      payedClasses: 15,
      nextPaymentDate: "2025-07-10",
      amountPaid: 1500,
      remainingClasses: 10,
      postponedClasses: 1,
      canceledClasses: 1,
      absentClasses: 3,
      attendedClasses: 5,
      rate: 2,
      phoneNumber: "01055667788",
      groupName: "مجموعة 1",
    },
    {
      id: "6",
      name: "نهى حسن",
      payedClasses: 9,
      nextPaymentDate: "2025-07-19",
      amountPaid: 900,
      remainingClasses: 4,
      postponedClasses: 0,
      canceledClasses: 0,
      absentClasses: 1,
      attendedClasses: 8,
      rate: 10,
      phoneNumber: "01099887766",
      groupName: "مجموعة 2",
    },
    {
      id: "7",
      name: "علي مصطفى",
      payedClasses: 7,
      nextPaymentDate: "2025-07-25",
      amountPaid: 700,
      remainingClasses: 3,
      postponedClasses: 1,
      canceledClasses: 0,
      absentClasses: 1,
      attendedClasses: 6,
      rate: 6,
      phoneNumber: "01111222333",
      groupName: "مجموعة 3",
    },
    {
      id: "8",
      name: "فاطمة عمر",
      payedClasses: 5,
      nextPaymentDate: "2025-07-28",
      amountPaid: 500,
      remainingClasses: 2,
      postponedClasses: 0,
      canceledClasses: 1,
      absentClasses: 2,
      attendedClasses: 3,
      rate: 4,
      phoneNumber: "01222334455",
      groupName: "مجموعة 2",
    },
    {
      id: "9",
      name: "زياد محمد",
      payedClasses: 10,
      nextPaymentDate: "2025-07-13",
      amountPaid: 1000,
      remainingClasses: 7,
      postponedClasses: 0,
      canceledClasses: 0,
      absentClasses: 1,
      attendedClasses: 9,
      rate: 10,
      phoneNumber: "01033445566",
      groupName: "مجموعة 1",
    },
    {
      id: "10",
      name: "هبة إبراهيم",
      payedClasses: 6,
      nextPaymentDate: "2025-07-17",
      amountPaid: 600,
      remainingClasses: 1,
      postponedClasses: 1,
      canceledClasses: 0,
      absentClasses: 4,
      attendedClasses: 2,
      rate: 2,
      phoneNumber: "01066778899",
      groupName: "مجموعة 3",
    },
  ]);

  const [activeTab, setActiveTab] = useState("overview");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />;
      case "users":
        return <UserManagement studentData={studentData} />;
      case "payments":
        return <PaymentManagement />;
      case "groups":
        return <GroupManagement />;
      case "courses":
        return <LessonManagement />;
      case "financial":
        return <FinancialOverview />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className={styles.dashboardContent}>{renderActiveComponent()}</div>
    </AdminLayout>
  );
};

export default AdminDashboard;
