"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/auth/LoadingSpinner";

export default function AppContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuth();
  const [showLoader, setShowLoader] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!isLoading) {
      const elapsedTime = Date.now() - startTime;
      const minimumDuration = 800;

      if (elapsedTime < minimumDuration) {
        const remainingTime = minimumDuration - elapsedTime;
        setTimeout(() => {
          setShowLoader(false);
        }, remainingTime);
      } else {
        setShowLoader(false);
      }
    }
  }, [isLoading, startTime]);

  if (showLoader) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
