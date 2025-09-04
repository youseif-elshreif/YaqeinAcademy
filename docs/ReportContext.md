# ReportContext Documentation

## نظرة عامة

`ReportContext` هو context مخصص لإدارة جميع عمليات التقارير في التطبيق بطريقة مركزية ومنظمة.

## الميزات الرئيسية

### 1. إدارة مركزية للتقارير

- جلب تقارير طالب معين (للمعلمين والمشرفين)
- جلب تقارير المستخدم الحالي (للطلاب)
- إنشاء تقارير جديدة للدروس
- إدارة حالة التحميل والأخطاء

### 2. Cache وإدارة البيانات

- تخزين التقارير في الذاكرة لتجنب الطلبات المتكررة
- وظائف refresh لإعادة تحميل البيانات
- إمكانية مسح البيانات المحفوظة

## كيفية الاستخدام

### 1. التأكد من وجود Provider

تأكد من أن `ReportProvider` مضاف في `AppProviders.tsx` (وهو موجود بالفعل):

\`\`\`tsx
import { ReportProvider } from "./ReportContext";

// في مكدس الـ providers
<ReportProvider>
{children}
</ReportProvider>
\`\`\`

### 2. استخدام Hook في الكومبوننتس

\`\`\`tsx
import { useReportContext } from "@/contexts/ReportContext";

function MyComponent() {
const {
studentReports, // تقارير الطالب المحدد
myReports, // تقاريري (للمستخدم الحالي)
isLoading, // حالة التحميل
error, // رسائل الأخطاء
getStudentReports, // جلب تقارير طالب معين
getMyReports, // جلب تقاريري
createLessonReport, // إنشاء تقرير درس جديد
clearReports, // مسح البيانات المحفوظة
refreshStudentReports, // إعادة تحميل تقارير الطالب
refreshMyReports, // إعادة تحميل تقاريري
} = useReportContext();

// استخدام الدوال...
}
\`\`\`

### 3. أمثلة عملية

#### جلب تقارير طالب (للمعلمين):

\`\`\`tsx
const { studentReports, getStudentReports, isLoading, error } = useReportContext();

useEffect(() => {
if (studentId) {
getStudentReports(studentId);
}
}, [studentId, getStudentReports]);

if (isLoading) return <div>جاري التحميل...</div>;
if (error) return <div>خطأ: {error}</div>;

return (

  <div>
    {studentReports.map(report => (
      <div key={report._id}>
        {/* عرض التقرير */}
      </div>
    ))}
  </div>
);
\`\`\`

#### جلب تقاريري (للطلاب):

\`\`\`tsx
const { myReports, getMyReports, isLoading } = useReportContext();

useEffect(() => {
getMyReports();
}, [getMyReports]);
\`\`\`

#### إنشاء تقرير جديد:

\`\`\`tsx
const { createLessonReport, isLoading } = useReportContext();

const handleCreateReport = async () => {
try {
await createLessonReport(lessonId, {
studentId: "student_id",
attended: true,
content: "محتوى الدرس",
notes: "ملاحظات",
rating: 5,
newMemorized: { new: ["آية جديدة"], old: [] },
wantedForNextLesson: { new: ["آية للحفظ"], old: [] }
});

    // إعادة تحميل البيانات بعد الإنشاء
    await refreshStudentReports(studentId);

} catch (error) {
console.error("فشل في إنشاء التقرير:", error);
}
};
\`\`\`

## الملفات المحدثة

### تم تحديث الملفات التالية لاستخدام ReportContext:

1. **StudentMyReportsModal.tsx** - يستخدم `getMyReports()` و `myReports`
2. **StudentReportsModal.tsx** - يستخدم `getStudentReports()` و `studentReports`
3. **TeacherDashboardContext.tsx** - يستخدم `createLessonReport()`

### تم إزالة:

- الاستدعاءات المباشرة لـ `api.get()`
- استيراد `report.service` مباشرة في الكومبوننتس
- الكود المكرر لإدارة حالة التحميل والأخطاء

## الفوائد

### 1. تنظيم أفضل

- جميع عمليات التقارير في context واحد
- فصل منطق إدارة البيانات عن UI

### 2. إعادة الاستخدام

- نفس الدوال يمكن استخدامها في عدة كومبوننتس
- تجنب تكرار الكود

### 3. إدارة حالة موحدة

- حالة واحدة للتحميل والأخطاء
- cache للبيانات يقلل من الطلبات

### 4. سهولة الصيانة

- تغيير واحد في Context يؤثر على جميع الاستخدامات
- أسهل لإضافة ميزات جديدة

### 5. Type Safety

- TypeScript types محددة للتقارير
- IntelliSense أفضل في المحرر

## التوصيات

1. **استخدم ReportContext دائماً** بدلاً من استدعاء services مباشرة
2. **استخدم refresh functions** بعد إنشاء/تحديث التقارير
3. **استخدم clearReports()** عند تسجيل الخروج أو تغيير المستخدم
4. **تحقق من isLoading و error** قبل عرض البيانات

## أمثلة إضافية

راجع ملف `components/examples/CreateReportExample.tsx` لمثال كامل على كيفية إنشاء تقرير جديد.
