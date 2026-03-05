"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle, Target, Award, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TentangKami() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Responsive Font Size */}
      <section className="pt-20 lg:pt-32 pb-16 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6 block"
          >
            Our Identity
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-medium tracking-tighter text-[#111111] leading-[0.9] mb-10"
          >
            Minimalist soul. <br className="hidden md:block" />
            Digital{" "}
            <span className="text-gray-300 italic font-light">Craft.</span>
          </motion.h1>
          <div className="max-w-2xl">
            <p className="text-base lg:text-lg text-gray-500 leading-relaxed">
              Kami adalah kolektif fashion yang percaya bahwa pakaian adalah
              kanvas ekspresi paling murni. Berfokus pada kualitas tanpa
              kompromi dan estetika abadi.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section - Stacked on Mobile */}
      <section className="py-20 lg:py-32 px-6 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-square bg-white overflow-hidden group border border-gray-100 shadow-xl order-2 md:order-1">
            <Image
              src="/assets/Tim.jpg"
              alt="The Founders"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <p className="text-[10px] font-black uppercase tracking-widest bg-white px-3 py-1 shadow-sm">
                The Makers
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E2FF3B] mb-4 block">
              Origin Story
            </span>
            <h2 className="text-3xl lg:text-4xl font-medium tracking-tight mb-8 text-[#111111] uppercase leading-none">
              The Story of <br /> Drop.Code
            </h2>
            <div className="space-y-6 text-gray-500 leading-relaxed text-sm lg:text-base">
              <p>
                Berawal dari keresahan akan fashion yang terlalu rumit, kami
                hadir untuk menyederhanakan cara Anda berpakaian namun tetap
                menonjolkan karakter.
              </p>
              <p>
                Setiap jahitan adalah komitmen kami terhadap kualitas UMKM lokal
                yang mampu bersaing di kancah internasional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Target size={24} />,
                title: "Vision",
                desc: "Menjadi standar baru dalam fashion minimalis Indonesia.",
              },
              {
                icon: <CheckCircle size={24} />,
                title: "Quality",
                desc: "Setiap piece melalui kurasi ketat untuk daya tahan jangka panjang.",
              },
              {
                icon: <Award size={24} />,
                title: "Integrity",
                desc: "Transparansi penuh dalam proses produksi dan pelayanan.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-10 border border-gray-100 hover:border-[#111111] transition-colors group"
              >
                <div className="mb-6 text-[#111111] group-hover:text-[#E2FF3B] transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-24 px-6 bg-[#111111] text-white text-center">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 leading-tight">
          Experience the <br /> collection yourself.
        </h2>
        <Link href="/katalog">
          <Button
            size="lg"
            className="bg-[#E2FF3B] text-[#111111] hover:bg-white rounded-none px-12 h-14 font-bold uppercase tracking-widest text-xs"
          >
            Shop Now <ArrowUpRight size={16} className="ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
}