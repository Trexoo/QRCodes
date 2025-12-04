import type { Metadata } from "next";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "QRCore - Advanced QR Code SaaS Platform",
  description: "The most advanced QR code SaaS platform. Generate, customize, and track QR codes with powerful analytics and seamless integrations.",
  keywords: "QR code generator, QR code SaaS, custom QR codes, QR analytics, bulk QR generation, QR code API",
  openGraph: {
    title: "QRCore - Advanced QR Code SaaS Platform",
    description: "Generate, customize, and track QR codes with powerful analytics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Navbar />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
