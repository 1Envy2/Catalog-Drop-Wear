"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useCartStore } from "@/lib/stores/cartStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema, CheckoutFormData } from "@/lib/schemas/product";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/formatters";
import { supabase } from "@/lib/supabase/client";

// Helper function untuk generate UUID yang compatible
function generateUUID(): string {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  // Fallback untuk browser yang tidak support randomUUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Definisi tipe global untuk menghindari error "Unexpected any"
declare global {
  interface Window {
    snap: {
      pay: (token: string, options: SnapPaymentCallback) => void;
    };
  }
}

interface SnapPaymentResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_status: string;
  fraud_status: string;
}

interface SnapPaymentCallback {
  onSuccess?: (result: SnapPaymentResult) => void;
  onPending?: (result: SnapPaymentResult) => void;
  onError?: (result: SnapPaymentResult) => void;
  onClose?: () => void;
}

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      status: "pending" as const,
      customer_name: "",
      customer_phone: "62",
      customer_email: "",
      notes: "",
    },
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      const formData = data as CheckoutFormData;
      const orderId = generateUUID();

      // 1. SIMPAN KE TABEL 'orders' (Header)
      const { error: orderError } = await supabase.from("orders").insert({
        id: orderId,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email || null,
        total_price: total,
        items: items, // Tetap simpan JSONB sebagai backup/log
        status: "pending",
        notes: formData.notes || null,
      });

      if (orderError) throw orderError;

      // 2. SIMPAN KE TABEL 'order_items' (Detail)
      // Kita memetakan item dari cartStore ke format tabel order_items
      const orderItemsData = items.map((item) => ({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        size: item.size ?? null,
        color: item.color ?? null,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsData);

      if (itemsError) throw itemsError;

      // 3. AMBIL TOKEN MIDTRANS
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `API error: ${response.status} ${response.statusText}`,
        );
      }

      const { token } = await response.json();

      // 4. EKSEKUSI SNAP POPUP
      if (window.snap) {
        window.snap.pay(token, {
          onSuccess: () => {
            clearCart();
            window.location.assign("/katalog");
          },
          onPending: () => alert("Selesaikan pembayaran Anda."),
          onError: () => alert("Pembayaran gagal!"),
          onClose: () => alert("Anda menutup jendela pembayaran."),
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Checkout error:", errorMessage);
      alert(`Checkout failed: ${errorMessage}`);
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
          <h1 className="text-3xl font-medium tracking-tighter uppercase mb-4 text-[#111111]">
            Your bag is empty
          </h1>
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
      {/* Script Snap Midtrans */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
      />

      <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4 block">
            Secure Checkout
          </span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-[#111111] uppercase leading-none">
            Payment.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-[#111111]">
                  Delivery Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Full Name *
                    </label>
                    <input
                      placeholder="Enter your name"
                      {...register("customer_name")}
                      className={`w-full bg-transparent border-b ${errors.customer_name ? "border-red-500" : "border-gray-100"} py-3 focus:border-[#111111] outline-none transition-colors text-sm text-[#111111]`}
                    />
                    {errors.customer_name && (
                      <p className="text-red-500 text-[10px] font-bold uppercase mt-1">
                        {errors.customer_name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Contact Number *
                    </label>
                    <input
                      placeholder="62812345678"
                      {...register("customer_phone")}
                      className={`w-full bg-transparent border-b ${errors.customer_phone ? "border-red-500" : "border-gray-100"} py-3 focus:border-[#111111] outline-none transition-colors text-sm font-mono text-[#111111]`}
                    />
                    {errors.customer_phone && (
                      <p className="text-red-500 text-[10px] font-bold uppercase mt-1">
                        {errors.customer_phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-10 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    {...register("customer_email")}
                    className="w-full bg-transparent border-b border-gray-100 py-3 focus:border-[#111111] outline-none text-sm text-[#111111]"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Notes
                  </label>
                  <textarea
                    placeholder="Any specific delivery instructions..."
                    {...register("notes")}
                    rows={4}
                    className="w-full bg-[#F9F9F9] border-none p-6 text-sm focus:ring-1 focus:ring-[#111111] outline-none resize-none transition-all text-[#111111]"
                  />
                </div>
              </section>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 bg-[#111111] text-white rounded-none uppercase text-xs font-black tracking-[0.2em] hover:bg-[#E2FF3B] hover:text-[#111111] transition-all"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    Pay with Midtrans <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#111111] text-white p-10 sticky top-28">
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] mb-10 text-gray-500 border-b border-white/10 pb-6">
                Payment Summary
              </h2>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-xs uppercase tracking-widest text-gray-400">
                  <span>Total Items</span>
                  <span className="text-white font-bold">{items.length}</span>
                </div>
                <div className="flex justify-between items-center text-xs uppercase tracking-widest text-gray-400">
                  <span>Total Amount</span>
                  <span className="text-white font-bold">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-10 mb-12">
                <span className="text-xs font-black uppercase tracking-widest text-[#E2FF3B]">
                  Final Total
                </span>
                <span className="text-4xl font-black tracking-tighter text-[#E2FF3B]">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 p-6">
                <div className="flex items-start gap-3">
                  <CreditCard size={16} className="mt-0.5 text-gray-400" />
                  <p className="text-[10px] uppercase font-bold tracking-widest leading-relaxed text-gray-400">
                    Payment is handled securely by Midtrans. Multiple methods
                    (Bank, E-Wallet, Card) are available.
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
