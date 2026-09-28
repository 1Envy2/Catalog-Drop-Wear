import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status, courier, tracking_number } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: "Order ID dan Status wajib diisi" }, { status: 400 });
    }

    // Update pesanan di Supabase
    const { data, error } = await supabaseAdmin
      .from("orders")
      .update({
        status,
        courier: courier || null,
        tracking_number: tracking_number || null,
        updated_at: new Date().toISOString()
      })
      .eq("id", orderId)
      .select()
      .single();

    if (error) {
      console.error("Supabase Admin Update Error:", error);
      return NextResponse.json({ error: "Gagal memperbarui database" }, { status: 500 });
    }

    return NextResponse.json({ message: "Pesanan berhasil diperbarui", order: data });
  } catch (err) {
    console.error("Admin Update Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
