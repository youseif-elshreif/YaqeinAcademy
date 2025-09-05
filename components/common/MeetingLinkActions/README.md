# MeetingLinkActions Component

مكون موحد للتعامل مع روابط الحلقات في تطبيق أكاديمية يقين.

## الاستخدام

```tsx
import MeetingLinkActions from "@/components/common/MeetingLinkActions";

<MeetingLinkActions
  meetingLink="https://meet.google.com/abc-defg-hij"
  styles={styles}
  showLabels={true}
  onCopySuccess={() => console.log("تم نسخ الرابط")}
  onCopyError={(error) => console.error("خطأ في النسخ:", error)}
/>
```

## الخصائص (Props)

| الخاصية | النوع | مطلوبة | الافتراضي | الوصف |
|---------|------|---------|-----------|-------|
| `meetingLink` | `string` | ✅ | - | رابط الحلقة |
| `styles` | `any` | ✅ | - | كائن الأنماط (CSS Modules) |
| `containerClassName` | `string` | ❌ | `""` | فئة CSS إضافية للحاوية |
| `openButtonClassName` | `string` | ❌ | `""` | فئة CSS إضافية لزر الفتح |
| `copyButtonClassName` | `string` | ❌ | `""` | فئة CSS إضافية لزر النسخ |
| `showLabels` | `boolean` | ❌ | `true` | إظهار النصوص في الأزرار |
| `disabled` | `boolean` | ❌ | `false` | تعطيل الأزرار |
| `onCopySuccess` | `() => void` | ❌ | - | دالة تُستدعى عند نجح النسخ |
| `onCopyError` | `(error: Error) => void` | ❌ | - | دالة تُستدعى عند فشل النسخ |
| `onOpenLink` | `(link: string) => void` | ❌ | - | دالة تُستدعى عند فتح الرابط |

## الأنماط المطلوبة

يجب أن يحتوي كائن `styles` على الفئات التالية:

- `linkContainer`: حاوية الأزرار
- `linkButton`: الستايل الأساسي للأزرار  
- `openLinkBtn`: ستايل زر الفتح
- `copyLinkBtn`: ستايل زر النسخ
- `lightColor`: لون النص عند عدم وجود رابط

## الميزات

- ✅ نسخ الرابط إلى الحافظة
- ✅ فتح الرابط في تبويب جديد
- ✅ دعم تخصيص الأنماط
- ✅ دعم callbacks للنجاح والفشل
- ✅ إظهار/إخفاء النصوص
- ✅ دعم التعطيل
- ✅ معالجة حالة عدم وجود رابط

## الملفات المحدثة

تم استبدال الكود المكرر في الملفات التالية:

1. `components/AdminDashboard/UserManagement/TeacherTable/ClassTableRow.tsx`
2. `components/dashboard/teacher/MonthlyClassTable/Table/ClassTableRow.tsx`
3. `components/dashboard/teacher/MonthlyClassTable/MobileCards/ClassCard.tsx`
4. `components/dashboard/admin/sections/UserManagement/TeacherTable/ClassTableRow.tsx`
5. `components/dashboard/admin/sections/UserManagement/TeacherTable/Mobile/ClassCard.tsx`
6. `components/dashboard/admin/sections/GroupManagement/GroupsTable.tsx`
7. `components/dashboard/admin/sections/GroupManagement/Mobile/GroupCard.tsx`
8. `components/dashboard/student/StudentDashboard.tsx`
9. `components/dashboard/student/NextSessionTasks.tsx`
10. `components/dashboard/admin/modals/lessons/components/LessonCard.tsx`

## فوائد التوحيد

- 🔄 **قابلية الإعادة الاستخدام**: مكون واحد يُستخدم في جميع أنحاء التطبيق
- 🛠️ **سهولة الصيانة**: تحديث واحد يؤثر على جميع الاستخدامات
- 🐛 **تقليل الأخطاء**: كود مُختبر ومُوثق في مكان واحد
- 📏 **توحيد المعايير**: سلوك متسق عبر التطبيق
- 🎨 **مرونة التخصيص**: دعم تخصيص الأنماط والسلوك
