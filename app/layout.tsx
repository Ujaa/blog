import "./global.css";
import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  icons: {
    icon: "/favicon.ico",
  },
  title: {
    default: "Home",
    template: "%s | Ujaa의 블로그",
  },
  description: "모든 꾸준히 공부하고 기록하기",
  keywords: ["Ujaa", "블로그", "기술 블로그", "tech blog"],
  openGraph: {
    title: "Ujaa의 블로그",
    description: "모든 꾸준히 공부하고 기록하기",
    url: baseUrl,
    siteName: "Ujaa의 블로그",
    locale: "ko_KR",
    type: "website",
    images: "/images/og-image.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-neutral-900 bg-white dark:text-white dark:bg-neutral-900",
        pretendard.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased px-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 flex flex-col">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
