"use client";

import Navbar from "@/components/common/Layout/Navbar/Navbar";
import Footer from "@/components/common/Layout/Footer/Footer";
import { AdminDashboardProvider } from "@/contexts/AdminDashboardContext";

export default function AppContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminDashboardProvider>
      <Navbar />
      {children}
      <Footer />
    </AdminDashboardProvider>
  );
}
