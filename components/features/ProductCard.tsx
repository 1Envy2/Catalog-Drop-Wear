"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/schemas/product";
import { formatPrice } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react"; // Ganti icon ke ShoppingBag agar lebih fashion
import { useCartStore } from "@/lib/stores/cartStore";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group bg-white border border-gray-100 transition-all hover:shadow-2xl">
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F9F9F9]">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Wishlist Button - Top Right */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all active:scale-90"
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-[#111111] text-[#111111]" : "text-gray-400"}
          />
        </button>

        {/* Quick Add - Appears on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
           <Button 
             onClick={() => addItem(product, 1)}
             disabled={product.stock === 0}
             className="w-full bg-[#111111] text-white rounded-none h-12 uppercase text-[10px] font-black tracking-widest hover:bg-[#E2FF3B] hover:text-[#111111]"
           >
             {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
           </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/produk/${product.id}`}>
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-tight group-hover:underline decoration-2 underline-offset-4">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm font-black text-[#111111]">{formatPrice(product.price)}</p>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
          {product.category || "General Collection"}
        </p>
        
        {/* Colors Preview */}
        {product.color && product.color.length > 0 && (
          <div className="mt-4 flex gap-1.5">
            {product.color.slice(0, 4).map((color) => (
              <div
                key={color}
                className="w-3 h-3 rounded-full border border-gray-100"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}