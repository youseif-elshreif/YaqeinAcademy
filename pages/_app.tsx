import Navbar from "@/components/Navbar/Navbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer/Footer";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/auth/LoadingSpinner";
import { useState, useEffect } from "react";

// App content component to use auth context
function AppContent({ Component, pageProps }: AppProps) {
  const { isLoading } = useAuth();
  const [showLoader, setShowLoader] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!isLoading) {
      const elapsedTime = Date.now() - startTime;
      const minimumDuration = 800; // 0.8 seconds minimum

      if (elapsedTime < minimumDuration) {
        // Wait for the remaining time to reach minimum duration
        const remainingTime = minimumDuration - elapsedTime;
        setTimeout(() => {
          setShowLoader(false);
        }, remainingTime);
      } else {
        // Enough time has passed, hide immediately
        setShowLoader(false);
      }
    }
  }, [isLoading, startTime]);

  // Show global loader during initial auth check
  if (showLoader) {
    return (
      <LoadingSpinner message="مرحباً بك في أكاديمية يقين" variant="auth" />
    );
  }

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <AuthProvider>
      <AppContent {...props} />
    </AuthProvider>
  );
}
