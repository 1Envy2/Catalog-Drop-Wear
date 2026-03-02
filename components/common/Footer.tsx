"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Newsletter Section (Left) */}
          <div className="lg:col-span-5">
            <h3 className="text-4xl font-medium tracking-tighter text-[#111111] mb-6">
              Join the club. <br />Stay ahead of the drops.
            </h3>
            <div className="flex gap-2 max-w-md">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-gray-50 border-none px-6 py-4 text-sm focus:ring-1 focus:ring-[#111111] outline-none"
              />
              <Button className="bg-[#E2FF3B] text-[#111111] font-bold px-8 hover:bg-[#d4f035] rounded-none">
                Submit
              </Button>
            </div>
            <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>

          {/* Links Section (Right) */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#111111] mb-6">Brand</h4>
              <ul className="space-y-4">
                {["About", "Philosophy", "Sustainability", "Careers"].map(item => (
                  <li key={item}><Link href="#" className="text-sm text-gray-400 hover:text-[#111111] transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#111111] mb-6">Shop</h4>
              <ul className="space-y-4">
                {["New Arrivals", "Women", "Men", "Accessories"].map(item => (
                  <li key={item}><Link href="#" className="text-sm text-gray-400 hover:text-[#111111] transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#111111] mb-6">Social</h4>
              <ul className="space-y-4">
                {[
                  { name: "Instagram", icon: <Instagram size={14} /> },
                  { name: "Twitter", icon: <Twitter size={14} /> },
                  { name: "Facebook", icon: <Facebook size={14} /> }
                ].map(social => (
                  <li key={social.name}>
                    <Link href="#" className="text-sm text-gray-400 hover:text-[#111111] transition-colors flex items-center gap-2">
                      {social.name} <ArrowUpRight size={10} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#111111] uppercase tracking-[0.3em]">Drop.Code</span>
            <span className="text-[10px] text-gray-300">© 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#111111]">Privacy Policy</Link>
            <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#111111]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}