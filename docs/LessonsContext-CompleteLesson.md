# LessonsContext Documentation

## نظرة عامة

`LessonsContext` هو context مخصص لإدارة جميع عمليات الدروس في التطبيق، بما في ذلك إنشاء وتحديث وحذف وإتمام الدروس.

## الميزات الجديدة

### ✅ إضافة `completeLesson`

تم إضافة دالة `completeLesson` إلى `LessonsContext` لإتمام الدروس بطريقة مركزية ومنظمة.

```tsx
const { completeLesson, isLoading, error } = useLessonsContext();

// إتمام درس
await completeLesson(lessonId);
```

## الدوال المتاحة

### 1. إدارة الدروس

- `addLessonToGroup()` - إضافة درس جديد لمجموعة
- `updateLesson()` - تحديث بيانات درس موجود
- `deleteLesson()` - حذف درس
- `getLessonById()` - جلب بيانات درس معين
- **`completeLesson()`** - إتمام درس (جديد)

### 2. إدارة الحالة

- `isLoading` - حالة التحميل
- `error` - رسائل الأخطاء
- `lessonsRefreshKey` - مفتاح إعادة التحميل
- `triggerLessonsRefresh()` - تحديث البيانات

## التحديثات المطبقة

### ✅ تم تحديث المودالات لاستخدام LessonsContext:

#### 1. `CompleteClassModal.tsx`

```tsx
// قبل التحديث
import { useTeacherDashboard } from "@/contexts/TeacherDashboardContext";
const { reportLesson, completeLesson } = useTeacherDashboard();

// بعد التحديث
import { useTeacherDashboard } from "@/contexts/TeacherDashboardContext";
import { useLessonsContext } from "@/contexts/LessonsContext";

const { reportLesson } = useTeacherDashboard();
const { completeLesson } = useLessonsContext();
```

#### 2. `GroupCompleteClassModal.tsx`

```tsx
// تم تفعيل السطر المعلق
// await completeLesson(lessonId); ❌

await completeLesson(lessonId); ✅
```

### ✅ تم تنظيف `TeacherDashboardContext`:

- **إزالة**: `completeLesson` من TeacherDashboardContext
- **إزالة**: استيراد `completeLesson as completeLessonSvc`
- **تحديث**: `reportMultipleAndComplete` لا تتضمن إتمام الدرس
- **إضافة**: تعليقات توضيحية لاستخدام LessonsContext

## كيفية الاستخدام

### الاستخدام الأساسي:

```tsx
import { useLessonsContext } from "@/contexts/LessonsContext";

function MyComponent() {
  const { completeLesson, isLoading, error } = useLessonsContext();

  const handleComplete = async (lessonId: string) => {
    try {
      await completeLesson(lessonId);
      console.log("تم إتمام الدرس بنجاح!");
    } catch (error) {
      console.error("فشل في إتمام الدرس:", error);
    }
  };

  return (
    <button onClick={() => handleComplete("lesson-id")} disabled={isLoading}>
      {isLoading ? "جاري الإتمام..." : "إتمام الدرس"}
    </button>
  );
}
```

### استخدام مع مودال:

```tsx
import { CompleteLessonModal } from "@/components/examples/CompleteLessonExample";

function TeacherDashboard() {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleOpenComplete = (lesson) => {
    setSelectedLesson(lesson);
    setShowCompleteModal(true);
  };

  return (
    <div>
      {/* قائمة الدروس */}
      {lessons.map((lesson) => (
        <div key={lesson.id}>
          <h3>{lesson.title}</h3>
          <button onClick={() => handleOpenComplete(lesson)}>
            إتمام الحصة
          </button>
        </div>
      ))}

      {/* مودال الإتمام */}
      <CompleteLessonModal
        isOpen={showCompleteModal}
        lessonId={selectedLesson?.id}
        lessonTitle={selectedLesson?.title}
        onClose={() => setShowCompleteModal(false)}
        onSuccess={() => {
          // تحديث قائمة الدروس
          refreshLessons();
        }}
      />
    </div>
  );
}
```

## الفوائد

### 1. **إدارة مركزية**

- جميع عمليات الدروس في context واحد
- `completeLesson` متاح في جميع أنحاء التطبيق

### 2. **فصل الاهتمامات**

- التقارير في `ReportContext`
- إدارة الدروس في `LessonsContext`
- لوحة المعلم في `TeacherDashboardContext`

### 3. **إعادة الاستخدام**

- نفس دالة `completeLesson` تستخدم في عدة مودالات
- منطق موحد لإتمام الدروس

### 4. **إدارة حالة محسنة**

- `isLoading` موحد لجميع عمليات الدروس
- معالجة أخطاء مركزية
- `lessonsRefreshKey` يحدث تلقائياً

## مثال كامل

راجع `components/examples/CompleteLessonExample.tsx` لمثال كامل على:

- مودال إتمام الدرس
- معالجة الأخطاء
- إدارة حالة التحميل
- استدعاءات النجاح

## التوصيات

### ✅ افعل:

- استخدم `useLessonsContext()` لإتمام الدروس
- تحقق من `isLoading` قبل عرض UI
- اعرض `error` للمستخدم إذا حدث خطأ
- استخدم `triggerLessonsRefresh()` بعد العمليات المهمة

### ❌ لا تفعل:

- لا تستدعي `lesson.service.completeLesson()` مباشرة
- لا تستخدم `completeLesson` من `TeacherDashboardContext` (محذوف)
- لا تنس معالجة حالات الخطأ

## الملفات المحدثة

1. **LessonsContext.tsx** ✅

   - إضافة `completeLesson` function
   - إضافة type definition
   - إضافة في contextValue

2. **CompleteClassModal.tsx** ✅

   - استيراد `useLessonsContext`
   - استخدام `completeLesson` من LessonsContext

3. **GroupCompleteClassModal.tsx** ✅

   - تفعيل `await completeLesson(lessonId)`
   - استخدام LessonsContext

4. **TeacherDashboardContext.tsx** ✅

   - إزالة `completeLesson`
   - تنظيف imports
   - تحديث `reportMultipleAndComplete`

5. **types.ts** ✅
   - إزالة `completeLesson` من TeacherDashboardContextType

هذا التحديث يجعل إدارة الدروس أكثر تنظيماً ووضوحاً! 🎉
