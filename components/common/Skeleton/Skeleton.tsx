import React from "react";
import styles from "./Skeleton.module.css";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: "text" | "circular" | "rectangular" | "button";
  className?: string;
  animation?: "pulse" | "wave" | "none";
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = "text",
  className = "",
  animation = "wave",
}) => {
  const skeletonClasses = [
    styles.skeleton,
    variant === "text" && styles.skeletonText,
    variant === "circular" && styles.skeletonCircle,
    variant === "button" && styles.skeletonButton,
    animation === "pulse" && styles.pulse,
    animation === "wave" && styles.shimmer,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const skeletonStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return <div className={skeletonClasses} style={skeletonStyle} />;
};

export default Skeleton;
