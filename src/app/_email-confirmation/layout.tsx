import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تأكيد البريد الإلكتروني - أكاديمية يقين",
  description:
    "تأكيد البريد الإلكتروني لحسابك في أكاديمية يقين. اتبع التعليمات لتفعيل حسابك بنجاح.",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function EmailConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
