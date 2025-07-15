# أكاديمية يقين - منصة التعليم الشرعي الرقمية 📚

<div align="center">

![أكاديمية يقين](public/logo-light.svg)

منصة تعليمية متخصصة في تدريس العلوم الشرعية باللغة العربية مع دعم كامل للـ RTL

[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

</div>

## ✨ المميزات الرئيسية

### 🎯 **للطلاب**

- **لوحة تحكم شاملة**: متابعة التقدم الدراسي والجدول الأسبوعي
- **إدارة الدورات**: عرض الدورات المسجلة ومتطلبات الحصص القادمة
- **تتبع التقدم**: مؤشرات بصرية للتقدم في كل دورة
- **الجدولة المرنة**: عرض الحصص القادمة والمتطلبات

### �‍🏫 **للمعلمين**

- **إدارة الحصص الشهرية**: جدول تفاعلي لإدارة حصص الشهر
- **تتبع الطلاب**: نظام شامل لمتابعة تقدم كل طالب
- **نظام التقييم**: تقييم الحصص وإضافة الملاحظات
- **إدارة الألقاب**: إضافة ألقاب مخصصة للطلاب
- **الإحصائيات**: عرض إحصائيات الحصص والأرباح

### 🎨 **التصميم والواجهة**

- **واجهة عربية كاملة**: تصميم يدعم اتجاه النص من اليمين إلى اليسار (RTL)
- **تصميم متجاوب**: متوافق مع جميع الأجهزة (الهاتف المحمول، التابلت، الكمبيوتر)
- **مكونات قابلة لإعادة الاستخدام**: بنية منظمة ومعيارية
- **نظام فلترة متقدم**: بحث وفلترة ذكية للدورات
- **ألوان متناسقة**: تصميم يناسب المحتوى الشرعي

## 🛠️ التقنيات المستخدمة

### **Frontend Stack**

- **Next.js 14** - إطار عمل React مع Server-Side Rendering
- **TypeScript 5+** - للكتابة الآمنة والموثوقة
- **React 18** - مكتبة UI مع أحدث المميزات
- **CSS Modules** - نظام تنسيق معزول ومنظم
- **React Icons** - مكتبة أيقونات شاملة

### **UI/UX**

- **Google Fonts (Cairo)** - خط عربي جميل ومقروء
- **Responsive Design** - تصميم متجاوب بالكامل
- **RTL Support** - دعم كامل للغة العربية
- **Modern UI Patterns** - أنماط واجهة حديثة

## 📋 المتطلبات

- **Node.js 18.0+** أو أحدث
- **npm** أو **yarn** أو **pnpm**
- **Git** لإدارة الإصدارات

## 🚀 التثبيت والتشغيل

### 1. **استنساخ المشروع**

```bash
git clone https://github.com/your-username/yaqeen-academy.git
cd yaqeen-academy
```

### 2. **تثبيت المتطلبات**

```bash
# باستخدام npm
npm install

# أو باستخدام yarn
yarn install

# أو باستخدام pnpm
pnpm install
```

### 3. **تشغيل الخادم المحلي**

```bash
# للتطوير
npm run dev
# أو
yarn dev
# أو
pnpm dev
```

### 4. **فتح التطبيق**

افتح المتصفح على: [http://localhost:3000](http://localhost:3000)

### 5. **البناء للإنتاج**

```bash
# بناء المشروع
npm run build

# تشغيل النسخة المبنية
npm start
```

## 📁 هيكل المشروع المفصل

```
اكاديمية-يقين/
├── 📁 components/                    # مكونات واجهة المستخدم
│   ├── 📁 auth/                     # مكونات المصادقة والتسجيل
│   │   ├── AuthButton.jsx
│   │   ├── AuthLayout.jsx
│   │   ├── InputField.jsx
│   │   └── ...
│   │
│   ├── 📁 CourseCard/               # بطاقة عرض الدورة
│   ├── 📁 CoursesGrid/              # شبكة عرض الدورات
│   ├── 📁 FiltersBar/               # شريط الفلاتر والبحث
│   ├── 📁 Footer/                   # تذييل الصفحة
│   ├── 📁 HeroSection/              # القسم الرئيسي
│   ├── 📁 Navbar/                   # شريط التنقل
│   ├── 📁 PaginationControls/       # عناصر التحكم في الترقيم
│   │
│   ├── 📁 StudentDashboard/         # لوحة تحكم الطالب
│   │   ├── DashboardTabs.tsx
│   │   ├── EnrolledCoursesList.tsx
│   │   ├── NextSessionTasks.tsx
│   │   ├── ProfileSettings.tsx
│   │   └── ScheduleTable.tsx
│   │
│   └── 📁 TeacherDashboard/         # لوحة تحكم المعلم
│       ├── TeacherSummaryCards.tsx
│       ├── AddNicknameModal.tsx
│       ├── CompleteClassModal.tsx
│       ├── PostponeClassModal.tsx
│       ├── StudentAllDataComponent.tsx
│       └── 📁 MonthlyClassTable/    # جدول الحصص الشهرية
│           ├── index.tsx            # المكون الرئيسي
│           ├── types.ts             # تعريفات TypeScript
│           ├── utils.ts             # دوال مساعدة
│           ├── 📁 Table/            # عرض الجدول للحاسوب
│           ├── 📁 MobileCards/      # عرض البطاقات للهاتف
│           └── 📁 Modals/           # النوافذ المنبثقة
│
├── 📁 data/                         # البيانات الوهمية
│   └── courses.ts                   # بيانات الدورات
│
├── 📁 pages/                        # صفحات التطبيق
│   ├── _app.tsx                     # تكوين التطبيق الرئيسي
│   ├── _document.tsx                # تكوين HTML الأساسي
│   ├── index.tsx                    # الصفحة الرئيسية
│   ├── 📁 courses/                  # صفحات الدورات
│   ├── 📁 login/                    # صفحة تسجيل الدخول
│   ├── 📁 register/                 # صفحة التسجيل
│   ├── 📁 student/                  # صفحات الطالب
│   └── 📁 teacher/                  # صفحات المعلم
│
├── 📁 public/                       # الملفات الثابتة
│   ├── logo-light.svg
│   ├── mainBackGround.webp
│   └── 📁 img/                      # الصور والأيقونات
│
├── 📁 styles/                       # ملفات التنسيق
│   ├── globals.css                  # الأنماط العامة
│   └── *.module.css                 # أنماط المكونات
│
├── package.json                     # تكوين المشروع
├── tsconfig.json                    # تكوين TypeScript
├── next.config.js                   # تكوين Next.js
└── README.md                        # ملف التوثيق
```

## 🏗️ المكونات الرئيسية

### 📊 **لوحة تحكم المعلم**

- **جدول الحصص الشهرية**: إدارة شاملة للحصص مع إمكانيات:
  - ✅ إكمال الحصة وتقييمها
  - ⏰ تأجيل أو إلغاء الحصة
  - 🏷️ إضافة ألقاب للطلاب
  - 📋 عرض بيانات الطالب الكاملة
- **بطاقات الإحصائيات**: عرض ملخص الأداء والأرباح
- **عرض متجاوب**: جدول للحاسوب وبطاقات للهاتف

### 👨‍🎓 **لوحة تحكم الطالب**

- **الجدول الأسبوعي**: عرض الحصص المجدولة
- **متطلبات الحصة القادمة**: المهام والتحضير المطلوب
- **الدورات المسجلة**: قائمة بالدورات مع مؤشرات التقدم
- **الملف الشخصي**: إدارة البيانات الشخصية

### 🎯 **نظام الدورات**

- **فلترة متقدمة**: بحث حسب المدرس، المدة، النوع
- **عرض البطاقات**: تصميم جذاب لعرض الدورات
- **نظام الترقيم**: تقسيم الدورات على صفحات متعددة

## 🎨 نظام التصميم

### **الألوان**

```css
:root {
  --primary-color: rgb(30, 61, 50); /* أخضر داكن - اللون الأساسي */
  --secondary-color: rgb(99, 184, 177); /* أخضر نعناعي - اللون الثانوي */
  --separator-bg: rgb(245, 245, 220); /* بيج فاتح - خلفية الأقسام */
  --base-bg: white; /* أبيض - الخلفية الأساسية */
  --text-dark: #333; /* نص داكن */
  --text-light: #666; /* نص فاتح */
}
```

### **التايبوغرافي**

- **الخط الأساسي**: Cairo (Google Fonts)
- **الاتجاه**: من اليمين إلى اليسار (RTL)
- **أحجام الخط**: متدرجة ومتناسقة

### **الاستجابة**

| الجهاز            | العرض          | التخطيط            |
| ----------------- | -------------- | ------------------ |
| 📱 الهاتف المحمول | < 768px        | بطاقات عمودية      |
| 📟 الجهاز اللوحي  | 768px - 1024px | شبكة متوسطة        |
| 💻 الحاسوب        | > 1024px       | جداول وشبكات كاملة |

## 🔧 دليل التطوير

### **إضافة مكون جديد**

```bash
# إنشاء مجلد المكون
mkdir components/NewComponent

# إنشاء الملفات
touch components/NewComponent/index.tsx
touch components/NewComponent/NewComponent.module.css
```

### **إضافة دورة جديدة**

قم بتحديث ملف `data/courses.ts`:

```typescript
{
  id: 10,
  title: "اسم الدورة الجديدة",
  teacherName: "اسم المدرس",
  startDate: "2024-12-01",
  duration: "3 أشهر",
  shortDescription: "وصف مختصر للدورة",
  isFeatured: false,
  isNew: true,
  type: "تفسير",
  createdAt: "2024-11-01"
}
```

### **تخصيص الألوان**

يمكن تعديل الألوان من `styles/globals.css`:

```css
:root {
  --primary-color: rgb(30, 61, 50); /* غيّر هذا اللون */
  --secondary-color: rgb(99, 184, 177); /* وهذا أيضاً */
}
```

## 📊 حالة المشروع الحالية

### ✅ **المُكتمل**

- [x] واجهة المستخدم الأساسية
- [x] لوحة تحكم المعلم (متقدمة)
- [x] لوحة تحكم الطالب
- [x] نظام الدورات والفلترة
- [x] التصميم المتجاوب
- [x] دعم RTL/العربية
- [x] TypeScript + CSS Modules

### ⚠️ **قيد التطوير**

- [ ] ربط قاعدة البيانات
- [ ] نظام المصادقة الحقيقي
- [ ] API endpoints
- [ ] رفع الملفات

### ❌ **غير مُطبق**

- [ ] Testing framework
- [ ] نظام الدفع
- [ ] الإشعارات الفورية
- [ ] Video conferencing
- [ ] PWA features

## 🧪 الاختبارات

```bash
# تشغيل الاختبارات (عند إضافتها)
npm run test

# تشغيل اختبارات التغطية
npm run test:coverage

# تشغيل اختبارات E2E
npm run test:e2e
```

## 📦 البناء والنشر

### **البناء المحلي**

```bash
npm run build
npm start
```

### **النشر على Vercel**

```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel --prod
```

### **النشر على Netlify**

```bash
# البناء
npm run build

# رفع مجلد .next/out
```

## 🤝 المساهمة في المشروع

### **خطوات المساهمة**

1. **Fork** المشروع
2. إنشاء **فرع للميزة** (`git checkout -b feature/amazing-feature`)
3. **Commit** التغييرات (`git commit -m 'Add amazing feature'`)
4. **Push** للفرع (`git push origin feature/amazing-feature`)
5. فتح **Pull Request**

### **معايير الكود**

- استخدم **TypeScript** لجميع المكونات الجديدة
- اتبع **CSS Modules** للتنسيق
- أضف **تعليقات باللغة العربية**
- تأكد من **الاستجابة** على جميع الأجهزة

### **هيكل Commit Messages**

```
نوع: وصف مختصر

وصف تفصيلي إضافي إذا لزم الأمر

- feat: ميزة جديدة
- fix: إصلاح خطأ
- docs: تحديث التوثيق
- style: تحديث التنسيق
- refactor: إعادة هيكلة الكود
```

## 🐛 الأخطاء الشائعة وحلولها

### **خطأ في التثبيت**

```bash
# حذف node_modules وإعادة التثبيت
rm -rf node_modules package-lock.json
npm install
```

### **مشكلة في الـ RTL**

تأكد من وجود `direction: rtl` في `globals.css`

### **خطأ في TypeScript**

```bash
# إعادة تشغيل خادم TypeScript
npx tsc --noEmit
```

## 📚 مصادر إضافية

- [دليل Next.js](https://nextjs.org/docs)
- [وثائق TypeScript](https://www.typescriptlang.org/docs/)
- [دليل CSS Modules](https://github.com/css-modules/css-modules)
- [React Icons](https://react-icons.github.io/react-icons/)

## 📄 الترخيص

هذا المشروع مرخص تحت **رخصة MIT** - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل والدعم

- 📧 **البريد الإلكتروني**: info@yaqeen-academy.com
- 🌐 **الموقع الرسمي**: [أكاديمية يقين](https://yaqeen-academy.com)
- 💬 **GitHub Issues**: [رفع تذكرة](https://github.com/your-username/yaqeen-academy/issues)

---

<div align="center">

**تم تطوير هذا المشروع بـ ❤️ لخدمة طلاب العلوم الشرعية**

**© 2024 أكاديمية يقين - جميع الحقوق محفوظة**

</div>
