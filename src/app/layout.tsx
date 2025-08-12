// app/layout.tsx

import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/img/favIcon.png" />
      </head>
      <body className={cairo.className}>
        <AuthProvider>
          <AppContent>{children}</AppContent>
        </AuthProvider>
      </body>
    </html>
  );
}
