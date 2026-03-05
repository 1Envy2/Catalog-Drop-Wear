"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, MessageSquare, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SuccessPage() {
  useEffect(() => {
    toast.success("Pesanan berhasil diproses!");
  }, []);

  return (
    <div className="min-h-[80vh] bg-white flex flex-col items-center justify-center px-6 py-20">
      {/* Animasi Centang */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-24 h-24 bg-[#E2FF3B] rounded-full flex items-center justify-center mb-8 shadow-xl shadow-[#E2FF3B]/20"
      >
        <Check size={48} className="text-[#111111] stroke-[3px]" />
      </motion.div>

      {/* Teks Utama */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-md"
      >
        <h1 className="text-4xl md:text-5xl font-medium tracking-tighter uppercase mb-4 text-[#111111]">
          Payment <br /> <span className="text-gray-300 italic font-light">Received.</span>
        </h1>
        <p className="text-gray-500 leading-relaxed mb-12">
          Terima kasih telah berbelanja di Katalog Wear. Pesanan Anda sedang kami siapkan untuk segera dikirim.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          {/* Tombol WhatsApp Konfirmasi */}
          <Button
            asChild
            className="bg-[#111111] text-white hover:bg-black rounded-none h-16 uppercase text-xs font-black tracking-[0.2em] transition-all"
          >
            <a 
              href="https://wa.me/6281234567890?text=Halo%20Admin%20Katalog%20Wear,%20saya%20sudah%20melakukan%20pembayaran%20melalui%20website." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              Konfirmasi via WhatsApp <MessageSquare size={16} className="ml-3" />
            </a>
          </Button>

          {/* Tombol Kembali Belanja */}
          <Link href="/katalog">
            <Button
              variant="outline"
              className="w-full border-gray-100 rounded-none h-16 uppercase text-xs font-bold tracking-[0.2em] hover:bg-gray-50 transition-all"
            >
              Continue Shopping <ArrowRight size={16} className="ml-3" />
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Dekorasi Latar Belakang */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] pointer-events-none">
        <ShoppingBag size={600} className="text-black" />
      </div>
    </div>
  );
}