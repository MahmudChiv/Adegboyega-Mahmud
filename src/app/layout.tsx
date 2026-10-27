import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahmud Adegboyega — Software Engineer & Builder",
  description:
    "Full-stack engineer building production-ready software for startups, Africa’s businesses and informal economy, with a focus on solving real problems for real people and a long-term goal of founding a major African startup.",
  keywords: [
    "Mahmud Adegboyega",
    "Software Engineer",
    "Full-Stack Developer",
    "African Tech",
    "Fintech",
    "Backend Systems",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Mahmud Adegboyega" }],
  openGraph: {
    title: "Mahmud Adegboyega — Software Engineer & Builder",
    description:
      "Full-stack engineer building production-ready software for startups, Africa’s businesses and informal economy.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)]/30 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
