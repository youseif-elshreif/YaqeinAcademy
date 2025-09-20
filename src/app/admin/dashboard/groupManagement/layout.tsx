import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إدارة المجموعات - أكاديمية يقين",
  description:
    "إدارة المجموعات التعليمية في أكاديمية يقين. تنظيم الطلاب في مجموعات وإدارة الحلقات الدراسية.",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function GroupManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
