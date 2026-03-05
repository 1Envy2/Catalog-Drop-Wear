"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/stores/cartStore";
import { Product } from "@/lib/schemas/product";
import { supabase } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/formatters";
import { createWhatsAppLink, generateWhatsAppMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck, Truck, Loader2 } from "lucide-react";
import { toast } from "sonner"; // Import Sonner

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
    <div className="flex flex-col justify-center items-center min-h-[400px]">
      <Loader2 className="h-8 w-8 animate-spin text-[#111111] mb-4" />
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Loading Details</p>
    </div>
  );

  if (!product) return <div className="text-center py-20 uppercase tracking-widest text-xs font-bold">Product not found.</div>;

  const productImages = [product.image_url, product.image_url, product.image_url];

  const handleAddToCart = () => {
    if ((product.size?.length ?? 0) > 0 && !selectedSize) {
      return toast.error("Silakan pilih ukuran terlebih dahulu");
    }
    addItem(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} ditambahkan ke tas`, {
      description: `${quantity} item • Size: ${selectedSize || 'N/A'}`,
      icon: <ShoppingBag size={16} />
    });
  };

  const handleBuyViaWhatsApp = () => {
    if ((product.size?.length ?? 0) > 0 && !selectedSize) {
      return toast.error("Silakan pilih ukuran untuk pemesanan WhatsApp");
    }
    const items = [{ 
      product_id: product.id, 
      product_name: product.name,
      quantity, 
      size: selectedSize, 
      color: selectedColor, 
      price: product.price 
    }];
    const message = generateWhatsAppMessage("Customer", items, product.price * quantity);
    window.open(createWhatsAppLink(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "62812345678", message), "_blank");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
      {/* LEFT: Image Gallery - Full width on mobile */}
      <div className="lg:col-span-7 space-y-4 lg:space-y-6">
        <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div key={imageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full w-full">
              <Image src={productImages[imageIndex]} alt={product.name} fill className="object-cover" priority />
            </motion.div>
          </AnimatePresence>
          
          <button onClick={() => setIsWishlisted(!isWishlisted)} className="absolute top-4 lg:top-6 right-4 lg:right-6 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm z-10">
            <Heart size={20} className={isWishlisted ? "fill-[#111111] text-[#111111]" : "text-gray-400"} />
          </button>

          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setImageIndex(i => i === 0 ? productImages.length -1 : i - 1)} className="p-2 bg-white/90 rounded-full shadow-md"><ChevronLeft size={20}/></button>
            <button onClick={() => setImageIndex(i => i === productImages.length -1 ? 0 : i + 1)} className="p-2 bg-white/90 rounded-full shadow-md"><ChevronRight size={20}/></button>
          </div>
        </div>

        {/* Thumbnail scrollable on mobile */}
        <div className="flex gap-3 lg:gap-4 overflow-x-auto no-scrollbar pb-2">
          {productImages.map((img, idx) => (
            <button key={idx} onClick={() => setImageIndex(idx)} className={`relative flex-shrink-0 w-20 lg:w-24 aspect-[4/5] bg-[#F9F9F9] overflow-hidden border-2 transition-all ${idx === imageIndex ? "border-[#111111]" : "border-transparent"}`}>
              <Image src={img} alt="thumbnail" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Product Info */}
      <div className="lg:col-span-5 space-y-8 lg:space-y-10">
        <section>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2 lg:mb-4">{product.category}</p>
          <h1 className="text-3xl md:text-5xl font-medium tracking-tighter text-[#111111] uppercase mb-4 leading-none">{product.name}</h1>
          <div className="flex items-center gap-6">
            <p className="text-xl lg:text-2xl font-black">{formatPrice(product.price)}</p>
            <span className="text-[10px] font-black px-2 py-1 bg-[#E2FF3B] rounded-none tracking-widest uppercase">In Stock</span>
          </div>
        </section>

        <section className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-6 lg:pt-8">
          <p>{product.description || "No description available for this curated piece."}</p>
        </section>

        {/* Size Picker - Better touch targets */}
        {product.size && product.size.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-[#111111]">Select Size:</h3>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {product.size.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`h-12 w-14 lg:w-16 border text-xs font-bold transition-all ${selectedSize === size ? "bg-[#111111] text-white border-[#111111]" : "border-gray-200 hover:border-[#111111]"}`}>
                  {size}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Quantity & Actions - Full width buttons on mobile */}
        <section className="space-y-4 lg:space-y-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between border border-gray-100 w-full h-14 px-6">
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Quantity</span>
            <div className="flex items-center gap-8">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-xl hover:text-[#E2FF3B] transition-colors">-</button>
              <span className="text-sm font-bold w-4 text-center">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="text-xl hover:text-[#E2FF3B] transition-colors">+</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button onClick={handleAddToCart} className="h-16 bg-[#111111] text-white rounded-none uppercase text-xs font-black tracking-[0.2em] hover:bg-black w-full">
              <ShoppingBag size={18} className="mr-3" /> Add to Shopping Bag
            </Button>
            <Button onClick={handleBuyViaWhatsApp} variant="outline" className="h-16 border-[#111111] text-[#111111] rounded-none uppercase text-xs font-black tracking-[0.2em] hover:bg-[#E2FF3B] hover:border-[#E2FF3B] w-full">
              <MessageSquare size={18} className="mr-3" /> Order via WhatsApp
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="grid grid-cols-2 gap-4 pt-8 lg:pt-10 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <Truck size={18} className="text-gray-400" />
            <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-tight">Fast Worldwide <br/> Shipping</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-gray-400" />
            <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-tight">100% Secure <br/> Transaction</span>
          </div>
        </section>
      </div>
    </div>
  );
}