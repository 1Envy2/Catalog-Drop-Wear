"use client";

import ProductCatalog from "@/components/features/ProductCatalog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useFilterStore } from "@/lib/stores/useFilterStore";

export default function KatalogPage() {
  const { search, setSearch } = useFilterStore();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-medium tracking-tighter text-[#111111] uppercase">
            Explore All <span className="text-gray-300 italic font-light">Products</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2">
            Showing curated collection for your expression
          </p>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-[#111111] transition-colors" />
          <Input 
            placeholder="Search products..." 
            className="pl-10 bg-white border-gray-100 rounded-none h-12 focus-visible:ring-[#111111] placeholder:text-gray-300 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ProductCatalog />
    </div>
  );
}