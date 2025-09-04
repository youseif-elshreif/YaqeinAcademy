# مكونات مشتركة للجداول والأزرار - دليل الاستخدام

## 📋 نظرة عامة

تم إنشاء مجموعة من المكونات المشتركة لتوحيد شكل ووظائف الجداول والأزرار في جميع أنحاء الموقع مع دعم Skeleton Loading.

## 📁 البنية

```
components/common/
├── Buttons/
│   ├── Button.tsx                 # زر أساسي متعدد الاستخدامات
│   ├── ActionButton.tsx          # زر إجراءات مخصص للجداول
│   ├── LinkButton.tsx            # زر رابط مع أيقونات
│   ├── IconButton.tsx            # زر دائري بأيقونة
│   ├── Button.module.css         # أنماط الأزرار المشتركة
│   └── index.ts
├── Table/
│   ├── Table.tsx                 # جدول أساسي
│   ├── TableRow.tsx              # صف جدول
│   ├── TableCell.tsx             # خلية جدول
│   ├── ResponsiveTable.tsx       # جدول متجاوب
│   ├── Table.module.css          # أنماط الجداول المشتركة
│   └── index.ts
├── Skeleton/
│   ├── Skeleton.tsx              # مكون Skeleton أساسي
│   ├── SkeletonTable.tsx         # Skeleton للجداول
│   ├── SkeletonCard.tsx          # Skeleton للكروت
│   ├── SkeletonCards.tsx         # مجموعة Skeleton Cards
│   ├── Skeleton.module.css       # أنماط Skeleton
│   └── index.ts
├── DataTable.tsx                 # جدول بيانات متكامل مع Skeleton
└── index.ts                      # تصدير جميع المكونات
```

## 🔧 الاستخدام

### الأزرار

#### Button - الزر الأساسي
```tsx
import { Button } from "@/components/common";

// أزرار أساسية
<Button variant="primary">حفظ</Button>
<Button variant="secondary">إلغاء</Button>
<Button variant="outline">تحرير</Button>
<Button variant="danger">حذف</Button>

// مع أيقونات
<Button variant="primary" icon={<FaSave />}>حفظ البيانات</Button>

// أحجام مختلفة
<Button size="small">صغير</Button>
<Button size="medium">متوسط</Button>
<Button size="large">كبير</Button>

// حالات خاصة
<Button loading>جاري الحفظ...</Button>
<Button disabled>معطل</Button>
<Button fullWidth>عرض كامل</Button>
```

#### ActionButton - زر الإجراءات
```tsx
import { ActionButton } from "@/components/common";

<ActionButton 
  variant="primary"
  icon={<FaEdit />}
  onClick={() => handleEdit()}
>
  تحرير
</ActionButton>

<ActionButton 
  variant="danger"
  icon={<FaTrash />}
  onClick={() => handleDelete()}
>
  حذف
</ActionButton>
```

#### LinkButton - زر الرابط
```tsx
import { LinkButton } from "@/components/common";

<LinkButton 
  variant="open" 
  icon={<FaExternalLinkAlt />}
  href="https://example.com"
>
  فتح الرابط
</LinkButton>

<LinkButton 
  variant="copy"
  icon={<FaCopy />}
  onClick={() => handleCopy()}
>
  نسخ
</LinkButton>
```

#### IconButton - الزر الدائري
```tsx
import { IconButton } from "@/components/common";

<IconButton 
  icon={<FaCog />}
  variant="primary"
  onClick={() => handleSettings()}
  title="الإعدادات"
>
  إعدادات
</IconButton>
```

### الجداول

#### DataTable - الجدول المتكامل
```tsx
import { DataTable, TableColumn, TableCell } from "@/components/common";

const columns: TableColumn[] = [
  {
    key: "name",
    label: "الاسم",
    align: "right",
    width: "30%",
  },
  {
    key: "email", 
    label: "البريد الإلكتروني",
    align: "center",
  },
  {
    key: "createdAt",
    label: "تاريخ الإنشاء",
    render: (value) => new Date(value).toLocaleDateString("ar-EG")
  },
  {
    key: "actions",
    label: "الإجراءات",
    align: "center",
  }
];

// استخدام أساسي
<DataTable
  columns={columns}
  data={users}
  loading={isLoading}
  error={error}
  title="جدول المستخدمين"
  subtitle="عرض جميع المستخدمين"
/>

// مع تخصيص الصفوف
const renderRow = (user: any) => (
  <>
    <TableCell variant="dark" isFirst>
      {user.name}
    </TableCell>
    <TableCell variant="primary">
      {user.email}
    </TableCell>
    <TableCell>
      {new Date(user.createdAt).toLocaleDateString("ar-EG")}
    </TableCell>
    <TableCell>
      <ActionButton 
        icon={<FaCog />}
        onClick={() => handleUserActions(user)}
      >
        إجراءات
      </ActionButton>
    </TableCell>
  </>
);

<DataTable
  columns={columns}
  data={users}
  renderRow={renderRow}
  renderMobileCard={renderMobileCard}
  mobileCardType="student"
/>
```

#### ResponsiveTable - جدول متجاوب يدوي
```tsx
import { ResponsiveTable, TableRow, TableCell } from "@/components/common";

<ResponsiveTable 
  title="عنوان الجدول"
  mobileComponent={<MobileCards data={data} />}
>
  <thead>
    <tr>
      <th>العمود الأول</th>
      <th>العمود الثاني</th>
    </tr>
  </thead>
  <tbody>
    {data.map(item => (
      <TableRow key={item.id}>
        <TableCell variant="dark" isFirst>
          {item.name}
        </TableCell>
        <TableCell variant="primary">
          {item.value}
        </TableCell>
      </TableRow>
    ))}
  </tbody>
</ResponsiveTable>
```

### Skeleton Loading

#### SkeletonTable - جدول تحميل
```tsx
import { SkeletonTable } from "@/components/common";

<SkeletonTable 
  rows={5} 
  columns={6} 
  title="جاري تحميل البيانات..." 
/>
```

#### SkeletonCard - كارت تحميل
```tsx
import { SkeletonCard, SkeletonCards } from "@/components/common";

// كارت واحد
<SkeletonCard type="student" />

// عدة كروت
<SkeletonCards cards={3} type="teacher" />
```

#### Skeleton - عنصر تحميل أساسي
```tsx
import { Skeleton } from "@/components/common";

<Skeleton width={200} height={20} />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="button" width={100} height={32} />
```

## 🎨 الأنماط والتصميم

### متغيرات الألوان المدعومة
- `primary` - اللون الأساسي
- `secondary` - اللون الثانوي  
- `outline` - محاط بحدود
- `ghost` - شفاف مع خلفية خفيفة
- `danger` - أحمر للحذف والتحذيرات
- `warning` - أصفر للتحذيرات
- `success` - أخضر للنجاح
- `info` - أزرق للمعلومات

### أحجام الأزرار
- `small` - صغير
- `medium` - متوسط (افتراضي)
- `large` - كبير
- `xlarge` - كبير جداً

### محاذاة الجداول
- `left` - يسار
- `center` - وسط (افتراضي)
- `right` - يمين

## 📱 التجاوب

جميع المكونات تدعم التصميم المتجاوب:
- **Desktop**: عرض الجداول كاملة
- **Mobile**: تحويل تلقائي لعرض الكروت
- **Skeleton**: تكيف تلقائي مع حجم الشاشة

## 🔄 Migration من المكونات القديمة

### قبل (الطريقة القديمة)
```tsx
// استخدام CSS منفصل ومكونات مكررة
<div className={styles.tableContainer}>
  <table className={styles.classTable}>
    <thead>...</thead>
    <tbody>
      {data.map(item => (
        <tr className={styles.tableRow}>
          <td className={styles.studentCell}>
            <button className={`${styles.linkButton} ${styles.openLinkBtn}`}>
              <FaCog />
              إجراءات
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### بعد (الطريقة الجديدة)
```tsx
// استخدام المكونات المشتركة
<DataTable
  columns={columns}
  data={data}
  renderRow={(item) => (
    <>
      <TableCell>
        <ActionButton icon={<FaCog />}>
          إجراءات
        </ActionButton>
      </TableCell>
    </>
  )}
/>
```

## ✅ المزايا

1. **توحيد التصميم**: نفس الشكل في جميع أنحاء الموقع
2. **Skeleton Loading**: تحميل سلس للمستخدم
3. **التجاوب التلقائي**: يعمل على جميع الأجهزة
4. **سهولة الصيانة**: تحديث واحد يؤثر على الكل
5. **أداء أفضل**: CSS مُحسن ومجمع
6. **TypeScript**: دعم كامل مع التحقق من الأنواع

## 🚀 الخطوات التالية

1. تطبيق المكونات على جداول المستخدمين الحالية
2. تحديث جداول المعلمين والطلاب
3. توحيد أزرار الإجراءات في جميع الصفحات
4. إضافة المزيد من أنواع Skeleton حسب الحاجة
