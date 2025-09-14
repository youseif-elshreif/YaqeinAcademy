import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إدارة الكورسات - أكاديمية يقين",
  description:
    "إدارة الكورسات التعليمية في أكاديمية يقين. إضافة وتعديل وإدارة برامج تعليم القرآن الكريم والتجويد.",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function CoursesManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
