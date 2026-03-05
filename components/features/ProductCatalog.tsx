"use client";

import { useEffect, useState } from "react";
import { useFilterStore } from "@/lib/stores/useFilterStore";
import { supabase } from "@/lib/supabase/client";
import { Product } from "@/lib/schemas/product";
import ProductCard from "./ProductCard";
import { Loader2, SearchX } from "lucide-react";

export default function ProductCatalog() {
  const { category, minPrice, maxPrice, search } = useFilterStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let query = supabase.from("products").select("*");

        if (category && category !== "all" && category !== "Semua") {
            query = query.eq("category", category);
        }
        if (minPrice && minPrice > 0) query = query.gte("price", minPrice);
        if (maxPrice && maxPrice < 2000000) query = query.lte("price", maxPrice);
        if (search) query = query.ilike("name", `%${search}%`);

        const { data, error } = await query;
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchProducts, 400);
    return () => clearTimeout(timeoutId);
  }, [category, minPrice, maxPrice, search]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-[#111111] mb-4 stroke-[1px]" />
        <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-400">Updating Collection</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] py-20 text-center animate-in fade-in duration-500">
        <SearchX className="h-16 w-16 mb-6 text-gray-100" />
        <h3 className="text-xl font-medium text-[#111111] uppercase tracking-tighter">No items found</h3>
        <p className="text-sm text-gray-400 mt-2 max-w-xs">Try adjusting your filters or search keywords.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}