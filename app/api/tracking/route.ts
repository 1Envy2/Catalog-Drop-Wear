import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("id");

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  try {
    // Gunakan admin SDK untuk membypass RLS (jika belum ada kebijakan public read untuk orders)
    // Ingat: Karena UUID sangat panjang dan acak, ini secara praktis berfungsi seperti token rahasia
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("id, status, total_price, created_at, courier, tracking_number, items")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (err) {
    console.error("Tracking error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
