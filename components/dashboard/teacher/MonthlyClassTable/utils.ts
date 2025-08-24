import styles from "./MonthlyClassTable.module.css";

export const formatDate = (dateString: string): string => {
  // For server-side rendering compatibility
  if (typeof window === "undefined") {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
  }

  const date = new Date(dateString);
  try {
    return date.toLocaleDateString("ar", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "completed":
      return styles.completedStatus;
    case "scheduled":
      return styles.pendingStatus;
    case "cancelled":
      return styles.cancelledStatus;
    case "in_progress":
      return styles.postponedStatus;
    default:
      return "";
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case "completed":
      return "مكتملة";
    case "scheduled":
      return "مجدولة";
    case "cancelled":
      return "ملغية";
    case "in_progress":
      return "جارية";
    default:
      return status;
  }
};
