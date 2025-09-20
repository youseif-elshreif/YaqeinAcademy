# أكاديمية يقين - YaqeinAcademy

منصة تعليمية لتعليم القرآن الكريم والتجويد أونلاين مع معلمين مؤهلين ومعتمدين.

## البدء السريع

### المتطلبات الأساسية

- Node.js 18+ 
- npm أو yarn

### إعداد المشروع

1. **استنساخ المشروع:**
```bash
git clone https://github.com/youseif-elshreif/YaqeinAcademy.git
cd YaqeinAcademy
```

2. **تثبيت Dependencies:**
```bash
npm install
```

3. **إعداد متغيرات البيئة:**
```bash
# نسخ ملف البيئة النموذجي
cp .env.example .env.local
```

4. **تحرير ملف .env.local وإضافة قيم API:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### تشغيل المشروع

```bash
# وضع التطوير
npm run dev

# بناء الإنتاج
npm run build

# تشغيل الإنتاج
npm run start

# فحص الكود
npm run lint
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح لمشاهدة النتيجة.

## البنية التقنية

### التقنيات المستخدمة

- **Framework:** Next.js 15.5.3 (App Router)
- **Frontend:** React 19.1.0, TypeScript
- **Styling:** CSS Modules
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Icons:** React Icons
- **Sliders:** Swiper
- **Phone Validation:** libphonenumber-js

### هيكل المشروع

```
src/
├── app/                    # App Router pages
│   ├── page.tsx           # الصفحة الرئيسية
│   ├── login/             # صفحة تسجيل الدخول
│   ├── register/          # صفحة التسجيل
│   ├── courses/           # صفحة الكورسات
│   ├── student/           # لوحة تحكم الطالب
│   ├── teacher/           # لوحة تحكم المعلم
│   └── admin/             # لوحة تحكم الإدارة
├── components/            # React components
│   ├── auth/             # مكونات المصادقة
│   ├── common/           # مكونات مشتركة
│   └── dashboard/        # مكونات لوحات التحكم
├── contexts/             # React contexts
├── types/                # TypeScript type definitions
├── utils/                # أدوات مساعدة
└── styles/               # CSS modules
```

## المتغيرات البيئية

| المتغير | الوصف | مطلوب |
|---------|--------|--------|
| `NEXT_PUBLIC_API_URL` | رابط API الخلفي | ✅ |

## الأدوار والصلاحيات

المشروع يدعم 3 أنواع من المستخدمين:

- **الطلاب:** الوصول للكورسات وتتبع التقدم
- **المعلمين:** إدارة الحلقات والطلاب
- **الإدارة:** التحكم الكامل في المنصة

## المزايا الرئيسية

### للطلاب
- ✅ تتبع التقدم في الحفظ
- ✅ جدولة الحلقات
- ✅ تقييم الأداء
- ✅ التواصل مع المعلمين

### للمعلمين  
- ✅ إدارة المجموعات
- ✅ تتبع حضور الطلاب
- ✅ إنشاء التقارير
- ✅ إدارة روابط الحلقات

### للإدارة
- ✅ إدارة المستخدمين
- ✅ إحصائيات شاملة
- ✅ إدارة الكورسات
- ✅ إدارة التقييمات

## النشر

### Vercel (مُوصى به)
```bash
# ربط المشروع مع Vercel
npx vercel

# إضافة متغيرات البيئة في Vercel Dashboard
# NEXT_PUBLIC_API_URL=your-production-api-url
```

### نشر آخر
تأكد من إضافة متغيرات البيئة المطلوبة في منصة النشر.

## المساهمة

1. Fork المشروع
2. أنشئ branch للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للـ branch (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

## التراخيص

هذا المشروع مملوك لأكاديمية يقين.

## التواصل

- **الموقع:** [أكاديمية يقين](https://yaqein-academy.com)
- **البريد الإلكتروني:** info@yaqein-academy.com

---