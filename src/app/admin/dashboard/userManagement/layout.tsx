import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إدارة المستخدمين - أكاديمية يقين",
  description:
    "إدارة المستخدمين في أكاديمية يقين. عرض وتعديل وإدارة حسابات الطلاب والمعلمين.",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
