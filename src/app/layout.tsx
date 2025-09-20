import "@/src/styles/globals.css";
import { AuthProvider } from "@/src/contexts/AuthContext";
import AppContent from "./AppContent";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "أكاديمية يقين - تعلم القرآن الكريم",
  description:
    "أكاديمية يقين لتعليم القرآن الكريم أونلاين مع معلمين مؤهلين ومعتمدين. انضم إلينا لتعلم تلاوة القرآن بالطريقة الصحيحة وإتقان أحكام التجويد.",
  keywords:
    "أكاديمية يقين, تعليم القرآن, تجويد, قرآن كريم, تعليم أونلاين, تحفيظ القرآن, معلم قرآن, حلقات قرآن",
  authors: [{ name: "أكاديمية يقين" }],
  creator: "أكاديمية يقين",
  publisher: "أكاديمية يقين",
  icons: {
    icon: [
      {
        url: "/img/favIcon.png",
        type: "image/png",
      },
    ],
    shortcut: "/img/favIcon.png",
    apple: "/img/favIcon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <AuthProvider>
          <AppContent>{children}</AppContent>
        </AuthProvider>
      </body>
    </html>
  );
}
