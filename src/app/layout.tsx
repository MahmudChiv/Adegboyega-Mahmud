import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./portfolio.css";

const mtnBrighterSans = localFont({
  src: [
    { path: "./fonts/MTNBrighterSans-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/MTNBrighterSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/MTNBrighterSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/MTNBrighterSans-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/MTNBrighterSans-ExtraBold.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-mtn-brighter-sans",
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: [{ url: "/brand/ma-stamp.svg", type: "image/svg+xml" }] },
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
      className={`${mtnBrighterSans.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
