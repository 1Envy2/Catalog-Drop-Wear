import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner"; // [TAMBAH INI]

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Katalog Wear | Where Fashion Meets Expression",
  description: "Toko pakaian online dengan pilihan fashion terkini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full flex-col bg-white">
            <Header />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
          {/* [TAMBAH INI] Sonner Toaster */}
          <Toaster position="top-center" richColors closeButton />
        </SidebarProvider>
      </body>
    </html>
  );
}