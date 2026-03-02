"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/stores/cartStore";
import { Product, CartItem } from "@/lib/schemas/product";
import { supabase } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/formatters";
import { createWhatsAppLink, generateWhatsAppMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck, Truck } from "lucide-react";

export default function ProductDetail({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*").eq("id", productId).single();
        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Detail Error Supabase:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="w-8 h-8 border-2 border-t-[#111111] border-gray-100 rounded-full animate-spin" />
    </div>
  );

  if (!product) return <div className="text-center py-20 uppercase tracking-widest text-xs font-bold">Product not found.</div>;

  const productImages = [product.image_url, product.image_url, product.image_url]; // Mock for gallery

  const handleBuyViaWhatsApp = () => {
    if ((product.size?.length ?? 0) > 0 && !selectedSize) return alert("Please select a size");
    const items: CartItem[] = [{ product_id: product.id, quantity, size: selectedSize, color: selectedColor, price: product.price }];
    const message = generateWhatsAppMessage("Customer", items, product.price * quantity);
    window.open(createWhatsAppLink(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "62812345678", message), "_blank");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      {/* LEFT: Image Gallery */}
      <div className="lg:col-span-7 space-y-6">
        <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div key={imageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full w-full">
              <Image src={productImages[imageIndex]} alt={product.name} fill className="object-cover" priority />
            </motion.div>
          </AnimatePresence>
          
          <button onClick={() => setIsWishlisted(!isWishlisted)} className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm">
            <Heart size={20} className={isWishlisted ? "fill-[#111111] text-[#111111]" : "text-gray-400"} />
          </button>

          <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setImageIndex(i => i === 0 ? productImages.length -1 : i - 1)} className="p-2 bg-white/90 rounded-full"><ChevronLeft size={20}/></button>
            <button onClick={() => setImageIndex(i => i === productImages.length -1 ? 0 : i + 1)} className="p-2 bg-white/90 rounded-full"><ChevronRight size={20}/></button>
          </div>
        </div>

        <div className="flex gap-4">
          {productImages.map((img, idx) => (
            <button key={idx} onClick={() => setImageIndex(idx)} className={`relative w-24 aspect-[4/5] bg-[#F9F9F9] overflow-hidden border-2 transition-all ${idx === imageIndex ? "border-[#111111]" : "border-transparent"}`}>
              <Image src={img} alt="thumbnail" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Product Info */}
      <div className="lg:col-span-5 space-y-10">
        <section>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4">{product.category}</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-[#111111] uppercase mb-4">{product.name}</h1>
          <div className="flex items-center gap-6">
            <p className="text-2xl font-black">{formatPrice(product.price)}</p>
            <span className="text-xs font-bold px-2 py-1 bg-[#E2FF3B] rounded-sm">IN STOCK</span>
          </div>
        </section>

        <section className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-8">
          <p>{product.description || "No description available for this curated piece."}</p>
        </section>

        {/* Size Picker */}
        {product.size && product.size.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-[#111111]">Select Size:</h3>
            <div className="flex flex-wrap gap-3">
              {product.size.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`h-12 w-16 border text-xs font-bold transition-all ${selectedSize === size ? "bg-[#111111] text-white border-[#111111]" : "border-gray-200 hover:border-[#111111]"}`}>
                  {size}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Quantity & Actions */}
        <section className="space-y-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between border border-gray-100 w-full h-14 px-6">
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Quantity</span>
            <div className="flex items-center gap-6">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:text-[#E2FF3B] transition-colors">-</button>
              <span className="text-sm font-bold w-4 text-center">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="hover:text-[#E2FF3B] transition-colors">+</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button onClick={() => addItem(product, quantity, selectedSize, selectedColor)} className="h-16 bg-[#111111] text-white rounded-none uppercase text-xs font-black tracking-[0.2em] hover:bg-black">
              <ShoppingBag size={18} className="mr-3" /> Add to Shopping Bag
            </Button>
            <Button onClick={handleBuyViaWhatsApp} variant="outline" className="h-16 border-[#111111] text-[#111111] rounded-none uppercase text-xs font-black tracking-[0.2em] hover:bg-[#E2FF3B] hover:border-[#E2FF3B]">
              <MessageSquare size={18} className="mr-3" /> Order via WhatsApp
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="grid grid-cols-2 gap-4 pt-10 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <Truck size={18} className="text-gray-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-tight">Fast Worldwide <br/> Shipping</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-gray-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-tight">100% Secure <br/> Transaction</span>
          </div>
        </section>
      </div>
    </div>
  );
}