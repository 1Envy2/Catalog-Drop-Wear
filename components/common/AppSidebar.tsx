"use client";

import { useEffect, useState } from "react";
import { useFilterStore } from "@/lib/stores/useFilterStore";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const CATEGORIES = ["Semua", "T-Shirt", "Kemeja", "Celana", "Dress", "Aksesoris"];

export function AppSidebar() {
  const { category, setCategory, setPriceRange, minPrice, maxPrice, resetFilters } = useFilterStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <Sidebar className="sticky top-20 h-[calc(100vh-80px)] border-r border-gray-100 bg-white hidden md:flex w-72" style={{ position: 'sticky' }}>
      <SidebarHeader className="px-6 py-8 flex flex-row items-center justify-between">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#111111]">Filter</h2>
        <Button variant="ghost" size="icon" onClick={resetFilters} className="hover:bg-[#E2FF3B] rounded-full transition-colors">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </SidebarHeader>
      
      <SidebarContent className="px-6 overflow-y-auto">
        <Accordion type="multiple" defaultValue={["categories", "price"]} className="w-full">
          
          {/* Category Section */}
          <AccordionItem value="categories" className="border-none mb-8">
            <AccordionTrigger className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:no-underline py-4">
              Category:
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              {CATEGORIES.map((item) => (
                <div key={item} className="flex items-center justify-between group cursor-pointer" onClick={() => setCategory(item)}>
                  <label className={`text-sm cursor-pointer transition-colors ${category === item ? "font-bold text-[#111111]" : "text-gray-400 group-hover:text-[#111111]"}`}>
                    {item}
                  </label>
                  <Checkbox 
                    id={item} 
                    checked={category === item}
                    className="rounded-none border-gray-200 data-[state=checked]:bg-[#111111] data-[state=checked]:border-[#111111]"
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Price Section */}
          <AccordionItem value="price" className="border-none">
            <AccordionTrigger className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:no-underline py-4">
              Price Range:
            </AccordionTrigger>
            <AccordionContent className="px-1 pt-6 pb-10">
              <Slider 
                value={[minPrice, maxPrice]} 
                max={2000000} 
                step={50000}
                onValueChange={(vals) => setPriceRange(vals[0], vals[1])}
                className="[&_[role=slider]]:bg-[#111111] [&_[role=slider]]:border-none [&_.relative]:bg-gray-100 [&_[data-orientation=horizontal]]:h-1"
              />
              <div className="flex justify-between mt-6 text-[10px] font-bold tracking-widest text-[#111111]">
                <span>Rp {minPrice.toLocaleString()}</span>
                <span>Rp {maxPrice.toLocaleString()}</span>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </SidebarContent>
    </Sidebar>
  );
}