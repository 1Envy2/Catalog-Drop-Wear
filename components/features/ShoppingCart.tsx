"use client";

import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/formatters";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Product } from "@/lib/schemas/product";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function ShoppingCart() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [products, setProducts] = useState<Map<string, Product>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (items.length === 0) { setLoading(false); return; }
      const productIds = [...new Set(items.map((item) => item.product_id))];
      const { data } = await supabase.from("products").select("*").in("id", productIds);
      const productMap = new Map<string, Product>();
      data?.forEach((product) => productMap.set(product.id, product));
      setProducts(productMap);
      setLoading(false);
    };
    fetchProducts();
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 bg-white border border-gray-100">
        <div className="w-20 h-20 bg-[#F9F9F9] rounded-full flex items-center justify-center mb-8">
           <ShoppingBag size={32} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-medium tracking-tighter text-[#111111] mb-2 uppercase">Your bag is empty</h2>
        <p className="text-gray-400 mb-10 text-sm tracking-wide">Looks like you haven't added anything yet.</p>
        <Link href="/katalog">
          <Button className="bg-[#111111] text-white px-12 py-6 rounded-none uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#E2FF3B] hover:text-[#111111]">
            Explore Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20">
      <div className="lg:col-span-8">
        <h1 className="text-4xl font-medium tracking-tighter uppercase mb-12 border-b border-gray-100 pb-8">Shopping Bag <span className="text-gray-300 ml-2">({items.length})</span></h1>

        <div className="divide-y divide-gray-100">
          {items.map((item) => {
            const product = products.get(item.product_id);
            if (!product) return null;
            return (
              <div key={`${item.product_id}-${item.size}-${item.color}`} className="py-8 flex gap-8 group">
                <div className="w-32 h-40 bg-[#F9F9F9] flex-shrink-0 relative overflow-hidden">
                  <Image src={product.image_url} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-[#111111] uppercase tracking-tight">{product.name}</h3>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{product.category}</p>
                    </div>
                    <p className="font-black text-[#111111]">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex gap-10 mt-6">
                    {item.size && <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Size: <span className="text-[#111111]">{item.size}</span></div>}
                    {item.color && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Color:</span>
                        <div className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: item.color }} />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-6">
                    <div className="flex items-center border border-gray-100 h-10 px-2">
                      <button onClick={() => updateQuantity(item.product_id, item.quantity - 1, item.size, item.color)} className="p-2 hover:text-[#E2FF3B]"><Minus size={14} /></button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product_id, item.quantity + 1, item.size, item.color)} className="p-2 hover:text-[#E2FF3B]"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => removeItem(item.product_id, item.size, item.color)} className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors">Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Box */}
      <div className="lg:col-span-4">
        <div className="bg-[#F9F9F9] p-10 sticky top-28 border border-gray-100">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-[#111111]">Order Summary</h2>
          <div className="space-y-6 text-sm border-b border-gray-200 pb-8 mb-8">
            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span className="text-[#111111] font-bold">{formatPrice(getTotal())}</span></div>
            <div className="flex justify-between text-gray-500"><span>Shipping</span><span className="text-[#111111] font-bold">Calculated at next step</span></div>
          </div>
          <div className="flex justify-between items-end mb-10">
            <span className="text-xs font-black uppercase tracking-widest">Total</span>
            <span className="text-3xl font-black tracking-tighter">{formatPrice(getTotal())}</span>
          </div>
          <Link href="/checkout"><Button className="w-full bg-[#111111] text-white rounded-none h-14 font-bold uppercase tracking-widest text-xs hover:bg-[#E2FF3B] hover:text-[#111111] mb-4">Checkout Now <ArrowRight size={16} className="ml-2" /></Button></Link>
          <button onClick={() => clearCart()} className="w-full text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#111111] transition-colors py-2">Clear Shopping Bag</button>
        </div>
      </div>
    </div>
  );
}