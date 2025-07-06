import React, { useState, useEffect } from "react";
import { FiPlus, FiDownload, FiSearch, FiFilter } from "react-icons/fi";
import api from "@/utils/api";
import styles from "@/styles/AdminDashboard.module.css";
import StudentTable from "./StudentTable/StudentTable";
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
interface UserManagementProps {
  studentData: Students[];
}

const UserManagement: React.FC<UserManagementProps> = ({
  studentData,
}: UserManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleExportUsers = async () => {
    try {
      const response = await api.get("/admin/users/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `users_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting users:", error);
      alert("فشل في تصدير البيانات");
    }
  };

  return (
    <div className={styles.overviewContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <h1 className={styles.pageTitle}>إدارة المستخدمين</h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={handleExportUsers} className={styles.btnSuccess}>
            <FiDownload style={{ marginLeft: "8px" }} />
            تصدير البيانات
          </button>
          <button className={styles.btnPrimary}>
            <FiPlus style={{ marginLeft: "8px" }} />
            إضافة مستخدم
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <div style={{ flex: 1, position: "relative" }}>
            <FiSearch
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-light)",
              }}
            />
            <input
              type="text"
              placeholder="البحث بالاسم، البريد الإلكتروني، أو رقم الهاتف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.formInput}
              style={{ paddingRight: "40px" }}
            />
          </div>
        </div>
      </div>

      {/* student table */}
      <StudentTable Students={studentData} />
    </div>
  );
};

export default UserManagement;
