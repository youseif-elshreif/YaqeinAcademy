import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول - أكاديمية يقين",
  description:
    "تسجيل الدخول إلى حسابك في أكاديمية يقين لتعليم القرآن الكريم والتجويد. ادخل إلى لوحة التحكم وتابع رحلتك التعليمية.",
  keywords: "تسجيل الدخول, أكاديمية يقين, دخول الحساب, لوحة التحكم",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
