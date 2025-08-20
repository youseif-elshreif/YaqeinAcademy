export interface Course {
  _id: string; // Using ObjectId format as string
  title: string;
  description: string;
  telegramLink: string;
}

// For CoursesGrid component (legacy format)
export interface LegacyCourse {
  id: number;
  title: string;
  teacherName: string;
  startDate: string;
  duration: string;
  shortDescription: string;
}

export const coursesData: Course[] = [
  {
    _id: "66a1b2c3d4e5f6789abcdef0",
    title: "دورة تأسيس القرآن الكريم",
    description:
      "دورة شاملة لتعليم أساسيات قراءة وحفظ القرآن الكريم مع التجويد الصحيح. تشمل الدورة تعلم الحروف والحركات والمدود وأحكام التجويد الأساسية.",
    telegramLink: "https://t.me/quran_foundation_course",
  },
  {
    _id: "66a1b2c3d4e5f6789abcdef1",
    title: "دورة التجويد المتقدم",
    description:
      "دورة متخصصة في أحكام التجويد المتقدمة تشمل أحكام النون الساكنة والتنوين، أحكام الميم الساكنة، المدود، والوقف والابتداء.",
    telegramLink: "https://t.me/advanced_tajweed_course",
  },
  {
    _id: "66a1b2c3d4e5f6789abcdef2",
    title: "حفظ جزء عم",
    description:
      "برنامج منظم لحفظ الجزء الثلاثين من القرآن الكريم (جزء عم) مع المراجعة المستمرة وتطبيق أحكام التجويد.",
    telegramLink: "https://t.me/juz_amma_memorization",
  },
  {
    _id: "66a1b2c3d4e5f6789abcdef3",
    title: "دورة الخط العربي والمصحف",
    description:
      "تعلم فن الخط العربي وكتابة آيات القرآن الكريم بخط النسخ والثلث. دورة عملية مع تطبيقات وتمارين متدرجة.",
    telegramLink: "https://t.me/arabic_calligraphy_quran",
  },
  {
    _id: "66a1b2c3d4e5f6789abcdef4",
    title: "دورة التفسير الميسر",
    description:
      "دورة في تفسير القرآن الكريم بأسلوب مبسط ومفهوم، تشمل أسباب النزول والمعاني اللغوية والدروس المستفادة من كل سورة.",
    telegramLink: "https://t.me/tafseer_simplified",
  },
];

// Convert to legacy format for CoursesGrid
export const getLegacyCourses = (): LegacyCourse[] => {
  return coursesData.map((course, index) => ({
    id: index + 1,
    title: course.title,
    teacherName: "معلم افتراضي", // Default teacher name
    startDate: "2024-09-01", // Default start date
    duration: "3 أشهر", // Default duration
    shortDescription: course.description.slice(0, 100) + "...", // Use first 100 chars of description
  }));
};

// Helper function to get course by ID
export const getCourseById = (id: string): Course | undefined => {
  return coursesData.find((course) => course._id === id);
};

// Helper function to get all courses
export const getAllCourses = (): Course[] => {
  return coursesData;
};
