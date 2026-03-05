"use client";

import ProductCatalog from "@/components/features/ProductCatalog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useFilterStore } from "@/lib/stores/useFilterStore";

export default function KatalogPage() {
  const { search, setSearch } = useFilterStore();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 lg:mb-16 gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tighter text-[#111111] uppercase leading-none">
            Explore All <br className="md:hidden" />
            <span className="text-gray-300 italic font-light">Products</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
            Showing curated collection for your expression
          </p>
        </div>

        <div className="relative w-full lg:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-[#111111] transition-colors" />
          <Input 
            placeholder="Search products..." 
            className="pl-12 bg-[#F9F9F9] border-none rounded-none h-14 focus-visible:ring-1 focus-visible:ring-[#111111] placeholder:text-gray-400 text-sm transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ProductCatalog />
    </div>
  );
}