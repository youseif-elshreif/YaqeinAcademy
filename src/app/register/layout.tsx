import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد - أكاديمية يقين",
  description:
    "انضم إلى أكاديمية يقين لتعليم القرآن الكريم والتجويد. سجل حسابك الآن واستمتع بتعلم القرآن مع معلمين مؤهلين.",
  keywords: "تسجيل حساب, أكاديمية يقين, تعليم القرآن, انضمام",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
