import React from "react";
import { FaCog, FaListUl, FaExternalLinkAlt, FaCopy } from "react-icons/fa";
import { 
  DataTable, 
  TableColumn, 
  TableCell,
  Button, 
  ActionButton, 
  LinkButton, 
  IconButton 
} from "@/components/common";

// Example usage of the new shared components
const ExampleUsage: React.FC = () => {
  const sampleData = [
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "01234567890",
      status: "active",
    },
    {
      id: 2,
      name: "فاطمة علي",
      email: "fatima@example.com", 
      phone: "01234567891",
      status: "inactive",
    },
  ];

  const columns: TableColumn[] = [
    {
      key: "name",
      label: "الاسم",
      align: "right",
      render: (value) => (
        <TableCell variant="dark" isFirst>
          {value}
        </TableCell>
      ),
    },
    {
      key: "email",
      label: "البريد الإلكتروني",
      render: (value) => (
        <TableCell variant="primary">
          {value}
        </TableCell>
      ),
    },
    {
      key: "phone",
      label: "رقم الهاتف",
      render: (value) => (
        <TableCell variant="primary">
          {value}
        </TableCell>
      ),
    },
    {
      key: "actions",
      label: "الإجراءات",
      render: (_, row) => (
        <TableCell>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
            <LinkButton
              variant="open"
              icon={<FaListUl />}
              onClick={() => console.log("View reports", row.id)}
            >
              عرض التقارير
            </LinkButton>
            
            <IconButton
              icon={<FaCog />}
              variant="primary"
              onClick={() => console.log("Actions", row.id)}
              title="الإجراءات"
            >
              الإجراءات
            </IconButton>
          </div>
        </TableCell>
      ),
    },
  ];

  const renderMobileCard = (row: any, index: number) => (
    <div key={index} style={{
      padding: "1rem",
      margin: "0.5rem 0",
      border: "1px solid var(--border-color)",
      borderRadius: "8px",
      background: "var(--base-bg)"
    }}>
      <h3>{row.name}</h3>
      <p>البريد: {row.email}</p>
      <p>الهاتف: {row.phone}</p>
      
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <ActionButton
          variant="primary"
          size="small"
          icon={<FaListUl />}
          onClick={() => console.log("View reports", row.id)}
        >
          التقارير
        </ActionButton>
        
        <ActionButton
          variant="outline"
          size="small"
          icon={<FaCog />}
          onClick={() => console.log("Actions", row.id)}
        >
          الإجراءات
        </ActionButton>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>مثال على استخدام المكونات المشتركة</h1>
      
      {/* Button Examples */}
      <div style={{ marginBottom: "2rem" }}>
        <h2>أمثلة على الأزرار</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <Button variant="primary" icon={<FaCog />}>
            زر أساسي
          </Button>
          
          <Button variant="secondary" loading>
            زر ثانوي (تحميل)
          </Button>
          
          <Button variant="outline" disabled>
            زر محاط (معطل)
          </Button>
          
          <Button variant="danger" size="large">
            زر خطر
          </Button>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <ActionButton variant="success" icon={<FaListUl />}>
            إجراء ناجح
          </ActionButton>
          
          <LinkButton variant="open" icon={<FaExternalLinkAlt />}>
            فتح رابط
          </LinkButton>
          
          <LinkButton variant="copy" icon={<FaCopy />}>
            نسخ
          </LinkButton>
          
          <IconButton icon={<FaCog />} variant="warning">
            إعدادات
          </IconButton>
        </div>
      </div>

      {/* Table Example */}
      <div style={{ marginBottom: "2rem" }}>
        <h2>مثال على الجدول</h2>
        <DataTable
          columns={columns}
          data={sampleData}
          title="جدول المستخدمين"
          subtitle="عرض جميع المستخدمين المسجلين"
          loading={false}
          renderMobileCard={renderMobileCard}
          mobileCardType="student"
        />
      </div>

      {/* Loading Example */}
      <div style={{ marginBottom: "2rem" }}>
        <h2>مثال على التحميل</h2>
        <DataTable
          columns={columns}
          data={[]}
          title="جدول في حالة التحميل"
          subtitle="عرض Skeleton Loading"
          loading={true}
          mobileCardType="teacher"
        />
      </div>

      {/* Empty Example */}
      <div style={{ marginBottom: "2rem" }}>
        <h2>مثال على الحالة الفارغة</h2>
        <DataTable
          columns={columns}
          data={[]}
          title="جدول فارغ"
          subtitle="لا توجد بيانات"
          loading={false}
          emptyMessage="لا يوجد مستخدمين"
        />
      </div>
    </div>
  );
};

export default ExampleUsage;
