import React from "react";
import AdminCard from "./AdminCard";
import styles from "@/components/dashboard/admin/styles.module.css";

interface MobileAdminCardsProps {
  admins: any[]; // Admins from API
}

const MobileAdminCards: React.FC<MobileAdminCardsProps> = ({ admins }) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {admins.map((admin) => (
        <AdminCard key={admin._id || admin.id} admin={admin} />
      ))}
    </div>
  );
};

export default MobileAdminCards;
