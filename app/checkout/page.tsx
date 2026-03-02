"use client";

import { useEffect, useState } from "react";
import Script from "next/script"; // Import untuk memuat script external
import { useCartStore } from "@/lib/stores/cartStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema, Product } from "@/lib/schemas/product";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { formatPrice } from "@/lib/formatters";
import { supabase } from "@/lib/supabase/client";

type CheckoutFormData = z.infer<typeof OrderSchema>;

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore(); // Tambahkan clearCart
  const total = getTotal();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Map<string, Product>>(new Map());

  useEffect(() => {
    setMounted(true);
    const fetchProducts = async () => {
      if (items.length === 0) return;
      const productIds = [...new Set(items.map((item) => item.product_id))];
      const { data } = await supabase.from("products").select("*").in("id", productIds);
      const productMap = new Map<string, Product>();
      data?.forEach((p) => productMap.set(p.id, p));
      setProducts(productMap);
    };
    fetchProducts();
  }, [items]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      status: "pending",
      customer_name: "",
      customer_phone: "62",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const orderId = `DROP-${Date.now()}`; // Generate Order ID unik

      // 1. Simpan pesanan ke Supabase terlebih dahulu dengan status pending
      const { error: dbError } = await supabase.from("orders").insert({
        id: orderId,
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        customer_email: data.customer_email,
        total_price: total,
        items: items, // Simpan array items dari store
        status: "pending",
      });

      if (dbError) throw new Error("Gagal membuat pesanan di database");

      // 2. Panggil API Tokenizer untuk mendapatkan Snap Token
      const response = await fetch("/api/tokenizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: orderId,
          price: total,
          quantity: 1,
          productName: `Order ${orderId} - drop.wear`,
        }),
      });

      const { token } = await response.json();

      // 3. Eksekusi Midtrans Snap
      if (window.snap) {
        window.snap.pay(token, {
          onSuccess: (result: any) => {
            console.log("Success:", result);
            clearCart();
            window.location.assign("/checkout/success"); // Arahkan ke page sukses
          },
          onPending: (result: any) => {
            console.log("Pending:", result);
            alert("Selesaikan pembayaran Anda segera.");
          },
          onError: (result: any) => {
            console.error("Error:", result);
            alert("Pembayaran gagal, silakan coba lagi.");
          },
          onClose: () => {
            alert("Anda menutup jendela pembayaran sebelum selesai.");
          },
        });
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Terjadi kesalahan saat memproses pesanan.");
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="w-20 h-20 bg-[#F9F9F9] rounded-full flex items-center justify-center mb-8">
            <ShoppingBag size={32} className="text-gray-300" />
          </div>
          <h1 className="text-3xl font-medium tracking-tighter uppercase mb-4">Your bag is empty</h1>
          <Link href="/katalog">
            <Button className="bg-[#111111] text-white px-12 py-6 rounded-none uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#E2FF3B] hover:text-[#111111] transition-all">
              Back to Catalog
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* 4. Load Snap.js Script dari Midtrans */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4 block">Secure Checkout</span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-[#111111] uppercase leading-none">Payment.</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-[#111111]">Delivery Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name *</label>
                    <input
                      placeholder="Enter your name"
                      {...register("customer_name")}
                      className={`w-full bg-transparent border-b ${errors.customer_name ? "border-red-500" : "border-gray-100"} py-3 focus:border-[#111111] outline-none transition-colors text-sm`}
                    />
                    {errors.customer_name && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.customer_name.message}</p>}
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contact Number *</label>
                    <input
                      placeholder="62812345678"
                      {...register("customer_phone")}
                      className={`w-full bg-transparent border-b ${errors.customer_phone ? "border-red-500" : "border-gray-100"} py-3 focus:border-[#111111] outline-none transition-colors text-sm font-mono`}
                    />
                    {errors.customer_phone && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.customer_phone.message}</p>}
                  </div>
                </div>

                <div className="space-y-2 mb-10 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    {...register("customer_email")}
                    className="w-full bg-transparent border-b border-gray-100 py-3 focus:border-[#111111] outline-none text-sm"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Notes</label>
                  <textarea
                    placeholder="Any specific delivery instructions..."
                    {...register("notes")}
                    rows={4}
                    className="w-full bg-[#F9F9F9] border-none p-6 text-sm focus:ring-1 focus:ring-[#111111] outline-none resize-none transition-all"
                  />
                </div>
              </section>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 bg-[#111111] text-white rounded-none uppercase text-xs font-black tracking-[0.2em] hover:bg-[#E2FF3B] hover:text-[#111111] transition-all"
              >
                {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : <>Pay with Midtrans <ArrowRight size={16} className="ml-2" /></>}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#111111] text-white p-10 sticky top-28">
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] mb-10 text-gray-500 border-b border-white/10 pb-6">Payment Summary</h2>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-xs uppercase tracking-widest text-gray-400">
                  <span>Total Items</span>
                  <span className="text-white font-bold">{items.length}</span>
                </div>
                <div className="flex justify-between items-center text-xs uppercase tracking-widest text-gray-400">
                  <span>Total Amount</span>
                  <span className="text-white font-bold">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-10 mb-12">
                <span className="text-xs font-black uppercase tracking-widest text-[#E2FF3B]">Final Total</span>
                <span className="text-4xl font-black tracking-tighter text-[#E2FF3B]">{formatPrice(total)}</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-6">
                <div className="flex items-start gap-3">
                  <CreditCard size={16} className="mt-0.5 text-gray-400" />
                  <p className="text-[10px] uppercase font-bold tracking-widest leading-relaxed text-gray-400">
                    Payment is handled securely by Midtrans. Multiple methods (Bank, E-Wallet, Card) are available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Tambahkan type definition untuk window.snap agar tidak error TS
declare global {
  interface Window {
    snap: any;
  }
}