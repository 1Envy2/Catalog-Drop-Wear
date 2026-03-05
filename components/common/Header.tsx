"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X, Shirt, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CartBadge = dynamic(() => import("./CartBadge"), { ssr: false });

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Menutup menu otomatis saat pindah halaman
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Katalog", href: "/katalog" },
    { name: "Tentang", href: "/tentang-kami" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 lg:h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-[#111111] p-1.5 rounded-none transition-transform group-hover:rotate-12">
            <Shirt size={18} className="text-white" />
          </div>
          <span className="text-lg lg:text-xl font-black tracking-tighter text-[#111111] uppercase leading-none">
            drop<span className="text-gray-300">.wear</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#111111] relative py-1 ${
                pathname === link.href ? "text-[#111111] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#111111]" : "text-gray-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-gray-50 rounded-full w-9 h-9">
            <Search size={18} strokeWidth={2} />
          </Button>
          
          <Link href="/keranjang" className="relative group p-2">
            <ShoppingBag size={18} strokeWidth={2} className="text-[#111111] group-hover:text-gray-400 transition-colors" />
            <CartBadge />
          </Link>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 text-[#111111] hover:bg-gray-50 rounded-full transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay with Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed inset-0 top-16 bg-white z-[40] px-6 py-12"
          >
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`text-5xl font-medium tracking-tighter uppercase leading-none ${
                    pathname === link.href ? "text-[#111111]" : "text-gray-200"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="absolute bottom-12 left-6 right-6 pt-12 border-t border-gray-100 flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 italic">Est. 2026</span>
              <div className="flex gap-4">
                 <Instagram size={16} className="text-gray-400" />
                 <Twitter size={16} className="text-gray-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}