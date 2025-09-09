import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول - أكاديمية يقين",
  description: "تسجيل الدخول إلى حسابك في أكاديمية يقين للعلوم الشرعية",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
