"use client";
import React from "react";
import { FiUsers } from "react-icons/fi";
import { FaCog } from "react-icons/fa";
import { useAdminStatsContext } from "@/contexts/AdminStatsContext";
import { useAdminModal } from "@/contexts/AdminModalContext";
import { 
  DataTable, 
  TableColumn, 
  TableCell,
  IconButton 
} from "@/components/common";
import MobileAdminCards from "../dashboard/admin/sections/UserManagement/AdminsTable/Mobile/MobileAdminCards";

interface AdminsTableNewProps {
  searchTerm?: string;
}

const AdminsTableNew: React.FC<AdminsTableNewProps> = ({
  searchTerm = "",
}) => {
  const { admins = [], isLoading, error } = useAdminStatsContext();
  const { openUserActionsModal } = useAdminModal();

  // Filter admins based on search term
  const filteredAdmins = admins.filter((admin: any) =>
    admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.phone?.includes(searchTerm)
  );

  // Define table columns
  const columns: TableColumn[] = [
    {
      key: "name",
      label: "الاسم",
      align: "right",
      width: "25%",
    },
    {
      key: "email",
      label: "البريد الإلكتروني",
      align: "center",
      width: "25%",
    },
    {
      key: "phone", 
      label: "رقم الهاتف",
      align: "center",
      width: "20%",
    },
    {
      key: "createdAt",
      label: "تاريخ الإنشاء",
      align: "center",
      width: "20%",
      render: (value) => 
        value ? new Date(value).toLocaleDateString("ar-EG") : "-"
    },
    {
      key: "actions",
      label: "الإجراءات",
      align: "center",
      width: "10%",
    },
  ];

  // Custom row renderer
  const renderRow = (admin: any) => (
    <>
      <TableCell variant="dark" isFirst>
        <div style={{ 
          display: "flex", 
          alignItems: "center",
          paddingRight: "1rem" 
        }}>
          <span style={{ fontWeight: 600 }}>{admin.name}</span>
        </div>
      </TableCell>
      
      <TableCell variant="primary">
        {admin.email}
      </TableCell>
      
      <TableCell variant="primary">
        {admin.phone}
      </TableCell>
      
      <TableCell variant="primary">
        {admin.createdAt
          ? new Date(admin.createdAt).toLocaleDateString("ar-EG")
          : "-"
        }
      </TableCell>
      
      <TableCell>
        <IconButton
          icon={<FaCog />}
          variant="primary"
          size="small"
          onClick={() =>
            openUserActionsModal({
              id: admin._id || admin.id,
              name: admin.name,
              userType: "admin" as any,
              fullData: admin,
            })
          }
          title="إجراءات المسؤول"
        >
          الإجراءات
        </IconButton>
      </TableCell>
    </>
  );

  // Mobile card renderer
  const renderMobileCard = (admin: any) => (
    <MobileAdminCards key={admin._id || admin.id} admins={[admin]} />
  );

  return (
    <DataTable
      columns={columns}
      data={filteredAdmins}
      loading={isLoading}
      error={error}
      title="الإداريين"
      emptyMessage="لا يوجد إداريين"
      emptyIcon={<FiUsers size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />}
      renderRow={renderRow}
      renderMobileCard={renderMobileCard}
      mobileCardType="admin"
      skeletonRows={5}
      skeletonColumns={5}
      onRetry={() => window.location.reload()}
    />
  );
};

export default AdminsTableNew;
