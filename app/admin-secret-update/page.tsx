"use client";

import { useState } from "react";
import { Search, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatPrice } from "@/lib/formatters";

interface OrderData {
  id: string;
  status: string;
  total_price: number;
  created_at: string;
  courier?: string;
  tracking_number?: string;
}

export default function AdminSecretUpdatePage() {
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);

  // Form State
  const [status, setStatus] = useState("pending");
  const [courier, setCourier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      toast.error("Masukkan Order ID");
      return;
    }

    setIsLoading(true);
    setOrder(null);

    try {
      const res = await fetch(`/api/tracking?id=${orderId.trim()}`);
      if (!res.ok) throw new Error("Pesanan tidak ditemukan");
      const data = await res.json();
      setOrder(data);
      
      // Populate form
      setStatus(data.status || "pending");
      setCourier(data.courier || "");
      setTrackingNumber(data.tracking_number || "");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/update-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          status,
          courier,
          tracking_number: trackingNumber,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal memperbarui");

      toast.success("Pesanan berhasil diperbarui!");
      setOrder(result.order);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-[#111111] mb-2">Admin Update Order</h1>
          <p className="text-gray-400 text-sm">Halaman rahasia untuk mengubah status dan input resi.</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input 
              type="text" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Masukkan Order ID" 
              className="w-full bg-[#F9F9F9] border-none pl-12 pr-6 h-12 text-sm focus:ring-1 focus:ring-[#111111] outline-none text-[#111111] font-mono"
            />
          </div>
          <Button type="submit" disabled={isLoading} className="h-12 px-8 bg-[#111111] text-white hover:bg-[#E2FF3B] hover:text-[#111111] rounded-none uppercase text-[10px] font-black tracking-widest transition-all">
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Cari"}
          </Button>
        </form>

        {order && (
          <div className="bg-[#F9F9F9] p-8">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <p className="font-mono text-sm font-bold text-[#111111]">{order.id}</p>
              <p className="text-xl font-black mt-2 text-[#111111]">{formatPrice(order.total_price)}</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#111111] mb-2">Status Pesanan</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-white border border-gray-200 h-12 px-4 text-sm focus:border-[#111111] outline-none"
                >
                  <option value="pending">ORDER PLACED (Pending)</option>
                  <option value="settlement">PAYMENT VERIFIED (Settlement / Lunas)</option>
                  <option value="shipped">SHIPPED (Dikirim)</option>
                  <option value="delivered">DELIVERED (Diterima)</option>
                  <option value="cancel">CANCELED (Batal)</option>
                </select>
              </div>

              {(status === "shipped" || status === "delivered") && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#111111] mb-2">Kurir</label>
                    <input 
                      type="text" 
                      value={courier}
                      onChange={(e) => setCourier(e.target.value)}
                      placeholder="Contoh: J&T, JNE" 
                      className="w-full bg-white border border-gray-200 h-12 px-4 text-sm focus:border-[#111111] outline-none uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#111111] mb-2">No. Resi</label>
                    <input 
                      type="text" 
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Nomor Resi" 
                      className="w-full bg-white border border-gray-200 h-12 px-4 text-sm focus:border-[#111111] outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              <Button type="submit" disabled={isUpdating} className="w-full h-14 bg-[#111111] text-white hover:bg-[#E2FF3B] hover:text-[#111111] rounded-none uppercase text-[10px] font-black tracking-widest transition-all mt-4">
                {isUpdating ? <Loader2 className="animate-spin" size={18} /> : (
                  <span className="flex items-center gap-2"><Save size={16} /> Simpan Perubahan</span>
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
