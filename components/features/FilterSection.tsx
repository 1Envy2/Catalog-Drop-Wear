"use client";

import { useFilterStore } from "@/lib/stores/useFilterStore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface FilterSectionProps {
  categories?: string[];
}

export default function FilterSection({ categories = [] }: FilterSectionProps) {
  const {
    category,
    search,
    minPrice,
    maxPrice,
    setSearch,
    setCategory,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  return (
    <div className="bg-white border-b border-gray-100 p-6 mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#111111]">Refine Selection</h2>
        <button
          onClick={resetFilters}
          className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#111111] flex items-center gap-1.5 transition-colors"
        >
          <X size={14} />
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Search */}
        <div className="space-y-3">
          <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Search</label>
          <div className="relative">
            <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Find product..."
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-b border-gray-100 pl-7 py-2 text-sm focus:border-[#111111] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-3">
          <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Category</label>
          <Select value={category || "all"} onValueChange={setCategory}>
            <SelectTrigger className="h-10 rounded-none border-gray-100 text-xs font-bold uppercase tracking-wider focus:ring-[#111111]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-gray-100">
              <SelectItem value="all" className="text-xs uppercase font-bold tracking-wider">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-xs uppercase font-bold tracking-wider">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Min Price */}
        <div className="space-y-3">
          <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Min Price</label>
          <div className="relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300">Rp</span>
            <input
              type="number"
              placeholder="0"
              value={minPrice || ""}
              onChange={(e) => setPriceRange(parseInt(e.target.value) || 0, maxPrice || 2000000)}
              className="w-full bg-transparent border-b border-gray-100 pl-7 py-2 text-sm focus:border-[#111111] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Max Price */}
        <div className="space-y-3">
          <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Max Price</label>
          <div className="relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300">Rp</span>
            <input
              type="number"
              placeholder="2.000.000"
              value={maxPrice === 2000000 ? "" : maxPrice}
              onChange={(e) => setPriceRange(minPrice || 0, parseInt(e.target.value) || 2000000)}
              className="w-full bg-transparent border-b border-gray-100 pl-7 py-2 text-sm focus:border-[#111111] outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}