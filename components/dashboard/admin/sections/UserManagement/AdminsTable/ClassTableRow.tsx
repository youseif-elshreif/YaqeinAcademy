"use client";
import styles from "@/components/dashboard/admin/styles.module.css";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { FaCog } from "react-icons/fa";
import Button from "@/components/common/Button";

interface Props {
  admin: any;
}

const ClassTableRow = ({ admin }: Props) => {
  const { openUserActionsModal } = useAdminModal();

  const handleActionsClick = () => {
    openUserActionsModal({
      id: admin._id || admin.id,
      name: admin.name,
      userType: "admin" as any,
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
      <td>{admin.phone}</td>
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
