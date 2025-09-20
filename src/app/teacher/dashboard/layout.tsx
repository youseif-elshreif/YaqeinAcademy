import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة تحكم المعلم - أكاديمية يقين",
  description:
    "لوحة تحكم المعلم في أكاديمية يقين. إدارة الطلاب والحلقات والمجموعات التعليمية.",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
