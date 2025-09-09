"use client";

import Navbar from "@/src/components/common/Layout/Navbar/Navbar";
import Footer from "@/src/components/common/Layout/Footer/Footer";
import { AppProviders } from "@/src/contexts/AppProviders";

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
