"use client";

import { useCartStore } from "@/lib/stores/cartStore";
import { useEffect, useState } from "react";

export default function CartBadge() {
  const totalItems = useCartStore((state) => state.getTotalItems?.() || 0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || totalItems === 0) return null;

  return (
    <span className="absolute -top-0.5 -right-0.5 bg-[#E2FF3B] text-[#111111] text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-black border-2 border-white animate-in zoom-in duration-300 shadow-sm">
      {totalItems}
    </span>
  );
}