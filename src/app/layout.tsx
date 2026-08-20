import type { Metadata } from "next";
import "./globals.css";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${portfolio.name} — ${portfolio.primaryRole}`,
  description: portfolio.intro,
  keywords: [
    "Ylyssa Kaye Cepriano",
    "Full-Stack Developer",
    "Web Developer",
    "Mobile Developer",
    "Frontend Developer",
    "UI/UX Developer",
    "Philippines",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
