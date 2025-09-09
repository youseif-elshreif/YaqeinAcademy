"use client";
import styles from "@/src/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/src/contexts/AdminModalContext";
import { FaCog } from "react-icons/fa";
import Button from "@/src/components/common/Button";
import { AdminTableRowProps } from "@/src/types";

const ClassTableRow = ({ admin }: AdminTableRowProps) => {
  const { openUserActionsModal } = useAdminModal();

  const handleActionsClick = () => {
    openUserActionsModal({
      id: admin._id,
      name: admin.name,
      userType: "admin",
      fullData: admin,
    });
  };

  return (
    <tr className={styles.tableRow}>
      <td className={`${styles.studentCell} ${styles.firstCell}`}>
        <div className={styles.teacherInfo}>
          <span className={styles.teacherName}>{admin.name}</span>
        </div>
      </td>
      <td>{admin.email}</td>
      <td>{admin.role}</td>
      <td>
        {admin.createdAt
          ? new Date(admin.createdAt).toLocaleDateString("ar-EG")
          : "-"}
      </td>
      <td>
        <Button
          onClick={handleActionsClick}
          variant="primary"
          size="small"
          icon={<FaCog />}
          title="إجراءات المسؤول"
        >
          الإجراءات
        </Button>
      </td>
    </tr>
  );
};

export default ClassTableRow;
