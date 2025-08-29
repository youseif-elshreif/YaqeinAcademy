"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { withAdminProtection } from "@/components/auth/withRoleProtection";
import EnhancedLoader from "@/components/common/UI/EnhancedLoader";

const AdminDashboard: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard/userManagement");
  }, [router]);

  return (
    <EnhancedLoader
      type="overlay"
      text="جاري التحويل إلى لوحة الإدارة..."
      size="large"
      color="white"
    />
  );
};

export default withAdminProtection(AdminDashboard);
