"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Kontak() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pesan Anda telah kami terima.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-16 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4 block">Contact Support</span>
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-[#111111] leading-none">
              Get in <br /><span className="text-gray-300 italic font-light">Touch.</span>
            </h1>
          </div>
          <div className="pb-2">
            <p className="text-gray-500 uppercase text-[10px] tracking-widest font-bold">Responds within 24 hours</p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-20">
        {/* Info Side */}
        <div className="lg:col-span-5 space-y-16">
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-gray-400">Our Channels</h3>
            <div className="space-y-10">
              <div className="flex gap-6 group cursor-pointer">
                <div className="p-4 bg-[#F9F9F9] group-hover:bg-[#E2FF3B] transition-colors"><Mail size={20} /></div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Email</p>
                  <p className="text-lg font-medium border-b border-transparent group-hover:border-[#111111] transition-all">info@dropwear.com</p>
                </div>
              </div>
              <div className="flex gap-6 group cursor-pointer">
                <div className="p-4 bg-[#F9F9F9] group-hover:bg-[#E2FF3B] transition-colors"><MessageSquare size={20} /></div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">WhatsApp</p>
                  <p className="text-lg font-medium">+62 812 3456 7890</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="p-4 bg-[#F9F9F9]"><MapPin size={20} /></div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Studio</p>
                  <p className="text-lg font-medium leading-tight">Jl. Pahlawan No. 123 <br />Bandung, Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="lg:col-span-7 bg-[#F9F9F9] p-12 md:p-20">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest">Your Name</label>
                <input 
                  type="text" required
                  className="w-full bg-transparent border-b border-gray-200 py-3 focus:border-[#111111] outline-none transition-colors text-sm"
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" required
                  className="w-full bg-transparent border-b border-gray-200 py-3 focus:border-[#111111] outline-none transition-colors text-sm"
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest">Message</label>
              <textarea 
                required rows={4}
                className="w-full bg-transparent border-b border-gray-200 py-3 focus:border-[#111111] outline-none transition-colors text-sm resize-none"
                placeholder="What can we help you with?"
              />
            </div>
            <Button className="w-full h-16 bg-[#111111] text-white hover:bg-black rounded-none uppercase tracking-[0.2em] font-bold text-xs">
              Send Message <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}