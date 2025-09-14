import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إدارة معلومات الاتصال - أكاديمية يقين",
  description:
    "إدارة معلومات الاتصال والتواصل في أكاديمية يقين. تحديث أرقام الهاتف والبريد الإلكتروني وحسابات التواصل الاجتماعي.",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function ContactManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
