import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";

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
  description: "Toko pakaian online dengan berbagai pilihan fashion terkini dan berkualitas tinggi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        {/* SidebarProvider membungkus seluruh aplikasi agar Sidebar di halaman Katalog bisa bekerja */}
        <SidebarProvider>
          <div className="flex min-h-screen w-full flex-col bg-white">
            
            {/* Header muncul di semua halaman */}
            <Header />

            {/* Konten Utama */}
            <main className="flex-1 flex flex-col">
              {children}
            </main>

            {/* Footer muncul di semua halaman */}
            <Footer />
            
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}