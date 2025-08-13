"use client";

import Navbar from "@/components/common/Layout/Navbar/Navbar";
import Footer from "@/components/common/Layout/Footer/Footer";

export default function AppContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
