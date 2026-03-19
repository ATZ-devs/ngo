import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JeevKutumb Foundation - Hope Begins With Us",
  description: "JeevKutumb Foundation is dedicated to healthcare, education, skill development, women empowerment, and social welfare. Join our mission to create lasting positive change in communities. Donations are tax-deductible under 80G.",
  keywords: "NGO, healthcare, education, donation, tax saving, 80G, women empowerment, social welfare, JeevKutumb Foundation",
  authors: [{ name: "JeevKutumb Foundation" }],
  openGraph: {
    title: "JeevKutumb Foundation - Hope Begins With Us",
    description: "Creating lasting positive change through healthcare, education, and social welfare programs",
    url: "https://jeevkutumbfoundation.org",
    siteName: "JeevKutumb Foundation",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JeevKutumb Foundation - Tree of Life Logo"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JeevKutumb Foundation - Hope Begins With Us",
    description: "Creating lasting positive change through healthcare, education, and social welfare programs",
    site: "@jeevkutumb",
    creator: "@jeevkutumb",
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "nonprofit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Jaini+Purva&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
