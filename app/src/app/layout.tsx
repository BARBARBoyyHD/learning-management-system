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
  // Base URL
  metadataBase: new URL("https://quizizz.learnweb.local"),
  
  // Basic Metadata
  title: {
    default: "Quizizz Clone - Interactive Learning Platform | LearnWeb LMS",
    template: "%s | Quizizz Clone",
  },
  description: "Create engaging quizzes, track student progress, and deliver real-time assessments. Free interactive learning platform for teachers with auto-grading, 5 question types, and instant analytics.",
  
  // SEO & Discovery
  keywords: [
    "quiz platform",
    "online quizzes",
    "education technology",
    "e-learning",
    "assessment tool",
    "LMS",
    "learning management system",
    "classroom quizzes",
    "auto-grading",
    "student analytics",
    "interactive learning",
    "remote learning",
    "quiz maker",
    "test creator",
    "educational platform",
  ],
  authors: [
    { name: "NAHRUL HAYAT" },
    { name: "FADEL NAJMI" },
    { name: "RAJA REVANERY" },
  ],
  creator: "LearnWeb LMS",
  publisher: "LearnWeb",
  
  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quizizz.learnweb.local",
    siteName: "Quizizz Clone",
    title: "Quizizz Clone - Make Learning Fun & Engaging",
    description: "Create engaging quizzes, track student progress, and deliver real-time assessments. Free interactive learning platform for teachers with auto-grading and instant analytics.",
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Quizizz Clone - Make Learning Fun & Engaging",
    description: "Create engaging quizzes, track student progress, and deliver real-time assessments. Free interactive learning platform for teachers.",
    creator: "@learnweb_lms",
  },
  
  // Robots & Indexing
  robots: {
    index: false, // Change to true in production
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  
  // Additional Metadata
  category: "Education",
  alternates: {
    canonical: "https://quizizz.learnweb.local",
  },
  
  // Verification (add your actual verification codes in production)
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Material Symbols Outlined Icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        {/* Viewport for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
