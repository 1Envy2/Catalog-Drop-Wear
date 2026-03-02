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
        <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-10 text-left"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block px-3 py-1 bg-[#E2FF3B] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8"
              >
                Drop.Wear Series 2026
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="text-6xl md:text-[100px] font-medium tracking-tighter text-[#111111] leading-[0.85] mb-10"
              >
                Where Fashion <br /> Meets{" "}
                <span className="italic font-light text-gray-400">
                  Expression
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-500 max-w-md mb-12 leading-relaxed"
              >
                Temukan koleksi fashion terkini yang dirancang untuk merayakan
                gaya unik Anda.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/katalog">
                  <Button
                    size="lg"
                    className="bg-[#111111] text-white hover:bg-black px-10 rounded-none h-16 uppercase text-xs font-bold tracking-widest transition-all"
                  >
                    Explore Catalog <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Hero Image */}
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
                <div className="absolute -inset-4 border border-gray-200 -z-10 translate-x-2 translate-y-2" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== LOGO BAR ===== */}
        <section className="py-16 bg-white border-b border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center opacity-30 grayscale gap-12 overflow-x-auto no-scrollbar">
              {["VOGUE", "GQ", "HYPEBEAST", "ELLE", "COMPLEX"].map((brand) => (
                <span
                  key={brand}
                  className="text-2xl font-black italic tracking-tighter"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CURRENT DROPS (Supabase Data) ===== */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-20">
              <div>
                <h2 className="text-5xl font-medium tracking-tighter text-[#111111]">
                  Current Drops
                </h2>
                <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">
                  Selected pieces from latest collection
                </p>
              </div>
              <Link
                href="/katalog"
                className="text-xs font-black uppercase tracking-widest border-b-2 border-[#111111] pb-1 hover:text-gray-400 transition-all"
              >
                View Full Catalog
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-gray-200" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {latestProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Link href={`/produk/${product.id}`}>
                      <div className="aspect-[3/4] bg-[#F9F9F9] border border-gray-100 mb-8 flex items-center justify-center relative overflow-hidden">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute bottom-6 right-6 bg-white p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                          <Package size={20} className="text-[#111111]" />
                        </div>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-sm uppercase tracking-tight text-[#111111]">
                            {product.name}
                          </h3>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                            {product.category}
                          </p>
                        </div>
                        <p className="font-black text-sm text-[#111111]">
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
        <section className="py-32 bg-[#111111] text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <h2 className="text-[150px] font-black leading-none opacity-5 absolute -top-20 -left-10 select-none">
                CRAFT
              </h2>
              <h3 className="text-6xl font-medium tracking-tighter mb-10 relative z-10 leading-[0.9]">
                Minimalist style <br /> never felt better.
              </h3>
              <p className="text-gray-400 leading-relaxed mb-12 text-lg">
                Kami merancang fashion kontemporer yang merayakan
                individualitas. Setiap piece dirancang dengan cermat untuk
                menggabungkan gaya dan kenyamanan.
              </p>
              <Button className="bg-[#E2FF3B] text-black hover:bg-white rounded-none px-12 h-16 font-bold uppercase text-xs tracking-widest">
                Discover Process
              </Button>
            </div>
            <div className="relative aspect-square bg-white/5 border border-white/10 overflow-hidden group">
              <Image
                src="/assets/Campaign.jpg" // Ganti dengan foto detail tekstur kain
                alt="Craftsmanship"
                fill
                className="object-cover opacity-50 grayscale group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
