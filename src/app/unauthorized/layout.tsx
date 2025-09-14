import { Metadata } from "next";

export const metadata: Metadata = {
  title: "غير مخول للدخول - أكاديمية يقين",
  description:
    "عذراً، ليس لديك صلاحية للوصول إلى هذه الصفحة. تأكد من تسجيل الدخول بالحساب المناسب.",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function UnauthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
