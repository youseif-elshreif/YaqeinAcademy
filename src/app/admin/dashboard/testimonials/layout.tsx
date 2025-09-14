import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إدارة آراء الطلاب - أكاديمية يقين",
  description:
    "إدارة تقييمات وآراء الطلاب في أكاديمية يقين. مراجعة واعتماد أو رفض تعليقات الطلاب وتقييماتهم.",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function TestimonialsManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
