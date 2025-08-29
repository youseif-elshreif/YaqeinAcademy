"use client";

import Navbar from "@/components/common/Layout/Navbar/Navbar";
import Footer from "@/components/common/Layout/Footer/Footer";
import { AppProviders } from "@/contexts/AppProviders";

export default function AppContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
      <Navbar />
      {children}
      <Footer />
    </AppProviders>
  );
}
