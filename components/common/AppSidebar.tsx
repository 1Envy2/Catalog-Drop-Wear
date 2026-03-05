"use client";

import { useEffect, useState } from "react";
import { useFilterStore } from "@/lib/stores/useFilterStore";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = ["Semua", "T-Shirt", "Kemeja", "Celana", "Dress", "Aksesoris"];

export function AppSidebar() {
  const { category, setCategory, setPriceRange, minPrice, maxPrice, resetFilters } = useFilterStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleReset = () => {
    resetFilters();
    toast.info("Filter telah direset");
  };

  return (
    <Sidebar className="sticky top-20 h-[calc(100vh-80px)] border-r border-gray-100 bg-white hidden lg:flex w-72" style={{ position: 'sticky' }}>
      <SidebarHeader className="px-6 py-8 flex flex-row items-center justify-between border-b border-gray-50">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]">Refine Selection</h2>
        <Button variant="ghost" size="icon" onClick={handleReset} className="hover:bg-[#E2FF3B] rounded-none h-8 w-8 transition-colors">
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </SidebarHeader>
      
      <SidebarContent className="px-6 overflow-y-auto no-scrollbar">
        <Accordion type="multiple" defaultValue={["categories", "price"]} className="w-full">
          
          <AccordionItem value="categories" className="border-none mb-6">
            <AccordionTrigger className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:no-underline py-6">
              Category
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              {CATEGORIES.map((item) => (
                <div key={item} className="flex items-center justify-between group cursor-pointer" onClick={() => setCategory(item)}>
                  <label className={`text-xs uppercase tracking-widest cursor-pointer transition-colors ${category === item ? "font-black text-[#111111]" : "text-gray-400 font-medium group-hover:text-[#111111]"}`}>
                    {item}
                  </label>
                  <Checkbox 
                    id={item} 
                    checked={category === item}
                    className="rounded-none border-gray-200 data-[state=checked]:bg-[#111111] data-[state=checked]:border-[#111111] h-3.5 w-3.5"
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price" className="border-none">
            <AccordionTrigger className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:no-underline py-6">
              Price Range
            </AccordionTrigger>
            <AccordionContent className="px-1 pt-4 pb-8">
              <Slider 
                value={[minPrice, maxPrice]} 
                max={2000000} 
                step={50000}
                onValueChange={(vals) => setPriceRange(vals[0], vals[1])}
                className="[&_[role=slider]]:bg-[#111111] [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-none [&_.relative]:bg-gray-100 [&_[data-orientation=horizontal]]:h-1"
              />
              <div className="flex justify-between mt-6 text-[9px] font-black tracking-widest text-[#111111]">
                <div className="bg-gray-50 px-2 py-1">Rp {minPrice.toLocaleString()}</div>
                <div className="bg-gray-50 px-2 py-1">Rp {maxPrice.toLocaleString()}</div>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </SidebarContent>
    </Sidebar>
  );
}