"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 lg:pt-24 pb-8 lg:pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 lg:mb-24">
          
          {/* Newsletter Section */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-3xl lg:text-4xl font-medium tracking-tighter text-[#111111] leading-none">
              Join the club. <br />Stay ahead of the drops.
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-gray-50 border-none px-6 py-4 text-sm focus:ring-1 focus:ring-[#111111] outline-none"
              />
              <Button className="bg-[#E2FF3B] text-[#111111] font-bold px-8 h-12 sm:h-auto hover:bg-[#d4f035] rounded-none uppercase text-[10px] tracking-widest">
                Submit
              </Button>
            </div>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>

          {/* Links Section - 2 columns on mobile */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111]">Brand</h4>
              <ul className="space-y-3">
                {["About", "Philosophy", "Sustainability", "Careers"].map(item => (
                  <li key={item}><Link href="#" className="text-xs text-gray-400 hover:text-[#111111] transition-colors uppercase tracking-wider">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111]">Shop</h4>
              <ul className="space-y-3">
                {["New Arrivals", "Women", "Men", "Accessories"].map(item => (
                  <li key={item}><Link href="#" className="text-xs text-gray-400 hover:text-[#111111] transition-colors uppercase tracking-wider">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-6 col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111]">Social</h4>
              <ul className="flex md:flex-col gap-6 md:gap-3">
                {[
                  { name: "IG", icon: <Instagram size={14} /> },
                  { name: "TW", icon: <Twitter size={14} /> },
                  { name: "FB", icon: <Facebook size={14} /> }
                ].map(social => (
                  <li key={social.name}>
                    <Link href="#" className="text-xs text-gray-400 hover:text-[#111111] transition-colors flex items-center gap-1 uppercase font-bold tracking-widest">
                      {social.name} <ArrowUpRight size={10} className="text-gray-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black text-[#111111] uppercase tracking-[0.3em]">Drop.Wear</span>
            <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">© 2026</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#111111]">Privacy</Link>
            <Link href="#" className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#111111]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}