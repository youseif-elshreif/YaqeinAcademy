import React from "react";
import styles from "./Skeleton.module.css";
import Skeleton from "./Skeleton";

export interface SkeletonCardProps {
  type?: "student" | "teacher" | "admin" | "default";
  showActions?: boolean;
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  type = "default",
  showActions = true,
  className = "",
}) => {
  const cardClasses = [styles.skeletonCard, className].filter(Boolean).join(" ");

  return (
    <div className={cardClasses}>
      {/* Header */}
      <div style={{ marginBottom: "1rem" }}>
        <Skeleton width={180} height={24} className={styles.skeletonCardHeader} />
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {/* Email / Phone */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton width={80} height={14} />
          <Skeleton width={150} height={14} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton width={60} height={14} />
          <Skeleton width={120} height={14} />
        </div>

        {type === "student" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton width={90} height={14} />
              <Skeleton width={80} height={14} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton width={120} height={14} />
              <Skeleton width={40} height={14} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton width={40} height={14} />
              <Skeleton width={50} height={14} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton width={50} height={14} />
              <Skeleton width={100} height={14} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton width={70} height={14} />
              <Skeleton width={60} height={14} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton width={80} height={14} />
              <Skeleton width={30} height={14} />
            </div>
          </>
        )}

        {type === "teacher" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton width={80} height={14} />
              <Skeleton width={40} height={14} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton width={80} height={14} />
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Skeleton width={100} height={32} variant="button" />
                <Skeleton width={40} height={32} variant="button" />
              </div>
            </div>
          </>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton width={90} height={14} />
          <Skeleton width={110} height={14} />
        </div>

        {showActions && (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
            <Skeleton width={60} height={14} />
            <Skeleton width={100} height={32} variant="button" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SkeletonCard;
