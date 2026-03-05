"use client";

import { useEffect, useState } from "react";
import { motion, Variants, } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { Product } from "@/lib/schemas/product";
import { formatPrice } from "@/lib/formatters";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function Home() {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data produk terbaru dari Supabase
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(4);

        if (error) throw error;
        setLatestProducts(data || []);
      } catch (err) {
        console.error("Error fetching latest products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <div className="bg-[#F9F9F9] min-h-screen font-sans selection:bg-[#E2FF3B]">
      <main>
        {/* ===== HERO SECTION ===== */}
        {/* Perbaikan: min-h-[80vh] di mobile agar tidak terlalu panjang */}
        <section className="relative min-h-[80vh] lg:min-h-[90vh] flex items-center bg-white overflow-hidden border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full py-16 lg:py-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-10 text-left"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block px-3 py-1 bg-[#E2FF3B] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6 lg:mb-8"
              >
                Drop.Wear Series 2026
              </motion.span>
              {/* Perbaikan: Ukuran text di mobile (text-5xl) vs desktop (text-[100px]) */}
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-[100px] font-medium tracking-tighter text-[#111111] leading-[0.9] lg:leading-[0.85] mb-8 lg:mb-10"
              >
                Where Fashion <br className="hidden md:block" /> Meets{" "}
                <span className="italic font-light text-gray-400">
                  Expression
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-base lg:text-lg text-gray-500 max-w-md mb-10 lg:mb-12 leading-relaxed"
              >
                Temukan koleksi fashion terkini yang dirancang untuk merayakan
                gaya unik Anda.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/katalog" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#111111] text-white hover:bg-black px-10 rounded-none h-16 uppercase text-xs font-bold tracking-widest transition-all"
                  >
                    Explore Catalog <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Hero Image (Tetap tersembunyi di mobile kecil) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative hidden lg:flex items-center justify-center h-[90vh]"
            >
              <div className="relative w-[80%] max-w-[450px] aspect-[3/4] bg-gray-50 overflow-hidden border border-gray-100 shadow-2xl">
                <Image
                  src="/assets/hero.jpg"
                  alt="Premium Collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== LOGO BAR (Marquee style manual) ===== */}
        <section className="py-12 lg:py-16 bg-white border-b border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center opacity-30 grayscale gap-8 lg:gap-12 overflow-x-auto no-scrollbar scroll-smooth">
              {["VOGUE", "GQ", "HYPEBEAST", "ELLE", "COMPLEX"].map((brand) => (
                <span
                  key={brand}
                  className="text-xl lg:text-2xl font-black italic tracking-tighter shrink-0"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CURRENT DROPS ===== */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-20 gap-6">
              <div>
                <h2 className="text-4xl lg:text-5xl font-medium tracking-tighter text-[#111111]">
                  Current Drops
                </h2>
                <p className="text-gray-400 mt-2 text-[10px] lg:text-sm uppercase tracking-widest">
                  Selected pieces from latest collection
                </p>
              </div>
              <Link
                href="/katalog"
                className="text-[10px] lg:text-xs font-black uppercase tracking-widest border-b-2 border-[#111111] pb-1 hover:text-gray-400 transition-all"
              >
                View Full Catalog
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-gray-200" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-y-16">
                {latestProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Link href={`/produk/${product.id}`}>
                      {/* Aspect ratio tetap 3/4 agar rapi di HP */}
                      <div className="aspect-[3/4] bg-[#F9F9F9] border border-gray-100 mb-6 lg:mb-8 flex items-center justify-center relative overflow-hidden">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex justify-between items-start">
                        <div className="max-w-[70%]">
                          <h3 className="font-bold text-xs lg:text-sm uppercase tracking-tight text-[#111111] truncate">
                            {product.name}
                          </h3>
                          <p className="text-[9px] lg:text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                            {product.category}
                          </p>
                        </div>
                        <p className="font-black text-xs lg:text-sm text-[#111111] shrink-0">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ===== CAMPAIGN SECTION ===== */}
        <section className="py-20 lg:py-32 bg-[#111111] text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="relative order-2 md:order-1">
              <h3 className="text-4xl lg:text-6xl font-medium tracking-tighter mb-8 lg:mb-10 relative z-10 leading-[1] lg:leading-[0.9]">
                Minimalist style <br /> never felt better.
              </h3>
              <p className="text-gray-400 leading-relaxed mb-10 lg:mb-12 text-base lg:text-lg">
                Setiap piece dirancang dengan cermat untuk menggabungkan gaya dan kenyamanan yang merayakan individualitas Anda.
              </p>
              <Button className="w-full sm:w-auto bg-[#E2FF3B] text-black hover:bg-white rounded-none px-12 h-16 font-bold uppercase text-xs tracking-widest">
                Discover Process
              </Button>
            </div>
            <div className="relative aspect-square order-1 md:order-2 bg-white/5 border border-white/10 overflow-hidden group">
              <Image
                src="/assets/Campaign.jpg"
                alt="Craftsmanship"
                fill
                className="object-cover opacity-50 grayscale group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
