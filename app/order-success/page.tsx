"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="w-24 h-24 bg-[#E2FF3B]/20 rounded-full flex items-center justify-center mb-8 animate-pulse">
          <CheckCircle2 size={48} className="text-[#111111]" />
        </div>
        
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4 block">
          Transaction Complete
        </span>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#111111] uppercase mb-6 leading-none">
          Payment Successful.
        </h1>
        
        <p className="text-gray-500 mb-2 max-w-md mx-auto text-sm">
          Thank you for your purchase. Your order has been securely processed and is now being prepared for shipment.
        </p>
        
        {orderId && (
          <div className="bg-[#F9F9F9] px-6 py-4 rounded-lg my-8 inline-block">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">
              Order Reference
            </span>
            <span className="font-mono text-[#111111] text-sm">
              {orderId}
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/katalog">
            <Button className="w-full sm:w-auto bg-[#111111] text-white px-12 py-6 rounded-none uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#E2FF3B] hover:text-[#111111] transition-all">
              Continue Shopping <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
