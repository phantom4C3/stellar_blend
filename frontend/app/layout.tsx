import type { Metadata } from "next";
import { Geist, Geist_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
});



export const metadata: Metadata = {
  title: "Stellar Blend",
  applicationName: "Decentralised Crypto Exchange Platform",
  keywords:
    "staking pools, lending pools, dex, defi",
  description:
    "DeFi Lending Pool Template Library with Risk Alert Notification System",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${monaSans.variable} antialiased scroll-smooth `}
      >
       
      <div className="flex flex-col min-h-screen font-inter text-white p-4">
        <Header />

        <main className="flex-grow container mx-auto py-22">
           {children}
        </main>

        <Footer />
      </div>
        {/* <Toast/> */} 
      </body>
    </html>
  );
}
