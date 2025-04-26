import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/layout/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YCS | Premium T-Shirt Collection",
  description: "Discover trendsetting plain and branded t-shirts from YCS. High quality, stylish designs for every occasion.",
  keywords: ["t-shirts", "clothing", "fashion", "branded t-shirts", "plain t-shirts", "apparel"],
  authors: [{ name: "YCS Team" }],
  openGraph: {
    title: "YCS | Premium T-Shirt Collection",
    description: "Discover trendsetting plain and branded t-shirts from YCS.",
    url: "https://ycs.com",
    siteName: "YCS",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white text-gray-900`}
      >
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
