"use client";

import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/formatters";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Product } from "@/lib/schemas/product";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { toast } from "sonner";

export default function ShoppingCart() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [products, setProducts] = useState<Map<string, Product>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (items.length === 0) {
        setLoading(false);
        return;
      }
      const productIds = [...new Set(items.map((item) => item.product_id))];
      const { data } = await supabase.from("products").select("*").in("id", productIds);
      const productMap = new Map<string, Product>();
      data?.forEach((product) => productMap.set(product.id, product));
      setProducts(productMap);
      setLoading(false);
    };
    fetchProducts();
  }, [items]);

  const handleRemove = (id: string, name: string, size?: string, color?: string) => {
    removeItem(id, size, color);
    toast.info(`${name} dihapus dari tas`);
  };

  const handleClear = () => {
    clearCart();
    toast.success("Tas belanja dikosongkan");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 bg-white">
        <div className="w-20 h-20 bg-[#F9F9F9] rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={32} className="text-gray-300" />
        </div>
        <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-[#111111] mb-2 uppercase text-center px-6">
          Your bag is empty
        </h2>
        <Link href="/katalog" className="mt-8">
          <Button className="bg-[#111111] text-white px-12 py-6 rounded-none uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#E2FF3B] hover:text-[#111111]">
            Explore Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-20">
      <div className="lg:col-span-8">
        <h1 className="text-3xl lg:text-4xl font-medium tracking-tighter uppercase mb-8 lg:mb-12 border-b border-gray-100 pb-8">
          Shopping Bag <span className="text-gray-300 ml-2">({items.length})</span>
        </h1>

        <div className="divide-y divide-gray-100">
          {items.map((item) => {
            const product = products.get(item.product_id);
            if (!product) return null;

            const currentSize = item.size ?? undefined;
            const currentColor = item.color ?? undefined;

            return (
              <div key={`${item.product_id}-${item.size}-${item.color}`} className="py-6 lg:py-8 flex gap-4 lg:gap-8 group">
                <div className="w-24 h-32 lg:w-32 lg:h-40 bg-[#F9F9F9] flex-shrink-0 relative overflow-hidden">
                  <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="max-w-[70%]">
                      <h3 className="text-sm lg:text-lg font-bold text-[#111111] uppercase tracking-tight truncate">
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
                        {product.category}
                      </p>
                    </div>
                    <p className="font-black text-sm lg:text-base text-[#111111]">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3 lg:mt-6">
                    {currentSize && (
                      <div className="text-[9px] lg:text-[10px] uppercase tracking-widest font-bold text-gray-400">
                        Size: <span className="text-[#111111]">{currentSize}</span>
                      </div>
                    )}
                    {currentColor && (
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] lg:text-[10px] uppercase tracking-widest font-bold text-gray-400">Color:</span>
                        <div className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: currentColor }} />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 lg:pt-6">
                    <div className="flex items-center border border-gray-100 h-10 px-1">
                      <button onClick={() => updateQuantity(item.product_id, item.quantity - 1, currentSize, currentColor)} className="p-2 hover:text-[#E2FF3B] transition-colors"><Minus size={12} /></button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product_id, item.quantity + 1, currentSize, currentColor)} className="p-2 hover:text-[#E2FF3B] transition-colors"><Plus size={12} /></button>
                    </div>
                    <button onClick={() => handleRemove(item.product_id, product.name, currentSize, currentColor)} className="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Box - Full width on mobile */}
      <div className="lg:col-span-4">
        <div className="bg-[#F9F9F9] p-8 lg:p-10 sticky top-28 border border-gray-100">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 lg:mb-10 text-[#111111]">Order Summary</h2>
          <div className="space-y-4 text-xs border-b border-gray-200 pb-8 mb-8">
            <div className="flex justify-between text-gray-500 uppercase tracking-widest">
              <span>Subtotal</span>
              <span className="text-[#111111] font-bold">{formatPrice(getTotal())}</span>
            </div>
            <div className="flex justify-between text-gray-500 uppercase tracking-widest">
              <span>Shipping</span>
              <span className="text-gray-400">Calculated at checkout</span>
            </div>
          </div>
          <div className="flex justify-between items-end mb-10">
            <span className="text-[10px] font-black uppercase tracking-widest">Total</span>
            <span className="text-3xl font-black tracking-tighter leading-none">{formatPrice(getTotal())}</span>
          </div>
          <Link href="/checkout">
            <Button className="w-full bg-[#111111] text-white rounded-none h-16 font-bold uppercase tracking-widest text-xs hover:bg-black mb-4">
              Checkout Now <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <button onClick={handleClear} className="w-full text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-red-500 transition-colors py-2">
            Clear Shopping Bag
          </button>
        </div>
      </div>
    </div>
  );
}