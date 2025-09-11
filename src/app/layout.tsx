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
  title: "Yaqeen Academy",
  description: "Learn with excellence.",
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
