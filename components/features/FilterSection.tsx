"use client";

import { useFilterStore } from "@/lib/stores/filterStore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface FilterSectionProps {
  categories?: string[];
  sizes?: string[];
  colors?: string[];
}

export default function FilterSection({
  categories = [],
  sizes = [],
  colors = [],
}: FilterSectionProps) {
  const {
    filters,
    setSearch,
    setCategory,
    setSize,
    setColor,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Filter Produk</h2>
        <button
          onClick={() => resetFilters()}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <X size={16} />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cari Produk
          </label>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Nama produk..."
              value={filters.search || ""}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category */}
        {categories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <Select value={filters.category || "all"} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Size */}
        {sizes.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ukuran
            </label>
            <Select value={filters.size || "all"} onValueChange={setSize}>
              <SelectTrigger>
                <SelectValue placeholder="Semua Ukuran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Ukuran</SelectItem>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Color */}
        {colors.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Warna
            </label>
            <Select value={filters.color || "all"} onValueChange={setColor}>
              <SelectTrigger>
                <SelectValue placeholder="Semua Warna" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Warna</SelectItem>
                {colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                      {color}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Harga Minimal
          </label>
          <Input
            type="number"
            placeholder="Rp 0"
            value={filters.minPrice || ""}
            onChange={(e) =>
              setPriceRange(
                parseInt(e.target.value) || 0,
                filters.maxPrice || 0,
              )
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Harga Maksimal
          </label>
          <Input
            type="number"
            placeholder="Rp 999.999"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              setPriceRange(
                filters.minPrice || 0,
                parseInt(e.target.value) || 0,
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
