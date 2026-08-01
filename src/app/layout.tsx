import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "WorldIntelligence — Open-Source Intelligence, Mapped",
  description: "23 verified open-source datasets in one free, queryable map. Military, nuclear, conflicts, infrastructure, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
