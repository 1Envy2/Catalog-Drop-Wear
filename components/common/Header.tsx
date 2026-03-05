"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"; 
import { ShoppingBag, Menu, X, Shirt, Search, Instagram, Twitter } from "lucide-react"; 
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CartBadge = dynamic(() => import("./CartBadge"), { ssr: false });

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Mencegah scroll pada body saat menu terbuka agar overlay terasa solid
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

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
    <>
      <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 lg:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#111111] p-1.5 rounded-none transition-transform group-hover:rotate-12">
              <Shirt size={18} className="text-white" />
            </div>
            <span className="text-lg lg:text-xl font-black tracking-tighter text-[#111111] uppercase leading-none">
              drop<span className="text-gray-300">.wear</span>
            </span>
          </Link>

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

          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-gray-50 rounded-full w-9 h-9">
              <Search size={18} strokeWidth={2} />
            </Button>
            
            <Link href="/keranjang" className="relative group p-2">
              <ShoppingBag size={18} strokeWidth={2} className="text-[#111111] group-hover:text-gray-400 transition-colors" />
              <CartBadge />
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#111111] z-[110]">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU & OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* 1. Backdrop Overlay - Menutupi seluruh aplikasi */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] md:hidden"
            />

            {/* 2. Menu Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[75%] max-w-sm bg-white z-[110] shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex-1 px-8 py-24">
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className={`text-2xl font-bold tracking-tight uppercase transition-all ${
                        pathname === link.href 
                          ? "text-[#111111] border-l-4 border-[#E2FF3B] pl-4" 
                          : "text-gray-400 hover:text-[#111111] pl-0"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-8 border-t border-gray-100 bg-[#F9F9F9]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Socials</span>
                  <div className="flex gap-4">
                     <Instagram size={18} className="text-[#111111]" />
                     <Twitter size={18} className="text-[#111111]" />
                  </div>
                </div>
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">drop.wear © 2026</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}