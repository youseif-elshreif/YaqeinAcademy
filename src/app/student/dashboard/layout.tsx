import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة تحكم الطالب - أكاديمية يقين",
  description:
    "لوحة تحكم الطالب في أكاديمية يقين. تتبع تقدمك في تعلم القرآن الكريم والحلقات والواجبات.",
  icons: {
    icon: "/img/favIcon.png",
  },
};

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
