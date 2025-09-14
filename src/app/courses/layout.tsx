import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الدورات - أكاديمية يقين",
  description:
    "تصفح جميع دورات تعليم القرآن الكريم والتجويد في أكاديمية يقين. اختر الدورة المناسبة لمستواك وابدأ رحلتك في تعلم القرآن.",
  keywords: "دورات قرآن, تعليم تجويد, دورات أونلاين, تحفيظ القرآن, دروس قرآن",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
