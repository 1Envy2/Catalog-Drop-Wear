"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X, Shirt, Search } from "lucide-react";
import { useState } from "react";

// Import badge secara dinamis dan matikan Server Side Rendering untuk komponen ini
const CartBadge = dynamic(() => import("./CartBadge"), { ssr: false });

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Katalog", href: "/katalog" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-[#111111] p-1.5 rounded-sm transition-transform group-hover:rotate-12">
            <Shirt size={20} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-[#111111] uppercase">
            drop<span className="text-gray-400">.wear</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] font-bold uppercase tracking-widest transition-all hover:text-gray-400 ${
                pathname === link.href ? "text-[#111111] border-b-2 border-[#111111]" : "text-gray-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-gray-50 rounded-full">
            <Search size={20} strokeWidth={1.5} />
          </Button>
          
          <Link href="/keranjang" className="relative group">
            <Button variant="ghost" size="icon" className="hover:bg-gray-50 rounded-full">
              <ShoppingBag size={20} strokeWidth={1.5} />
            </Button>
            {/* Badge yang sekarang aman dari Hydration Error */}
            <CartBadge />
          </Link>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#111111]">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white z-50 px-6 py-10">
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-4xl font-bold tracking-tighter uppercase text-[#111111]">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}