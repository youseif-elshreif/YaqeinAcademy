"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminDashboard: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard/overview");
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div>جاري التحويل...</div>
    </div>
  );
};

export default AdminDashboard;
