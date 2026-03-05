"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/schemas/product";
import { formatPrice } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import { useState } from "react";
import { toast } from "sonner"; // Tambahkan Sonner

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success(`${product.name} ditambahkan ke keranjang`, {
      icon: <ShoppingBag size={16} />,
    });
  };

  return (
    <div className="group bg-white border border-gray-100 transition-all hover:shadow-2xl flex flex-col h-full">
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F9F9F9]">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all active:scale-90 z-10"
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-[#111111] text-[#111111]" : "text-gray-400"}
          />
        </button>

        {/* Quick Add - Desktop & Mobile Friendly */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
           <Button 
             onClick={handleAddToCart}
             disabled={product.stock === 0}
             className="w-full bg-[#111111] text-white rounded-none h-12 uppercase text-[10px] font-black tracking-widest hover:bg-[#E2FF3B] hover:text-[#111111]"
           >
             {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
           </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-2">
          <Link href={`/produk/${product.id}`} className="flex-1">
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-tight hover:underline decoration-1 underline-offset-4 line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm font-black text-[#111111] shrink-0">{formatPrice(product.price)}</p>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-4">
          {product.category || "General Collection"}
        </p>

        {/* Mobile Add to Cart - Visible only on mobile */}
        <Button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="md:hidden w-full bg-[#111111] text-white rounded-none h-10 uppercase text-[9px] font-black tracking-widest mt-auto"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}