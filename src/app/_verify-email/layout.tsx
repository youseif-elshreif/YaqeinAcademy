import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التحقق من البريد الإلكتروني - أكاديمية يقين",
  description:
    "جاري التحقق من البريد الإلكتروني وتفعيل حسابك في أكاديمية يقين.",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
