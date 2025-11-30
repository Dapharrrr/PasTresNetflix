import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PasNetflix - Le cinéma sans limite",
  description: "Découvrez des milliers de films, des classiques intemporels aux dernières sorties. Une expérience immersive conçue pour les passionnés de cinéma.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: '/logo.png',
  },
  openGraph: {
    title: "PasNetflix - Le cinéma sans limite",
    description: "Découvrez des milliers de films, des classiques intemporels aux dernières sorties.",
    url: 'https://pasnetflix.com',
    siteName: 'PasNetflix',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'PasNetflix Logo',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PasNetflix - Le cinéma sans limite",
    description: "Découvrez des milliers de films, des classiques intemporels aux dernières sorties.",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={outfit.variable}>
      <body className="antialiased bg-[#0F0A1F] text-white min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
