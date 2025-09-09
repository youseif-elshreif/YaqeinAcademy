import React from "react";
import AdminCard from "./AdminCard";
import styles from "@/src/components/dashboard/admin/styles.module.css";
import { MobileAdminCardsProps } from "@/src/types";

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
