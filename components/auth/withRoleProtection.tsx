import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

interface WithRoleProtectionProps {
  allowedRoles: string[];
  redirectTo?: string;
}

function withRoleProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithRoleProtectionProps
) {
  const ProtectedComponent: React.FC<P> = (props) => {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();
    const { allowedRoles, redirectTo } = options;
    const [showLoader, setShowLoader] = useState(true);
    const [startTime] = useState(Date.now());

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push("/login");
          return;
        }

        if (user && !allowedRoles.includes(user.role || "") && redirectTo) {
          router.push(redirectTo);
          return;
        }

        const elapsedTime = Date.now() - startTime;
        const minimumDuration = 600;

        if (elapsedTime < minimumDuration) {
          const remainingTime = minimumDuration - elapsedTime;
          setTimeout(() => {
            setShowLoader(false);
          }, remainingTime);
        } else {
          setShowLoader(false);
        }
      }
    }, [isLoading, isAuthenticated, user, router, startTime]);

    if (showLoader) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
}

export default withRoleProtection;

export const withStudentProtection = <P extends object>(
  Component: React.ComponentType<P>
) =>
  withRoleProtection(Component, {
    allowedRoles: ["student"],
    redirectTo: "/unauthorized",
  });

export const withTeacherProtection = <P extends object>(
  Component: React.ComponentType<P>
) =>
  withRoleProtection(Component, {
    allowedRoles: ["teacher"],
    redirectTo: "/unauthorized",
  });

export const withAdminProtection = <P extends object>(
  Component: React.ComponentType<P>
) =>
  withRoleProtection(Component, {
    allowedRoles: ["admin"],
    redirectTo: "/unauthorized",
  });

export const withGuestProtection = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const GuestProtectedComponent: React.FC<P> = (props) => {
    const { isLoading, isAuthenticated } = useAuth();
    const router = useRouter();
    const [showLoader, setShowLoader] = useState(true);
    const [startTime] = useState(Date.now());

    useEffect(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          router.push("/");
          return;
        }

        const elapsedTime = Date.now() - startTime;
        const minimumDuration = 600;

        if (elapsedTime < minimumDuration) {
          const remainingTime = minimumDuration - elapsedTime;
          setTimeout(() => {
            setShowLoader(false);
          }, remainingTime);
        } else {
          setShowLoader(false);
        }
      }
    }, [isLoading, isAuthenticated, router, startTime]);

    if (showLoader) {
      return <LoadingSpinner />;
    }

    return <Component {...props} />;
  };

  return GuestProtectedComponent;
};
