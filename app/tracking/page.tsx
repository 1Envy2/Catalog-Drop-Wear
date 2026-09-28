"use client";

import { useState } from "react";
import { Search, Package, CheckCircle2, Clock, XCircle, Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatPrice } from "@/lib/formatters";

// Tipe data berdasarkan struktur Supabase + penambahan courier & tracking_number
interface OrderData {
  id: string;
  status: string;
  total_price: number;
  created_at: string;
  courier?: string;
  tracking_number?: string;
  items?: any[];
}

export default function TrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      toast.error("Silakan masukkan Order ID / Nomor Referensi");
      return;
    }

    setIsLoading(true);
    setOrder(null);

    try {
      const res = await fetch(`/api/tracking?id=${orderId.trim()}`);
      if (!res.ok) {
        throw new Error(res.status === 404 ? "Pesanan tidak ditemukan" : "Gagal mengambil data");
      }
      const data = await res.json();
      setOrder(data);
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper untuk menentukan status milestone
  const getStatusStep = (status: string) => {
    if (["cancel", "deny", "expire", "cancelled"].includes(status)) return -1; // Failed
    if (status === "pending") return 1; // Ordered, waiting for payment
    if (status === "settlement" || status === "confirmed") return 2; // Paid & Processing
    if (status === "shipped") return 3; // Shipped
    if (status === "delivered") return 4; // Delivered
    return 0;
  };

  const currentStep = order ? getStatusStep(order.status) : 0;
  const isFailed = currentStep === -1;

  const steps = [
    { title: "Order Placed", desc: "Pesanan dibuat", icon: <Package size={16} />, step: 1 },
    { title: "Payment Verified", desc: "Pembayaran lunas", icon: <CheckCircle2 size={16} />, step: 2 },
    { title: "Shipped", desc: "Pesanan dikirim", icon: <Truck size={16} />, step: 3 },
    { title: "Delivered", desc: "Pesanan diterima", icon: <CheckCircle2 size={16} />, step: 4 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-20 pb-12 lg:pt-32 lg:pb-16 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4 block">Order Tracking</span>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#111111] uppercase leading-none mb-6">
            Lacak Pesanan.
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Masukkan Nomor Referensi (Order ID) yang Anda dapatkan saat proses pembayaran selesai untuk melihat status pesanan Anda.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20 px-6 max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-16">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input 
              type="text" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Masukkan Order ID (Contoh: 123e4567-e89b-...)" 
              className="w-full bg-[#F9F9F9] border-none pl-12 pr-6 h-14 text-sm focus:ring-1 focus:ring-[#111111] outline-none text-[#111111] font-mono transition-shadow"
            />
          </div>
          <Button type="submit" disabled={isLoading} className="h-14 px-10 bg-[#111111] text-white hover:bg-[#E2FF3B] hover:text-[#111111] rounded-none uppercase text-[10px] font-black tracking-widest transition-all">
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Lacak"}
          </Button>
        </form>

        {order && (
          <div className="bg-[#F9F9F9] p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 pb-8 mb-10">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Order Details</span>
                <p className="font-mono text-sm md:text-base text-[#111111] font-bold mb-2">{order.id}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{new Date(order.created_at).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="text-left md:text-right">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Total Tagihan</span>
                <p className="text-xl md:text-2xl font-black tracking-tighter text-[#111111]">{formatPrice(order.total_price)}</p>
              </div>
            </div>

            {isFailed ? (
              <div className="bg-red-50 border border-red-100 p-6 flex items-center gap-4">
                <XCircle className="text-red-500" size={32} />
                <div>
                  <p className="font-bold text-red-900 uppercase tracking-widest text-xs mb-1">Transaksi Dibatalkan / Gagal</p>
                  <p className="text-xs text-red-700">Pembayaran tidak berhasil atau telah kadaluarsa.</p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Status Pengiriman</h3>
                
                {/* Timeline */}
                <div className="relative border-l border-gray-200 ml-4 space-y-10 pb-4">
                  {steps.map((step, index) => {
                    const isCompleted = currentStep >= step.step;
                    const isCurrent = currentStep === step.step;
                    
                    return (
                      <div key={index} className="relative pl-8">
                        {/* Dot */}
                        <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isCompleted ? 'bg-[#111111] text-[#E2FF3B]' : 'bg-gray-200 text-gray-400'}`}>
                          {step.icon}
                        </div>
                        
                        <div>
                          <p className={`text-xs uppercase tracking-widest font-bold mb-1 ${isCompleted ? 'text-[#111111]' : 'text-gray-400'}`}>
                            {step.title}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">{step.desc}</p>
                          
                          {/* Inject Resi Info jika sudah dikirim */}
                          {step.step === 3 && isCompleted && (
                            <div className="mt-4 bg-white border border-gray-100 p-4 inline-block">
                              <p className="text-[9px] uppercase tracking-widest font-black text-gray-400 mb-1">Informasi Kurir</p>
                              {order.courier && order.tracking_number ? (
                                <>
                                  <p className="font-bold text-[#111111] text-xs uppercase mb-1">{order.courier}</p>
                                  <p className="font-mono text-sm text-[#111111]">{order.tracking_number}</p>
                                </>
                              ) : (
                                <p className="text-xs text-gray-400 italic">Menunggu resi diinput</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
