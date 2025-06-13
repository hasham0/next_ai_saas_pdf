import "./globals.css";

import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sommaire - AI-powered PDF Summarizer",
  description:
    "save hours of reading time. Transform PDFs into concise summaries in seconds with our advanced AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
