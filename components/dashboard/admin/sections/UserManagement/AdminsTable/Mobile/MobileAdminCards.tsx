import React from "react";
import AdminCard from "./AdminCard";
import styles from "@/components/dashboard/admin/styles.module.css";
import { MobileAdminCardsProps } from "@/types";

const MobileAdminCards: React.FC<MobileAdminCardsProps> = ({ admins }) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {admins.map((admin) => (
        <AdminCard key={admin._id} admin={admin} />
      ))}
    </div>
  );
};

export default MobileAdminCards;


