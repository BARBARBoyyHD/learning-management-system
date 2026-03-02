import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

/**
 * Lexend Font - Primary typography for Quizizz Clone
 * Weights: 300-700 as per Color Guideline
 * 
 * @see https://fonts.google.com/specimen/Lexend
 */
const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quizizz Clone - LearnWeb LMS",
  description: "Interactive quiz platform for engaging learning assessments",
  keywords: ["quiz", "education", "learning", "assessment", "LMS"],
  authors: [{ name: "LearnWeb LMS" }],
  creator: "LearnWeb LMS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quizizz.learnweb.local",
    title: "Quizizz Clone - LearnWeb LMS",
    description: "Interactive quiz platform for engaging learning assessments",
    siteName: "Quizizz Clone",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quizizz Clone - LearnWeb LMS",
    description: "Interactive quiz platform for engaging learning assessments",
  },
  robots: {
    index: false, // Change to true in production
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Material Symbols Outlined Icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body
        className={`${lexend.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
