import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_NAME, APP_SUBTITLE } from "@/lib/constants";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${APP_NAME} — ${APP_SUBTITLE}`,
  description:
    "Abdullah Gül Üniversitesi (AGÜ) öğrencileri için sürdürülebilir kampüs pazaryeri (Vitrin) ve topluluk ihtiyaç panosu (SDG 4 & SDG 12).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
