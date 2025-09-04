import React from "react";
import SkeletonCard from "./SkeletonCard";

export interface SkeletonCardsProps {
  cards?: number;
  type?: "student" | "teacher" | "admin" | "default";
  className?: string;
}

const SkeletonCards: React.FC<SkeletonCardsProps> = ({
  cards = 3,
  type = "default",
  className = "",
}) => {
  return (
    <div className={className}>
      {Array.from({ length: cards }).map((_, index) => (
        <SkeletonCard key={index} type={type} />
      ))}
    </div>
  );
};

export default SkeletonCards;
